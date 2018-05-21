import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation} from '@angular/core';
import { myService } from "../myService";
import {GlobalData} from "../../../../providers/GlobalData";
import { ElMessageService } from 'element-angular';
@Component({
  selector: 'app-withDraw',
  templateUrl: './withDraw.component.html',
  styleUrls: ['./withDraw.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WithDrawComponent implements OnInit {
	public id:number;
	public defaultbank:string;//默认选择银行
	public choosedbank:string;//银行code
	public bankListData:any[] = [];
	public money: string='';
	public password: string='';
  	constructor(
		public myService:myService,
		public globalData:GlobalData,
		public message: ElMessageService,
		private changeDetectorRef:ChangeDetectorRef,
    ) { 
     //获取银行列表
	 myService.getBankCard(this.globalData.userId)
		.subscribe(res => {
			if(res.success=="true"){
				if(!res.data)return;
				this.defaultbank=res.data[0].bank+res.data[0].bankCardNumber;
				this.choosedbank=res.data[0].id;
				res.data.forEach((value,index,arr)=>{
					this.bankListData.push({
						label: value.bank, value: value.id,number:value.bankCardNumber
					})
				})
			}else{
				this.message['error'](res.errorMsg)
			}
		})
    }
  	ngOnInit() {
      // this.route.params.subscribe((params) => {
      //     this.id = params.id;
      // });
    }
    //选择银行
	chooseBank(val){
		this.choosedbank=val.value;
		this.defaultbank=val.label+val.number;
	}
	sub(){
		if(isNaN(Number(this.money))||Number(this.money)<=0){
			this.message['error']('请输入正确的金额')
			return
		}
		this.myService.withDraw(Number(this.money),Number(this.choosedbank),this.password)
		.subscribe(res => {
			if(res.success=='true'){
				this.message['success']('提现申请已提交，具体到账时间以银行为准')
				this.globalData.funds-=Number(this.money);
			}else{
				this.message['error'](res.errorMsg)
			}
		})
	}
}

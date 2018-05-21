import { Component, OnInit,ViewEncapsulation,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myService } from "../myService";
import {GlobalData} from "../../../../providers/GlobalData";
import { ElMessageService } from 'element-angular';
import {APP_PAY} from '../../../../assets/config/config';
@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RechargeComponent implements OnInit {
		public id:number;
		public bankTypa:number;
		public bankData:any=[];
		public choose_bank:any=[];
		public moneyamount:number;
  	constructor(
			private route:ActivatedRoute,
			public myService:myService,
			public globalData:GlobalData,
			public message: ElMessageService,
			private changeDetectorRef:ChangeDetectorRef  
		) { 
    }
  	ngOnInit() {
      	this.route.params.subscribe((params) => {
			this.id = params.id;
		  });
		  this.getBanks();
	}
	//选择银行
	handle(val){
		this.choose_bank.bankCardNumber=val.label;
		this.choose_bank.bankCode=val.value;
	}
	//获取银行列表
	getBanks(){
		this.myService.getBankCard(this.globalData.userId)
		.subscribe(res => {
			if(res.success=="true"){
				if(res.data.length!=0){
					console.log(res.data)
					res.data.forEach((value,index,arr) => {
						this.bankData.push({
							value:value.bankCode,
							label:value.bankCardNumber
						})
					});
					this.choose_bank=res.data[0];
				}
			}else{
				this.message['error'](res.errorMsg)
			}
		})
		// this.myService.getBanks()
		// .subscribe(res => {
		// 	if(res.success=="true"){
		// 		if(!res.data)return;
		// 		res.data.forEach((value,index,arr) => {
		// 			this.bankData.push({
		// 				value:value.bankCode,
		// 				label:value.bankName
		// 			})
		// 		});
		// 		// console.log('res.data',res.data)
		// 		this.choose_bank=res.data[0];
		// 	}else{
		// 		this.message['error'](res.errorMsg)
		// 	}
		// })
	}
	//提交
	sub(){
		if(!this.globalData.authState){
			this.message['error']('请先实名认证');
			return;
		}
		if(isNaN(Number(this.moneyamount))||Number(this.moneyamount)<=0){
			this.message['error']('请输入正确的金额');
			return
		}
		if(this.bankData.length==0){
			this.message['error']('请先绑定银行卡');
			return
		}
		function openWindow(url){  
			var link = document.createElement('a');  
			link.target = "_blank";  
			link.href = url;  
			   document.body.appendChild(link);  
			link.click();  
			document.body.removeChild(link);  
		}  
		this.myService.Payment(this.moneyamount,2)
		.subscribe(res => {
			if(res.success=="true"){
				// this.showNext=true;
				// this.formData=res.data;
				let temp:any=this.choose_bank;
				window.location.href=`/recharge.html?hostPath=${res.data.hostPath}&encryp=${res.data.encryp}&url=${res.data.url}&bankCode=${temp.bankCode}&bankcardNo=${temp.bankCardNumber2}`
			}else{
				this.message['error'](res.errorMsg)
			}
		})
	}
}

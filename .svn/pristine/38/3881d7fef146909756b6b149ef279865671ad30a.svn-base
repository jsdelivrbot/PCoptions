import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {TradeService} from '../tradeService';
import {GlobalData} from "../../../providers/GlobalData";
import { ElMessageService } from 'element-angular';
import { LoginService } from '../../user/login/LoginService';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PurchaseComponent implements OnInit {
		public searching:boolean=false;
		public choose1:string;
		public selfSet:string;
		public selfSetValue:number;
		public price:number;
		public showPrice:boolean=false;
		public inSearchState:boolean=false;
		public showResult:boolean=false;
		public showAgree:boolean=false;
		public canType:boolean=true;
		public M_stockData:any;
		public M_num:number;
		public search_value:string;
		public searData:any=[];
		public tableDate:any=[];
		public subData:any=[];
		public constr1Data:any=[];
		public constr2Data:any=[];
  	constructor(
		private globalData: GlobalData,
		private tradeService: TradeService,
		public message: ElMessageService,
		public router: Router,
		public loginService: LoginService,
	) { 
    }
  	ngOnInit() {
		this.getDurations();
		this.Principals();
		this.getSelfPrin();
    }
	clickOne(val){
		this.choose1=val;
	}
	clickTwo(val){
		this.M_num=val;
	}
	//获取行权周期构造
	getDurations(){
		this.tradeService.getDurations()
		.subscribe(res => {
			console.log('res1',res)
			if(res.success=='true'){
				this.constr1Data=res.data;
				this.choose1=res.data[0].refValue;
			}else{
				this.message['error'](res.errorMsg)
			}
		});
	}
	//获取名义本金状态
	getSelfPrin(){
		this.tradeService.getSelfPrin()
		.subscribe(res => {
			if(res.success=='true'){
				this.canType=res.data;
			}else{
				this.message['error'](res.errorMsg)
			}
		});
	}
	//获取名利本金构造
	Principals(){
		this.tradeService.Principals()
		.subscribe(res => {
			console.log('res2',res)
			if(res.success=='true'){
				this.constr2Data=res.data;
				this.selfSet='自定义金额'+res.data[0].refText+'起';
				this.selfSetValue=Number(res.data[0].refValue);
				this.M_num=this.constr2Data[0].refValue;
			}else{
				this.message['error'](res.errorMsg)
			}
		});
	}
	searchChange(val){
		if(!val){
			this.searching=false;
			return;
		}
		this.tradeService.SearchList(val)
        .subscribe(res => {
			if(res.success=='true'){
				this.searching=true;
				this.searData=res.data;
			}else{
				this.message['error'](res.errorMsg)
			}
		});
	}
	chooseCode(val){
		this.searching=false;
		this.M_stockData=val;
		this.search_value=val.stockName+'    '+val.stockCode;
		this.tradeService.getPrice(val.stockCode)
		.subscribe(res => {
			if(res.success=='true'){
				this.showPrice=true;	
				this.price=res.data.exercisePrice;
			}else{
				this.showPrice=false;
				this.message['error'](res.errorMsg)
			}
		});
	}
	inquiry(){
		if(!this.globalData.userId){
			this.message['warning']('请先登录')
			return
		}
		if(!this.globalData.authState){
			this.message['warning']('请实名认证')
			return
		}
		if(this.M_num<this.selfSetValue){
			this.message['warning'](this.selfSet)
			return
		}
		this.inSearchState=true;
		this.tradeService.inquiry({
			stockCode:this.M_stockData.stockCode,
			duration:this.choose1,
			principal:this.M_num,
			stockName:this.M_stockData.stockName
		})
		.subscribe(res => {
			this.inSearchState=false;
			if(res.success=='true'){
				res.data.stockName=this.M_stockData.stockName;
				console.log('data',res.data)
				this.showResult=true;
				this.subData=res.data;
			}else{
				this.message['error'](res.errorMsg)
			}
		});
	}
	//合作协议
	cusAgree(){
		this.showAgree=true;
		this.loginService.getConText(4)
			.subscribe(res => {
				if(res.success=='true'){
					let temp:any=document.getElementById('_html1');
					temp.innerHTML=res.data.html;
				}else{
					this.message['error'](res.errorMsg)
				}
			})
	}
	goPay(){
		this.router.navigate(['/pay',JSON.stringify(this.subData)]);
	}
}

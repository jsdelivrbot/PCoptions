import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {TradeService} from '../tradeService';
import {GlobalData} from "../../../providers/GlobalData";
import { ElMessageService } from 'element-angular';
import { LoginService } from '../../user/login/LoginService';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
    public tabState=5;
    public noData=false;
    public showDialog=false;
    public showDialog1=false;
    public exerState=false;
    public data:any=[];
    public tempstr:string='确定行权?';
    public tempId:string='';
  	constructor(
        private globalData: GlobalData,
		private tradeService: TradeService,
		public message: ElMessageService,
		public router: Router,
		public loginService: LoginService,
    ) { 
    }
  	ngOnInit() {
        this.getData(5)
    }
    tabChoose(val){
        this.tabState=val;
        this.noData=false;
        this.data=[];
        this.getData(val)
    }
    getData(val){
		this.tradeService.tradeRecord(1,1000,val)
		.subscribe(res => {
			if(res.success=="true"){
				if(res.data.length==0){
					this.noData=true;
					return;
				}else{
					this.noData=false;
				}
				this.data=res.data;
			}else{
                this.message['error'](res.errorMsg)
            }
		})	
    }
    //行权判断
	exercise(val){
        this.tempId=val.orderId;
        this.tempstr='确定行权?';
		this.tradeService.getPrice(val.stockCode)
			.subscribe(res => {
				if(res.success=='true'){
					if(res.data.exercisePrice<val.price){
                        this.tempstr='当前价格低于买入价，您确定要行权“'+val.stockName+'”吗?'
                        this.exerState=false;
                        this.showDialog=true;
                        
					}else{
                        this.exerState=true;
                        this.showDialog1=true;
                        
                    }
				}else{
					this.message['error'](res.errorMsg)
				}
			});
	}
	//行权
	doexercise(val){
        if(!val){
            this.showDialog=false;
            this.showDialog1=false;
            return;
        }
        this.showDialog=false;
        this.showDialog1=false;
		this.tradeService.exercise(this.tempId)
		.subscribe(res => {
			if(res.success=="true"){
                this.message['success']('行权成功')
                this.getData(6);
			}else{
				this.message['error'](res.errorMsg)
			}
		})		
    }
}

import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { myService } from "../myService";
import {GlobalData} from "../../../../providers/GlobalData";
import { ElMessageService } from 'element-angular';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
	  constructor(
			public myService:myService,
			public globalData:GlobalData,
			public message: ElMessageService,
	) { 
    }
  	ngOnInit() {
      	this.myService.getUserInfo(this.globalData.userId)
			.subscribe(res => {
				console.log('账户信息',res)
				if(res.success=="true"){
					// this.globalData.token=res.data.accessToken;
					// this.globalData.refreshToken=res.data.refreshToken;
					this.globalData.userId=res.data.id;
					this.globalData.funds =res.data.funds ;
					this.globalData.capital =res.data.capital;
					this.globalData.authState =res.data.authState ;
					this.globalData.account =res.data.phoneMob ;
					this.globalData.isMentionPassword =res.data.isMentionPassword ;
					this.globalData.isBankCard  =res.data.isBankCard ;
					this.globalData.cardCount=res.data.cardCount;
					this.globalData.realName=res.data.realName;
					this.globalData.simulateAccount=res.data.phoneMob.length==8?true:false;
				}
			})
				// console.log('this.globalData',this.globalData)
	}
	changeTab(val){
		if(!this.globalData.authState)
		{
			this.message['warning']('请先实名认证');
			return;
		}
		if(!this.globalData.isBankCard&&val=='提现'){
			this.message['warning']('请先绑定银行卡');
			return;
		}
		if(!this.globalData.isMentionPassword&&val=='提现'){
			this.message['warning']('请先设置提现/支付密码');
			return;
		}
		this.globalData.tabState=val;
	}
}

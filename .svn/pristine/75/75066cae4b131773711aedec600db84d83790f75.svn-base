import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {GlobalData} from "../../../providers/GlobalData";
import { ElMessageService } from 'element-angular';
@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyComponent implements OnInit {
  	constructor(
		private router:Router,
		public globalData:GlobalData,
		public message: ElMessageService,
	) { 
		
    }
  	ngOnInit() {
		
	}
	tabChange(val){
		switch(val){
			case '1-1':
				this.globalData.tabState='个人信息';
				break;
			case '2-1':
				if(!this.globalData.authState)
				{
					this.message['warning']('请先实名认证');
					return;
				}
				this.globalData.tabState='充值';
				break;
			case '2-2':
				if(!this.globalData.authState)
				{
					this.message['warning']('请先实名认证');
					return;
				}
				if(!this.globalData.isBankCard){
					this.message['warning']('请先绑定银行卡');
					return;
				}
				if(!this.globalData.isMentionPassword){
					this.message['warning']('请先设置提现/支付密码');
					return;
				}
				this.globalData.tabState='提现';
				break;
			case '3-1':
				this.globalData.tabState='充值记录';
				break;
			case '3-2':
				this.globalData.tabState='提现记录';
				break;
			case '4-1':
				this.globalData.tabState='实名认证';
				break;
			case '4-2':
				if(!this.globalData.authState){
					this.message['warning']('请先实名认证');
					return;
				}
				this.globalData.tabState='银行卡';
				break;
			case '4-3':
				this.globalData.tabState='支付密码';
				break;
			case '4-4':
				this.globalData.tabState='修改登录密码';
				break;
		}
		
	}
}

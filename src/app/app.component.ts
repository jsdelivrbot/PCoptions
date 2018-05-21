import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import {GlobalData} from "../providers/GlobalData";
import { Router,NavigationEnd} from '@angular/router';
import { myService } from "./user/my/myService";
import Cookie from '../providers/cookie';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	public loinState:boolean=false;
	public tabState=1;
  	constructor(
		  public globalData:GlobalData,
		  private router: Router,
		  private myService: myService,
		){
	  }
	ngOnInit() {
		this.myService.getConfig()
			.subscribe(res => {
				console.log(res)
				if(res.success=="true"){
					this.globalData.config=res.data;
					document.title=res.data.title;
					if(this.globalData.config.title.length>=3){
						let temp:any=document.getElementById('_title');
						temp.style.left=-28*(this.globalData.config.title.length-3)+'px';
					}
				}
			})
		if(localStorage.userIfo){
			let val:any=JSON.parse(localStorage.userIfo);
			if(Cookie.getCookie('qiquan'+val.userId)=='true'){
				this.globalData.account=val.account;
				this.globalData.token=val.token;
				this.globalData.refreshToken=val.refreshToken;
				this.globalData.userId=val.userId;
				this.loinState=true;
				this.myService.getUserInfo(this.globalData.userId)
				.subscribe(res => {
					// console.log('账户信息',res)
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
			}else{
				this.logout();
			}
		}
		this.router.events
		.subscribe((event:NavigationEnd) => {
			if(event instanceof NavigationEnd) {
				if(/home/i.test(event.urlAfterRedirects)){
					this.tabState=1;
					return
				}
				if(/help/i.test(event.urlAfterRedirects)){
					this.tabState=2;
					return
				}
				if(/about/i.test(event.urlAfterRedirects)){
					this.tabState=3;
					return
				}
				if(/trade/i.test(event.urlAfterRedirects)){
					this.tabState=4;
					return
				}
				if(/download/i.test(event.urlAfterRedirects)){
					this.tabState=5;
					return
				}
				this.tabState=-1;
			}
		});
	}
	logout(){
		localStorage.removeItem('userIfo')
		this.globalData.account=null;
		this.globalData.token=null;
		this.globalData.refreshToken=null;
		this.globalData.userId=null;
		this.loinState=false;
		this.router.navigate(['']);
	}
	goNextPage(val){
		switch(val){
			case '登录':
				this.router.navigate(['login']);
				break;
			case '个人中心':
				this.router.navigate(['my']);
				break;
		}
		
	}
	handle(val){
		switch(val.target.innerText){
			case '首页':
				this.router.navigate(['']);
				this.tabState=1;
				break;
			case '帮助':
				this.router.navigate(['help']);
				this.tabState=2;
				break;
			case '关于':
				this.router.navigate(['about']);
				this.tabState=3;
				break;
			case '期权交易':
				this.router.navigate(['trade',1]);
				this.tabState=4;
				break;
			case '下载':
				this.router.navigate(['download']);
				this.tabState=5;
				break;
		}
	}
}

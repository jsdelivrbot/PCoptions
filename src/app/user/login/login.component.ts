import { Component, OnInit,ViewEncapsulation,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {GlobalData} from "../../../providers/GlobalData";
import { LoginService } from './LoginService';
import { Router } from '@angular/router';
import { ElMessageService } from 'element-angular';
import Cookie from '../../../providers/cookie';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
	public tabfirst:boolean=true;
	public passwordForm: any;
	public registerForm: any;
	public showPicVerify:boolean=false;//登录页面
	public imgUrl:string;
	public verifystate:string='获取验证码';
	public submitstate:boolean=false;//获取验证码状态控制
	public timing:number=60;//计时
	public login_Agree:boolean=true;//登录agree
	public register_Agree:boolean=true;//注册agree
	public showAgree:boolean=false;//计时
  	constructor( 
			public router: Router,
			public route: ActivatedRoute,
			public formBuilder: FormBuilder,
			public loginservice:LoginService,
			public globalData: GlobalData,
			public message: ElMessageService,
			private changeDetectorRef:ChangeDetectorRef  
		) { 
			let preAccount=''	;
			if(localStorage.preAccount)preAccount=localStorage.preAccount;
			this.passwordForm = this.formBuilder.group({
				account: [preAccount, [Validators.required,Validators.pattern(/(^\d{8}$)|(^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$)/)]],// 第一个参数是默认值, Validators.minLength(4)
				password: ['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
				verifyCode:['']
			});
			this.registerForm = this.formBuilder.group({
				account: ['', [Validators.required,Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")]],// 第一个参数是默认值, Validators.minLength(4)
				password: ['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
				confirmpassword:['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
				verify: ['', [Validators.required,Validators.maxLength(4),Validators.minLength(4)]],
				assetunit: ['', [Validators.pattern("^[0-9]*$")]],
				recommend:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(6),Validators.minLength(6)]],
			});
    }
  	ngOnInit() {
		// console.log(this.route.snapshot.paramMap.get('id'))
		if(localStorage.preLogin=='false'){
			let temp={
				account:localStorage.preAccount
			}
			this.refreshcode(temp)
		}
	}
	loginAgree(val){
		this.login_Agree=val;
	}
	registerAgree(val){
		this.register_Agree=val;
	}
	//选项卡切换
	tabChoose(val){
		this.tabfirst=val;
	}
	login(val){
		localStorage.preAccount=val.account;
		if(localStorage.preLogin=='true'){
			val.verifyCode='';
		}
		this.loginservice.login(val)
		.subscribe(res => {
			if(res.success=='true'){
				localStorage.preLogin='true';
				localStorage.userIfo=JSON.stringify({
					account:val.account,
					token:res.data.accessToken,
					refreshToken:res.data.refreshToken,
					userId:res.data.id,
				})
				this.globalData.token=res.data.accessToken;
				this.globalData.refreshToken=res.data.refreshToken;
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
				if(this.login_Agree){
					Cookie.setCookie('qiquan'+this.globalData.userId,'true',14)
				}else{
					Cookie.setCookie('qiquan'+this.globalData.userId,'true',0)
				}
				this.router.navigate(['my']);
				//关闭登录页面
				// this.storage.get('userInfo').then((val) => {
				// 	console.log(val);
				//   });
			}else{
				localStorage.preLogin='false';
				this.refreshcode(val);
				this.message['error'](res.errorMsg)
			}
		})
	}
	//注册
	register(val){
		val.assetunit=val.assetunit==''?0:val.assetunit;
		val.recommend=val.recommend==''?0:val.recommend;
		this.loginservice.register(val)
		.subscribe(res => {
			console.log(res)
			if(res.success=='true'){
				this.message['success']('注册成功')
				this.tabfirst=true;
			}else{
				this.message['error'](res.errorMsg)
			}
		})
	}
	//获取图片验证码
	refreshcode(val){
		this.loginservice.getPicVerify(val.account)
		.subscribe(res => {
			if(res.success=='true'){
				this.imgUrl='data:image/png;base64,'+res.data;
				this.showPicVerify=true;
			}else{
				this.message['error'](res.errorMsg)
			}
		})
	}
	//获取短信验证码
	getVerifyCode(phone){
		this.submitstate=true;
		this.loginservice.getVerifyCode(phone)
			.subscribe(res => {
				if(res.success=='true'){
					//验证码计时控制
					var inter=setInterval(()=>{
						this.timing--;
						this.verifystate='重新发送'+this.timing+'s';
						if(this.timing<=0)clearinter();
					},1000)
					var clearinter=(()=>{
						clearInterval(inter);
						this.verifystate='获取验证码';
						this.submitstate=false;
						this.timing=60;
					})
				}else{
					this.submitstate=false;
					this.message['error'](res.errorMsg)
				}
			});
	}
	//用户协议
	cusAgree(){
		this.showAgree=true;
		this.loginservice.getConText(3)
			.subscribe(res => {
				if(res.success=='true'){
					let temp:any=document.getElementById('_html');
					temp.innerHTML=res.data.html;
				}else{
					this.message['error'](res.errorMsg)
				}
			})
	}
}

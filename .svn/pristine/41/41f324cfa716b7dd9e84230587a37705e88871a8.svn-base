import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {GlobalData} from "../../../../providers/GlobalData";
import { myService } from "../myService";
import { ElMessageService } from 'element-angular';
import { LoginService } from '../../login/LoginService';
@Component({
  selector: 'app-payPassword',
  templateUrl: './payPassword.component.html',
  styleUrls: ['./payPassword.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PayPasswordComponent implements OnInit {
  	public id:number;
  	public passwordForm: any;
	public drawpasswordForm:any;
	public verifystate:string='获取验证码';
	public submitstate:boolean=false;//获取验证码状态控制
	public timing:number=60;//计时
  	constructor(
        public globalData:GlobalData,
		public formBuilder: FormBuilder,
	    private changeDetectorRef:ChangeDetectorRef,
	    public myService:myService,
      	public message: ElMessageService,
      	public loginService: LoginService,
    ) { 
      	this.passwordForm = this.formBuilder.group({
			drawpassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]{6}")]],// 第一个参数是默认值, Validators.minLength(4)
			confirmpassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]{6}")]],
      	});
     	this.drawpasswordForm = this.formBuilder.group({
			password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]{6}")]],// 第一个参数是默认值, Validators.minLength(4)
			verify: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4),,Validators.pattern("[0-9]{4}")]],
			confirmpassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]{6}")]],
        });
    }
  	ngOnInit() {
      // this.route.params.subscribe((params) => {
      //     this.id = params.id;
      // });
	}
	//设置提现密码
	conformit(val){
		this.myService.setDrawPassword(this.globalData.userId,val)
		.subscribe(res => {
			if(res.success=="true"){
				this.globalData.isMentionPassword=true;
				this.message['success']('设置成功');
			}else{
				this.message['error'](res.errorMsg);
			}
		})
	}
	//修改提现密码
	modifyDrawPassword(val){
		this.myService.modifyDrawPassword(this.globalData,val)
		.subscribe(res => {
			if(res.success=="true"){
				this.message['success']('修改成功');
			}else{
				this.message['error'](res.errorMsg);
			}
		})
	}
	//获取短信验证码
	getVerifyCode(phone){
		this.submitstate=true;
		this.loginService.getVerifyCode(phone)
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
}

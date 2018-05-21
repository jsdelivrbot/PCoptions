import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login/LoginService';
import {FormBuilder, Validators} from '@angular/forms';
import {GlobalData} from "../../../providers/GlobalData";
import { ElMessageService } from 'element-angular';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetComponent implements OnInit {
    public step:number=1;
    public verifyForm:any;
    public verifystate:string="获取验证码";
    public submitstate:boolean=false;//获取验证码状态控制
	public timing:number=60;//计时
	public account:string;
	public passwordForm: any;
    constructor(
      private formBuilder: FormBuilder,
			public loginservice:LoginService,
			public message: ElMessageService,
			public globalData: GlobalData,
		) { 
        this.verifyForm = this.formBuilder.group({
			account: ['', [Validators.required,Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")]],// 第一个参数是默认值, Validators.minLength(4)
			verify: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
		});
		this.passwordForm = this.formBuilder.group({
			password: ['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
			confirmPassword: ['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
		});
	}

    ngOnInit() {
	}
    //获取验证码
    getVerifyCode(phone){
	  this.submitstate=true;
	  this.account=phone;
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
			this.message['error'](res.errorMsg)
            this.submitstate=false;
          }
        });
    }
      //进入重置密码页
	nextstep(val){
      this.loginservice.confirmCode(val)
        .subscribe(res => {
          if(res.success=='true'){
            this.step=2;
          }else{
			this.message['error'](res.errorMsg)
			this.account='';
          }
        })
	  }
	resetPassword(val){
        this.loginservice.resetPassword(this.account,val)
		.subscribe(res => {
			if(res.success=='true'){
				this.message['success']('密码重置成功')
				this.step=3;
			}else{
				this.message['error'](res.errorMsg)
			}
		})
    }
}

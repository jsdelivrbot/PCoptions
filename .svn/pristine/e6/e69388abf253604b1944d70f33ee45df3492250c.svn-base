import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation} from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import {GlobalData} from "../../../../providers/GlobalData";
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../myService";
import { ElMessageService } from 'element-angular';
@Component({
  selector: 'app-loginPassword',
  templateUrl: './loginPassword.component.html',
  styleUrls: ['./loginPassword.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPasswordComponent implements OnInit {
  public id:number;
  public passwordForm: any;
  	constructor(
      // private route:ActivatedRoute,
      private globalData:GlobalData,
      private formBuilder: FormBuilder,
	    private changeDetectorRef:ChangeDetectorRef,
	    public myService:myService,
      public message: ElMessageService,
    ) { 
      this.passwordForm = this.formBuilder.group({
        oldpassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],// 第一个参数是默认值, Validators.minLength(4)
        newpassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
        confirmpassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
        });
    }
  	ngOnInit() {
      // this.route.params.subscribe((params) => {
      //     this.id = params.id;
      // });
	}
	//修改登录密码
	conformit(val){
		this.myService.modifyLoginPassword(this.globalData.userId,val)
		.subscribe(res => {
			if(res.success=="true"){
				this.message['success']('修改成功');
			}else{
				this.message['error'](res.errorMsg);
			}
		})
	}
}

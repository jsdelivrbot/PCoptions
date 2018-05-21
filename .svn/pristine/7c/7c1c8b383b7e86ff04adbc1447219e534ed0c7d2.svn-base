import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation} from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import {GlobalData} from "../../../../providers/GlobalData";
import { ElMessageService } from 'element-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../myService";
@Component({
  selector: 'app-identify',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IdentifyComponent implements OnInit {
  public id:number;
  public verifyForm:any;
  	constructor(
      // private route:ActivatedRoute,
      public globalData:GlobalData,
      private changeDetectorRef:ChangeDetectorRef,
      private formBuilder: FormBuilder,
      public myService:myService,
      public message: ElMessageService,
    ) { 
      this.verifyForm = this.formBuilder.group({
        name: ['', [Validators.required,Validators.pattern("^[\u4e00-\u9fa5]{2,4}$")]],// 第一个参数是默认值, Validators.minLength(4)
        verify: ['', [Validators.required,Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]],
      });
    }
  	ngOnInit() {
      // this.route.params.subscribe((params) => {
      //     this.id = params.id;
    // });
	}
	//实名认证
	nameVerify(val){
		this.myService.nameVerify(this.globalData.userId,val)
			.subscribe(res => {
				if(res.success=="true"){
					if(res.data){
						this.globalData.authState=true;
						this.message['success']('认证成功');
					}else{
						this.message['error']('认证失败');
					}
					
				}else{
					this.message['error'](res.errorMsg);
				}
			})
	}
}

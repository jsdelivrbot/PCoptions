import { Component, OnInit,TemplateRef} from '@angular/core';
import { myService } from "../user/my/myService";
import { ElMessageService } from 'element-angular';
import {GlobalData} from "../../providers/GlobalData";
declare let jQuery:any;

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {
    public androidUrl:string;
    public iosUrl:string;
  	constructor(
	  private myService:myService,
	  private globalData:GlobalData,
	  public message: ElMessageService,
    ) { 
    }
  	ngOnInit() {
      this.myService.getPackage()
      .subscribe(res => {
        if(res.success=='true'){
			this.androidUrl=res.data.androidUrl;
			this.iosUrl=res.data.iosUrl;
			jQuery('#qrcode1').qrcode({
				render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
             	text : this.androidUrl,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
                 width : "160",            // //二维码的宽度
				 height : "160",              //二维码的高度
				 imgWidth:'30',
				 imgHeight:'30',
                 background : "#ffffff",       //二维码的后景色
                 foreground : "#000000",        //二维码的前景色
                 src: this.globalData.config.logo           //二维码中间的图片
			});
			jQuery('#qrcode2').qrcode({
				render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
             	text : this.iosUrl,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
                 width : "160",            // //二维码的宽度
				 height : "160",              //二维码的高度
				 imgWidth:'30',
				 imgHeight:'30',
                 background : "#ffffff",       //二维码的后景色
                 foreground : "#000000",        //二维码的前景色
                 src: this.globalData.config.logo           //二维码中间的图片
			});
			// jQuery('#qrcode2').qrcode(this.iosUrl);
        }else{
          this.message['error'](res.errorMsg);
        }
      });
    }
}

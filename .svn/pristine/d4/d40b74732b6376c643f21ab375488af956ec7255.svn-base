import { Component, OnInit,TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { myService } from "../user/my/myService";
import { ElMessageService } from 'element-angular';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
	public helpData:any=[];
    constructor( 
		private router: Router,
		private myService:myService,
		public message: ElMessageService,
    ) { 
    }
  	ngOnInit() {
		this.myService.getHelps()
		.subscribe(res => {
			if(res.success=='true'){
				this.helpData=res.data;
			}else{
				this.message['error'](res.errorMsg);
			}
		});
    }
    goDetail(val){
		this.router.navigate(['helpDetail/'+val]);
    }
}

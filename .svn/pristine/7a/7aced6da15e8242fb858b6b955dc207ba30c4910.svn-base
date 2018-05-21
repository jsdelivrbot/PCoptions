import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import {GlobalData} from "../../../../providers/GlobalData";
import {myService} from '../myService';
import { ElMessageService } from 'element-angular';
@Component({
  selector: 'app-rechargeRecord',
  templateUrl: './rechargeRecord.component.html',
	styleUrls: ['./rechargeRecord.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class RechargeRecordComponent implements OnInit {
	public id:number;
	public rechargeData:any[];
  	constructor(
      	private globalData:GlobalData,
      	private myService:myService,
		private message:ElMessageService,
    ) { 
		

    }
  	ngOnInit() {
		this.myService.getAllDetail(1,10000,1)
		.subscribe(res => {
			console.log(res)
			if(res.success=="true"){
				if(res.data.data.length==0)return;
				this.rechargeData=res.data.data;
			}else{
                this.message['error'](res.errorMsg)
            }
		})		
    }
}

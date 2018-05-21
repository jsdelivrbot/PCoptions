import { Component, OnInit} from '@angular/core';
import {GlobalData} from "../../../../providers/GlobalData";
import {myService} from '../myService';
import { ElMessageService } from 'element-angular';
@Component({
  selector: 'app-withDrawRecord',
  templateUrl: './withDrawRecord.component.html',
  styleUrls: ['./withDrawRecord.component.scss'],
})
export class WithDrawRecordComponent implements OnInit {
	public id:number;
	public drawData:any[];
  	constructor(
      	private globalData:GlobalData,
      	private myService:myService,
		private message:ElMessageService,
    ) { 
		

    }
  	ngOnInit() {
		this.myService.getAllDetail(1,10000,2)
		.subscribe(res => {
			console.log(res)
			if(res.success=="true"){
				if(res.data.data.length==0)return;
				this.drawData=res.data.data;
			}else{
                this.message['error'](res.errorMsg)
            }
		})		
    }
}

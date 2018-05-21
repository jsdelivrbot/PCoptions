import { Component, OnInit,TemplateRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myService } from "../../user/my/myService";
import { ElMessageService } from 'element-angular';
declare let jQuery:any;
@Component({
  selector: 'app-helpDetail',
  templateUrl: './helpDetail.component.html',
  styleUrls: ['./helpDetail.component.scss'],
})
export class HelpDetailComponent implements OnInit {
  	constructor(
		private route:ActivatedRoute,
		private myService:myService,
		public message: ElMessageService,
    ) { 
    }
  	ngOnInit() {
		scrollTo(0,0)
		this.route.params.subscribe((params) => {
			this.myService.getHelpsDetails(params.id)
			.subscribe(res => {
				if(res.success=='true'){
					jQuery('#hD_cont').html(res.data.html)
				}else{
					this.message['error'](res.errorMsg);
				}
			});
		});
    }
}

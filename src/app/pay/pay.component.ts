import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { ElMessageService } from 'element-angular';
import { Router } from '@angular/router';
import {TradeService} from '../trade/tradeService';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PayComponent implements OnInit {
	public tipNum:any=[];
	public subData:any=[];
	public inSearchState:boolean=false;
  	constructor(
      public message: ElMessageService,
      public router: Router,
	  public tradeService: TradeService,
	  private route: ActivatedRoute
    ) { 
		this.route.params.subscribe((params) => this.subData = JSON.parse(params.info));
    }
  	ngOnInit() {
		let _that=this;
		document.onkeydown=function(event){   
			var e = event || window.event || arguments.callee.caller.arguments[0];   
			if(e){
				switch(e.keyCode){
					case 48:
						_that.tipNum.push(0)
						break;
					case 49:
						_that.tipNum.push(1)
						break;
					case 50:
						_that.tipNum.push(2)
						break;
					case 51:
						_that.tipNum.push(3)
						break;
					case 52:
						_that.tipNum.push(4)
						break;
					case 53:
						_that.tipNum.push(5)
						break;
					case 54:
						_that.tipNum.push(6)
						break;
					case 55:
						_that.tipNum.push(7)
						break;
					case 56:
						_that.tipNum.push(8)
						break;
					case 57:
						_that.tipNum.push(9)
						break;
					case 96:
						_that.tipNum.push(0)
						break;
					case 97:
						_that.tipNum.push(1)
						break;
					case 98:
						_that.tipNum.push(2)
						break;
					case 99:
						_that.tipNum.push(3)
						break;
					case 100:
						_that.tipNum.push(4)
						break;
					case 101:
						_that.tipNum.push(5)
						break;
					case 102:
						_that.tipNum.push(6)
						break;
					case 103:
						_that.tipNum.push(7)
						break;
					case 104:
						_that.tipNum.push(8)
						break;
					case 105:
						_that.tipNum.push(9)
						break;
					case 8:
						_that.tipNum.pop()
						break;
					case 13:
						_that.pay();
						break;
					
				}
			}

		};    
	}
	pay(){
		let temp:string=null;
		this.tipNum.forEach((value,index,arr) => {
			if(temp==null)
				temp=String(value);
			else
				temp+=String(value);
		});
		this.subData.mentionPassword=temp;
		this.inSearchState=true;
		this.tradeService.subscription(this.subData)
          .subscribe(res => {
				this.inSearchState=false;
              	if(res.success=='true'){
					this.message['success']('申购成功');
					this.router.navigate(['trade',2]);
              	}else{
					this.tipNum=[];
					this.message['error'](res.errorMsg)
              	}
          });
	}
}

import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
})
export class TradeComponent implements OnInit {
    public subTabState=1;
    constructor(
      private router: Router,
      private route: ActivatedRoute
    ) { 
      this.route.params.subscribe((params) => this.subTabState = JSON.parse(params.id));
    }
  	ngOnInit() {
    }
    changeTab(val){
        if(this.subTabState==val)return;
        this.subTabState=val;
    }
}

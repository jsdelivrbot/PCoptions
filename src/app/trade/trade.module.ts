import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TradeComponent }   from './trade.component';
import { PurchaseComponent }   from './purchase/purchase.component';
import { ListComponent }   from './list/list.component';
import { TradeService } from './tradeService';
import {tradeRoutes} from './trade.routes';
import { ElModule } from 'element-angular';
import { FormsModule } from "@angular/forms";
import { LoginService } from '../user/login/LoginService';
@NgModule({
    imports: [
        RouterModule.forChild(tradeRoutes),
        ElModule.forRoot(),
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        TradeComponent,
        PurchaseComponent,
        ListComponent,
    ],
    providers: [TradeService,LoginService],
})
export class TradeModule { }

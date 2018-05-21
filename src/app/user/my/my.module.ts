import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyComponent }   from './my.component';
import { CommonModule } from '@angular/common';
import {myRoutes} from './my.routes';
import {InfoComponent} from './info/info.component';
import {RechargeRecordComponent} from './rechargeRecord/rechargeRecord.component';
import {RechargeComponent} from './recharge/recharge.component';
import {IdentifyComponent} from './identify/identify.component';
import {LoginPasswordComponent} from './loginPassword/loginPassword.component';
import {BankCardComponent} from './bankCard/bankCard.component';
import {WithDrawComponent} from './withDraw/withDraw.component';
import {WithDrawRecordComponent} from './withDrawRecord/withDrawRecord.component';
import {PayPasswordComponent} from './payPassword/payPassword.component';
import { myService } from "./myService";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElModule } from 'element-angular';
import { LoginService } from '../login/LoginService';
import { phoneHide } from '../../../pipes/phoneHide';
import { cardHide } from '../../../pipes/cardHide';
@NgModule({
    imports: [
        RouterModule.forChild(myRoutes),
        FormsModule,
        ReactiveFormsModule,
        ElModule.forRoot(),
        CommonModule
    ],
    exports: [],
    declarations: [
        MyComponent,
        InfoComponent,
        RechargeRecordComponent,
        RechargeComponent,
        IdentifyComponent,
        LoginPasswordComponent,
        BankCardComponent,
        PayPasswordComponent,
        WithDrawComponent,
        WithDrawRecordComponent,
        phoneHide,
        cardHide
    ],
    providers: [myService,LoginService],
})
export class MyModule { }
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResetComponent }   from './reset.component';
import { CommonModule } from '@angular/common';
import {resetRoutes} from './reset.routes';
import { LoginService } from '../login/LoginService';
import { ElModule } from 'element-angular';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@NgModule({
    imports: [
        RouterModule.forChild(resetRoutes),
        ElModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [],
    declarations: [
        ResetComponent,
    ],
    providers: [LoginService],
})
export class ResetModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent }   from './login.component';
import {loginoutes} from './login.routes'
import { LoginService } from './LoginService';
import { ElModule } from 'element-angular';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(loginoutes),
        FormsModule,
        ElModule.forRoot(),
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        LoginComponent,
    ],
    providers: [LoginService],
})
export class LoginModule { }

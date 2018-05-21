import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent }   from './home.component';
import { HomeService } from './homeService';
import {homeRoutes} from './home.routes';
import { ElModule } from 'element-angular';
@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes),
        ElModule.forRoot(),
        CommonModule
    ],
    exports: [],
    declarations: [
        HomeComponent,
    ],
    providers: [HomeService],
})
export class HomeModule { }

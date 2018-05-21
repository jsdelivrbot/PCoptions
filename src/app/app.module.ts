import { BrowserModule } from '@angular/platform-browser';
import {HashLocationStrategy , LocationStrategy} from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {appRoutes} from './app.routes';
import {HttpModule} from "@angular/http";
import {GlobalData} from "../providers/GlobalData";
import {HttpService} from "../providers/HttpService";
import { CommonModule } from '@angular/common';
import { ElModule } from 'element-angular';
import { NoviceComponent } from './novice/novice.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { HelpDetailComponent } from './help/helpDetail/helpDetail.component';
import { DownloadComponent } from './download/download.component';
import { PayComponent } from './pay/pay.component';
import { myService } from "./user/my/myService";
import {TradeService} from './trade/tradeService';
@NgModule({
  declarations: [
    AppComponent,
    NoviceComponent,
    AboutComponent,
    HelpComponent,
    PayComponent,
    HelpDetailComponent,
    DownloadComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      HttpModule,
      CommonModule,      
      ElModule.forRoot(),
  ],
  providers: [GlobalData,HttpService,TradeService,myService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

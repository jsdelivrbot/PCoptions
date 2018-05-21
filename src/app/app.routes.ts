import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NoviceComponent } from './novice/novice.component';
import { AboutComponent } from './about/about.component';
import { DownloadComponent } from './download/download.component';
import { PayComponent } from './pay/pay.component';
import { HelpComponent } from './help/help.component';
import { HelpDetailComponent } from './help/helpDetail/helpDetail.component';
export const appRoutes=[
	{
		path:'',
		redirectTo:'home',
		pathMatch:'full'
	},
	// {
	// 	path:"",
	// 	component:AppComponent
	// },
	// {
	{
		path:'home',
		loadChildren:'./home/home.module#HomeModule'
	},
	{
		path:'login',
		loadChildren:'./user/login/login.module#LoginModule'
	},
	{
		path:'my',
		loadChildren:'./user/my/my.module#MyModule'
	},
	{
		path:'trade/:id',
		loadChildren:'./trade/trade.module#TradeModule'
	},
	{
		path:'reset',
		loadChildren:'./user/reset/reset.module#ResetModule'
	},
	{
		path:'novice',
		component:NoviceComponent
	},
	{
		path:'about',
		component:AboutComponent
	},
	{
		path:'download',
		component:DownloadComponent
	},
	{
		path:'help',
		component:HelpComponent
	},
	{
		path:'helpDetail/:id',
		component:HelpDetailComponent
	},
	{
		path:'pay/:info',
		component:PayComponent
	},
];

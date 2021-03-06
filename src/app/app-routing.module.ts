import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { RiskcentralComponent } from './components/riskcentral/riskcentral.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
	{
		path:'',
		component: DashboardComponent
	},
	{
		path:'main',
		component: MainComponent
	},
	{
		path:'risk',
		component: RiskcentralComponent
	},
	{
		path:'dashboard',
		component: DashboardComponent
	},
	{
		path:'eu',
		component: DashboardComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

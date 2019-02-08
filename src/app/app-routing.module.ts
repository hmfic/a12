import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
//import { Force10Component } from './components/force10/force10.component';
import { RiskcentralComponent } from './components/riskcentral/riskcentral.component';

const routes: Routes = [
	{
		path:'',
		component: MainComponent
	},
	{
		path:'main',
		component: MainComponent
	},
	{
		path:'risk',
		component: RiskcentralComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

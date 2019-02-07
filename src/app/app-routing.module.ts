import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { Force10Component } from './components/force10/force10.component';

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
		path:'force10',
		component: Force10Component
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
	{
		path:'',
		component: AboutComponent
	},
	{
		path:'about',
		component: AboutComponent
	},
	{
		path:'settings',
		component: SettingsComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

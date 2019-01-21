import { Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { Router, Route, Routes, NavigationEnd } from '@angular/router';
import { SidebarService } from "../sidebar/sidebar.service";
import { MatSidenav } from '@angular/material';
import { Globals } from '../globals';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	@ViewChild('sidebar') public sidebar: MatSidenav;
  		constructor( 
  			private sidebarService: SidebarService,
    		private globals: Globals
    	) { }

  	getBackground (theme){
	    //console.log("in getbackground; theme=",theme);
	    if (theme == "dark-theme") return "sidenav-links-light"
	      else return "sidenav-links-dark"
	  }

  ngOnInit() {
  	this.sidebarService.setSidebar(this.sidebar);
  }

}

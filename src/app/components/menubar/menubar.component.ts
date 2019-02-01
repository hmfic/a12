import { Component, OnInit, Inject } from '@angular/core';
// import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Globals } from '../globals';
import { SidebarService } from '../sidebar/sidebar.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { SettingsmodalComponent } from "../settingsmodal/settingsmodal.component";
import { HelpmodalComponent } from "../helpmodal/helpmodal.component";
import { AboutmodalComponent } from "../aboutmodal/aboutmodal.component"
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

   constructor(
   		private globals: Globals,
   		private sidebar: SidebarService,
   		private dialog: MatDialog
   		) { };

  toggleActive:boolean = false;

  public toggleSidebar() {
    this.toggleActive = !this.toggleActive;
    this.sidebar.toggle();
    //console.log('in togglesidebar=',this.toggleActive);
    }

    openDialog():void {
        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
              id: 1,
              title: 'SETTINGS'
          };
        // dialogConfig.direction = "rtl";
        this.dialog.open(SettingsmodalComponent, dialogConfig);
    } 

    openAboutDialog():void {
        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
              id: 1,
              title: 'ABOUT'
          };
        // dialogConfig.direction = "rtl";
        this.dialog.open(AboutmodalComponent, dialogConfig);
    } 


   openHelpDialog():void {
        //console.log("in openhelpmodal");
        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
              id: 1,
              title: 'HELP'
          };
        // dialogConfig.direction = "rtl";
        this.dialog.open(HelpmodalComponent, dialogConfig);
    } 
    getInitials(string){

      var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
      //return "SG";
    }

  ngOnInit() {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
// import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Globals } from '../globals';
import { SidebarService } from '../sidebar/sidebar.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { JmodalComponent } from "../jmodal/jmodal.component";
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
              title: 'Settings'
          };
        // dialogConfig.direction = "rtl";
        this.dialog.open(JmodalComponent, dialogConfig);
    } 

    openAboutDialog():void {
        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
              id: 1,
              title: 'About'
          };
        // dialogConfig.direction = "rtl";
        this.dialog.open(AboutmodalComponent, dialogConfig);
    } 

  openSysDialog():void {
        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
              id: 1,
              title: 'System settings'
          };
        // dialogConfig.direction = "rtl";
        this.dialog.open(JmodalComponent, dialogConfig);
    }
   openHelpDialog():void {
        //console.log("in openhelpmodal");
        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
              id: 1,
              title: 'Help'
          };
        // dialogConfig.direction = "rtl";
        this.dialog.open(HelpmodalComponent, dialogConfig);
    } 

  ngOnInit() {
  }

}

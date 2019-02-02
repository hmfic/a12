import { Component, OnInit, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { Globals } from '../globals';
import { SettingsmodalComponent } from "../settingsmodal/settingsmodal.component";
import { HelpmodalComponent } from "../helpmodal/helpmodal.component";
import { AboutmodalComponent } from "../aboutmodal/aboutmodal.component"

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../sidebar/sidebar.component.scss']
})
export class SidebarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  // @ViewChild('sidebar') public sidebar: MatSidenav;

  constructor(
      private breakpointObserver: BreakpointObserver,
      private globals: Globals,
      private dialog: MatDialog
      ) {}

  getInitials(string){

      var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
      if (names.length > 1) {
          initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      return initials;
        //return "SG";
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
}
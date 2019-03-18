import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { Globals } from '../globals';
import { SettingsmodalComponent } from "../settingsmodal/settingsmodal.component";
import { HelpmodalComponent } from "../helpmodal/helpmodal.component";
import { AboutmodalComponent } from "../aboutmodal/aboutmodal.component";
import { AlertsModalComponent } from "../alerts-modal/alerts-modal.component"

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../sidebar/sidebar.component.scss'],
  //encapsulation: ViewEncapsulation.Emulated
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
              title: 'MY SETTINGS'
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
              title: 'ABOUT THIS'
          };
        // dialogConfig.direction = "rtl";
        this.dialog.open(AboutmodalComponent, dialogConfig);
    } 

    openAlertsDialog():void {
        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        //dialogConfig.panelClass = "full-width";
        dialogConfig.width= '800px';
        dialogConfig.minWidth='80vw';
        dialogConfig.maxWidth="100vw !important"
       // dialogConfig.height="700px";
        dialogConfig.data = {
              id: 1,
              title: 'CONFIGURE ALERTS'
          };
        this.dialog.open(AlertsModalComponent,dialogConfig);
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
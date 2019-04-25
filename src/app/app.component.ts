import { Component, DoCheck, HostBinding, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MainComponent} from './components/main/main.component';
import { Globals } from './components/globals';
import { DashboardComponent } from './components/dashboard/dashboard.component'

import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { LocdataService } from './services/locdata.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
	constructor(
	    private globals: Globals,
      public overlayContainer: OverlayContainer,
      private domSanitizer: DomSanitizer,
      private data: LocdataService,
      private matIconRegistry: MatIconRegistry
      )
	      { 
          this.matIconRegistry.addSvgIcon(
            'us',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/us.svg")
            )}

@HostBinding('class') componentCssClass;
oldName:string;
oldTheme:string;

ngOnInit(): void {
  //this.globals:any=[];
  //console.log("in app.component.ts; this.globals=",this.globals);
   this.oldName = this.globals.name;
   this.oldTheme = this.globals.theme;

   this.data.getLoc().subscribe (data => {
        //console.log("myinfo set; data=",data);
        this.globals.myinfo=data;
      })
    this.globals.vIcon=[];
    this.globals.vIcon["transport"]={'icon':'swap_horiz','tip':'Abnormal transport or port'};
    this.globals.vIcon["content"]={'icon':'description','tip':'Content violation'};
    this.globals.vIcon["integrity"]={'icon':'broken_image','tip':'Compromised or broken file'};
    this.globals.vIcon["time"]={'icon':'access_time','tip':'Time of day violation'};
    this.globals.vIcon["encryption"]={'icon':'lock','tip':'Unencrypted file violation'};
    this.globals.vIcon["size"]={'icon':'photo_size_select_small','tip':'Unusual file size'};
    this.globals.vIcon["filetype"]={'icon':'insert_drive_file','tip':'File type violation'};
    this.globals.vIcon["zone"]={'icon':'vertical_align_center','tip':'Cross-zone movement violation'};
  } 

ngDoCheck() {
      if (this.oldTheme != this.globals.theme) {
        console.log("in ngdocheck; global new theme=",this.globals.theme);
        const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
        const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
        if (this.globals.theme ==  themeClassesToRemove[0]) {
          //console.log("no change!");
        } else {
          //console.log("to remove=",themeClassesToRemove);
          for (var i=0; i<themeClassesToRemove.length; i++) {
            //console.log("looping; themeClassesToRemove[i]=",themeClassesToRemove[i]);
             overlayContainerClasses.remove(themeClassesToRemove[i]);
          }
          //console.log("after removal=", Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'))) ;
        }
        // adding classes back now
        overlayContainerClasses.add(this.globals.theme);
        this.componentCssClass = this.globals.theme;
        this.oldTheme = this.globals.theme;
        // update theme cookie if needed
        //if (this.cookieService.get('theme') != this.globals.theme) 
        //  this.cookieService.set( 'theme', this.globals.theme, this.expiredDate );
       } // end if

     if (typeof this.globals.users != "undefined") {
       if (this.globals.users.length > 0) {
          console.log("users defined;len=",this.globals.users.length);
         // console.log("this.globals.users[0].name=",this.globals.users[0].name);
         }
       }
     } // end ngdocheck
}  // end docheck
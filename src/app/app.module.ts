import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarComponent } from './components/menubar/menubar.component';

// new stuff
import { MatButtonModule, MatCardModule, MatSidenavModule, MatGridListModule, MatCheckboxModule, 
         MatToolbarModule, MatListModule, MatMenuModule, MatDialogModule, MatFormFieldModule, 
         MatSelectModule, MatInputModule } from '@angular/material';
import { Globals } from './components/globals';
import { SidebarService } from './components/sidebar/sidebar.service';
import { JmodalComponent } from './components/jmodal/jmodal.component';
import { HelpmodalComponent } from './components/helpmodal/helpmodal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { AboutmodalComponent } from './components/aboutmodal/aboutmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SidebarComponent,
    MenubarComponent,
    JmodalComponent,
    HelpmodalComponent,
    MainComponent,
    AboutmodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    Globals,
    SidebarService
    ],
  //providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ JmodalComponent, HelpmodalComponent, AboutmodalComponent]
})
export class AppModule { }

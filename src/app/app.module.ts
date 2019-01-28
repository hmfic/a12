import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarComponent } from './components/menubar/menubar.component';
// new stuff
import { MatButtonModule, MatCardModule, MatSidenavModule, MatGridListModule, MatCheckboxModule, 
         MatToolbarModule, MatListModule, MatMenuModule, MatDialogModule, MatFormFieldModule, 
         MatSelectModule, MatInputModule } from '@angular/material';
import { Globals } from './components/globals';
import { SidebarService } from './components/sidebar/sidebar.service';
import { SettingsmodalComponent } from './components/settingsmodal/settingsmodal.component';
import { HelpmodalComponent } from './components/helpmodal/helpmodal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { AboutmodalComponent } from './components/aboutmodal/aboutmodal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MenubarComponent,
    SettingsmodalComponent,
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
    ReactiveFormsModule,
    DragDropModule,
    FlexLayoutModule,
    MatIconModule
  ],
  providers: [
    Globals,
    SidebarService
    ],
  //providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ SettingsmodalComponent, HelpmodalComponent, AboutmodalComponent]
})


export class AppModule { }

/*
@Component({
  selector: 'app-card',
  template: `<div>Card: {{name}}</div>`,
  styles: [`
  :host {
    display: block;
    padding: 32px;
    border: 1px solid black;
    border-radius: 8px;
  }
  `]
})
export class CardComponent {}
*/

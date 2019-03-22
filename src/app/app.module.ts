import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// new stuff
import { MatButtonModule, MatCardModule, MatSidenavModule, MatGridListModule, MatCheckboxModule, 
         MatToolbarModule, MatListModule, MatMenuModule, MatDialogModule, MatFormFieldModule, 
         MatSelectModule, MatInputModule, MatSnackBar, MatTableModule } from '@angular/material';
import { Globals } from './components/globals';
import { SettingsmodalComponent } from './components/settingsmodal/settingsmodal.component';
import { HelpmodalComponent } from './components/helpmodal/helpmodal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { AboutmodalComponent } from './components/aboutmodal/aboutmodal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { Force10Component } from './components/force10/force10.component';
import { Tree10Component } from './components/tree10/tree10.component';
import { RiskcentralComponent } from './components/riskcentral/riskcentral.component';
import { HttpClientModule} from "@angular/common/http";
import { NgxGaugeModule } from 'ngx-gauge';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CategoryHistoComponent } from './components/category-histo/category-histo.component';
import { AlertsModalComponent } from './components/alerts-modal/alerts-modal.component';
import { AlertConfigModalComponent } from './components/alert-config-modal/alert-config-modal.component';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { SankeyComponent } from './components/sankey/sankey.component';

@NgModule({
  declarations: [
    AboutmodalComponent,
    AppComponent,
    Force10Component,
    HelpmodalComponent,
    MainComponent,
    RiskcentralComponent,
    SettingsmodalComponent,
    SidebarComponent,
    Tree10Component,
    DashboardComponent,
    TimelineComponent,
    CategoryHistoComponent,
    AlertsModalComponent,
    AlertConfigModalComponent,
    MapComponent,
    SankeyComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule, 
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NgxGaugeModule,
    MatTableModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBmmelmeHOr3KQovKCisOQfstNRR-TuVEs'
    })
  ],
  providers: [
    Globals
    ],
  //providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ SettingsmodalComponent, HelpmodalComponent, AboutmodalComponent, AlertsModalComponent, AlertConfigModalComponent]
})


export class AppModule { }


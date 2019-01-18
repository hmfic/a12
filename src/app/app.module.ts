import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarComponent } from './components/menubar/menubar.component';

// new stuff
import { MatButtonModule, MatCardModule, MatSidenavModule, MatGridListModule, MatCheckboxModule, 
         MatToolbarModule, MatListModule, MatMenuModule, MatDialogModule, MatFormFieldModule, 
         MatSelectModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SettingsComponent,
    SidebarComponent,
    MenubarComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


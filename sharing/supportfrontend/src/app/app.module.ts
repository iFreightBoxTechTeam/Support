import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IssueComponent } from './component/issue/issue.component';
import { MasterComponent } from './component/master/master.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuseComponent } from './issuse/issuse.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GearComponent } from './gear/gear.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    PaginationComponent,
    DashboardComponent,
    IssuseComponent,
    NavbarComponent,
    GearComponent,
    IssueComponent  // ✅ Make sure this is declared here
  ],
  imports: [
    BrowserModule,
    FormsModule,     // ✅ Required for ngModel
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

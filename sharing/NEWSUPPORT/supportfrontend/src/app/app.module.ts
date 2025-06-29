import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IssueComponent } from './component/issue/issue.component';
import { MasterComponent } from './component/master/master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuseComponent } from './issuse/issuse.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GearComponent } from './gear/gear.component';
import { ViewComponent } from './component/view/view.component';
// Adjust path as needed

import { MasterCompoComponent } from './component/master-compo/master-compo.component';
import { UserComponent } from './component/users/users.component';
import { IssueTypeComponent } from './component/issue-type/issue-type.component';
import { StatusComponent } from './component/status/status.component';
import { NavMainComponent } from './nav-main/nav-main.component';
import { AddUserComponent } from './component/users/add-user/add-user.component';
import { AddStatusComponent } from './component/status/add-status/add-status.component';
import { AddIssueComponent } from './component/issue-type/add-issue/add-issue.component';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DeleteComponent } from './component/users/delete/delete.component';
import { DeleteIssueTypeComponent } from './component/issue-type/delete/delete-issue-type/delete-issue-type.component';
import { DeleteStatusComponent } from './component/status/delete-status/delete-status/delete-status.component';
import { SharedModule } from './shared/shared.module';
import { DaytimePipe } from './daytime.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    DashboardComponent,
    IssuseComponent,
    NavbarComponent,
    GearComponent,
    IssueComponent,
    ViewComponent,
   
    MasterCompoComponent,
    UserComponent,
    IssueTypeComponent,
    StatusComponent,
    NavMainComponent,
    AddUserComponent,
    AddStatusComponent,
    AddIssueComponent,
    PagenotfoundComponent,
    DeleteComponent,
    DeleteIssueTypeComponent,
    DeleteStatusComponent,
    DaytimePipe
    
      
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    AppRoutingModule,
    HttpClientModule,
    SharedModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatableService } from './services/matable.service';
import { AppComponent } from './app.component';

import { MatableListComponent } from './components/matable-list/matable-list.component';
import { MatableFormComponent } from './components/matable-form/matable-form.component';
import { StatusLogsComponent } from './components/status-logs/status-logs.component';
import { ExportComponent } from './export/export.component';
import { SearchComponent } from './search/search.component';
import { FileipComponent } from './components/fileip/fileip.component';
import { NextComponent } from './next/next.component';
import { PreviousComponent } from './previous/previous.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from "./pages/login/login.component";
import { AppRoutingModule } from './app-routing.module';
import { MultiImgIpComponent } from './components/multi-img-ip/multi-img-ip.component';
import { DurationFormatPipe } from './duration-format.pipe';
import { AssignDevComponent } from './assign-dev/assign-dev.component';
import { IssueTypeComponent } from './issue-type/issue-type.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';


const appRoute: Routes =[
  {path: 'Previous', component: PreviousComponent},

  {path:'Next', component:NextComponent}
 


  
  

]


@NgModule({
  declarations: [
    AppComponent,
    MatableListComponent,
    MatableFormComponent,
    StatusLogsComponent,
    ExportComponent,
    SearchComponent,
    FileipComponent,
    NextComponent,
    PreviousComponent,

    PreviousComponent,
    NextComponent,
    HeaderComponent,

    HomeComponent,
    AboutComponent,
    ContactComponent,
    DurationFormatPipe,
    AssignDevComponent,
    IssueTypeComponent,
    DashboardComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginComponent,
    MultiImgIpComponent
],
   providers: [MatableService], 
  bootstrap: [AppComponent]
})
export class AppModule {}

// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatableService } from './services/matable.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatableListComponent } from './components/matable-list/matable-list.component';
import { MatableFormComponent } from './components/matable-form/matable-form.component';
import { StatusLogsComponent } from './components/status-logs/status-logs.component';
import { ExportComponent } from './export/export.component';
import { SearchComponent } from './search/search.component';
import { FileipComponent } from './components/fileip/fileip.component';
<<<<<<< Updated upstream
import { NextComponent } from './next/next.component';
import { PreviousComponent } from './previous/previous.component';
=======
import { PreviousComponent } from './previous/previous.component';
import { NextComponent } from './next/next.component';
>>>>>>> Stashed changes



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
<<<<<<< Updated upstream
    NextComponent,
    PreviousComponent,
=======
    PreviousComponent,
    NextComponent,
>>>>>>> Stashed changes
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute)
  ],
   providers: [MatableService], 
  bootstrap: [AppComponent]
})
export class AppModule {}

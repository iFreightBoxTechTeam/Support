

// src/app/app-routing.module.ts
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatableListComponent } from './components/matable-list/matable-list.component';
import { MatableFormComponent } from './components/matable-form/matable-form.component';
import { StatusLogsComponent } from './components/status-logs/status-logs.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
// import { ServiceComponent} from './services/service.component'

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: MatableListComponent },
  { path: 'add', component: MatableFormComponent },
  { path: 'logs', component: StatusLogsComponent },
  { path: 'edit/:id', component: MatableFormComponent },
  // {path: 'Previous', component: PreviousComponent},
  // {path:'Next', component:NextComponent},

  {path:'Home', component:HomeComponent},
  {path:'about', component: AboutComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

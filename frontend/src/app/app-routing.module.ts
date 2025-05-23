// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatableListComponent } from './components/matable-list/matable-list.component';
import { MatableFormComponent } from './components/matable-form/matable-form.component';
import { StatusLogsComponent } from './components/status-logs/status-logs.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: MatableListComponent },
  { path: 'add', component: MatableFormComponent },
  { path: 'logs', component: StatusLogsComponent },
  { path: 'edit/:id', component: MatableFormComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

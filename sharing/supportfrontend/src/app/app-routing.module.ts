import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuseComponent } from './issuse/issuse.component';
import { GearComponent } from './gear/gear.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'issues', component: IssuseComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:'gear', component:GearComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

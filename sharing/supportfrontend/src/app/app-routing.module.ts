import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuseComponent } from './issuse/issuse.component';
import { GearComponent } from './gear/gear.component';
import { IssueComponent } from './component/issue/issue.component';
import { MasterComponent } from './component/master/master.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'issues', component: IssuseComponent },
  {
    path:'issue',
    component: IssueComponent
  },
  {
    path:'master',
    component: MasterComponent
  },

  {path:'gear', component:GearComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

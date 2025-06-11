import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuseComponent } from './issuse/issuse.component';
import { GearComponent } from './gear/gear.component';
import { IssueComponent } from './component/issue/issue.component';
import { MasterComponent } from './component/master/master.component';
import { ViewComponent } from './component/view/view.component';
import { MasterCompoComponent } from './component/master-compo/master-compo.component';
import { UsersComponent } from './component/users/users.component';
import { StatusComponent } from './component/status/status.component';
import { IssueTypeComponent } from './component/issue-type/issue-type.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

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
  {
    path:'view',
    component:ViewComponent
  },
  // {
  //   path:'view-table',
  //   component:ViewComponent
  // },

  {path:'gear', component:GearComponent},
  {path:'mastercompo', component: MasterCompoComponent},
  {path:'users', component: UsersComponent},
  {path:'status', component: StatusComponent},
  {path:'issue-type', component: IssueTypeComponent},
  {path:'**',component:PagenotfoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

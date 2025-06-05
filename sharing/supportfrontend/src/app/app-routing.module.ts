import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuseComponent } from './issuse/issuse.component';
import { GearComponent } from './gear/gear.component';
import { IssueComponent } from './component/issue/issue.component';
import { MasterComponent } from './component/master/master.component';
import { MasterCompoComponent } from './component/master-compo/master-compo.component';
import { UsersComponent } from './component/users/users.component';
import { IssueTypeComponent } from './component/issue-type/issue-type.component';
import { StatusComponent } from './component/status/status.component';

const routes: Routes = [
    { path: '', component:DashboardComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'issues', component: IssuseComponent },
  { path:'issue',component: IssueComponent},
  {path:'master',component: MasterComponent},
  {path:'gear', component:GearComponent},
  {path:'mastercompo', component: MasterCompoComponent},
  {path:'users', component: UsersComponent},
  {path:'status', component: StatusComponent},
  {path:'issue-type', component: IssueTypeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

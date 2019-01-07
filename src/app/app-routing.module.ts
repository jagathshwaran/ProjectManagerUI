import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { UserPageComponent } from './user-page/user-page.component';
import {ProjectComponent} from './project/project.component';

const routes: Routes = [
  {path :'ViewTask', component:ViewTaskComponent},
  {path :'AddEdit', component:AddEditTaskComponent},
  {path :'AddEdit/:TaskId', component:AddEditTaskComponent},
  {path :'UserPage', component:UserPageComponent},
  {path :'Home', component:ProjectComponent},
  {path :'', component:ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './Services/TaskService';
import {UserService} from './Services/UserService';
import {ProjectService} from './Services/ProjectService';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { HeaderComponent } from './header/header.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEditTaskComponent,
    HeaderComponent,
    ViewTaskComponent,
    UserPageComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,FormsModule
  ],
  providers: [ConfigService,UserService,ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }

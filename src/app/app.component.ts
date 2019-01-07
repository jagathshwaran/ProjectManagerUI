import { Component, OnInit } from '@angular/core';
import { ITask } from '../app/Interface/Task'
import { ConfigService } from '../app/Services/TaskService'
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'TaskUI';
  tasks : ITask[];

  constructor(private taskServices:ConfigService)
  {

  }

  ngOnInit()
  {
  console.log("Running onint");
    this.GetAllTasks();
  }

  private GetAllTasks()
  {
    this.taskServices.GetAllTasks().subscribe(
      result=>{this.tasks= result,console.log(result)},
      (err)=>{console.log(err)}
    );
  }

}






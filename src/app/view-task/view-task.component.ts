import { Component, OnInit } from '@angular/core';
import { ITask } from '../Interface/Task'
import { ConfigService } from '../Services/TaskService'
import { Router } from '@angular/router';
import { FormControl,FormGroup,ReactiveFormsModule  } from '@angular/forms';
import { SearchRequest} from '../Interface/SearchRequest'
import { Console } from '@angular/core/src/console';
import {Response} from '../Interface/Response';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks : ITask[];
  response : Response;

  TaskForm = new FormGroup({
    TaskName : new FormControl(''),
    ParentTaskName : new FormControl(''),
    PriorityFrom : new FormControl(''),
    PriorityTo : new FormControl(''),
    StartDate : new FormControl(''),
    EndDate : new FormControl('')
   })

   searchRequestDetails : SearchRequest;
   message : string;


  constructor(private taskServices:ConfigService,private router: Router) { }

  ngOnInit()
  {
  console.log("Running onint");
    this.GetAllTasks();
  }

  clear()
  {
    this.response = null;
  }

  private GetAllTasks()
  {
    this.clear();
    this.taskServices.GetAllTasks().subscribe(
      result=>{this.tasks = result,console.log(result)},
      (err)=>{console.log(err)}
    );
  }

  Edit(taskId : string)
  {
    console.log("Editing Task "+ taskId)
    //this.router.navigate(['/AddEdit/'+taskId]);
    this.router.navigate(['/AddEdit'], { queryParams: { TaskId: taskId } });
  }

  EndTask(taskId : string)
  {
      this.clear();
      this.taskServices.EndTask(taskId).subscribe(
        result=>{this.response = result},
        err=>{console.log("Error while ending task :" + err)},
        ()=>{this.message=this.response.Message;
          interval(2000).pipe(
            map((x) => { this.clear() })
          );
        }
      )

  }


  Search()
  {
    this.clear();
    this.searchRequestDetails = new SearchRequest
    (
      this.TaskForm.value.TaskName,
      this.TaskForm.value.ParentTaskName,
      this.TaskForm.value.StartDate,
      this.TaskForm.value.EndDate,
      this.TaskForm.value.PriorityFrom,
      this.TaskForm.value.PriorityTo
    )

    console.log(this.searchRequestDetails);

    this.taskServices.SearchTask(this.searchRequestDetails).subscribe(
    result=>{this.tasks = result; console.log(result)},
    (err)=>console.log(err)
    );

  }

}

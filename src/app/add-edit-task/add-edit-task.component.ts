import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,ReactiveFormsModule  } from '@angular/forms';
import { TaskDetails } from '../Interface/TaskDetails';
import { ConfigService } from '../Services/TaskService';
import { Console } from '@angular/core/src/console';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../Interface/Task'
import { Validators } from '@angular/forms';
import {Response} from '../Interface/Response';
import { TaskAddDetails} from '../Interface/TaskAddDetails';
import {Project} from '../Interface/Project';
import {ProjectService} from '../Services/ProjectService';
import {SearchRequest} from '../Interface/SearchRequest';
import { UserService } from '../Services/UserService';
import { Users } from 'src/app/Interface/Users';
import { ParentTask } from 'src/app/Interface/ParentTask';
import { DatePipe } from '@angular/common/';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css'],
  providers:[DatePipe]
})
export class AddEditTaskComponent implements OnInit {

 TaskForm = new FormGroup({
        ProjectName : new FormControl(''),
        TaskName: new FormControl(''),
        Priority: new FormControl(''),
        ParentTaskName: new FormControl(''),
        StartDate: new FormControl(''),
        EndDate: new FormControl(''),
        UserName : new FormControl(''),
        TaskID : new FormControl(''),
        UserId: new FormControl(''),
        ProjectId: new FormControl(''),
        ParentTaskId: new FormControl(''),
 })

  taskDetails : TaskAddDetails;
  editTaskId :string;
  tasks : ITask[];
  tasktoEdit :TaskAddDetails;
  submitted : boolean;
  response : string = '';

  projectSearchParam :string
  projects : Project[];

  searchTaskPram :string;
  parentTasks : ParentTask[];
  searchRequestDetails : any;

  userSearchParam : string;
  users : Users[];

  priority: number = 1;

  buttonTitle : string='Add';

  get taskname() { return this.TaskForm.get('TaskName');  }

  constructor(private taskServices:ConfigService,private route: ActivatedRoute,private _formBuilder: FormBuilder,private projectServices:ProjectService,private userService:UserService,private _datePipe: DatePipe) { }

  get f() { return this.TaskForm.controls; }

  ngOnInit() {

    this.TaskForm =  this._formBuilder.group(
      {
        ProjectName :['', Validators.required],
        TaskName: ['', Validators.required],
        Priority:['',Validators.required],
        ParentTaskName:['',Validators.required],
        StartDate:['',Validators.required],
        EndDate:['',Validators.required],
        UserName : ['', Validators.required],
        TaskID :['0',Validators.required],
        UserId:['',Validators.required],
        ProjectId:['',Validators.required],
        ParentTaskId:['',Validators.required],
      });

      this.GetProjects();
      this.GetAllParentTasks();
      this.GetAllUsers();


    this.editTaskId =  this.route.snapshot.queryParamMap.get('TaskId');

    if(this.editTaskId == null)
      return;

    this.buttonTitle = "Update"

    console.log("TaskId to Edit");
    console.log(this.editTaskId);
    this.taskServices.GetTasktoEdit(this.editTaskId).subscribe(
      result=>{this.tasktoEdit= result,console.log(result)},
      (err)=>{console.log(err)},
      ()=>{
        this.TaskForm.setValue({
          TaskName : this.tasktoEdit.TaskName,
          Priority: this.tasktoEdit.Priority,
          StartDate: this._datePipe.transform(this.tasktoEdit.StartDate,'yyyy-MM-dd'),
          EndDate: this._datePipe.transform(this.tasktoEdit.EndDate,'yyyy-MM-dd'),
          ProjectName: this.tasktoEdit.ProjectName,
          ParentTaskName:this.tasktoEdit.ParentTaskName,
          UserName :this.tasktoEdit.UserName,
          TaskID:this.tasktoEdit.TaskID ,
          UserId:this.tasktoEdit.UserId,
          ProjectId:this.tasktoEdit.ProjectId,
          ParentTaskId : this.tasktoEdit.ParentTaskId
        })
      }
    );

  }



  AddTask()
  {
    this.submitted = true;

    console.log(this.TaskForm);

    if(this.TaskForm.invalid ){
      console.log('form invalid')
      return;
    }

    console.log("Add task Called");
      this.taskDetails = new TaskAddDetails(
        this.TaskForm.value.ProjectName,
        this.TaskForm.value.TaskName,
        this.TaskForm.value.Priority,
        this.TaskForm.value.ParentTaskName,
        this.TaskForm.value.StartDate,
        this.TaskForm.value.EndDate,
        this.TaskForm.value.UserName ,
        this.TaskForm.value.TaskID ,
        this.TaskForm.value.UserId,
        this.TaskForm.value.ProjectId,
        this.TaskForm.value.ParentTaskId
      )



      console.log(this.taskDetails);



      this.taskServices.AddTask(this.taskDetails).subscribe(
        result=>{console.log(result);this.response = result.Message},
        (err)=>{console.log("Save Task Error :" + err)},
        ()=>{console.log(this.response)}
      );

  }

  SearchProject()
  {
    if(this.projectSearchParam != '')
    {
    this.projectServices.Search(this.projectSearchParam).subscribe(
      result=>{this.projects = result,console.log(result)},
      (err)=>{console.log(err)},
      ()=>{this.response="Filtered by "+ this.projectSearchParam}
    );
    }
    else
    {
      this.GetProjects();
      this.response = ''
    }
  }

  private GetProjects()
  {

    this.projectServices.GetAllProjects().subscribe(
      result=>{this.projects = result,console.log(result)},
      (err)=>{console.log(err),
      ()=>(this.response='')}
    );
  }

  SelectProject(projectid : number,projectname : string)
  {
    this.TaskForm.controls["ProjectId"].setValue(projectid);
    this.TaskForm.controls["ProjectName"].setValue(projectname);
  }

  SearchTasks()
  {
    if(this.projectSearchParam != '')
    {
    this.clear();
    this.searchRequestDetails = new SearchRequest
    (
      this.searchTaskPram,
      null,
      null,
      null,
      null,
      null
    )

    console.log(this.searchRequestDetails);

    this.taskServices.GetParentTasksBy(this.searchRequestDetails).subscribe(
    result=>{this.parentTasks = result; console.log(result)},
    (err)=>console.log(err)
    );
  }
  else
  {
    this.GetAllParentTasks();
  }

  }

  private GetAllParentTasks()
  {
    this.clear();
    this.taskServices.GetParentTasks().subscribe(
      result=>{this.parentTasks = result,console.log(result)},
      (err)=>{console.log(err)}
    );
  }

  SelectParentTask(parenttaskid : number,parenttaskname : string)
  {
    this.TaskForm.controls["ParentTaskId"].setValue(parenttaskid);
    this.TaskForm.controls["ParentTaskName"].setValue(parenttaskname);
  }

  SearchUser()
  {
    if(this.userSearchParam != '')
    {
    this.userService.Search(this.userSearchParam).subscribe(
      result=>{this.users = result,console.log(result)},
      (err)=>{console.log(err)},
      ()=>{this.response="Filtered by "+ this.userSearchParam}
    );
    }
    else
    {
      this.GetAllUsers();
    }
  }

  SelectUser(userid : number,username : string)
  {
    this.TaskForm.controls["UserId"].setValue(userid);
    this.TaskForm.controls["UserName"].setValue(username);
  }

  private GetAllUsers()
  {

    this.userService.GetAllUsers().subscribe(
      result=>{this.users = result,console.log(result)},
      (err)=>{console.log(err),
      ()=>(this.response='')}
    );
  }

  clear()
  {

  }

 /* UpdateTask()
  {
    this.submitted = true;

    if(this.TaskForm.invalid ){
      return;
    }

    console.log("Update task Called");
    this.taskDetails = new TaskDetails(
      this.editTaskId,
      this.TaskForm.value.TaskName,
      false,
      this.TaskForm.value.StartDate,
      this.TaskForm.value.Priority,
      this.TaskForm.value.ParentId,
      this.TaskForm.value.EndDate,
      )

      console.log(this.taskDetails);

      if (this.taskDetails.TaskName == ''
          || this.taskDetails.Parent_ID == 0
          || this.taskDetails.Priority == ''
          || this.taskDetails.EndDate == null
          || this.taskDetails.StartDate == null )
      {
        console.log('Please Enter Mandatory Fields');
      }

      this.taskServices.UpdateTask(this.taskDetails).subscribe(
        result=>{console.log(result);this.response = result},
        (err)=>{console.log("Update Task Error :" + err)},
        ()=>{}
      );

  }*/
}

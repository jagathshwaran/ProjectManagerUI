import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../Interface/Users';
import { UserService } from '../Services/UserService';
import { TaskDetails } from 'src/app/Interface/TaskDetails';
import { ProjectService } from '../Services/ProjectService';
import { AddProjectRequest } from '../Interface/AddProjectRequest';
import { DatePipe } from '@angular/common/';
import{ Project } from '../Interface/Project';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers:[DatePipe]
})
export class ProjectComponent implements OnInit {

  datesVisible :boolean;

  managers : Users[];
  manager : Users;
  response :string ='';
  searchPram :string;
  searchManagerPram :string;
  FirstName:string;
  User_Id:number;
  projectname:string;
  startdate:DatePipe;
  enddate:DatePipe;
  priority:number = 1;
  addprojectRequest : AddProjectRequest;
  allowDateSelection: boolean;
  projects : Project[];
  User : Users[];
  buttonTitle : string ="Add";
  submitted = false;

  ProjectForm: FormGroup =this._formBuilder.group(
    {
      Project_ID: [0],
      ProjectName: ['', Validators.required],
      setStartAndEndDate: [false],
      StartDate: new FormControl({ value: '', disabled: !this.datesVisible  }),
      EndDate: new FormControl({ value: '' ,disabled: !this.datesVisible}),
      Priority:[0],
      manager:[this.FirstName],
      User_ID: [this.User_Id]
    });;

  constructor(private userService : UserService,private projectService : ProjectService,private _formBuilder: FormBuilder,private _datePipe: DatePipe) {

  }

  get f() { return this.ProjectForm.controls; }

  ngOnInit() {
    this.GetAllUsers();
    this.GetProjects();
  }

  onPriorityChange(e) {
    this.priority = e.target.value;
  }

  changeDate(e) {

    this.allowDateSelection = !(e.target.checked);
    this.changeDateControlState();

  }

  changeDateControlState() {
    if (!this.allowDateSelection) {
      this.ProjectForm.controls['StartDate'].enable();
      this.ProjectForm.controls['EndDate'].enable();
      this.ProjectForm.controls['StartDate'].setValidators(Validators.required);
      this.ProjectForm.controls['EndDate'].setValidators(Validators.required);
      this.ProjectForm.controls['StartDate'].updateValueAndValidity();
      this.ProjectForm.controls['EndDate'].updateValueAndValidity();
    } else {
      this.ProjectForm.controls['StartDate'].disable();
      this.ProjectForm.controls['EndDate'].disable();
      this.ProjectForm.controls['StartDate'].clearValidators();
      this.ProjectForm.controls['EndDate'].clearValidators();
      this.ProjectForm.controls['StartDate'].updateValueAndValidity();
      this.ProjectForm.controls['EndDate'].updateValueAndValidity();
    }
  }

  EditProject(proj)
  {
    this.ProjectForm.controls['Project_ID'].setValue(proj.Project_ID);
    this.ProjectForm.controls['ProjectName'].setValue(proj.ProjectName);
    if(proj.StartDate != null)
    {
    this.ProjectForm.controls['StartDate'].setValue(this._datePipe.transform(proj.StartDate,'yyyy-MM-dd'));
    this.ProjectForm.controls['setStartAndEndDate'].setValue(true);
    this.ProjectForm.controls['StartDate'].enable();
    }
    if(proj.EndDate != null)
    {
    this.ProjectForm.controls['EndDate'].setValue(this._datePipe.transform(proj.EndDate,'yyyy-MM-dd'));
    this.ProjectForm.controls['setStartAndEndDate'].setValue(true);
    this.ProjectForm.controls['EndDate'].enable();
    }
    this.ProjectForm.controls['Priority'].setValue(proj.Priority);

    this.buttonTitle = "Update";
  }

  resetForm() {
    this.submitted = false;
    this.ProjectForm.reset();
    this.buttonTitle = 'Add';
    this.priority = 0;
    this.response='';
    this.ProjectForm.controls['Priority'].setValue(0);
    this.ProjectForm.controls['setStartAndEndDate'].setValue(false);
    this.ProjectForm.controls['StartDate'].disable();
    this.ProjectForm.controls['EndDate'].disable();
  }

  private GetProjects()
  {

    this.projectService.GetAllProjects().subscribe(
      result=>{this.projects = result,console.log(result)},
      (err)=>{console.log(err)},
      ()=>{(this.response='')}
    );
  }

  GetAllProjectsBy(sortby:string)
  {

    this.projectService.GetAllProjectsBy(sortby).subscribe(
      result=>{this.projects = result,console.log(result)},
      (err)=>{console.log(err)},
      ()=>{this.response="Sorted"}

    );
  }

  private GetAllUsers()
  {

    this.userService.GetAllUsers().subscribe(
      result=>{this.managers = result,console.log(result)},
      (err)=>{console.log(err),
      ()=>(this.response='')}
    );
  }

  SelectManager(manager:string,id:number)
  {
    this.ProjectForm.controls['manager'].setValue(manager);
    this.ProjectForm.controls['User_ID'].setValue(id);
  }

  SaveProject()
  {
    this.submitted = true;

    if (this.ProjectForm.invalid) {
      return;
    }

   /* this.addprojectRequest = new  AddProjectRequest(
      null,
      this.projectname,
      this.startdate,
      this.enddate,
      this.priority,
      this.User_Id
    )*/

    console.log(this.ProjectForm.value);

    this.projectService.AddProject(this.ProjectForm.value).subscribe(
      result=>{console.log(result);this.response="Saved Successfully"},
      (err)=>{console.log(err)},
      ()=>{this.GetProjects()}
    )



  }

  Search()
  {
    if(this.searchPram != '')
    {
    this.projectService.Search(this.searchPram).subscribe(
      result=>{this.projects = result,console.log(result)},
      (err)=>{console.log(err)},
      ()=>{this.response="Filtered by "+ this.searchPram}
    );
    }
    else
    {
      this.GetProjects();
      this.response = ''
    }
  }

  SearchManager()
  {
    if(this.searchManagerPram != '')
    {
    this.userService.Search(this.searchManagerPram).subscribe(
      result=>{this.managers = result,console.log(result)},
      (err)=>{console.log(err)},
      ()=>{this.response="Filtered by "+ this.searchPram}
    );
    }
    else
    {
      this.GetAllUsers();
    }
  }

  AddProject()
  {

  }


}

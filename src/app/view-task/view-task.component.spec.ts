import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { ITask } from '../Interface/Task'
import { TaskDetails } from 'src/app/Interface/TaskDetails';
import {ConfigService} from '../Services/TaskService'
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {HttpClientTestingModule } from
  '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import {  Router} from '@angular/router';
import { FormGroup , FormControl,ReactiveFormsModule  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArrayType } from '@angular/compiler/src/output/output_ast';

/*describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let router : Router;
  let TaskService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponent ],
      imports:[
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers:[
        ConfigService,
        Router
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    TaskService = TestBed.get(ConfigService);
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = new ViewTaskComponent(TaskService,router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/

/*const tasktestConfig : ITask[]=[{
      Task_ID: 1,
      TaskName: "T1",
      StartDate: null,
      Priority: 1,
      Parent_ID : 1,
      EndDate : null
    },
    {
      Task_ID: 2,
      TaskName: "T2",
      StartDate: null,
      Priority: 2,
      Parent_ID : 3,
      EndDate : null
    }]*/



describe("Get All Task",()=>{

  let component:  ViewTaskComponent;
  let fixture:ComponentFixture<ViewTaskComponent>;
  let TaskService: ConfigService;
  let spyGetTask: any;
  let positiveResponse: ITask[];
  let negativeResponse: any[];
  let router : Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponent ],
      imports:[
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers:[
        ConfigService,
        HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    TaskService = TestBed.get(ConfigService);
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = new ViewTaskComponent(TaskService,router);
    fixture.detectChanges();
  });



  it('should return all task',()=>{

    //positiveResponse = tasktestConfig;
    spyGetTask = spyOn(TaskService,'GetAllTasks').and.returnValue(Observable.create(positiveResponse))

    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.tasks);//.toBe(positiveResponse, `should get all notes from back end`);


  })
})

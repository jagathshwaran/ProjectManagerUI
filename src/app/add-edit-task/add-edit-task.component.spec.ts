import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from   '@angular/router/testing';
import { AddEditTaskComponent } from './add-edit-task.component';
import { FormGroup ,FormsModule , FormControl,ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ConfigService} from '../Services/TaskService'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientTestingModule } from   '@angular/common/http/testing';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { observable } from 'rxjs/internal/symbol/observable';
import {ProjectService} from '../Services/ProjectService';
import { UserService } from '../Services/UserService';

describe('AddEditTaskComponent', () => {
  let component: AddEditTaskComponent;
  let fixture: ComponentFixture<AddEditTaskComponent>;
  let route:ActivatedRoute;

  const fakeActivatedRoute = {
    snapshot: { data: {  }}
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditTaskComponent ],
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers:[
        ConfigService,
        ProjectService,
        UserService

      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTaskComponent);
    component = fixture.componentInstance;
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

 

import { UserPageComponent } from './user-page.component';

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../Services/UserService';

import { HttpClientModule } from '@angular/common/http';

import { Users } from '../Interface/Users';

import { RouterTestingModule } from '@angular/router/testing';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Router} from '@angular/router';

import {HttpClientTestingModule } from

  '@angular/common/http/testing';

  import { Observable } from 'rxjs/internal/Observable';

 

describe('UserPageComponent', () => {

  let component: UserPageComponent;

  let fixture: ComponentFixture<UserPageComponent>;

 

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [ UserPageComponent ],

      imports: [

        FormsModule,

        ReactiveFormsModule,

        HttpClientModule

      ]

      ,

      providers :[UserService]

    })

    .compileComponents();

  }));

 

  beforeEach(() => {

    fixture = TestBed.createComponent(UserPageComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

 

  it('should create', () => {

    expect(component).toBeTruthy();

  });

});

 

describe("Get All Users",()=>{

 

  var component:  UserPageComponent;

  var fixture:ComponentFixture<UserPageComponent>;

  var userService: UserService;

  var spyGetUsers: any;

  var positiveResponse: Users[];

  var negativeResponse: any[];

  var router : Router;

 

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [ UserPageComponent ],

      imports:[

        RouterTestingModule,

        ReactiveFormsModule,

        HttpClientTestingModule,

        FormsModule

      ],

      providers:[

        UserService,

        HttpClient

      ]

    })

   .compileComponents();

  }));

 

  beforeEach(() => {

    router = TestBed.get(Router);

    userService = TestBed.get(UserService);

    fixture = TestBed.createComponent(UserPageComponent);

    component = new UserPageComponent(userService);

    fixture.detectChanges();

  });




  it('should return all task',()=>{

 

    //positiveResponse = tasktestConfig;

    spyGetUsers = spyOn(userService,'GetAllUsers').and.returnValue(Observable.create(positiveResponse))

 

    fixture = TestBed.createComponent(UserPageComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

 

    expect(component.Users);//.toBe(positiveResponse, `should get all notes from back end`);

 

  })

})

 

 
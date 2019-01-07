import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl,FormsModule } from '@angular/forms';
import { UserService} from '../Services/UserService';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from 'src/app/Services/ProjectService';


describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[  ReactiveFormsModule,FormsModule,HttpClientModule ],
      declarations: [ ProjectComponent ],
      providers : [UserService,ProjectService]


    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

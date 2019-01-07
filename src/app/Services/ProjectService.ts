import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../Interface/Users';
import {Response} from '../Interface/Response'
import { AddProjectRequest} from '../Interface/AddProjectRequest'
import { Project } from 'src/app/Interface/Project';


const httpOptions={
headers:new HttpHeaders({
  'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Credentials':'true',
  'Access-Control-Allow-Headers' :'Content-Type'
})
};

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) { }

  AddProject(project): Observable<boolean> {
    return this.http.post<boolean>('http://localhost/ProjectServices/projects/Add',project,httpOptions)
      .pipe();
  }

  GetAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost/ProjectServices/projects/all')
      .pipe();
  }

  GetAllProjectsBy(sortBy:string): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost/ProjectServices/projects/allProjectsBy/'+sortBy)
      .pipe();
  }

  Search(searchBy:string): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost/ProjectServices/projects/Search/'+searchBy)
      .pipe();
  }


}

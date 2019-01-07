import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../Interface/Task';
import { TaskDetails } from '../Interface/TaskDetails';
import { SearchRequest } from '../Interface/SearchRequest';
import {Response} from '../Interface/Response';
import { TaskAddDetails} from '../Interface/TaskAddDetails';
import { ParentTask } from 'src/app/Interface/ParentTask';


const httpOptions={
headers:new HttpHeaders({
  'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Credentials':'true',
  'Access-Control-Allow-Headers' :'Content-Type'
})
};

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  GetAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>('http://localhost/ProjectServices/tasks/all')
      .pipe();
  }

  GetTask(taskId : string): Observable<ITask> {
    return this.http.get<ITask>('http://localhost/ProjectServices/tasks/ById/'+taskId)
      .pipe();
  }

  SearchTask(searchRequest : SearchRequest) : Observable<ITask[]> {
    return this.http.post<ITask[]>('http://localhost/ProjectServices/tasks/search',searchRequest)
  }

  AddTask(task : TaskAddDetails) : Observable<Response>{
    return this.http.post<Response>('http://localhost/ProjectServices/tasks/add',task)
  }

  EndTask(taskId : string) : Observable<Response> {
    return this.http.post<Response>('http://localhost/ProjectServices/tasks/end-task/'+taskId,taskId)
  }

  UpdateTask(task : TaskDetails) : Observable<Response>{
    return this.http.post<Response>('http://localhost/ProjectServices/tasks/Update',task)
  }

  GetParentTasksBy(param : string): Observable<ParentTask[]> {
    return this.http.get<ParentTask[]>('http://localhost/ProjectServices/tasks/parenttasks/'+param)
      .pipe();
  }

  GetParentTasks(): Observable<ParentTask[]> {
    return this.http.get<ParentTask[]>('http://localhost/ProjectServices/tasks/parenttasks')
      .pipe();
  }

  GetTasktoEdit(taskid : string): Observable<TaskAddDetails> {
    return this.http.get<TaskAddDetails>('http://localhost/ProjectServices/tasks/tasktoedit/'+taskid)
      .pipe();
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../Interface/Users';
import {Response} from '../Interface/Response'


const httpOptions={
headers:new HttpHeaders({
  'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Credentials':'true',
  'Access-Control-Allow-Headers' :'Content-Type'
})
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  GetAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost/ProjectServices/Users/allUsers')
      .pipe();
  }

  GetAllUsersBy(sortBy:string): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost/ProjectServices/Users/allUsersBy/'+sortBy)
      .pipe();
  }

  Search(searchBy:string): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost/ProjectServices/Users/Search/'+searchBy)
      .pipe();
  }

  AddUser(user : Users): Observable<boolean> {
    return this.http.post<boolean>('http://localhost/ProjectServices/Users/Add',user,httpOptions)
      .pipe();
  }

  DeleteUser(userid : number): Observable<boolean> {
    return this.http.post<boolean>('http://localhost/ProjectServices/Users/Delete',userid,httpOptions)
      .pipe();
  }

  UpdateUser(user : Users): Observable<boolean> {
    return this.http.post<boolean>('http://localhost/ProjectServices/Users/Update',user,httpOptions)
      .pipe();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../Interface/Users';
import { UserService } from '../Services/UserService';
import { TaskDetails } from 'src/app/Interface/TaskDetails';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {


  Users : Users[];
  user:Users;
  EditingUserId :number=0;
  FirstName:string;
  LastName:string;
  EmployeeId:number;
  searchPram:string;
  response : string ='';
  submitted : boolean = false;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.GetAllUsers();
    console.log(this.EditingUserId);

  }
// EditUser(User:Users)
// {

// }

  private GetAllUsers()
  {

    this.userService.GetAllUsers().subscribe(
      result=>{this.Users = result,console.log(result)},
      (err)=>{console.log(err),
      ()=>(this.response='')}
    );
  }



  GetAllUsersBy(sortby:string)
  {

    this.userService.GetAllUsersBy(sortby).subscribe(
      result=>{this.Users = result,console.log(result)},
      (err)=>{console.log(err)},
      ()=>{this.response="Sorted"}

    );
  }

  Search()
  {
    if(this.searchPram != '')
    {
    this.userService.Search(this.searchPram).subscribe(
      result=>{this.Users = result,console.log(result)},
      (err)=>{console.log(err)},
      ()=>{this.response="Filtered by "+ this.searchPram}
    );
    }
    else
    {
      this.GetAllUsers();
    }
  }

  EditUser(user:Users)
  {
    console.log(user);
    this.FirstName=user.FirstName;
    this.LastName=user.LastName;
    this.EmployeeId=user.EmployeeID;
    this.EditingUserId =user.User_ID;
    console.log(this.FirstName);
  }

  DeleteUser(userid : number)
  {
    this.userService.DeleteUser(userid).subscribe(
      result=>{console.log(result)},
      (err)=>{console.log(err)},
      ()=>{this.userService.GetAllUsers().subscribe(
        userresult =>{this.Users =userresult; this.response='Deleted'}
      )}
    );
  }

  ManageUser()
  {
    this.submitted = true;

    if(this.FirstName =='' || this.LastName =='' || this.EmployeeId == null)
    {
      this.response = "All fields are mandatory";
      return;
    }

    console.log(this.EditingUserId);
    if(this.EditingUserId ==0)
        this.AddUser()
    else
      this.SaveUser()
  }

  AddUser()
  {
    this.user = new Users(
      null,
      this.FirstName,
      this.LastName,
      this.EmployeeId,
      null,
      null
    )



    console.log(this.user);

    this.userService.AddUser(this.user).subscribe(
      result=>{console.log(result)},
      (err)=>{console.log(err)},
      ()=>{this.userService.GetAllUsers().subscribe(
        userresult =>{this.Users =userresult;this.clear(); this.response='Added'}
      )}
    );

  }

  SaveUser()
  {
    this.user = new Users(
      this.EditingUserId,
      this.FirstName,
      this.LastName,
      this.EmployeeId,
      null,
      null
    )

    console.log(this.user);

    this.userService.UpdateUser(this.user).subscribe(
      result=>{console.log(result)},
      (err)=>{console.log(err)},
      ()=>{this.userService.GetAllUsers().subscribe(
        userresult =>{this.Users =userresult;this.clear(); this.response='Saved'}
      )}
    );

  }

  clear()
  {
    this.FirstName=null;
    this.LastName =null;
    this.EditingUserId=0;
    this.EmployeeId= null;
    this.submitted = false;
  }

}

export class Users {
  User_ID: number;
  FirstName: string;
  LastName:string;
  EmployeeID: number;
  Project_Id: number;
  Task_Id: number;

  constructor(
    user_ID: number,
    firstName: string,
    lastName:string,
    employeeID: number,
    project_Id: number,
    task_Id: number,
  ) {
      this.User_ID = user_ID;
      this.FirstName = firstName;
      this.LastName = lastName;
      this.EmployeeID = employeeID;
      this.Project_Id = project_Id;
      this.Task_Id = task_Id;
  }
}

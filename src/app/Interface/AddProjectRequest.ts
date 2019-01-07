import { DatePipe } from '@angular/common/src/pipes/date_pipe';

export class AddProjectRequest {
  Project_ID: number;
  ProjectName: string;
  StartDate:DatePipe;
  EndDate: DatePipe;
  Priority: number;
  User_ID: number;
  constructor(
    project_ID: number,
    projectName: string,
  startDate:DatePipe,
  endDate: DatePipe,
  priority: number,
  user_ID: number
  ) {
      this.Project_ID = project_ID;
      this.ProjectName = projectName;
      this.StartDate = startDate;
      this.EndDate =endDate;
      this.Priority = priority;
      this.User_ID = user_ID;

  }
}

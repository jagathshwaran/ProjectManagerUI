import { DatePipe } from '@angular/common/src/pipes/date_pipe';

export class Project {
  Project_ID: number;
  ProjectName: string;
  StartDate:DatePipe;
  EndDate: DatePipe;
  Priority: number;
  Status: string;
  constructor(
    project_ID: number,
    projectName: string,
  startDate:DatePipe,
  endDate: DatePipe,
  priority: number,
  status: string
  ) {
      this.Project_ID = project_ID;
      this.ProjectName = projectName;
      this.StartDate = startDate;
      this.EndDate =endDate;
      this.Priority = priority;
      this.Status = status;

  }
}

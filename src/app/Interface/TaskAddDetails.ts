import { DatePipe } from '@angular/common/src/pipes/date_pipe';

export class TaskAddDetails {
        ProjectName : string;
        TaskName: string;
        Priority: number;
        ParentTaskName: string;
        StartDate:DatePipe;
        EndDate:DatePipe;
        UserName :string;
        TaskID :number;
        UserId:number;
        ProjectId:number;
        ParentTaskId:number;

        constructor(
          projectName : string,
          taskName: string,
          priority: number,
          parentTaskName: string,
          startDate:DatePipe,
          endDate:DatePipe,
          userName :string,
          taskID :number,
          userId:number,
          projectId:number,
          parentTaskId:number,
  ) {
    this.ProjectName = projectName;
    this.TaskName= taskName;
    this.Priority= priority;
    this.ParentTaskName= parentTaskName;
    this.StartDate= startDate;
    this.EndDate= endDate;
    this.UserName = userName;
    this.TaskID = taskID;
    this.UserId= userId;
    this.ProjectId =projectId;
    this.ParentTaskId= parentTaskId;
  }
}

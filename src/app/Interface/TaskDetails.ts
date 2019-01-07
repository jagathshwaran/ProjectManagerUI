import { DatePipe } from '@angular/common/src/pipes/date_pipe';

export class TaskDetails {
  Task_ID: string;
  TaskName: string;
  TaskEnded:boolean;
  StartDate: DatePipe;
  Priority: string;
  Parent_ID: number;
  EndDate:DatePipe;
  constructor(
    task_ID: string,
    taskName: string,
    taskEnded:boolean,
    startDate: DatePipe,
    priority: string,
    parent_ID: number,
    endDate:DatePipe
  ) {
      this.Task_ID = task_ID;
      this.TaskName = taskName;
      this.TaskEnded = taskEnded;
      this.StartDate = startDate;
      this.Priority = priority;
      this.Parent_ID = parent_ID;
      this.EndDate = endDate;
  }
}

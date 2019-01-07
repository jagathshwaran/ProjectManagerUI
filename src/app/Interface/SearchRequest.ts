import { DatePipe } from '@angular/common/src/pipes/date_pipe';

export class SearchRequest {
  TaskName: string;
  ParentTaskName: string;
  StartDate:DatePipe;
  EndDate: DatePipe;
  PriorityFrom: number;
  PriorityTo: number;
  constructor(
    taskName: string,
  parentTaskName: string,
  startDate:DatePipe,
  endDate: DatePipe,
  priorityFrom: number,
  priorityTo: number
  ) {
      this.TaskName = taskName;
      this.ParentTaskName = parentTaskName;
      this.StartDate = startDate;
      this.EndDate =endDate;
      this.PriorityFrom = priorityFrom;
      this.PriorityTo = priorityTo;

  }
}

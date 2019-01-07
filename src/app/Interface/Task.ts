import { DatePipe } from '@angular/common/src/pipes';

export interface ITask {
  Task_ID: number;
  TaskName: string;
  TaskEnded:boolean;
  StartDate: DatePipe;
  Priority: string;
  Parent_ID: number;
  EndDate:DatePipe;
}

import { Employee } from './employee';

export interface OrderUpdate {
  dateTime: Date;
  note: string;
  updatedBy: Employee;
}

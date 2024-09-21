import { Employee } from './employee';

export interface OrderUpdate {
  id: number;
  dateTime: Date;
  note: string;
  updatedBy: Employee;
}

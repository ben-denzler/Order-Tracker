import { Employee } from './employee';
import { OrderUpdate } from './order-update';
import { Product } from './product';

export enum OrderStatus {
  Designing = 'Designing',
  Packaging = 'Packaging',
  Finished = 'Finished',
}

export interface Order {
  id: number;
  customer: string;
  school: string;
  price: number;
  products: Product[];
  status: OrderStatus;
  description: string;
  createdOn: Date;
  updatedOn: Date;
  dueOn: Date;
  assignedTo: Employee[];
  updates: OrderUpdate[];
}

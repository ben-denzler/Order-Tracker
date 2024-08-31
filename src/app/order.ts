import { Employee } from './employee';
import { OrderUpdate } from './order-update';
import { Product } from './product';

export enum OrderStatus {
  Designing = 'Designing',
  Packaging = 'Packaging',
  Finished = 'Finished',
}

interface OrderInterface {
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

export class Order {
  public id: number;
  public customer: string;
  public school: string;
  public price: number;
  public products: Product[];
  public status: OrderStatus;
  public description: string;
  public createdOn: Date;
  public updatedOn: Date;
  public dueOn: Date;
  public assignedTo: Employee[];
  public assignedToNamesConcat: string;
  public updates: OrderUpdate[];

  constructor(order: OrderInterface) {
    this.id = order.id;
    this.customer = order.customer;
    this.school = order.school;
    this.price = order.price;
    this.products = order.products;
    this.status = order.status;
    this.description = order.description;
    this.createdOn = order.createdOn;
    this.updatedOn = order.updatedOn;
    this.dueOn = order.dueOn;
    this.assignedTo = order.assignedTo;
    this.assignedToNamesConcat = this.assignedTo
      .map((employee) => employee.name)
      .join('');
    console.log(`Concat names: ${this.assignedToNamesConcat}`);
    this.updates = order.updates;
  }
}

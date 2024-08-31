import { Injectable } from '@angular/core';
import { Order, OrderStatus } from './order';
import { Product } from './product';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  protected orderList: Order[] = [
    new Order({
      id: 0,
      customer: 'Benjamin Denzler',
      school: 'Century',
      price: 100,
      products: [
        { id: 0, name: 'T-shirt', quantity: 2, selectedQuantity: 0 },
        { id: 1, name: 'Pants', quantity: 1, selectedQuantity: 0 },
      ],
      status: OrderStatus.Designing,
      description: 'This is the first order description.',
      createdOn: new Date(2022, 0, 1), // January 1, 2022
      updatedOn: new Date(2022, 0, 2), // January 2, 2022
      dueOn: new Date(2022, 0, 9), // Example: 7 days after updatedOn
      assignedTo: [{ name: 'John Smith' }],
      updates: [],
    }),
    new Order({
      id: 1,
      customer: 'Alex Johnson',
      school: 'Riverside',
      price: 150,
      products: [
        { id: 2, name: 'Shoes', quantity: 1, selectedQuantity: 0 },
        { id: 3, name: 'Socks', quantity: 3, selectedQuantity: 0 },
      ],
      status: OrderStatus.Finished,
      description: 'This is the second order description.',
      createdOn: new Date(2022, 0, 3), // January 3, 2022
      updatedOn: new Date(2022, 0, 4), // January 4, 2022
      dueOn: new Date(2022, 0, 11), // Example: 7 days after updatedOn
      assignedTo: [{ name: 'Jane Doe' }, { name: 'Michael Johnson' }],
      updates: [],
    }),
    new Order({
      id: 2,
      customer: 'Samantha Bloom',
      school: 'Greenwood',
      price: 200,
      products: [
        { id: 4, name: 'Backpack', quantity: 1, selectedQuantity: 0 },
        { id: 5, name: 'Notebook', quantity: 5, selectedQuantity: 0 },
      ],
      status: OrderStatus.Packaging,
      description: 'This is the third order description.',
      createdOn: new Date(2022, 0, 5), // January 5, 2022
      updatedOn: new Date(2022, 0, 6), // January 6, 2022
      dueOn: new Date(2022, 0, 13), // Example: 7 days after updatedOn
      assignedTo: [{ name: 'Emily Davis' }],
      updates: [],
    }),
    new Order({
      id: 3,
      customer: 'Michael Reeves',
      school: 'Westview',
      price: 75,
      products: [
        { id: 6, name: 'Pencil', quantity: 10, selectedQuantity: 0 },
        { id: 7, name: 'Eraser', quantity: 5, selectedQuantity: 0 },
      ],
      status: OrderStatus.Designing,
      description: 'This is the fourth order description.',
      createdOn: new Date(2022, 0, 7), // January 7, 2022
      updatedOn: new Date(2022, 0, 8), // January 8, 2022
      dueOn: new Date(2022, 0, 15), // Example: 7 days after updatedOn
      assignedTo: [{ name: 'William Brown' }, { name: 'Olivia Wilson' }],
      updates: [],
    }),
    new Order({
      id: 4,
      customer: 'Linda Eastman',
      school: 'Sunrise',
      price: 125,
      products: [
        { id: 8, name: 'Jacket', quantity: 1, selectedQuantity: 0 },
        { id: 9, name: 'Hat', quantity: 2, selectedQuantity: 0 },
      ],
      status: OrderStatus.Finished,
      description: 'This is the fifth order description.',
      createdOn: new Date(2022, 0, 9), // January 9, 2022
      updatedOn: new Date(2022, 0, 10), // January 10, 2022
      dueOn: new Date(2022, 0, 17), // Example: 7 days after updatedOn
      assignedTo: [
        { name: 'James Taylor' },
        { name: 'Sophia Anderson' },
        { name: 'Daniel Moore' },
      ],
      updates: [],
    }),
  ];
  protected inventory: Product[] = [
    { id: 0, name: 'T-shirt', quantity: 10, selectedQuantity: 0 },
    { id: 1, name: 'Pants', quantity: 15, selectedQuantity: 0 },
    { id: 2, name: 'Shoes', quantity: 1, selectedQuantity: 0 },
    { id: 3, name: 'Socks', quantity: 2, selectedQuantity: 0 },
    { id: 4, name: 'Backpack', quantity: 4, selectedQuantity: 0 },
    { id: 5, name: 'Notebook', quantity: 7, selectedQuantity: 0 },
    { id: 6, name: 'Pencil', quantity: 12, selectedQuantity: 0 },
    { id: 7, name: 'Eraser', quantity: 13, selectedQuantity: 0 },
    { id: 8, name: 'Jacket', quantity: 27, selectedQuantity: 0 },
    { id: 9, name: 'Hat', quantity: 19, selectedQuantity: 0 },
  ];
  protected employeesList: Employee[] = [
    { name: 'John Smith' },
    { name: 'Michael Johnson' },
    { name: 'Emily Davis' },
    { name: 'William Brown' },
    { name: 'Olivia Wilson' },
    { name: 'James Taylor' },
    { name: 'Sophia Anderson' },
    { name: 'Daniel Moore' },
    { name: 'Ava Martinez' },
  ];

  getAllOrders(): Order[] {
    return this.orderList;
  }

  getInventory(): Product[] {
    return this.inventory;
  }

  getAllEmployees(): Employee[] {
    return this.employeesList;
  }

  getHighestOrderId(): number {
    return this.orderList.reduce((maxId, order) => {
      return order.id > maxId ? order.id : maxId;
    }, 0);
  }
}

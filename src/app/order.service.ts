import { Injectable } from '@angular/core';
import { Order, OrderStatus } from './order';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  protected orderList: Order[] = [
    {
      id: 0,
      customer: 'Benjamin Denzler',
      school: 'Century',
      price: 100,
      products: [
        {id: 0, name: 'T-shirt', quantity: 2},
        {id: 1, name: 'Pants', quantity: 1}
      ],
      status: OrderStatus.Designing,
      description: "This is the first order description.",
      createdOn: new Date(2022, 0, 1), // January 1, 2022
      updatedOn: new Date(2022, 0, 2) // January 2, 2022
    },
    {
      id: 1,
      customer: 'Alex Johnson',
      school: 'Riverside',
      price: 150,
      products: [
        {id: 2, name: 'Shoes', quantity: 1},
        {id: 3, name: 'Socks', quantity: 3}
      ],
      status: OrderStatus.Finished,
      description: "This is the second order description.",
      createdOn: new Date(2022, 0, 3), // January 3, 2022
      updatedOn: new Date(2022, 0, 4) // January 4, 2022
    },
    {
      id: 2,
      customer: 'Samantha Bloom',
      school: 'Greenwood',
      price: 200,
      products: [
        {id: 4, name: 'Backpack', quantity: 1},
        {id: 5, name: 'Notebook', quantity: 5}
      ],
      status: OrderStatus.Packaging,
      description: "This is the third order description.",
      createdOn: new Date(2022, 0, 5), // January 5, 2022
      updatedOn: new Date(2022, 0, 6) // January 6, 2022
    },
    {
      id: 3,
      customer: 'Michael Reeves',
      school: 'Westview',
      price: 75,
      products: [
        {id: 6, name: 'Pencil', quantity: 10},
        {id: 7, name: 'Eraser', quantity: 5}
      ],
      status: OrderStatus.Designing,
      description: "This is the fourth order description.",
      createdOn: new Date(2022, 0, 7), // January 7, 2022
      updatedOn: new Date(2022, 0, 8) // January 8, 2022
    },
    {
      id: 4,
      customer: 'Linda Eastman',
      school: 'Sunrise',
      price: 125,
      products: [
        {id: 8, name: 'Jacket', quantity: 1},
        {id: 9, name: 'Hat', quantity: 2}
      ],
      status: OrderStatus.Finished,
      description: "This is the fifth order description.",
      createdOn: new Date(2022, 0, 9), // January 9, 2022
      updatedOn: new Date(2022, 0, 10) // January 10, 2022
    }
  ];

  protected inventory: Product[] = [
    {id: 0, name: 'T-shirt', quantity: 10},
    {id: 1, name: 'Pants', quantity: 15},
    {id: 2, name: 'Shoes', quantity: 1},
    {id: 3, name: 'Socks', quantity: 2},
    {id: 4, name: 'Backpack', quantity: 4},
    {id: 5, name: 'Notebook', quantity: 7},
    {id: 6, name: 'Pencil', quantity: 12},
    {id: 7, name: 'Eraser', quantity: 13},
    {id: 8, name: 'Jacket', quantity: 27},
    {id: 9, name: 'Hat', quantity: 19}
  ];

  getAllOrders(): Order[] {
    return this.orderList;
  }

  getInventory(): Product[] {
    return this.inventory;
  }

  constructor() { }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderStatus } from '../order';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  expandedRows = {};
  ordersList: Order[] = [
    {
      id: 0,
      customer: 'Benjamin Denzler',
      school: 'Century',
      price: 100,
      products: [],
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
      products: [],
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
      products: [],
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
      products: [],
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
      products: [],
      status: OrderStatus.Finished,
      description: "This is the fifth order description.",
      createdOn: new Date(2022, 0, 9), // January 9, 2022
      updatedOn: new Date(2022, 0, 10) // January 10, 2022
    }
  ];
}

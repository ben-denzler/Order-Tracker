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
      description: "This is the first order description."
    },
    {
      id: 1,
      customer: 'Alex Johnson',
      school: 'Riverside',
      price: 150,
      products: [],
      status: OrderStatus.Finished,
      description: "This is the second order description."
    },
    {
      id: 2,
      customer: 'Samantha Bloom',
      school: 'Greenwood',
      price: 200,
      products: [],
      status: OrderStatus.Packaging,
      description: "This is the third order description."
    },
    {
      id: 3,
      customer: 'Michael Reeves',
      school: 'Westview',
      price: 75,
      products: [],
      status: OrderStatus.Designing,
      description: "This is the fourth order description."
    },
    {
      id: 4,
      customer: 'Linda Eastman',
      school: 'Sunrise',
      price: 125,
      products: [],
      status: OrderStatus.Finished,
      description: "This is the fifth order description."
    }
  ];
}

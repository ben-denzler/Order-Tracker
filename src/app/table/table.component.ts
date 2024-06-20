import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../order';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  ordersList: Order[] = [
    {
      id: 0,
      customer: 'Benjamin Denzler',
      school: 'Century',
      price: 100,
      products: []
    },
    {
      id: 1,
      customer: 'Alex Johnson',
      school: 'Riverside',
      price: 150,
      products: []
    },
    {
      id: 2,
      customer: 'Samantha Bloom',
      school: 'Greenwood',
      price: 200,
      products: []
    },
    {
      id: 3,
      customer: 'Michael Reeves',
      school: 'Westview',
      price: 75,
      products: []
    },
    {
      id: 4,
      customer: 'Linda Eastman',
      school: 'Sunrise',
      price: 125,
      products: []
    }
  ];
}

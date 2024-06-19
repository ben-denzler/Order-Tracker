import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Order } from './order';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  ordersList: Order[] = [
    {
      id: 0,
      customer: 'Benjamin Denzler',
      school: 'Century',
      price: 100,
      products: []
    }
  ];
}

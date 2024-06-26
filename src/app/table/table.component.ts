import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TableModule} from 'primeng/table';
import {ToolbarModule} from "primeng/toolbar";
import {Order, OrderStatus} from '../order';
import {Product} from '../product';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    ToolbarModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  expandedRows = {};
  orderList!: Order[];
  inventory!: Product[];
  newOrder!: Order;
  orderStatuses: string[] = Object.keys(OrderStatus);
  showOrderDialog: boolean = false;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderList = this.orderService.getAllOrders();
    this.inventory = this.orderService.getInventory();
  }

  closeNew(): void {
    this.showOrderDialog = false;
  }

  openNew(): void {
    this.showOrderDialog = true;
    this.newOrder = {
      id: this.orderService.getHighestOrderId() + 1,
      customer: '',
      school: '',
      price: 0,
      products: [],
      status: OrderStatus.Designing,
      description: '',
      createdOn: new Date(),
      updatedOn: new Date(),
      dueOn: new Date()
    };
  }

  getStockCount(p: Product): number {
    const numberInStock = this.inventory.find(product => product.id === p.id)?.quantity;
    return numberInStock ?? 0;
  }

  isEnoughStock(p: Product): boolean {
    return p.quantity <= this.getStockCount(p);
  }

  saveOrder(): void {
    this.orderList.push(this.newOrder);
  }
}

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
import {OrderDialogComponent} from "../order-dialog/order-dialog.component";
import {OrderService} from '../order.service';
import {Product} from '../product';

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
    ToolbarModule,
    OrderDialogComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  expandedRows = {};
  orderList!: Order[];
  inventory!: Product[];
  newOrder: Order = { // FIXME: Make this a class
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
  orderStatuses: string[] = Object.keys(OrderStatus);
  showOrderDialog: boolean = false;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderList = this.orderService.getAllOrders();
    this.inventory = this.orderService.getInventory();
  }

  closeNewDialog(): void {
    this.showOrderDialog = false;
    console.log("Parent handled close event");
  }

  saveOrder(order: Order): void {
    this.orderList.push(order);
    console.log("Parent handled save event");
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
}

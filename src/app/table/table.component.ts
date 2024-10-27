import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {
  TableModule,
  TableRowSelectEvent,
  TableRowUnSelectEvent,
} from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { Order, OrderStatus } from '../order';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { OrderService } from '../order.service';
import { Product, ProductStatus } from '../product';

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
    OrderDialogComponent,
    TagModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  searchValue: string | undefined;
  expandedRows = {};
  orderList!: Order[];
  inventory!: Product[];
  activeOrder!: Order;
  selectedOrder!: Order;
  orderStatuses: string[] = Object.keys(OrderStatus);
  showOrderDialog = false;
  editButtonDisabled = true;
  isEditing = false;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderList = this.orderService.getAllOrders();
    this.inventory = this.orderService.getInventory();
  }

  handleRowSelect(event?: TableRowSelectEvent): void {
    this.editButtonDisabled = false;
    console.log(`Row selected: ${event?.data}`);
  }

  handleRowUnselect(event?: TableRowUnSelectEvent): void {
    this.editButtonDisabled = true;
    console.log(`Row unselected: ${event?.data}`);
  }

  getOrderSeverity(status: string): 'info' | 'warning' | 'success' | 'danger' {
    switch (status) {
      case OrderStatus.Designing:
        return 'info';
      case OrderStatus.Packaging:
        return 'warning';
      case OrderStatus.Finished:
        return 'success';
      default:
        return 'danger';
    }
  }

  getProductSeverity(
    status: ProductStatus,
  ): 'info' | 'warning' | 'success' | 'danger' {
    switch (status) {
      case ProductStatus.NeedToOrder:
        return 'info';
      case ProductStatus.WaitingShipment:
        return 'warning';
      case ProductStatus.ReadyForProd:
        return 'success';
      default:
        return 'danger';
    }
  }

  closeOrderDialog(): void {
    this.showOrderDialog = false;
    console.log('Parent handled close event');
  }

  saveNewOrder(newOrder: Order): void {
    this.orderList.push(newOrder);
    this.showOrderDialog = false;
    console.log('Parent handled save event');
  }

  saveEditOrder(editOrder: Order): void {
    const orderIndex = this.orderList.findIndex(
      (order) => order.id === editOrder.id,
    );
    this.orderList[orderIndex] = editOrder;
    this.showOrderDialog = false;
    this.isEditing = false;
  }

  openNew(): void {
    this.isEditing = false;
    this.activeOrder = new Order({
      id: this.orderService.getHighestOrderId() + 1,
      customer: '',
      school: '',
      price: 0,
      products: [],
      status: OrderStatus.Designing,
      description: '',
      createdOn: new Date(),
      updatedOn: new Date(),
      dueOn: new Date(),
      assignedTo: [],
      updates: [],
    });
    this.showOrderDialog = true;
    console.log(`Opened new! showOrderDialog is ${this.showOrderDialog}`);
  }

  openEdit(): void {
    this.isEditing = true;
    this.activeOrder = this.selectedOrder;
    this.showOrderDialog = true;
    console.log(`Opened edit! showOrderDialog is ${this.showOrderDialog}`);
  }

  getStockCount(p: Product): number {
    const numberInStock = this.inventory.find(
      (product) => product.id === p.id,
    )?.quantity;
    return numberInStock ?? 0;
  }

  isEnoughStock(p: Product): boolean {
    return p.quantity <= this.getStockCount(p);
  }
}

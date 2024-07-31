import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeTemplate} from "primeng/api";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PickListModule} from "primeng/picklist";
import {Order} from "../order";
import {OrderService} from "../order.service";
import {Product} from "../product";
import { Employee } from '../employee';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    PrimeTemplate,
    ReactiveFormsModule,
    FormsModule,
    PickListModule
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.css'
})
export class OrderDialogComponent implements OnInit {
  @Input() order!: Order;
  @Input() showDialog!: boolean;
  @Input() orderStatuses!: string[];
  @Output() closeDialogEvent = new EventEmitter<void>();
  @Output() saveOrderEvent = new EventEmitter<Order>();
  inventory!: Product[];
  employeesList!: Employee[];
  currentPage: number = 1;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.inventory = this.orderService.getInventory();
    this.employeesList = this.orderService.getAllEmployees();
    console.log(`employeesList: ${this.employeesList}`);
  }

  goToNextPage(): void {
    this.currentPage++;
    console.log(`Current page: ${this.currentPage}`);
  }

  closeDialog(): void {
    console.log("Dialog emitted close event");
    this.currentPage = 1;
    this.closeDialogEvent.emit();
  }

  saveNewOrder(): void {
    console.log("Dialog emitted save event");
    this.saveOrderEvent.emit(this.order);
  }
}

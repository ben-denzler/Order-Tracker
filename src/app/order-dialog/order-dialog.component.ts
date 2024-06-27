import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeTemplate} from "primeng/api";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Order} from "../order";

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
    FormsModule
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.css'
})
export class OrderDialogComponent {
  @Input() order!: Order;
  @Input() showDialog!: boolean;
  @Input() orderStatuses!: string[];
  @Output() closeDialogEvent = new EventEmitter<void>();
  @Output() saveOrderEvent = new EventEmitter<Order>();

  closeDialog(): void {
    console.log("Dialog emitted close event");
    this.closeDialogEvent.emit();
  }

  saveNewOrder(): void {
    console.log("Dialog emitted save event");
    this.saveOrderEvent.emit(this.order);
  }
}

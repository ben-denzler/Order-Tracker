import {Component, Input} from '@angular/core';
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
}

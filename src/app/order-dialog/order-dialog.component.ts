import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PickListModule } from 'primeng/picklist';
import { StepsModule } from 'primeng/steps';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { Product } from '../product';
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
    PickListModule,
    StepsModule,
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.css',
})
export class OrderDialogComponent implements OnInit {
  @Input() order!: Order;
  @Input() showDialog!: boolean;
  @Input() orderStatuses!: string[];
  @Input() isEditing!: boolean;
  @Output() closeDialogEvent = new EventEmitter<void>();
  @Output() saveNewOrderEvent = new EventEmitter<Order>();
  @Output() saveEditOrderEvent = new EventEmitter<Order>();
  inventory!: Product[];
  employeesList!: Employee[];
  menuItems!: MenuItem[];
  private _currentPage = 1;
  readonly lastPage = 3;
  disableBackButton = true;
  disableNextButton = false;
  disableSaveButton = true;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.inventory = this.orderService.getInventory();
    this.employeesList = this.orderService.getAllEmployees();
    this.menuItems = [
      {
        label: 'Basic Info',
      },
      {
        label: 'Items',
      },
      {
        label: 'Assign Employees',
      },
    ];
    console.log(`employeesList: ${this.employeesList}`);
  }

  get currentPage(): number {
    console.log(`(GET) _currentPage is: ${this._currentPage}`);
    return this._currentPage;
  }

  set currentPage(num: number) {
    console.log(`(SET) _currentPage is: ${this._currentPage}`);
    this._currentPage = num;
    console.log(`(SET) _currentPage is now: ${this._currentPage}`);
    this.disableNextButton = this._currentPage === this.lastPage ? true : false;
    this.disableBackButton = this._currentPage > 1 ? false : true;
    this.disableSaveButton = this._currentPage === this.lastPage ? false : true;
  }

  goToNextPage(): void {
    this.currentPage++;
    console.log(`Current page: ${this.currentPage}`);
  }

  goToPreviousPage(): void {
    this.currentPage--;
    console.log(`Current page: ${this.currentPage}`);
  }

  closeDialog(): void {
    console.log('Dialog emitted close event');
    this.currentPage = 1;
    this.closeDialogEvent.emit();
  }

  saveOrder(): void {
    console.log('Dialog emitted save event');
    if (this.isEditing) {
      this.saveEditOrderEvent.emit(this.order);
    } else {
      this.saveNewOrderEvent.emit(this.order);
    }
  }
}

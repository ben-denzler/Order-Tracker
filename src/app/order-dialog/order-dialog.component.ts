import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { PickListModule } from 'primeng/picklist';
import { StepsModule } from 'primeng/steps';
import { Employee } from '../employee';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { Product } from '../product';

const baseMenuItems = [
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

const editingMenuItem = {
  label: 'Notes',
};

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
    OverlayPanelModule,
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.css',
})
export class OrderDialogComponent implements OnInit, OnChanges {
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
  customProduct!: Product;

  constructor(private orderService: OrderService) {}

  // TODO: Do we need to move some of this to `ngOnChanges()`?
  // `ngOnInit()` will only run once at initialization
  ngOnInit() {
    this.inventory = this.orderService.getInventory();
    this.employeesList = this.orderService.getAllEmployees();
    this.customProduct = {
      id: -1,
      name: '',
      quantity: 0,
      selectedQuantity: 0,
    };
    console.log(`employeesList: ${this.employeesList}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showDialog']?.currentValue === true) {
      this.menuItems = this.isEditing
        ? [...baseMenuItems, editingMenuItem]
        : baseMenuItems;
    }
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

  cancelCustomProduct(op: OverlayPanel): void {
    op.hide();
    this.resetCustomProduct();
  }

  saveCustomProduct(op: OverlayPanel): void {
    op.hide();
    this.order.products.push(this.customProduct);
    this.resetCustomProduct();
    console.log('Pushed the following custom product to the current order:');
    console.log(JSON.stringify(this.customProduct));
  }

  resetCustomProduct(): void {
    this.customProduct = {
      id: -1,
      name: '',
      quantity: 0,
      selectedQuantity: 0,
    };
    console.log('Reset custom product.');
    console.log(`It's now: ${JSON.stringify(this.customProduct)}}`);
  }

  closeDialog(): void {
    console.log('Dialog emitted close event');
    this.currentPage = 1;
    this.resetCustomProduct();
    this.closeDialogEvent.emit();
  }

  saveOrder(): void {
    console.log('Dialog emitted save event');
    this.resetCustomProduct();
    if (this.isEditing) {
      this.saveEditOrderEvent.emit(this.order);
    } else {
      this.saveNewOrderEvent.emit(this.order);
    }
  }
}

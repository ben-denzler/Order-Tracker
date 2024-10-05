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
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { PickListModule } from 'primeng/picklist';
import { StepsModule } from 'primeng/steps';
import { Employee } from '../employee';
import { Order } from '../order';
import { OrderUpdate } from '../order-update';
import { OrderService } from '../order.service';
import { Product, ProductStatus } from '../product';

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
    FloatLabelModule,
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
  private readonly _firstPage = 1;
  private _lastPage = 3;
  private _currentPage = this._firstPage;
  disableBackButton = true;
  disableNextButton = false;
  disableSaveButton = true;
  customProduct!: Product;
  orderUpdate!: OrderUpdate;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.inventory = this.orderService.getInventory();
    this.employeesList = this.orderService.getAllEmployees();
    console.log(`employeesList: ${this.employeesList}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showDialog']?.currentValue) {
      this.resetCustomProduct();
      this.resetOrderUpdate();
    }
    this.menuItems = changes['isEditing']?.currentValue
      ? [...baseMenuItems, editingMenuItem]
      : baseMenuItems;
    this._lastPage = this.menuItems.length;
    console.log(`Last page number is ${this._lastPage}`);
  }

  get currentPage(): number {
    console.log(`(GET) _currentPage is: ${this._currentPage}`);
    return this._currentPage;
  }

  set currentPage(num: number) {
    this._currentPage = Math.max(
      Math.min(num, this._lastPage),
      this._firstPage,
    );
    this.updateFooterButtons();
  }

  updateFooterButtons(): void {
    this.disableNextButton =
      this._currentPage === this._lastPage ? true : false;
    this.disableBackButton = this._currentPage > this._firstPage ? false : true;
    this.disableSaveButton =
      this._currentPage === this._lastPage ? false : true;
  }

  goToNextPage(): void {
    this.currentPage++;
    console.log(`Current page: ${this.currentPage}`);
  }

  goToPreviousPage(): void {
    this.currentPage--;
    console.log(`Current page: ${this.currentPage}`);
  }

  resetOrderUpdate(): void {
    this.orderUpdate = {
      id: -1,
      dateTime: new Date(),
      note: '',
      updatedBy: { name: '' },
    };
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
      status: ProductStatus.NeedToOrder,
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
      this.orderUpdate.id = (this.order.updates[0]?.id ?? 0) + 1;
      this.orderUpdate.dateTime = new Date();
      this.orderUpdate.updatedBy = { name: 'Some Employee' }; // FIXME: How will we determine the employee?
      this.order.updates.unshift(this.orderUpdate);
      console.log(`Order update is: ${JSON.stringify(this.orderUpdate)}`);
      this.saveEditOrderEvent.emit(this.order);
    } else {
      this.saveNewOrderEvent.emit(this.order);
    }
  }
}

export enum ProductStatus {
  NeedToOrder = 'Need to Order',
  WaitingShipment = 'Waiting for Shipment',
  ReadyForProd = 'Ready for Production',
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  selectedQuantity: number;
  status: ProductStatus;
}

import { Product } from "./product";

export enum OrderStatus {
  Designing = "Designing",
  Packaging = "Packaging",
  Finished = "Finished"
}

export interface Order {
  id: number,
  customer: string,
  school: string,
  price: number,
  products: Product[],
  status: OrderStatus,
  description: string
}

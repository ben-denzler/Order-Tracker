import { Product } from "./product";

export enum OrderStatus {
  Designing = "Designing",
  Packaging = "Packaging",
  Finished = "Finished"
}

// Add for dropdown:
// Created by/on, updated by/on
export interface Order {
  id: number,
  customer: string,
  school: string,
  price: number,
  products: Product[],
  status: OrderStatus,
  description: string
}

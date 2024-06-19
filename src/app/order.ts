import { Product } from "./product";

export interface Order {
  id: number,
  customer: string,
  school: string,
  price: number,
  products: Product[]
}

export enum ProductCategory {
  Clothing = "Clothing",
  Printing = "Printing",
  Embroidery = "Embroidery"
}

export interface Product {
  id: number,
  name: string,
  quantity: number,
  category: ProductCategory
}

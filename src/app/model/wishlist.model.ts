import { Product } from './product.model';

export class WishlistItem {
  id: number;
  name: string;
  imageUrl: string;
  unitPrice: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.imageUrl = product.imageUrl;
    this.unitPrice = product.unitPrice;
  }
}

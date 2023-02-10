import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { WishlistItem} from './wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistItems: WishlistItem[] = [];

  constructor() {
  }

  addToWishlist(wishlistItem: WishlistItem) {
    let alreadyExists = false;
    let existingwishlistItem: WishlistItem;

    if (this.wishlistItems.length > 0) {
      // @ts-ignore
      existingwishlistItem = this.wishlistItems.find(value => value.id === wishlistItem.id);

      alreadyExists = (existingwishlistItem !== undefined);
    }

    if (alreadyExists) {
      // @ts-ignore
      existingCartItem.quantity++;
    } else {
      this.wishlistItems.push(wishlistItem);
    }
  }

  getWishlistItems(): WishlistItem[] {
    return this.wishlistItems;
  }

  removeFromCart(wishlistItem: WishlistItem) {
    const wishlistIndex = this.wishlistItems.findIndex(value => value.id === wishlistItem.id);
    if (wishlistIndex > -1) {
      this.wishlistItems.splice(wishlistIndex, 1);
    }
  }
}

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {WishlistItem} from '../model/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  public wishlistItems: WishlistItem[] = [];
  public totalQuantity = new Subject<number>();

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

    this.totalQuantity.next(this.wishlistItems.length);
  }

  getWishlistItems(): WishlistItem[] {
    return this.wishlistItems;
  }

  removeFromWishlist(wishlistItem: WishlistItem) {
    const wishlistIndex = this.wishlistItems.findIndex(value => value.id === wishlistItem.id);
    if (wishlistIndex > -1) {
      this.wishlistItems.splice(wishlistIndex, 1);
      this.totalQuantity.next(this.wishlistItems.length);
    }
  }
}

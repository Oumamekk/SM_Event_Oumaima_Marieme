import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from "../../cart/cart-item.model";
import {WishlistItem} from "../wishlist.model";
import {WishlistService} from "../wishlist.service";

@Component({
  selector: 'app-wishlist-details',
  templateUrl: './wishlist-details.component.html',
  styleUrls: ['./wishlist-details.component.scss']
})
export class WishlistDetailsComponent implements OnInit, OnDestroy {
  wishlistItems: WishlistItem[] = [];
  totalPrice = 0.00;
  totalQuantity = 0;


  constructor(private wishlistService: WishlistService) {
  }

  ngOnInit(): void {
    this.wishlistItems = this.wishlistService.getWishlistItems();
  }


  onRemove(wishlistItem: WishlistItem) {
    this.wishlistService.removeFromCart(wishlistItem);
  }

  ngOnDestroy(): void {

  }
}


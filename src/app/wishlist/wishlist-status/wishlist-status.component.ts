import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WishlistItem} from "../../model/wishlist.model";
import {WishlistService} from "../../service/wishlist.service";

@Component({
  selector: 'app-wishlist-status',
  templateUrl: './wishlist-status.component.html',
  styleUrls: ['./wishlist-status.component.scss']
})
export class WishlistStatusComponent implements OnInit {
  public wishlistItems: WishlistItem[] = [];
  public totalQuantity = 0;
  private totalQuantitySubscription: Subscription;

  constructor(private wishlistService: WishlistService) {
  }

  ngOnInit(): void {
    this.wishlistItems = this.wishlistService.getWishlistItems();
    this.totalQuantitySubscription = this.wishlistService.totalQuantity.subscribe(quantity => {
      this.totalQuantity = quantity;
    });
  }

  onRemove(wishlistItem: WishlistItem) {
    this.wishlistService.removeFromWishlist(wishlistItem);
  }

}

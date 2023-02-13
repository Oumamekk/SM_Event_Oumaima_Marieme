import {Component, OnInit} from '@angular/core';
import {WishlistItem} from "../../model/wishlist.model";
import {WishlistService} from "../../service/wishlist.service";

@Component({
  selector: 'app-wishlist-details',
  templateUrl: './wishlist-details.component.html',
  styleUrls: ['./wishlist-details.component.scss']
})
export class WishlistDetailsComponent implements OnInit {
  public wishlistItems: WishlistItem[] = [];

  constructor(private wishlistService: WishlistService) {
  }

  ngOnInit(): void {
    this.wishlistItems = this.wishlistService.getWishlistItems();
  }


  onRemove(wishlistItem: WishlistItem) {
    this.wishlistService.removeFromWishlist(wishlistItem);
  }

}


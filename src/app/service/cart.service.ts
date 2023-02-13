import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CartItem} from '../model/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: CartItem[] = [];
  public totalPrice = new Subject<number>();
  public totalQuantity = new Subject<number>();


  addToCart(cartItem: CartItem) {
    let alreadyExists = false;
    let existingCartItem: CartItem;

    if (this.cartItems.length > 0) {
      // @ts-ignore
      existingCartItem = this.cartItems.find(value => value.id === cartItem.id);
      alreadyExists = (existingCartItem !== undefined);
    }

    if (alreadyExists) {
      // @ts-ignore
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();

  }

  computeCartTotals(): void {
    let totalPrice = 0;
    let totalQuantity = 0;

    this.cartItems.forEach(cartItem => {
      totalPrice += cartItem.quantity * cartItem.unitPrice;
      totalQuantity += cartItem.quantity;
    });

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.removeFromCart(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  removeFromCart(cartItem: CartItem) {
    const cartIndex = this.cartItems.findIndex(value => value.id === cartItem.id);
    if (cartIndex > -1) {
      this.cartItems.splice(cartIndex, 1);
      this.computeCartTotals();
    }
  }
}

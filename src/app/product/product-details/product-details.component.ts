import { Component, OnDestroy, OnInit, Input} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
//import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { Product } from '../models/product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../cart/cart-item.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  private paramsSubscription: Subscription;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      this.handleProductDetails(params);
    });
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(new CartItem(product));
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  private handleProductDetails(params: ParamMap) {
    this.productService.getProduct(params.get('id')).subscribe(product => {
      this.product = product;
    });
  }

}

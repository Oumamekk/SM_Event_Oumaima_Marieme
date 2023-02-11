import { Component, OnDestroy, OnInit, Input} from '@angular/core';
import { Subscription} from 'rxjs';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../model/cart-item.model';

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

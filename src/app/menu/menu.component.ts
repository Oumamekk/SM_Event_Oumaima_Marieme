import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {Product} from "../product/models/product.model";
import {Subscription} from "rxjs";
import {GetResponseProducts, ProductService} from "../product/product.service";
import {CartService} from "../cart/cart.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CartItem} from "../cart/cart-item.model";
//import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {ProductDetailsComponent} from "../product/product-details/product-details.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms";
import {WishlistService} from "../wishlist/wishlist.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private readonly ID = 'id';
  private readonly KEYWORD = 'keyword';

  products: Product[];
  searchMode: boolean;
  categoryName: string;
    @Input() searchKeyword: string | null;
  previousCategoryId: number;

  // For pagination
  pageNumber = 1;
  pageSize = 4;
  totalElements = 0;

  private paramsSubscription: Subscription;

  constructor(private modalService: NgbModal,
              private productService: ProductService,
              private cartService: CartService,
              private wishlistService: WishlistService,
              private route: ActivatedRoute) {

  }

  open(product: Product) {
    const modalRef = this.modalService.open(ProductDetailsComponent);
    modalRef.componentInstance.product = product;
  }

  onSearch(form: NgForm): void {
    this.fetchSearchProducts(form.value.search);
    //this.router.navigate(['/search', form.value.search]);
  }

  ngOnInit(): void {

    this.paramsSubscription = this.route.paramMap.subscribe((params) => {
      console.log(params.get("id"))
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("key");
    if (this.searchMode) {
      const keyword = this.route.snapshot.paramMap.get("key");
      this.searchKeyword = keyword === '' ? 'All' : keyword;
      this.handleSearchProducts(keyword);
    } else {
      this.handleProducts(this.route.snapshot.paramMap);
    }
  }

  onUpdatePageSize(event:any): void {
    this.pageSize = +event.target.value;
    this.pageNumber = 1;
    this.listProducts();
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(new CartItem(product));
  }

  onAddToWishlist(product: Product) {
    this.wishlistService.addToWishlist(new CartItem(product));
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  private handleSearchProducts(keyword: string | null): void {
    this.fetchSearchProducts(keyword);
  }

  private fetchSearchProducts(keyword: string | null): void {
    this.productService.getProductsByKeyword(keyword, this.pageNumber - 1, this.pageSize)
      .subscribe(this.handleResponseProducts.bind(this));
  }

  private handleProducts(params: ParamMap): void {
    if (params.has(this.ID)) {
      // @ts-ignore
      const currentCategoryId = +params.get(this.ID);

      // Check if we have a different category than previous
      // Note: Angular will reuse a component if it is currently being viewed
      // If we have a different category id than previous then set thePageNumber back to 1
      if (this.previousCategoryId !== currentCategoryId) {
        this.pageNumber = 1;
      }
      this.previousCategoryId = currentCategoryId;

      this.fetchProductsByCategoryId(currentCategoryId);
      this.fetchCategoryById(currentCategoryId);

    } else {
      this.fetchProducts();
      this.categoryName = 'All';
    }
  }

  private fetchProducts(): void {
    this.productService.getProductList(this.pageNumber - 1, this.pageSize)
      .subscribe(this.handleResponseProducts.bind(this));
  }

  private fetchProductsByCategoryId(categoryId: number): void {
    this.productService.getProductListByCategory(categoryId, this.pageNumber - 1, this.pageSize)
      .subscribe(response => {
        this.handleResponseProducts(response);
      });
  }

  private handleResponseProducts(response: GetResponseProducts) {
    this.products = response.content;//_embedded.products;
    this.pageNumber = response.number + 1;
    this.pageSize = response.size;
    this.totalElements = response.numberOfElements;
  }

  private fetchCategoryById(categoryId: number) {
    this.productService.getProductCategoryById(categoryId).subscribe(productCategory => {
      this.categoryName = productCategory.categoryName;
    });
  }
}

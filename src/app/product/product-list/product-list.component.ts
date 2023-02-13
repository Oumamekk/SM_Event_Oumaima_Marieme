import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {Product} from "../../model/product.model";
import {Subscription} from "rxjs";
import {GetResponseProducts, ProductService} from "../../service/product.service";
import {CartService} from "../../service/cart.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CartItem} from "../../model/cart-item.model";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WishlistService} from "../../service/wishlist.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  public products: Product[];
  public searchMode: boolean;
  public categoryName: string;
  @Input() searchKeyword: string | null;
  public previousCategoryId: number;
  public pageNumber = 1;
  public pageSize = 4;
  public totalElements = 0;
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

  onUpdatePageSize(event: any): void {
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
    if (params.has('id')) {
      // @ts-ignore
      const currentCategoryId = +params.get('id');

      if (this.previousCategoryId !== currentCategoryId) {
        this.pageNumber = 1;
      }
      this.previousCategoryId = currentCategoryId;

      this.fetchProductsByCategoryId(currentCategoryId);
      this.fetchCategoryById(currentCategoryId);

    } else {
      this.fetchProducts();
      this.categoryName = 'Tous les produits';
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
    this.products = response.content;
    this.pageNumber = response.number + 1;
    this.pageSize = response.size;
    this.totalElements = response.totalElements;
  }

  private fetchCategoryById(categoryId: number) {
    this.productService.getProductCategoryById(categoryId).subscribe(productCategory => {
      this.categoryName = productCategory.categoryName;
    });
  }
}

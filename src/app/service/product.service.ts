import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../model/product.model';
import {ProductCategory} from '../model/product-category.model';
import {GetResponseProducts} from "../model/productsResponse";
import {GetResponseProductCategories} from "../model/productsCategoryResponse";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly BASE_PRODUCTS_URL = 'http://localhost:8080/api/products';
  private readonly BASE_PRODUCT_CATEGORIES_URL = 'http://localhost:8080/api/product-categories';

  constructor(private http: HttpClient) {
  }

  getProduct(productId: string | null): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_PRODUCTS_URL}/${productId}`);
  }


  getProductList(page: number, pageSize: number): Observable<GetResponseProducts> {
    return this.getProductsByCondition('?', page, pageSize);
  }

  getProductListByCategory(categoryId: number, page: number, pageSize: number)
    : Observable<GetResponseProducts> {
    return this.getProductsByCondition(
      `/search/category-id?id=${categoryId}&`,
      page,
      pageSize
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<GetResponseProductCategories>(this.BASE_PRODUCT_CATEGORIES_URL)
      .pipe(
        map(result => result._embedded.product_categories)
      );
  }

  getProductCategoryById(id: number): Observable<ProductCategory> {
    return this.http
      .get<ProductCategory>(`${this.BASE_PRODUCT_CATEGORIES_URL}/${id}`);
  }

  getProductsByKeyword(keyword: string | null, page: number, pageSize: number)
    : Observable<GetResponseProducts> {
    return this.getProductsByCondition(
      `/search/name-contains?name=${keyword}&`,
      page,
      pageSize
    );
  }

  private getProductsByCondition(conditionUrl: string, page: number, pageSize: number)
    : Observable<GetResponseProducts> {
    return this.http.get<GetResponseProducts>(
      `${this.BASE_PRODUCTS_URL}${conditionUrl}page=${page}&size=${pageSize}`
    );
  }
}

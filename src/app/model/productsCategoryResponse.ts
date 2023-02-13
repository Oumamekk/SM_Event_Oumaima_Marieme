import {ProductCategory} from "./product-category.model";

export interface GetResponseProductCategories {
  _embedded: {
    product_categories: ProductCategory[]
  };
}

import {Product} from "./product.model";

export interface GetResponseProducts {

  content: Product[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  numberOfElements: number;
}

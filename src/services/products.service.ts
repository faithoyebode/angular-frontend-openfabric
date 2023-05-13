import { Injectable } from '@angular/core';
import PRODUCTS from '../dummy-data/products.json';
import {ProductDetail} from "../interfaces/productdetail";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  data: ProductDetail[] = PRODUCTS;
  constructor() { }
  getProducts(): ProductDetail[] { return this.data; };
  getProductById(id: number | string): ProductDetail | {[key: string]: any;} {
    const result = this.data.find((item) => item.id === id);
    if(result){
      return result;
    }else{
      return {};
    }
  }

}

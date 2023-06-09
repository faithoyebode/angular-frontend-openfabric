import { Injectable } from '@angular/core';
import {ProductDetail} from "../interfaces/productdetail";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  allProducts: ProductDetail[] = [];
  getProducts(){
    return this.http
      .get<{[key: string]: any}>("https://angular-backend-openfabric.onrender.com/api/products");
  }


  getProductById(id: string): ProductDetail | {[key: string]: any;} {
    const result = this.allProducts?.find((item) => item._id === id);
    if(result){
      return result;
    }else{
      return {};
    }
  }

  createProduct(item: ProductDetail){
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http
      .post<{[key: string]: any}>(
        "https://angular-backend-openfabric.onrender.com/api/products", JSON.stringify(item), {headers}).subscribe(
          (res) => {
        console.log("new addition", res);
      });
  }

  updateProduct(item: ProductDetail){
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http
      .put<{[key: string]: any}>(
        `https://angular-backend-openfabric.onrender.com/api/products/${item._id}`, JSON.stringify(item), {headers}).subscribe(
        (res) => {
          console.log("updated product", res);
        });
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}

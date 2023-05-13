import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductTileComponent} from "../product-tile/product-tile.component";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductTileComponent],
  template: `
    <div class="wrapper">
      <app-product-tile
        *ngFor="let product of productService.getProducts()"
        [product]="product"
      ></app-product-tile>
    </div>
  `,
  styles: [
    `
      .wrapper{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 0 -2.5px;
      }
      .wrapper > * {
        flex-shrink: 0;
        width: 50%;
        padding: 10px 2.5px 0;
      }
      @media (min-width: 768px) {
        .wrapper > * {
            width: 33%;
        }
      }
      @media (min-width: 1024px) {
        .wrapper > * {
            width: 25%;
        }
      }
    `
  ]
})
export class HomeComponent {
  constructor(public productService: ProductsService) {
  }
}



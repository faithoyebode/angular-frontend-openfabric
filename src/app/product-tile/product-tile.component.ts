import {Component, Input} from '@angular/core';
import {ProductDetail} from "../../interfaces/productdetail";
import {CommonModule} from "@angular/common";
import {MatCardModule} from '@angular/material/card';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-tile',
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="wrapper" (click)="handleClick()">
      <div class="image-wrapper">
        <img
          class="image"
          *ngIf="product.image"
          [alt]="product.name"
          [src]="product.image"
        />
      </div>
      <mat-card-content class="content">
        <mat-card-title>{{ product.name }}</mat-card-title>
        <p class="price">{{ product.price }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .wrapper{
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
      }
      .image-wrapper{
        position: relative;
        width: 100%;
        background-color: rgb(242, 242, 242);
        height: 0;
        padding-top: 133%;
        border-radius: 2px;
        overflow: hidden;
      }
      .image{
        position: absolute;
        height: auto;
        top: 5%;
        left: 5%;
        right: 5%;
        bottom: 5%;
        max-height: 90%;
        max-width: 90%;
        margin: auto;
        object-position: center center;
        width: 100%;
        object-fit: contain;
      }
      .content{
        line-height: 1.4em;
        padding: 15px;
      }
      .name{
        font-size: 12px;
        font-weight: bold;
      }
      .price{
        font-size: 12px;
      }
    `
  ]
})
export class ProductTileComponent {
  @Input() product: ProductDetail;

  constructor(private router:Router) {
  }

  handleClick(){
    this.router.navigate([`/products/${this.product.id}`]);
  }
}

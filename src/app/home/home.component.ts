import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ProductTileComponent} from "../product-tile/product-tile.component";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AddProductDialogComponent} from "../add-product-dialog/add-product-dialog.component";
import {ProductDetail} from "../../interfaces/productdetail";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ProductTileComponent],
  template: `
    <div class="header">
      <button mat-raised-button (click)="openDialog()">Add Product</button>
    </div>
    <div class="wrapper">
      <app-product-tile
        *ngFor="let product of allProducts"
        [product]="product"
      ></app-product-tile>
    </div>
  `,
  styles: [
    `
      .header{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        position: sticky;
        top: 0;
        z-index: 9;
        background: white;
        box-shadow: 0px 13px 15px -3px rgba(0,0,0,0.1);
      }
      .mdc-button {
        background: #000000!important;
        color: #ffffff!important;
      }
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
  constructor(public productService: ProductsService, public dialog: MatDialog) {}
  allProducts: ProductDetail[];
  openDialog() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '80vw',
      maxWidth: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  fetchProduct(){
    this.productService.getProducts().subscribe((products) => {
      this.allProducts = products;
      this.productService.allProducts = products;
    })
  }

  ngOnInit(){
    this.fetchProduct();
  }
}



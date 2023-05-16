import {Component, Input} from '@angular/core';
import {ProductDetail} from "../../interfaces/productdetail";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {CommonModule} from "@angular/common";
import {AddProductDialogComponent} from "../add-product-dialog/add-product-dialog.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {EditProductDialogComponent} from "../edit-product-dialog/edit-product-dialog.component";
import {MatButtonModule} from "@angular/material/button";

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule,
    MatButtonModule,
  ],
  template: `
    <div class="wrapper">
      <div class="actions-wrapper">
        <a routerLink="/">
          <button class="go-back">Go Back</button>
        </a>
        <button mat-raised-button (click)="openDialog()">Edit Product</button>
        <p *ngIf="product.price" class="price">{{ product.price }}</p>
      </div>
      <div class="image-wrapper" *ngIf="product._id; else errorContent">
        <p class="name">{{ product.name }}</p>
        <img
          *ngIf="product.image"
          [alt]="product.name"
          [src]="product.image"
        />
      </div>
    </div>
    <ng-template #errorContent>
      <div>error</div>
    </ng-template>
  `,
  styles: [
    `
      .name {
        font-size: 36px;
        font-weight: bolder;
      }
      .price {
        font-weight: bolder;
      }
      .actions-wrapper {
        display: flex;
        justify-content: space-between;
      }

      .wrapper {
        max-width: 768px;
        margin: 0 auto;
        margin-top: 30px;
      }

      .go-back {
        margin-bottom: 20px;
        padding: 10px;
        border: none;
        cursor: pointer;
        background-color: rgb(242, 242, 242);
      }
    `
  ]
})
export class ProductDetailComponent {
  product: ProductDetail | {[key: string]: any;};
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    public dialog: MatDialog){}

  ngOnInit(){
    let id = this.route.snapshot.params['id'];
    this.product = this.productService.getProductById(id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '80vw',
      maxWidth: '600px',
      data: {
        ...this.product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ProductsService} from "../../services/products.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule, Validators, FormBuilder} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CloudinaryModule} from '@cloudinary/ng';
import {Cloudinary} from "@cloudinary/url-gen";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    CloudinaryModule,
    HttpClientModule
  ],
  template: `
    <div class="dialog-header">
      <h2 mat-dialog-title class="dialog-title">Add New Product</h2>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Close</button>
      </mat-dialog-actions>
    </div>
    <mat-dialog-content class="mat-typography" width="80vw">
      <form [formGroup]="addProductForm" (ngSubmit)="onSubmit()">
        <div>
          <mat-form-field appearance="outline">
            <mat-label>Product Name</mat-label>
            <input type="text" matInput formControlName="name" name="name" required placeholder="Product Name">
            <mat-error *ngIf="name?.errors?.['required']">This field is required</mat-error>
          </mat-form-field>
        </div>
        <div>
          <mat-form-field appearance="outline">
            <mat-label>Product Price</mat-label>
            <input type="number" matInput formControlName="price" name="price" required placeholder="Product Price">
            <mat-error *ngIf="price?.errors?.['required']">This field is required</mat-error>
          </mat-form-field>
        </div>
        <div>
          <div class="upload-group">
            <mat-label>Fill form field</mat-label>
<!--            <button type="button" mat-raised-button (click)="fileInput.click()">Choose File</button>-->
            <input
              type='file'
              name="image"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              #fileInput
              (change)="uploadFile($event)"
            >
            <mat-error *ngIf="image?.errors?.['required']">This field is required</mat-error>
            <div class="preview-image" *ngIf="imagePreview !== '' && imagePreview && image?.valid">
              <img [src]="imagePreview" class="img-preview" [alt]="name">
            </div>
          </div>
        </div>
        <button mat-raised-button type="submit" color="primary">
          <span *ngIf="submitting; else defaultState">Loading...</span>
        </button>
        <ng-template #defaultState>
          <span>Add Product</span>
        </ng-template>
      </form>
    </mat-dialog-content>

  `,
  styles: [
    `
      .dialog-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
      }
      .img-preview{
        width: 300px;
        height: 300px;
        object-fit: contain;
      }
      .upload-group{
        display: flex;
        flex-direction: column;
      }
      mat-form-field{
        width: 100%;
      }
      mat-form-field input{
        height: 36px;
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 18px;
      }
      button[type='submit']{
        margin-top: 40px;
        background: #000000!important;
        color: #ffffff!important;
        padding: 10px 15px;
        width: 200px;
        height: 50px;
        border: none;
      }
    `
  ]
})
export class AddProductDialogComponent {
  constructor(
    public productService: ProductsService,
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    public router: Router,
    private route: ActivatedRoute
  ){}
  imagePreview:string;
  submitting: boolean;
  addProductForm = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    image: ['', [Validators.required]]
  }, );

  get name() { return this.addProductForm.get('name'); }
  get price() { return this.addProductForm.get('price'); }
  get image() { return this.addProductForm.get('image'); }

  onSubmit() {
    this.submitting = true;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let imgUrl = '';
    this.http
      .post<{ [key: string]: any }>(
        "https://api.cloudinary.com/v1_1/faithoyebode/image/upload",
        JSON.stringify({file: this.addProductForm.value.image, upload_preset: "rgefyvke"}), {headers}).subscribe(
        (res) => {
          console.log("uploaded image", res);
          imgUrl = res.url;
          this.productService.createProduct({...this.addProductForm.value, image: res.url});
          this.submitting = false;
          this.dialogRef.close();
          // this.addProductForm.reset();
          window.location.reload();
        });

  }
  uploadFile(event: Event){
    let reader = new FileReader(); // HTML5 FileReader API
    const target  = event.target as HTMLInputElement;
    let file = target?.files?.[0];
    if (target?.files && target.files?.[0]) {
      reader.readAsDataURL(file as Blob);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.addProductForm.patchValue({ image: reader.result as string });
        this.imagePreview = (reader.result as string)?.toString();
      };
    }
  }

}

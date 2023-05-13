import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import {ProductDetail} from "../../interfaces/productdetail";

const mockData: ProductDetail = {
    "id": 4855362,
    "image": "https://cdn.aboutstatic.com/file/c0bb7f5af3520609cd3d1393d3d765fc?quality=70&progressive=true&width=800&height=800&brightness=0.95",
    "name": "WE Fashion",
    "price": "from $13.99",
    "isSoldOut": false,
    "isActive": true,
    "createdAt": "2020-07-02T13:07:56+02:00",
    "brand": "Marke",
    "isNew": true,
    "priceUnformatted": 1399
}

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent]
    });
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    component.product = mockData;
    fixture.detectChanges();
  });

  it('should display the correct name of the Product', () => {
    const productTitleElement = fixture.nativeElement.querySelector('.name');
    expect(productTitleElement.textContent).toContain(mockData.name);
  });
  it('should display the correct price of the Product', () => {
    const productPriceElement = fixture.nativeElement.querySelector('.price');
    expect(productPriceElement.textContent).toContain(mockData.price);
  });
});

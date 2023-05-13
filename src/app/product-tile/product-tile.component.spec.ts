import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileComponent } from './product-tile.component';
import {ProductDetail} from "../../interfaces/productdetail";

const mockData: ProductDetail = {
  "id": 4855363,
  "image": "https://cdn.aboutstatic.com/file/0bca496e0cbfc851cc3e7e36f0cbaf33?quality=70&progressive=true&width=800&height=800&brightness=0.95",
  "name": "REEBOK",
  "price": "from $56.60",
  "isSoldOut": false,
  "isActive": true,
  "createdAt": "2020-07-02T13:08:09+02:00",
  "brand": "Marke",
  "isNew": true,
  "priceUnformatted": 5660
}

describe('ProductTileComponent', () => {
  let component: ProductTileComponent;
  let fixture: ComponentFixture<ProductTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductTileComponent]
    });
    fixture = TestBed.createComponent(ProductTileComponent);
    component = fixture.componentInstance;
    component.product = mockData;
    fixture.detectChanges();
  });

  it('should display the correct name of the Product', () => {
    const productTitleElement = fixture.nativeElement.querySelector('mat-card-title');
    expect(productTitleElement.textContent).toContain(mockData.name);
  });
  it('should display the correct price of the Product', () => {
    const productPriceElement = fixture.nativeElement.querySelector('p');
    expect(productPriceElement.textContent).toContain(mockData.price);
  });
});

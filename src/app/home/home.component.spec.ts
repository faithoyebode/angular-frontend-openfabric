import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ProductsService} from "../../services/products.service";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [ProductsService],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render at least one product tile component', () => {
    const productTileElement = fixture.nativeElement.querySelector('app-product-tile');
    expect(productTileElement).toBeTruthy();
  });
});

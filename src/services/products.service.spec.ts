import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import {ProductDetail} from "../interfaces/productdetail";

describe('ProductsService', () => {
  let service: ProductsService;
  const mockData: ProductDetail[] = [
    {
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
    },
    {
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
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ProductsService] });
    service = TestBed.inject(ProductsService);
    service.data = mockData;
  });


  it('should return the same value as that in the data property', () => {
    expect(service.getProducts()[0]).toBe(mockData[0]);
  });

  it('should return the product that has the id passed as argument', () => {
    expect(service.getProductById(4855362)).toBe(mockData[1]);
  });

  it('should return no product i.e. an empty object', () => {
    expect(service.getProductById(234)).toEqual({});
  });
});

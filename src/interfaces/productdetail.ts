// export interface ProductDetail {
//   id?: number;
//   _id?: string;
//   image: string;
//   name: string;
//   price: number | string;
//   isSoldOut?: boolean;
//   isActive?: boolean;
//   createdAt?: string;
//   brand?: string;
//   isNew ?: boolean;
//   priceUnformatted ?: number;
// }

export interface ProductDetail {
  [key: string]: any;

}

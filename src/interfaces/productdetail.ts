export interface ProductDetail {
  id: number;
  image: string;
  name: string;
  price: string;
  isSoldOut: boolean;
  isActive: boolean;
  createdAt: string;
  brand: string;
  isNew ?: boolean;
  priceUnformatted ?: number;
}

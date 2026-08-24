export interface ProductResponseDto {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  thumbnail?: string;
  images?: string[];
  [key: string]: any;
}

export interface GetProductsResponseDto {
  products: ProductResponseDto[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateProductResponseDto {
  id: number;
  title: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
  [key: string]: any;
}

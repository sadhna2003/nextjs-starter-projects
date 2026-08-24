export interface CreateProductRequestDto {
  title: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
}

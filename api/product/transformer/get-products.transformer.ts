import { Transformer } from "@/api/base.transformer";
import { ProductResponseDto } from "../schema/get-products.response.dto";

export interface ProductUiModel {
  id: string | number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  thumbnail?: string;
}

export const getProductsTransformer: Transformer<any, ProductResponseDto, any, ProductUiModel> = {
  toResponse: (apiData: ProductResponseDto): ProductUiModel => {
    return {
      id: apiData.id,
      title: apiData.title,
      description: apiData.description,
      category: apiData.category || "Unknown",
      price: apiData.price,
      stock: apiData.stock || 0,
      thumbnail: apiData.thumbnail,
    };
  },
};

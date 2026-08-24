import { Transformer } from "@/api/base.transformer";
import { UpdateProductRequestDto } from "../schema/update-product.request.dto";
import { CreateProductResponseDto } from "../schema/create-product.response.dto";

export interface UpdateProductUiModel {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}

export interface UpdateProductResponseUiModel {
  id: string | number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
}

export const updateProductTransformer: Transformer<
  UpdateProductRequestDto,
  CreateProductResponseDto,
  UpdateProductUiModel,
  UpdateProductResponseUiModel
> = {
  toRequest: (uiData: UpdateProductUiModel): UpdateProductRequestDto => {
    return {
      title: uiData.title,
      description: uiData.description,
      price: uiData.price,
      category: uiData.category,
      stock: uiData.stock,
    };
  },

  toResponse: (apiData: CreateProductResponseDto): UpdateProductResponseUiModel => {
    return {
      id: apiData.id,
      title: apiData.title,
      price: apiData.price,
      description: apiData.description,
      category: apiData.category,
      stock: apiData.stock,
    };
  },
};

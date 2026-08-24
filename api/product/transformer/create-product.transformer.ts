import { Transformer } from "@/api/base.transformer";
import { CreateProductRequestDto } from "../schema/create-product.request.dto";
import { CreateProductResponseDto } from "../schema/create-product.response.dto";

export interface CreateProductUiModel {
  title: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
}

export interface CreateProductResponseUiModel {
  id: string | number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
}

export const createProductTransformer: Transformer<
  CreateProductRequestDto,
  CreateProductResponseDto,
  CreateProductUiModel,
  CreateProductResponseUiModel
> = {
  toRequest: (uiData: CreateProductUiModel): CreateProductRequestDto => {
    return {
      title: uiData.title,
      description: uiData.description,
      price: uiData.price,
      category: uiData.category,
      stock: uiData.stock,
    };
  },

  toResponse: (apiData: CreateProductResponseDto): CreateProductResponseUiModel => {
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

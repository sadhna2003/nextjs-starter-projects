import { fetchApi } from "../fetch-api";
import { getProductsTransformer, ProductUiModel } from "./transformer/get-products.transformer";
import { createProductTransformer, CreateProductUiModel } from "./transformer/create-product.transformer";
import { updateProductTransformer, UpdateProductUiModel } from "./transformer/update-product.transformer";
import { GetProductsResponseDto, ProductResponseDto } from "./schema/get-products.response.dto";
import { CreateProductResponseDto } from "./schema/create-product.response.dto";

interface GetProductsListUiModel {
  items: ProductUiModel[];
  total: number;
  page: number;
  pageSize: number;
}

export const productService = {
  getProducts: async (
    page: number = 0,
    limit: number = 10
  ): Promise<GetProductsListUiModel> => {
    const skip = page * limit;

    const rawResponse = await fetchApi<GetProductsResponseDto>(
      `/products?limit=${limit}&skip=${skip}`,
      {
        method: "GET",
        requiresAuth: false,
      }
    );

    const productsData = rawResponse.products || [];
    const items: ProductUiModel[] = productsData.map((product: ProductResponseDto) =>
      getProductsTransformer.toResponse!(product)
    );

    const total = rawResponse.total || items.length;

    return {
      items,
      total,
      page,
      pageSize: limit,
    };
  },

  getProductById: async (id: string | number): Promise<ProductUiModel> => {
    const rawResponse = await fetchApi<ProductResponseDto>(`/products/${id}`, {
      method: "GET",
      requiresAuth: false,
    });

    return getProductsTransformer.toResponse!(rawResponse);
  },

  getProductForEdit: async (id: string | number): Promise<ProductResponseDto> => {
    const rawResponse = await fetchApi<ProductResponseDto>(`/products/${id}`, {
      method: "GET",
      requiresAuth: false,
    });

    return rawResponse;
  },

  searchProducts: async (
    query: string,
    page: number = 0,
    limit: number = 10
  ): Promise<GetProductsListUiModel> => {
    const skip = page * limit;

    const rawResponse = await fetchApi<GetProductsResponseDto>(
      `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
      {
        method: "GET",
        requiresAuth: false,
      }
    );

    const productsData = rawResponse.products || [];
    const items: ProductUiModel[] = productsData.map((product: ProductResponseDto) =>
      getProductsTransformer.toResponse!(product)
    );

    const total = rawResponse.total || items.length;

    return {
      items,
      total,
      page,
      pageSize: limit,
    };
  },

  createProduct: async (productData: CreateProductUiModel): Promise<ProductUiModel> => {
    const requestPayload = createProductTransformer.toRequest!(productData);

    const rawResponse = await fetchApi<CreateProductResponseDto>("/products/add", {
      method: "POST",
      body: requestPayload,
      requiresAuth: true,
    });

    const transformed = createProductTransformer.toResponse!(rawResponse);
    return {
      id: transformed.id,
      title: transformed.title,
      description: transformed.description || "",
      category: transformed.category || "Unknown",
      price: transformed.price,
      stock: transformed.stock || 0,
      thumbnail: undefined,
    };
  },

  updateProduct: async (
    id: string | number,
    productData: UpdateProductUiModel
  ): Promise<ProductUiModel> => {
    const requestPayload = updateProductTransformer.toRequest!(productData);

    const rawResponse = await fetchApi<CreateProductResponseDto>(`/products/${id}`, {
      method: "PUT",
      body: requestPayload,
      requiresAuth: true,
    });

    const transformed = updateProductTransformer.toResponse!(rawResponse);
    return {
      id: transformed.id,
      title: transformed.title,
      description: transformed.description || "",
      category: transformed.category || "Unknown",
      price: transformed.price,
      stock: transformed.stock || 0,
      thumbnail: undefined,
    };
  },

  deleteProduct: async (id: string | number): Promise<void> => {
    await fetchApi<void>(`/products/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    });
  },
};

export type { GetProductsListUiModel };

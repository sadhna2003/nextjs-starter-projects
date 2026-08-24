import { Transformer } from "@/api/base.transformer";

export interface StatsResponseDto {
  totalUsers?: number;
  totalRevenue?: number;
  totalOrders?: number;
  totalProducts?: number;
  growth?: number;
  [key: string]: any;
}

export interface StatsUiModel {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  growth: number;
}

export const statsTransformer: Transformer<any, StatsResponseDto, any, StatsUiModel> = {
  toResponse: (apiData: StatsResponseDto): StatsUiModel => {
    return {
      totalUsers: apiData.totalUsers || 0,
      totalRevenue: apiData.totalRevenue || 0,
      totalOrders: apiData.totalOrders || 0,
      totalProducts: apiData.totalProducts || 0,
      growth: apiData.growth || 0,
    };
  },
};

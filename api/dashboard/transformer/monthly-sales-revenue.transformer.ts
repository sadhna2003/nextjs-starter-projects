import { Transformer } from "@/api/base.transformer";

export interface MonthlySalesRevenueResponseDto {
  labels?: string[];
  data?: number[];
  [key: string]: any;
}

export interface MonthlySalesRevenueUiModel {
  labels: string[];
  data: number[];
}

export const monthlySalesRevenueTransformer: Transformer<any, MonthlySalesRevenueResponseDto, any, MonthlySalesRevenueUiModel> = {
  toResponse: (apiData: MonthlySalesRevenueResponseDto): MonthlySalesRevenueUiModel => {
    return {
      labels: apiData.labels || [],
      data: apiData.data || [],
    };
  },
};

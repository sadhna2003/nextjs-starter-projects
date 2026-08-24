import { Transformer } from "@/api/base.transformer";

export interface QuarterlyRevenueResponseDto {
  labels?: string[];
  series?: {
    name: string;
    data: number[];
  }[];
  [key: string]: any;
}

export interface QuarterlyRevenueUiModel {
  labels: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

export const quarterlyRevenueTransformer: Transformer<any, QuarterlyRevenueResponseDto, any, QuarterlyRevenueUiModel> = {
  toResponse: (apiData: QuarterlyRevenueResponseDto): QuarterlyRevenueUiModel => {
    return {
      labels: apiData.labels || [],
      series: apiData.series || [],
    };
  },
};

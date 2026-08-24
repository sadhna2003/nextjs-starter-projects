import { Transformer } from "@/api/base.transformer";

export interface RevenueBySalesChannelResponseDto {
  labels?: string[];
  data?: number[];
  [key: string]: any;
}

export interface RevenueBySalesChannelUiModel {
  labels: string[];
  data: number[];
}

export const revenueBySalesChannelTransformer: Transformer<any, RevenueBySalesChannelResponseDto, any, RevenueBySalesChannelUiModel> = {
  toResponse: (apiData: RevenueBySalesChannelResponseDto): RevenueBySalesChannelUiModel => {
    return {
      labels: apiData.labels || [],
      data: apiData.data || [],
    };
  },
};

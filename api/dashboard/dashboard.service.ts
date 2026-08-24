import { fetchApi } from "../fetch-api";
import { statsTransformer, StatsUiModel, StatsResponseDto } from "./transformer/stats.transformer";
import { revenueBySalesChannelTransformer, RevenueBySalesChannelUiModel, RevenueBySalesChannelResponseDto } from "./transformer/revenue-by-sales-channel.transformer";
import { monthlySalesRevenueTransformer, MonthlySalesRevenueUiModel, MonthlySalesRevenueResponseDto } from "./transformer/monthly-sales-revenue.transformer";
import { quarterlyRevenueTransformer, QuarterlyRevenueUiModel, QuarterlyRevenueResponseDto } from "./transformer/quarterly-revenue.transformer";

export const dashboardService = {
  /**
   * Get dashboard stats
   * @returns Stats data with totals and metrics
   */
  getStats: async (): Promise<StatsUiModel> => {
    const rawResponse = await fetchApi<StatsResponseDto>("/dashboard/stats", {
      method: "GET",
      requiresAuth: true,
    });

    return statsTransformer.toResponse!(rawResponse);
  },

  /**
   * Get revenue by sales channel data
   * @returns Revenue breakdown by sales channel
   */
  getRevenueBySalesChannel: async (): Promise<RevenueBySalesChannelUiModel> => {
    const rawResponse = await fetchApi<RevenueBySalesChannelResponseDto>("/dashboard/revenue-by-sales-channel", {
      method: "GET",
      requiresAuth: true,
    });

    return revenueBySalesChannelTransformer.toResponse!(rawResponse);
  },

  /**
   * Get monthly sales revenue data
   * @returns Monthly sales revenue trend
   */
  getMonthlySalesRevenue: async (): Promise<MonthlySalesRevenueUiModel> => {
    const rawResponse = await fetchApi<MonthlySalesRevenueResponseDto>("/dashboard/monthly-sales-revenue", {
      method: "GET",
      requiresAuth: true,
    });

    return monthlySalesRevenueTransformer.toResponse!(rawResponse);
  },

  /**
   * Get quarterly revenue data
   * @returns Quarterly revenue breakdown by department/category
   */
  getQuarterlyRevenue: async (): Promise<QuarterlyRevenueUiModel> => {
    const rawResponse = await fetchApi<QuarterlyRevenueResponseDto>("/dashboard/quarterly-revenue", {
      method: "GET",
      requiresAuth: true,
    });

    return quarterlyRevenueTransformer.toResponse!(rawResponse);
  },
};

export type {
  StatsUiModel,
  StatsResponseDto,
  RevenueBySalesChannelUiModel,
  RevenueBySalesChannelResponseDto,
  MonthlySalesRevenueUiModel,
  MonthlySalesRevenueResponseDto,
  QuarterlyRevenueUiModel,
  QuarterlyRevenueResponseDto,
};

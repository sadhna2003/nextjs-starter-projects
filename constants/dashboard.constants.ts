import {
  StatsUiModel,
  RevenueBySalesChannelUiModel,
  MonthlySalesRevenueUiModel,
  QuarterlyRevenueUiModel,
} from "@/api/dashboard/dashboard.service";

export const DUMMY_DASHBOARD_DATA = {
  stats: {
    totalUsers: 2453,
    totalRevenue: 45230,
    totalOrders: 1234,
    totalProducts: 567,
    growth: 12,
  } as StatsUiModel,

  revenueBySalesChannel: {
    labels: ["Online Store", "Retail", "Wholesale", "Direct Sales"],
    data: [8500, 5230, 6750, 4200],
  } as RevenueBySalesChannelUiModel,

  monthlySalesRevenue: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [4200, 5100, 6800, 7200, 8500, 9200, 8900, 9800, 10200, 11500, 12100, 13200],
  } as MonthlySalesRevenueUiModel,

  quarterlyRevenue: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    series: [
      {
        name: "Product Sales",
        data: [15200, 18500, 21300, 24800],
      },
      {
        name: "Service Revenue",
        data: [8900, 10200, 11500, 13200],
      },
      {
        name: "Subscriptions",
        data: [5400, 6100, 7200, 8500],
      },
    ],
  } as QuarterlyRevenueUiModel,
};

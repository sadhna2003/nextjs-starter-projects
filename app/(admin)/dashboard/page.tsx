"use client";

import { PageTitle } from "@/components/common/PageTitle";
import { StatsCard } from "@/components/common/StatsCard";
import { Users, TrendingUp, ShoppingCart, Package } from "lucide-react";
import DashboardChart from "@/components/common/DashboardChart";
import { useMemo } from "react";
import { DUMMY_DASHBOARD_DATA } from "@/constants/dashboard.constants";

export default function DashboardPage() {
  // Using dummy data for now
  const stats = DUMMY_DASHBOARD_DATA.stats;
  const statsLoading = false;

  const revenueBySalesChannel = DUMMY_DASHBOARD_DATA.revenueBySalesChannel;
  const revenueChannelLoading = false;

  const monthlySalesRevenue = DUMMY_DASHBOARD_DATA.monthlySalesRevenue;
  const monthlySalesLoading = false;

  const quarterlyRevenue = DUMMY_DASHBOARD_DATA.quarterlyRevenue;
  const quarterlyRevenueLoading = false;

  // Memoized chart options
  const pieChartOption = useMemo(() => ({
    tooltip: {
      trigger: "item" as const,
      formatter: "{b}: ${c}",
    },
    legend: {
      orient: "vertical" as const,
      left: "left",
    },
    series: [
      {
        name: "Revenue by Sales Channel",
        type: "pie" as const,
        radius: "50%",
        data: (revenueBySalesChannel?.labels || []).map((label, index) => ({
          value: revenueBySalesChannel?.data?.[index] || 0,
          name: label,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  } as any), [revenueBySalesChannel]);

  const lineChartOption = useMemo(() => ({
    tooltip: {
      trigger: "axis" as const,
      formatter: '{b0}: ${c0}',
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category" as const,
      data: monthlySalesRevenue?.labels || [],
      boundaryGap: false,
    },
    yAxis: {
      type: "value" as const,
    },
    series: [
      {
        data: monthlySalesRevenue?.data || [],
        type: "line" as const,
        smooth: true,
      },
    ],
  } as any), [monthlySalesRevenue]);

  const barChartOption = useMemo(() => ({
    tooltip: {
      trigger: "axis" as const,
      axisPointer: {
        type: "shadow" as const,
      },
      formatter: "{b}<br/>{a}: ${c}",
    },
    legend: {
      data: (quarterlyRevenue?.series || []).map((s) => s.name),
      bottom: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category" as const,
      data: quarterlyRevenue?.labels || [],
    },
    yAxis: {
      type: "value" as const,
    },
    series: (quarterlyRevenue?.series || []).map((s) => ({
      name: s.name,
      data: s.data,
      type: "bar" as const,
      stack: "total",
    })),
  } as any), [quarterlyRevenue]);

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Dashboard" 
        description="Welcome back! Here's your business overview."
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={<Users />}
          growth={stats?.growth || 0}
          isLoading={statsLoading}
        />
        <StatsCard
          title="Total Revenue"
          value={stats?.totalRevenue || 0}
          icon={<TrendingUp />}
          growth={stats?.growth || 0}
          isLoading={statsLoading}
        />
        <StatsCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={<ShoppingCart />}
          growth={stats?.growth || 0}
          isLoading={statsLoading}
        />
        <StatsCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          icon={<Package />}
          growth={stats?.growth || 0}
          isLoading={statsLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart 
          title="Revenue by Sales Channel"
          labels={revenueBySalesChannel?.labels || []}
          series={[]}
          option={pieChartOption}
          isLoading={revenueChannelLoading}
        />
         
        <DashboardChart 
          title="Monthly Sales Revenue"
          labels={monthlySalesRevenue?.labels || []}
          series={[]}
          option={lineChartOption}
          isLoading={monthlySalesLoading}
        />
        
      </div>

      {/* Quarterly Revenue Chart */}
      <div>
        <DashboardChart 
          title="Quarterly Revenue"
          labels={quarterlyRevenue?.labels || []}
          series={quarterlyRevenue?.series || []}
          option={barChartOption}
          isLoading={quarterlyRevenueLoading}
        />
      </div>
    </div>
  );  
}
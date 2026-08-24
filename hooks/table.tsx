"use client";
import { useMemo } from 'react';
import { Skeleton } from "@/components/core/ui/skeleton";

export const useTableColumns = (columns: any, isLoading = false) => {
  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column: any) => ({
          ...column,
          cell: () => <Skeleton className="w-full h-5" />,
        }))
        : columns,
    [isLoading, columns]
  );
  return tableColumns;
};

export const useTableData = (data: any, isLoading = false, placeholderCount = 10) => {
  const tableData = useMemo(
    () => (isLoading ? Array(placeholderCount).fill({}) : data?.data?.items),
    [isLoading, data]
  );

  return tableData;
};
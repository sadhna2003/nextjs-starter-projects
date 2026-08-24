"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/core/ui/button";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/api/product/product.service";
import { ProductUiModel } from "@/api/product/transformer/get-products.transformer";
import { useToast } from "@/components/core/ui/use-toast";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Loader2 } from "lucide-react";
import { ActionsDropdown } from "@/components/common/ActionsDropdown";
import { ProductCard } from "@/components/common/ProductCard";
import { MobilePagination } from "@/components/common/MobilePagination";

const Page = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | number | null>(
    null,
  );

  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      productService.getProducts(pagination.pageIndex, pagination.pageSize),
  });

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: (id: string | number) => productService.deleteProduct(id),
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Product deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error?.message || "Failed to delete product.",
      });
      setDeleteDialogOpen(false);
    },
  });

  const handleEdit = (id: string | number) => {
    router.push(`/products/edit?id=${id}`);
  };

  const handleDelete = (id: string | number) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
    }
  };

  const columns: ColumnDef<ProductUiModel>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="w-12">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return <span className="capitalize">{category}</span>;
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price") as number;
        return <span>${price.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.getValue("stock") as number;
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              stock > 10
                ? "bg-green-100 text-green-800"
                : stock > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {stock}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <ActionsDropdown
            id={product.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      },
    },
  ];

  const totalPages = data?.total
    ? Math.ceil(data.total / pagination.pageSize)
    : 0;

  if (isError) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Failed to load products. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your store products
          </p>
        </div>
        <Link href="/products/add">
          <Button>Add Product</Button>
        </Link>
      </div>

      <div className="space-y-2 lg:block hidden">
        <DataTable
          columns={columns}
          data={data?.items || []}
          isLoading={isLoading}
          skeletonRowCount={10}
          manualPagination={true}
          pageCount={totalPages}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      </div>

      <div className="lg:hidden block space-y-4">
        {isLoading ? (
          <div className="h-64 flex flex-col justify-center items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {(data?.items || []).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                category={product.category}
                price={product.price}
                stock={product.stock}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
            <MobilePagination
              pagination={pagination}
              onPaginationChange={setPagination}
              pageCount={totalPages}
              totalItems={data?.total || 0}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
};

export default Page;

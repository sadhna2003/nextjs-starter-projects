"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import productFormSchema from "@/schema/product-form.schema";
import { ProductFormValue } from "@/types/product-form";
import { FormInput } from "@/components/form/FormInput";
import { Form } from "@/components/core/ui/form";
import { Button } from "@/components/core/ui/button";
import { useToast } from "@/components/core/ui/use-toast";
import { PageTitle } from "@/components/common/PageTitle";
import { productService } from "@/api/product/product.service";
import { Loader2 } from "lucide-react";

export default function EditProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const productId = searchParams.get("id");

  const form = useForm<ProductFormValue>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
    },
  });

  const { data: productData, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductForEdit(productId as string),
    enabled: !!productId,
  });

  useEffect(() => {
    if (productData && !isLoadingProduct) {
      form.reset({
        title: productData.title,
        description: productData.description || "",
        price: productData.price,
        category: productData.category || "",
        stock: productData.stock || 0,
      });
    }
  }, [form, productData, isLoadingProduct]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductFormValue) => productService.updateProduct(productId as string, data),
    onSuccess: (data: any) => {
      toast({
        variant: "success",
        description: "Product updated successfully!",
      });
      router.push("/products");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error?.message || "Failed to update product.",
      });
    },
  });

  const onSubmit = (data: ProductFormValue) => {
    mutate(data);
  };

  if (!productId) {
    return (
      <div className="container p-4">
        <p className="text-red-500">Product ID is missing.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl">
      <div className="space-y-6">
        <PageTitle
          title="Edit Product"
          description="Update the product details below."
          isLoading={isLoadingProduct}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-lg border">
            <FormInput
              name="title"
              label="Title"
              placeholder="Enter product title"
              required
            />

            <FormInput
              name="description"
              label="Description"
              placeholder="Enter product description"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="price"
                label="Price"
                type="number"
                placeholder="0.00"
                required
              />
              <FormInput
                name="stock"
                label="Stock"
                type="number"
                placeholder="0"
                required
              />
            </div>

            <FormInput
              name="category"
              label="Category"
              placeholder="Enter category (e.g. beauty)"
              required
            />

            <div className="flex gap-4 pt-4 w-full">
              <Button type="submit" disabled={isPending || isLoadingProduct}>
                Update Product
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isPending || isLoadingProduct}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

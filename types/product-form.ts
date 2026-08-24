import { z } from "zod";
import productFormSchema from "@/schema/product-form.schema";

export type ProductFormValue = z.infer<typeof productFormSchema>;

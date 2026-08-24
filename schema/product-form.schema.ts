import { z } from "zod";

const productFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must not exceed 100 characters." }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, { message: "Price must be a positive number." }),
  category: z.string().min(1, { message: "Category is required." }),
  stock: z.coerce.number().int().min(0, { message: "Stock must be a positive integer." }),
});

export default productFormSchema;

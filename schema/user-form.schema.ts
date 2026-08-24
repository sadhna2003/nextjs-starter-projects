import * as z from "zod";

const userFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  phone: z.string().optional().default(""),
  role: z.string().min(1, { message: "Role is required" }),
});

export default userFormSchema;

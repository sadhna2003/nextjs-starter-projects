import * as z from "zod";

const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, { message: "Old password is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
      message: "Password must contain at least one uppercase letter and one special character",
    }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
}).refine((obj) => obj.password === obj.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default changePasswordSchema;

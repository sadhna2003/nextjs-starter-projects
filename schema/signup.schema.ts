import * as z from "zod";

const signupSchema = z.object({
    firstName: z.string().trim().min(1, { message: "Please enter a name" }),
    lastName: z.string().trim().min(1, { message: "Please enter a name" }),
    email: z
      .string()
      .email({ message: "Email is required" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Invalid email address",
      }),
    phNo: z
      .coerce.number()
      .min(1000000000, { message: "Phone number should be 10 digits" })
      .max(9999999999, { message: "Phone number is not more than 10 digits" }),
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
    path: ["confirmPassword"], // this value is concatenated to the end of the actual path of the error
});

export default signupSchema;

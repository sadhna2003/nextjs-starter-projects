import * as z from "zod";

const resetPasswordSchema = z.object({
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

export default resetPasswordSchema;
import signupSchema from "./signup.schema";
import * as z from "zod";
const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email({ message: "Email is required" })
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
            message: "Invalid email address",
        }),
});

export default forgotPasswordSchema;
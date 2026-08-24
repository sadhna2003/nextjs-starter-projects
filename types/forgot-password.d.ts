import forgotPasswordSchema from "@/schema/forgot-password.schema";
import * as z from "zod";

export type ForgotPasswordValue = z.infer<typeof forgotPasswordSchema>;
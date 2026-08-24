import * as z from "zod";
import resetPasswordSchema from "./reset-password.schema";

export type ResetPasswordValue = z.infer<typeof resetPasswordSchema>;
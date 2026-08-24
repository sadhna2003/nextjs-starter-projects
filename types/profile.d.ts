import updateProfileSchema from "@/schema/update-profile.schema";
import changePasswordSchema from "@/schema/change-password.schema";
import { z } from "zod";

export type UpdateProfileFormValue = z.infer<typeof updateProfileSchema>;
export type ChangePasswordFormValue = z.infer<typeof changePasswordSchema>;

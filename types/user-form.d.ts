import userFormSchema from "@/schema/user-form.schema";
import { z } from "zod";

export type UserFormValue = z.infer<typeof userFormSchema>;

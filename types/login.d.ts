import loginSchema from "@/schema/login.schema";
import { z } from "zod";

export type LoginValue = z.infer<typeof loginSchema>
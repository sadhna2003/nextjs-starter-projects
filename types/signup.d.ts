import signupSchema from "@/schema/signup.schema";
import { z } from "zod";

export type SingnupValue = z.infer<typeof signupSchema>
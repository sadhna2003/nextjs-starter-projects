import registrationSchema from "@/schema/registration.schema";
import { z } from "zod";

export type RegistrationValue = z.infer<typeof registrationSchema>
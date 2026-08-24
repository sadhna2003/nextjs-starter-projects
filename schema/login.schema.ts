import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    // username: z
    //     .string()
    //     .email({ message: "Email is required" })
    //     .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    //         message: "Invalid email address",
    //     }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
});




export default loginSchema;

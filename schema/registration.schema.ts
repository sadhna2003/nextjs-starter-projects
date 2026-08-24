import { z } from "zod";

const registrationSchema = z.object({
  fname: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long." })
    .max(30, { message: "First name must be less than 30 characters long." })
    .regex(/^[A-Z]/, { message: "First name must start with an uppercase letter." }),
  lname: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long." })
    .max(30, { message: "Last name must be less than 30 characters long." })
    .regex(/^[A-Z]/, { message: "Last name must start with an uppercase letter." }),
  phoneNo: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits long." })
    .regex(/^[6-9]\d{9}$/, { message: "Phone number must be a valid Indian mobile number." }),
  email: z
    .string()
    .email({ message: "Email must be a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/\d/, { message: "Password must contain at least one digit." })
    .regex(/[^a-zA-Z0-9*]/, { message: "Password must contain at least one special character (excluding *)." }),
  confirmPassword: z
    .string()
}).refine((obj) => obj.password === obj.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // this value is concatenated to the end of the actual path of the error
})

export default registrationSchema ;
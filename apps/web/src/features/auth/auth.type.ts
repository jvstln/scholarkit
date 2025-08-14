import type z from "zod";
import { loginSchema, registerSchema } from "./auth.schema";

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

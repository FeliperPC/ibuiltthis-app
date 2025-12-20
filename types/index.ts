import { products } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

// this actually infers and returns the type from the schema
export type Product = InferSelectModel<typeof products>;

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
};


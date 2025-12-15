import { products } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

// this actually infers and returns the type from the schema
export type Product = InferSelectModel<typeof products>;
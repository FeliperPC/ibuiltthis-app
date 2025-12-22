"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { Product } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// instead of passing the whole product type, validate it just pass the id type
export async function approveProductAction(productId: Product["id"]) {
  try {
    await db
      .update(products)
      .set({
        status: "approved",
        approvedAt: new Date(),
      })
      .where(eq(products.id, productId));
    revalidatePath("/admin");
    return {
      success: true,
      message: "Product approved successfully",
    };
  } catch (error) {
    console.log("Error approving product:", error);
    return {
      success: false,
      message: "Failed to approve product",
    };
  }
}

export async function rejectProductAction(productId: Product["id"]) {
  try {
    await db
      .update(products)
      .set({
        status: "rejected",
      })
      .where(eq(products.id, productId));
    revalidatePath("/admin");
    return {
      success: true,
      message: "Product rejected successfully",
    };
  } catch (error) {
    console.log("Error rejecting product:", error);
    return {
      success: false,
      message: "Failed to reject product",
    };
  }
}

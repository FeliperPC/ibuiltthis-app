import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";

export async function getFeaturedProducts() {
  "use cache" // Cache result in server memory: subsequent calls return the cached value.
  // This cache does NOT auto-update on DB changes; it lasts until the server restarts,
  // code changes, or you explicitly revalidate.
  const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));
  return productsData;
}

export async function getAllApprovedProducts() {
  const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));
  return productsData;
}

export async function getAllProducts() {
  const productsData = await db
    .select()
    .from(products)
    .orderBy(desc(products.voteCount));
  return productsData;
}


export async function getRecentlyLaunchedProducts() {
  await connection() // this function indicate that the rendering should wait the promise to finish
  const productsData = await getAllApprovedProducts();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return productsData.filter(
    (product) =>
      product.createdAt &&
      new Date(product.createdAt.toISOString()) >= oneWeekAgo
  );
}

"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validations";
import { db } from "@/db";
import { products } from "@/db/schema";
import z from "zod";
import { FormState } from "@/types";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addProductAction = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    // authentication
    const { userId } = await auth();
    const user = await currentUser();
    const userEmail = user
      ? user.primaryEmailAddress?.emailAddress
      : "anonymous";
    if (!userId) {
      return {
        success: false,
        message: "You must loggin",
      };
    }
    // extract the formData
    const rawData = Object.fromEntries(formData.entries());

    // validation
    const validatedData = productSchema.safeParse(rawData);
    // the validatedData returns the success key

    if (!validatedData.success) {
      // this returns an object of arrays, the keys are the fields and the values are the errors messages ex : [{name:['name is required']}]
      const errors = validatedData.error.flatten().fieldErrors;
      return {
        success: false,
        errors: errors,
        message: "Invalid data",
      };
    }

    // transform the data to insert
    const { name, slug, tagline, tags, websiteUrl, description } =
      validatedData.data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    // create request drizzle
    await db.insert(products).values({
      name,
      slug,
      description,
      tagline,
      tags: tagsArray,
      websiteUrl,
      status: "pending",
      submittedBy: userEmail,
      userId,
    });

    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed soon",
    };
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed, please check the form",
      };
    }
    return {
      success: false,
      errors: { error: ["Error on submit"] },
      message: "Failed to submit product",
    };
  }
};

export const upvoteProductAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "You must loggin",
      };
    }
    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to vote",
      };
    }

    await db
      .update(products)
      .set({
        voteCount: sql`GREATEST(0, vote_count +1)`,
      })
      .where(eq(products.id, productId));
    // The featuredToday componnet is cached, with this function bellow it reload the cashe
    revalidatePath("/");
    return {
      success: true,
      message: "Product upvoted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to upvote product",
      votecount: 0,
    };
  }
};

export const downvoteProductAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "You must loggin",
      };
    }
    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to vote",
      };
    }

    await db
      .update(products)
      .set({
        voteCount: sql`GREATEST(0, vote_count -1)`,
      })
      .where(eq(products.id, productId));
    // The featuredToday componnet is cached, with this function bellow it reload the cashe
    revalidatePath("/");
    return {
      success: true,
      message: "Product downvoted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to downvote product",
      votecount: 0,
    };
  }
};

export async function getProductBySlug(slug: string) {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug));
  return product[0];
}

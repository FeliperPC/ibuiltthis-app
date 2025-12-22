import { Loader2Icon, SparklesIcon } from "lucide-react";
import { FormField } from "../forms/form-field";
import { Button } from "../ui/button";
import { addProductAction } from "@/lib/products/product-actions";
import { useActionState } from "react";
import { FormState } from "@/types";
import { cn } from "@/lib/utils";

// Before the server action run this is the inital state, that is the value of state in the hook declaration
const initialState: FormState = {
  success: false,
  errors: undefined,
  message: "",
};

export default function ProductSubmitForm() {
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState
  );

  const { errors, message, success } = state;

  return (
    <form className="space-y-6" action={formAction}>
      {message && (
        <div
          className={cn(
            "p-4 rounded-lg border",
            success
              ? "bg-primary/10 border-primary text-primary"
              : "bg-destructive/10 border-destructive text-destructive"
          )}
          role="alert"
          aria-live="polite"
        >
          {message}
        </div>
      )}
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder="My Awesome Product"
        required
        onChange={() => {}}
        error={errors?.name ?? []}
      />
      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="my-awesome-product"
        required
        onChange={() => {}}
        helperText="URL-friendly version of your product name"
        error={errors?.slug ?? []}
      />

      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="A brief, catchy description"
        required
        onChange={() => {}}
        error={errors?.tagline ?? []}
      />

      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="Tell us more about your product..."
        required
        onChange={() => {}}
        textarea
        error={errors?.description ?? []}
      />

      <FormField
        label="Website URL"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="https://yourproduct.com"
        required
        onChange={() => {}}
        error={errors?.websiteUrl ?? []}
        helperText="Enter your product's website or landing page"
      />
      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="AI, Productivity, SaaS"
        required
        onChange={() => {}}
        error={errors?.tags ?? []}
        helperText="Comma-separated tags (e.g., AI, SaaS, Productivity)"
      />

      <Button className="w-full" size="lg" type="submit">
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <>
            <SparklesIcon className="size-4" />
            Submit Product
          </>
        )}
      </Button>
    </form>
  );
}

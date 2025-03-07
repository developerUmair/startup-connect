"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState, formData) => {
    // In your handleFormSubmit function:
    try {
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        link: formData.get("link"),
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log("Form validated successfully:", formValues);

      // Uncomment and fix this when ready:
      const result = await createPitch(prevState, formData, pitch);
      console.log("Submitted");
      console.log("Submitted", result);

      router.push(`/startup/${result?._id}`);
      return result;
    } catch (error) {
      console.error("Validation error:", error);

      if (error instanceof z.ZodError) {
        // Format errors properly for return to client
        const fieldErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          fieldErrors[field] = err.message;
        });

        // Return the errors to be available in the 'state' variable
        return {
          status: "ERROR",
          error: "Validation failed",
          fieldErrors,
        };
      }

      return {
        status: "ERROR",
        error: "An unexpected error occurred",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          placeholder="Startup Title"
        />
        {state?.fieldErrors?.title && (
          <p className="startup-form_error">{state?.fieldErrors?.title}</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea max-h-40"
          placeholder="Startup Description"
        />
        {state?.fieldErrors?.description && (
          <p className="startup-form_error">
            {state?.fieldErrors?.description}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          placeholder="Startup Category (Tech, Health, Education)"
        />
        {state?.fieldErrors?.category && (
          <p className="startup-form_error">{state?.fieldErrors?.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          placeholder="Startup Image URL"
        />
        {state?.fieldErrors?.link && (
          <p className="startup-form_error">{state?.fieldErrors?.link}</p>
        )}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          id="pitch"
          preview="edit"
          onChange={(value) => setPitch(value)}
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea, and what problem it solves.",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        <MDEditor.Markdown source={pitch} style={{ whiteSpace: "pre-wrap" }} />
        {state?.fieldErrors?.pitch && (
          <p className="startup-form_error">{state?.fieldErrors?.pitch}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="startup-form_btn">
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;

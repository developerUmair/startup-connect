// "use client";

// import { useActionState, useState } from "react";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import MDEditor from "@uiw/react-md-editor";
// import { Button } from "./ui/button";
// import { Send } from "lucide-react";
// import { formSchema } from "@/lib/validation";
// import { z } from "zod";
// import { useRouter } from "next/navigation";
// import { createPitch } from "@/lib/actions";

// const StartupForm = () => {
//   const [errors, setErrors] = useState({});
//   const [pitch, setPitch] = useState("");
//   const router = useRouter();

//   const handleFormSubmit = async (prevState, formData) => {
//     // In your handleFormSubmit function:
//     try {
//       const formValues = {
//         title: formData.get("title"),
//         description: formData.get("description"),
//         category: formData.get("category"),
//         link: formData.get("link"),
//         pitch,
//       };

//       await formSchema.parseAsync(formValues);
//       console.log("Form validated successfully:", formValues);

//       // Uncomment and fix this when ready:
//       const result = await createPitch(prevState, formData, pitch);
//       console.log("Submitted");
//       console.log("Submitted", result);

//       router.push(`/startup/${result?._id}`);
//       return result;
//     } catch (error) {
//       console.error("Validation error:", error);

//       if (error instanceof z.ZodError) {
//         // Format errors properly for return to client
//         const fieldErrors = {};
//         error.errors.forEach((err) => {
//           const field = err.path[0];
//           fieldErrors[field] = err.message;
//         });

//         // Return the errors to be available in the 'state' variable
//         return {
//           status: "ERROR",
//           error: "Validation failed",
//           fieldErrors,
//         };
//       }

//       return {
//         status: "ERROR",
//         error: "An unexpected error occurred",
//       };
//     }
//   };

//   const [state, formAction, isPending] = useActionState(handleFormSubmit, {
//     error: "",
//     status: "INITIAL",
//   });

//   return (
//     <form action={formAction} className="startup-form">
//       <div>
//         <label htmlFor="title" className="startup-form_label">
//           Title
//         </label>
//         <Input
//           id="title"
//           name="title"
//           className="startup-form_input"
//           placeholder="Startup Title"
//         />
//         {state?.fieldErrors?.title && (
//           <p className="startup-form_error">{state?.fieldErrors?.title}</p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="description" className="startup-form_label">
//           Description
//         </label>
//         <Textarea
//           id="description"
//           name="description"
//           className="startup-form_textarea max-h-40"
//           placeholder="Startup Description"
//         />
//         {state?.fieldErrors?.description && (
//           <p className="startup-form_error">
//             {state?.fieldErrors?.description}
//           </p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="category" className="startup-form_label">
//           Category
//         </label>
//         <Input
//           id="category"
//           name="category"
//           className="startup-form_input"
//           placeholder="Startup Category (Tech, Health, Education)"
//         />
//         {state?.fieldErrors?.category && (
//           <p className="startup-form_error">{state?.fieldErrors?.category}</p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="link" className="startup-form_label">
//           Image URL
//         </label>
//         <Input
//           id="link"
//           name="link"
//           className="startup-form_input"
//           placeholder="Startup Image URL"
//         />
//         {state?.fieldErrors?.link && (
//           <p className="startup-form_error">{state?.fieldErrors?.link}</p>
//         )}
//       </div>
//       <div data-color-mode="light">
//         <label htmlFor="pitch" className="startup-form_label">
//           Pitch
//         </label>
//         <MDEditor
//           value={pitch}
//           id="pitch"
//           preview="edit"
//           onChange={(value) => setPitch(value)}
//           height={300}
//           style={{ borderRadius: 20, overflow: "hidden" }}
//           textareaProps={{
//             placeholder:
//               "Briefly describe your idea, and what problem it solves.",
//           }}
//           previewOptions={{
//             disallowedElements: ["style"],
//           }}
//         />
//         <MDEditor.Markdown source={pitch} style={{ whiteSpace: "pre-wrap" }} />
//         {state?.fieldErrors?.pitch && (
//           <p className="startup-form_error">{state?.fieldErrors?.pitch}</p>
//         )}
//       </div>
//       <Button type="submit" disabled={isPending} className="startup-form_btn">
//         {isPending ? "Submitting..." : "Submit Your Pitch"}
//         <Send className="size-6 ml-2" />
//       </Button>
//     </form>
//   );
// };

// export default StartupForm;



"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send, Image } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState({});
  const [pitch, setPitch] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleFormSubmit = async (prevState, formData) => {
    try {
      // Validate basic form fields first
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        pitch,
      };

      // If no image is selected, return error
      if (!imageFile) {
        return {
          status: "ERROR",
          error: "Please select an image",
          fieldErrors: {
            image: "Please select an image"
          }
        };
      }

      // Begin upload process
      setIsUploading(true);
      
      // Create new FormData for image upload
      const imageFormData = new FormData();
      imageFormData.append('file', imageFile);
      
      // Upload the image to Sanity through our server action
      const response = await fetch('/api/auth/upload', {
        method: 'POST',
        body: imageFormData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload image');
      }
      
      const imageData = await response.json();
      setIsUploading(false);
      
      // Now create a new FormData with all the form values including the image URL
      const submitFormData = new FormData();
      for (const [key, value] of formData.entries()) {
        if (key !== 'image') { // Exclude the file input
          submitFormData.append(key, value);
        }
      }
      submitFormData.append('link', imageData.url); // Use 'link' as that's what your schema expects
      
      // Submit the form with the image URL
      const result = await createPitch(prevState, submitFormData, pitch);
      console.log("Submitted", result);

      router.push(`/startup/${result?._id}`);
      return result;
      
    } catch (error) {
      console.error("Error:", error);
      setIsUploading(false);

      if (error instanceof z.ZodError) {
        // Format errors properly for return to client
        const fieldErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          fieldErrors[field] = err.message;
        });

        return {
          status: "ERROR",
          error: "Validation failed",
          fieldErrors,
        };
      }

      return {
        status: "ERROR",
        error: error.message || "An unexpected error occurred",
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
      
      {/* Image Upload Section - Replacing Link Input */}
      <div>
        <label htmlFor="image" className="startup-form_label">
          Startup Image
        </label>
        <div className="flex flex-col gap-2">
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="border-2 border-black h-12"
            onChange={handleImageChange}
          />
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-2 relative rounded-md overflow-hidden border border-gray-200">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-60 w-full object-contain bg-gray-50" 
              />
            </div>
          )}
          
          {state?.fieldErrors?.image && (
            <p className="startup-form_error">{state?.fieldErrors?.image}</p>
          )}
        </div>
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
      <Button 
        type="submit" 
        disabled={isPending || isUploading || !imageFile} 
        className="startup-form_btn"
      >
        {isPending || isUploading ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
      
      {state?.error && !state?.fieldErrors && (
        <p className="startup-form_error mt-4">{state.error}</p>
      )}
    </form>
  );
};

export default StartupForm;
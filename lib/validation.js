// import { z } from "zod";

// export const formSchema = z.object({
//   title: z
//     .string()
//     .min(3, { message: "Title must be at least 3 characters long" })
//     .max(100, { message: "Title cannot exceed 100 characters" }),

//   description: z
//     .string()
//     .min(3, { message: "Description must be at least 3 characters long" })
//     .max(1000, { message: "Description cannot exceed 1000 characters" }),

//   category: z
//     .string()
//     .min(3, { message: "Category must be at least 3 characters long" })
//     .max(20, { message: "Category cannot exceed 20 characters" }),

//   // link: z.string()
//   //   .url({ message: "Please enter a valid URL" })
//   //   .refine(async (url) => {
//   //     try {
//   //       const res = await fetch(url, { method: "HEAD" });
//   //       const contentType = res.headers.get("content-type");
//   //       return contentType?.startsWith("image/")
//   //     } catch {
//   //       return false;
//   //     }
//   //   }, { message: "URL must point to a valid image" }),
//   link: z
//     .string()
//     .url({ message: "Please enter a valid URL" })
//     .refine(
//       (url) => {
//         // Basic check for common image extensions
//         return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
//       },
//       { message: "URL must point to an image file" }
//     ),
//   pitch: z
//     .string()
//     .min(10, { message: "Pitch must be at least 10 characters long" }),
// });




import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(1000, { message: "Description cannot exceed 1000 characters" }),
  
  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters long" })
    .max(20, { message: "Category cannot exceed 20 characters" }),
  
  // For Sanity uploaded image URL
  imageUrl: z
    .string()
    .url({ message: "Invalid image URL" }),
  
  pitch: z
    .string()
    .min(10, { message: "Pitch must be at least 10 characters long" }),
});
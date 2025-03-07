// "use server";
// import { auth } from "@/auth";
// import { parseServerActionResponse } from "@/lib/utils";
// import slugify from "slugify";
// import { writeClient } from "@/sanity/lib/writeClient";

// export const createPitch = async (state, form, pitch) => {
//   const session = await auth();

//   if (!session)
//     return parseServerActionResponse({
//       error: "Not signed in.",
//       status: "ERROR",
//     });

//   const { title, description, category, link } = Object.fromEntries(
//     Array.from(form).filter(([key]) => key !== "pitch")
//   );

//   const slug = slugify(title, { lower: true, strict: true });

//   try {
//     const startup = {
//       title,
//       description,
//       category,
//       image,
//       slug: {
//         _type: slug,
//         current: slug,
//       },
//       author: {
//         _type: "reference",
//         _ref: session?.id,
//       },
//       pitch,
//     };

//     const result = await writeClient.create({ _type: "startup" }, ...startup);
//     return parseServerActionResponse({
//       ...result,
//       error: "",
//       status: "SUCCESS",
//     });
//   } catch (error) {
//     console.log(error);

//     return parseServerActionResponse({
//       error: JSON.stringify(error),
//       status: "ERROR",
//     });
//   }
// };



"use server";
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/writeClient";

export const createPitch = async (state, form, pitch) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in.",
      status: "ERROR",
    });

  // Check if form is FormData before trying to iterate
  if (!(form instanceof FormData)) {
    console.error("Expected FormData object, got:", form);
    return parseServerActionResponse({
      error: "Invalid form data",
      status: "ERROR",
    });
  }

  // Get form data
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const startup = {
      _type: "startup", // Move the type here
      title,
      description,
      category,
      image: link, // Use 'link' for image URL
      slug: {
        _type: "slug", // Fixed to string "slug" instead of variable
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    // Pass the full document to create
    const result = await writeClient.create(startup);
    
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { client } from "@/sanity/lib/client";
// import { writeClient } from "@/sanity/lib/writeClient";
// import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({
//       user: { name, email, image },
//       profile: { sub, given_name },
//     }) {
//       const existingUser = await client
//         .withConfig({ useCdn: false })
//         .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
//           id: sub, // Google's unique user ID
//         });

//       if (!existingUser) {
//         await writeClient.create({
//           _type: "author",
//           _id: sub, // Use Google's unique user ID as the _id
//           name,
//           username: given_name || name.split(" ")[0], // Use first name if available
//           email,
//           image,
//           bio: "", // Use a default or blank bio if none provided
//         });
//       }

//       return true;
//     },

//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         token.id = profile.sub; // Save Google's unique user ID to the token
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.id = token.id; // Include Google ID in session
//       return session;
//     },
//   },
// });




// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { client } from "@/sanity/lib/client";
// import { writeClient } from "@/sanity/lib/writeClient";
// import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user: { name, email, image }, profile: { sub, given_name, login } }) {
//       try {
//         // Check for existing user in Sanity
//         const existingUser = await client
//           .withConfig({ useCdn: false })
//           .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
//             id: sub, // Use Google's unique user ID
//           });

//         // If user does not exist, create a new user in Sanity
//         if (!existingUser) {
//           await writeClient.create({
//             _type: "author",
//             id: sub, // Use Google's unique user ID as the ID
//             name,
//             username: login,
//             email,
//             image,
//             bio: "", // Default or blank bio if none provided
//           });
//         } else {
//           // User exists; you can choose to update their info if needed
//           await writeClient
//             .patch(existingUser._id)
//             .set({ name, image }) // Update fields if necessary
//             .commit();
//         }

//         return true; // Allow sign-in
//       } catch (error) {
//         console.error("Error during signIn:", error);
//         return false; // Prevent sign-in on error
//       }
//     },

//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         try {
//           const user = await client
//             .withConfig({ useCdn: false })
//             .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
//               id: profile.sub, // Use Google's unique user ID
//             });

//           if (user) {
//             token.id = user._id; // Set the token ID to the user's Sanity ID
//           } else {
//             // Handle case where user is not found
//             console.error("User not found in Sanity during JWT callback");
//             throw new Error("User not found in Sanity");
//           }
//         } catch (error) {
//           console.error("Error during JWT callback:", error);
//         }
//       }

//       return token; // Return the token
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.id = token.id; // Include Google ID in session
//          session.googleId = token.googleId;
//       }

//       return session; // Return the session
//     },
//   },
// });



import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { sub, given_name, family_name, picture },
    }) {
      // Check if the user already exists in Sanity using the Google user ID
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          googleId: sub, // Pass Google ID as a parameter
        });

      // If user does not exist, create a new author in Sanity
      if (!existingUser) {
        await writeClient.create({
          _type: "author", // Make sure this matches your schema
          googleId: sub, // Store Google ID as a separate field
          name,
          username: given_name || name.split(" ")[0],
          email,
          image: picture || image,
          bio: "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Fetch the user based on Google's unique ID
        const user = await client
          ?.withConfig({ useCdn: false })
          ?.fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            googleId: profile.sub,
          });

        // If user is found, set the token ID
        if (user) {
          token.id = user._id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Attach the user ID from the token to the session
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
});


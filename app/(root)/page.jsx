// import { auth } from "@/auth";
// import SearchForm from "../../components/SearchForm";
// import StartupCard from "../../components/StartupCard";
// import { sanityFetch, SanityLive } from "../../sanity/lib/live";
// import { STARTUP_QUERY } from "../../sanity/lib/queries";
// import { Marquee3D } from "@/components/ReviewCard";
// import Faqs from "@/components/Faqs";
// import Stats from "@/components/Stats";
// import Image from "next/image";

// const Page = async ({ searchParams }) => {
//   const query = await searchParams.query;
//   const params = { search: query || null };

//   const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });
//   const session = await auth();

//   return (
//     <>
//       <section className="pink_container pattern">
//         <p className="tag tag-tri">pitch, vote and grow.</p>
//         <h1 className="heading">
//           Pitch Your Startup, <br />
//           Connect With Entrepreneurs
//         </h1>

//         <p className="sub-heading !max-w-3xl">
//           Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
//           Competitions.
//         </p>
//         <SearchForm query={query} />
//       </section>
//       <div className="section_container">
//         <p className="text-30-semibold">
//           {query ? `Search Results for "${query}"` : "All Startups"}
//         </p>

//         <ul className="mt-7 card_grid">
//           {posts?.length > 0 ? (
//             posts.map((post) => <StartupCard key={post._id} post={post} />)
//           ) : (
//             <p className="no-results">No startups found</p>
//           )}
//         </ul>

//         <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-6 p-6">
//           <div className="w-full lg:w-1/2">
//             <Marquee3D />
//           </div>

//           <div className="w-full lg:w-1/2">
//             <Image
//               src={
//                 "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/features/feature-office-long.png"
//               }
//               alt="flow-bite"
//               width={500}
//               height={300}
//               className="rounded-lg border border-gray-200 bg-white"
//             />
//           </div>
//         </div>
//         <Faqs />
//         <Stats />
//       </div>
//       <SanityLive />
//     </>
//   );
// };

// export default Page;



import { auth } from "@/auth"
import SearchForm from "../../components/SearchForm"
import StartupCard from "../../components/StartupCard"
import { sanityFetch, SanityLive } from "../../sanity/lib/live"
import { STARTUP_QUERY } from "../../sanity/lib/queries"
import { Marquee3D } from "@/components/ReviewCard"
import Faqs from "@/components/Faqs"
import Stats from "@/components/Stats"
import Image from "next/image"

const Page = async ({ searchParams }) => {
  const query = await searchParams?.query
  const params = { search: query || null }

  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params })
  const session = await auth()

  return (
    <>
      <section className="pink_container pattern">
        <p className="tag tag-tri">pitch, vote and grow.</p>
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <div className="section_container">
        <p className="text-30-semibold">{query ? `Search Results for "${query}"` : "All Startups"}</p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post._id} post={post} />)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-6 p-6 rounded-2xl my-16">
          <div className="w-full lg:w-1/2">
            <Marquee3D />
          </div>

          <div className="w-full lg:w-1/2">
            <Image
              src={
                "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/features/feature-office-long.png" ||
                "/placeholder.svg"
              }
              alt="flow-bite"
              width={500}
              height={300}
              className="rounded-lg border border-gray-200 bg-white"
            />
          </div>
        </div>
        <Faqs />
        <Stats />
      </div>
      <SanityLive />
    </>
  )
}

export default Page


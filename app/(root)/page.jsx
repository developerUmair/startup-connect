import { auth } from "@/auth";
import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";
import { client } from "../../sanity/lib/client";
import { sanityFetch, SanityLive } from "../../sanity/lib/live";
import { STARTUP_QUERY } from "../../sanity/lib/queries";

const Page = async ({ searchParams }) => {
  const query = await searchParams.query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });

  console.log(posts);

  const session = await auth();

  console.log("Session id", session)

  return (
    <>
      <section className="pink_container pattern">
        <p className="tag tag-tri">pitch, vote and grow.</p>
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <div className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post._id} post={post} />)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </div>
      <SanityLive />
    </>
  );
};

export default Page;

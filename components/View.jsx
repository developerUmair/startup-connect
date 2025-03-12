import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

const View = async ({ id }) => {
  // Fetch the current views count
  const data = await client.withConfig({ useCdn: false })?.fetch(STARTUP_VIEWS_QUERY, { id });

  if (!data || typeof data.views !== "number") {
    console.error("Error fetching views");
    return <p>Error loading views</p>;
  }

  const totalViews = data.views;

  // Increment the views count only after successfully fetching it
  try {
    await writeClient.patch(id).set({ views: totalViews + 1 }).commit();
  } catch (error) {
    console.error("Error updating views:", error);
  }

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views {totalViews}</span>
      </p>
    </div>
  );
};

export default View;

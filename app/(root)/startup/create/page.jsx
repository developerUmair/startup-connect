import { auth } from "@/auth";
import StartupForm from "../../../../components/StartupForm";
import { redirect } from "next/dist/server/api-utils";
import { url } from "inspector";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  
  return (
    <>
      <section className="pink_container pattern !min-h-[230px]">
        <p className="tag tag-tri">pitch, vote and grow.</p>
        <h1 className="heading">Submit your startup</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default Page;

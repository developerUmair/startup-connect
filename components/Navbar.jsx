import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, auth } from "../auth";
import { LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-3 md:px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          {/* <Image src="/logo.png" alt="logo" width={144} height={30} /> */}
          <h2 className="font-bold text-2xl">Startup Connect</h2>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <div className="flex items-center gap-2 md:gap-6">
              <Link
                href="/startup/create"
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary/10"
              >
                <span className="font-medium max-sm:hidden">Create</span>
                <Lightbulb className="size-5" title="Create Pitch" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary/10"
                >
                  <span className="font-medium max-sm:hidden">Logout</span>
                  <LogOut className="size-5 text-red-500" title="Logout" />
                </button>
              </form>

              <Link
                href={`/user/${session?.id}`}
                className="flex items-center transition-transform hover:scale-105"
              >
                <Avatar className="size-10 border-2 border-primary/10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback className="bg-primary/5 text-primary">
                    {session?.user?.name
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("") || "AV"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            // <form
            //   action={async () => {
            //     "use server";

            //     await signIn("google");
            //   }}
            // >
            //   <button type="submit" className="cursor-pointer">
            //     Login
            //   </button>
            // </form>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 cursor-pointer"
              >
                <span className="font-medium">Login</span>
                <LogIn
                  className="size-5 text-blue-500"
                  title="Login with Google"
                />
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

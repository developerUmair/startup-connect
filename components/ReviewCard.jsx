import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";
import Image from "next/image";

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-full max-w-xs cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-200",
        // light styles
        "border-gray-200 bg-white hover:shadow-md",
        // dark styles
        "dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
      )}
    >
      <div className="relative h-full w-full max-w-xs overflow-hidden rounded-xl p-0.5 transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br from-[rgb(238,43,105)] via-[rgb(238,43,105)] to-[#fbd443]">
        {/* Card content with inner border */}
        <div className="h-full w-full rounded-[10px] p-5 bg-white dark:bg-gray-900">
          <div className="flex flex-row items-center gap-4">
            {/* Profile image with gradient border */}
            <div className="relative h-12 w-12 rounded-full p-0.5 bg-gradient-to-r from-[rgb(238,43,105)] to-[#fbd443]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[rgb(238,43,105)] to-[#fbd443] opacity-70 blur-sm"></div>
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white dark:border-gray-800">
                <Image
                  className="h-full w-full object-cover"
                  width={48}
                  height={48}
                  alt={`${name}'s profile picture`}
                  src={img || "/placeholder.svg"}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <figcaption className="text-sm font-bold text-gray-900 dark:text-white">
                {name}
              </figcaption>
              <p className="text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-[rgb(238,43,105)] to-[#fbd443]">
                @{username}
              </p>
            </div>
          </div>

          {/* Quote mark */}
          <div className="absolute top-5 right-5 opacity-10">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V15C10 16.0609 9.57857 17.0783 8.82843 17.8284C8.07828 18.5786 7.06087 19 6 19H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V15C20 16.0609 19.5786 17.0783 18.8284 17.8284C18.0783 18.5786 17.0609 19 16 19H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Review text */}
          <blockquote className="mt-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300 relative z-10">
            {body}
          </blockquote>

          {/* Bottom decoration */}
          <div className="mt-6 flex items-center gap-2">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[rgb(238,43,105)] to-[#fbd443]"></div>
            <div className="h-1 w-3 rounded-full bg-[#fbd443] opacity-60"></div>
            <div className="h-1 w-1 rounded-full bg-[#fbd443] opacity-40"></div>
          </div>

          {/* Subtle background decoration */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-[rgb(238,43,105)]/10 to-[#fbd443]/10 blur-xl"></div>
        </div>
      </div>
    </figure>
  );
};

export async function Marquee3D() {
  const reviews = [
    {
      name: "Sam Altman",
      username: "@sama",
      body: "Startup Connect completely changed our trajectory. We wouldn't be where we are today without it.",
      img: "https://avatar.vercel.sh/sama",
    },
    {
      name: "Patrick Collison",
      username: "@patrickc",
      body: "Startup Connect gave us the confidence and network to build Stripe into what it is today.",
      img: "https://avatar.vercel.sh/patrickc",
    },
    {
      name: "Alexis Ohanian",
      username: "@alexisohanian",
      body: "Startup Connect is the best startup launchpad in the world. No competition.",
      img: "https://avatar.vercel.sh/alexisohanian",
    },
    {
      name: "Jessica Livingston",
      username: "@jessical",
      body: "The Startup Connect community is the secret weapon of every great startup.",
      img: "https://avatar.vercel.sh/jessical",
    },
  ];
  

  // Split the updated reviews into two rows
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden">
        {/* Content container */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center relative mb-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white relative">
              What Founders Say About Us
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 stroke-2 stroke-current">
                What Founders Say About Us
              </span>
            </h2>

            {/* Decorative line with theme colors */}
            <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500"></div>

            {/* Optional subtle dots */}
            <div className="mt-2 flex justify-center gap-1">
              <div className="h-1 w-3 rounded-full bg-pink-500 opacity-60"></div>
              <div className="h-1 w-1 rounded-full bg-yellow-400 opacity-40"></div>
              <div className="h-1 w-1 rounded-full bg-pink-500 opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform:
              "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(338deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </>
  );
}

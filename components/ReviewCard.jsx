import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";
import Image from "next/image"

const reviews = [
  {
    name: "Sam Altman",
    username: "sama",
    body: "YC completely changed our trajectory. We wouldn't be where we are today without it.",
    img: "https://avatar.vercel.sh/sama",
  },
  {
    name: "Patrick Collison",
    username: "patrickc",
    body: "YC gave us the confidence and network to build Stripe into what it is today.",
    img: "https://avatar.vercel.sh/patrickc",
  },
  {
    name: "Alexis Ohanian",
    username: "alexisohanian",
    body: "YC is the best startup launchpad in the world. No competition.",
    img: "https://avatar.vercel.sh/alexisohanian",
  },
  {
    name: "Jessica Livingston",
    username: "jessical",
    body: "The YC community is the secret weapon of every great startup.",
    img: "https://avatar.vercel.sh/jessical",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-full max-w-xs cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-200",
        // light styles
        "border-gray-200 bg-white hover:shadow-md",
        // dark styles
        "dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
          <Image
            className="h-full w-full object-cover"
            width={40}
            height={40}
            alt={`${name}'s profile picture`}
            src={img || "/placeholder.svg"}
          />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-[rgb(238,43,105)]">
            @{username}
          </p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {body}
      </blockquote>
      <div className="mt-4 flex items-center">
        <div className="h-1 w-12 rounded-full bg-[rgb(238,43,105)] opacity-80"></div>
      </div>
    </figure>
  );
};

export function Marquee3D() {
  return (
    <>
    <h2 className="section-heading mb-9">What Founders Say About Us</h2>
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

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Rocket,
  Lightbulb,
  Users,
  DollarSign,
  Globe,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

  // Animation trigger for stats when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateStats(true);
        }
      },
      { threshold: 0.1 }
    );

    const statsSection = document.querySelector("#stats-section");
    if (statsSection) observer.observe(statsSection);

    return () => {
      if (statsSection) observer.unobserve(statsSection);
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-10 dark:from-gray-900 dark:to-black overflow-hidden bg-gradient-to-r from-[#EE2B69] via-[#FBD443] to-[#7D3C98]">
      <div className="h-1.5 w-full bg-gradient-to-r from-[rgb(238,43,105)] via-purple-500 to-blue-500 animate-gradient-x"></div>
      {/* Animated wave with parallax effect */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform translate-y-[-50%]">
        <svg
          className="relative block w-full h-[500px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-[rgb(238,43,105)] opacity-10 dark:opacity-20"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            className="fill-[rgb(238,43,105)] opacity-5 dark:opacity-10"
          ></path>
        </svg>
      </div>

      {/* Floating elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-12 h-12 rounded-full bg-gradient-to-br from-[rgb(238,43,105)] to-purple-500 opacity-20 animate-float-slow"></div>
        <div className="absolute top-[40%] right-[10%] w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-[rgb(238,43,105)] opacity-10 animate-float-medium"></div>
        <div className="absolute bottom-[20%] left-[15%] w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-[rgb(238,43,105)] opacity-15 animate-float-fast"></div>
      </div>

      <div className="container px-6 py-16 mx-auto relative z-10">
        {/* Main footer content with glass effect */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 backdrop-blur-sm bg-white/30 dark:bg-black/30 rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-800/50">
          {/* Column 1: About with animated logo */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[rgb(238,43,105)] to-purple-600 rounded-lg shadow-lg transform transition-transform hover:scale-110 duration-300">
                <Rocket className="w-6 h-6 text-white animate-pulse" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[rgb(238,43,105)] to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(238,43,105)] to-purple-600">
                Startup Connect
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Empowering the next generation of founders to build world-changing
              companies. We invest in the most promising startups and help them
              scale.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                {
                  icon: <Github className="w-5 h-5" />,
                  color: "hover:text-gray-800 dark:hover:text-white",
                },
                {
                  icon: <Twitter className="w-5 h-5" />,
                  color: "hover:text-blue-400",
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  color: "hover:text-blue-700",
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  color: "hover:text-[rgb(238,43,105)]",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className={`text-gray-500 ${item.color} transition-all duration-300 transform hover:scale-125 hover:-translate-y-1`}
                  aria-label={`Social media link ${i + 1}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links with animated indicators */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[rgb(238,43,105)] rounded"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Programs",
                "Portfolio",
                "Events",
                "Blog",
                "Careers",
              ].map((item) => (
                <li
                  key={item}
                  className="transform transition-all duration-300 hover:-translate-y-1"
                >
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-[rgb(238,43,105)] dark:hover:text-[rgb(238,43,105)] transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-[rgb(238,43,105)] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    <span>{item}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources with hover cards */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold relative inline-block">
              Resources
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[rgb(238,43,105)] rounded"></span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  name: "Startup School",
                  icon: <Lightbulb className="w-4 h-4" />,
                },
                {
                  name: "Founder Library",
                  icon: <Globe className="w-4 h-4" />,
                },
                {
                  name: "Investment Thesis",
                  icon: <DollarSign className="w-4 h-4" />,
                },
                { name: "Success Stories", icon: <Star className="w-4 h-4" /> },
                { name: "FAQ", icon: <TrendingUp className="w-4 h-4" /> },
                { name: "Contact", icon: <Mail className="w-4 h-4" /> },
              ].map((item) => (
                <Link
                  key={item.name}
                  href="#"
                  className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gradient-to-br hover:from-[rgb(238,43,105)]/10 hover:to-purple-500/10 border border-transparent hover:border-[rgb(238,43,105)]/20 transition-all duration-300 transform hover:scale-105 hover:shadow-md group"
                >
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-500 group-hover:text-[rgb(238,43,105)] transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-[rgb(238,43,105)] transition-colors duration-300">
                      {item.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter with animated button */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold relative inline-block">
              Stay Updated
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[rgb(238,43,105)] rounded"></span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get exclusive updates on funding opportunities and startup
              insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative group">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pr-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:border-[rgb(238,43,105)] focus:ring-[rgb(238,43,105)] transition-all duration-300 group-hover:shadow-md"
                />
                <div className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-[rgb(238,43,105)] to-purple-600 opacity-0 blur transition duration-300 group-hover:opacity-30"></div>
              </div>
              <Button
                type="submit"
                className={`w-full relative overflow-hidden ${
                  subscribed
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gradient-to-r from-[rgb(238,43,105)] to-purple-600 hover:from-[rgb(218,23,85)] hover:to-purple-700"
                } text-white transition-all duration-500 hover:shadow-lg hover:shadow-[rgb(238,43,105)]/20 group`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {subscribed ? "Subscribed!" : "Subscribe"}
                  {!subscribed && (
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></span>
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom footer with animated border */}
        <div className="pt-10 mt-10 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[rgb(238,43,105)]/30 to-transparent"></div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Startup Connect. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Accessibility",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[rgb(238,43,105)] dark:hover:text-[rgb(238,43,105)] transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(238,43,105)] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

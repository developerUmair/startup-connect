import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Marquee3D } from "@/components/ReviewCard";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <div className="font-work-sans">
      <Navbar />
      {children}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-6 p-6">
        {/* Left Section - Marquee3D */}
        <div className="w-full lg:w-1/2">
          <Marquee3D />
        </div>

        {/* Right Section - Another Content */}
        <div className="w-full lg:w-1/2">
          <Image src={'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/features/feature-office-long.png'} alt="flow-bite" width={500} height={300} className="rounded-lg border border-gray-200 bg-white" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;

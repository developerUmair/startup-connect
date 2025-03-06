import { Toaster } from "sonner";
import Navbar from "../../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="font-work-sans">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;

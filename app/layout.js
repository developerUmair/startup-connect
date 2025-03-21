import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'easymde/dist/easymde.min.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Startup Connect",
  description: "Innvovate, Collaborate, and Connect with Entrepreneurs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}

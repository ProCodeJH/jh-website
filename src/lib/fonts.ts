import localFont from "next/font/local";
import { Geist_Mono, Inter } from "next/font/google";

export const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  preload: true,
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Inter for display headings (clean, geometric alternative to Cabinet Grotesk)
export const inter = Inter({
  variable: "--font-cabinet",
  subsets: ["latin"],
  display: "swap",
});

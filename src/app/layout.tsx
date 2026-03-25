import type { Metadata } from "next";
import { pretendard, geistMono, inter } from "@/lib/fonts";
import { ThemeProvider } from "next-themes";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "JH | Lead process, prove results.",
  description:
    "경험을 진화시키고, 성과로 증명합니다. Premium digital agency specializing in strategy, design, and development.",
  keywords: [
    "digital agency",
    "web development",
    "UX design",
    "strategy consulting",
  ],
  openGraph: {
    title: "JH | Lead process, prove results.",
    description:
      "경험을 진화시키고, 성과로 증명합니다. Premium digital agency.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${pretendard.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SmoothScrollProvider>
            <CustomCursor />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

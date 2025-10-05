import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { AppWrapper } from "@/components/app-wrapper";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahmoud Yousef - Full Stack Developer",
  description:
    "Professional portfolio showcasing modern web development expertise, innovative projects, and technical leadership.",
  generator: "v0.app",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
  ],
  authors: [{ name: "Mahmoud Yousef" }],
  openGraph: {
    title: "Mahmoud Yousef - Full Stack Developer",
    description:
      "Professional portfolio showcasing modern web development expertise",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppWrapper>
            <Suspense fallback={<div>Loading...</div>}>
              <CustomCursor />
              {children}
            </Suspense>
          </AppWrapper>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

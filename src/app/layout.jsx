import Footer from "@/components/organisms/footer";
import Header from "@/components/organisms/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  generator: "Next.js",
  applicationName: "Hackboard",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "no-referrer-when-downgrade",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  title: "Hackboard - showcase your skills",
  description:
    "Hackboard is a platform to showcase your next.js hackathon projects. You can create a project, and share it with the world.",
  keywords: [
    "hackathon",
    "projects",
    "showcase",
    "nextjs",
    "hackboard",
    "portfolio",
    "web development",
    "nextjs projects",
    "nextjs showcase",
    "nextjs portfolio",
    "nextjs hackathon",
    "nextjs hackathon projects",
    "nextjs hackathon showcase",
    "nextjs hackathon portfolio",
    "nextjs hackathon portfolio showcase",
    "nextjs hackathon portfolio projects",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased min-h-svh bg-background", geist.className)}
        cz-shortcut-listen="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-svh flex-col bg-background">
            <div className="border-dashed lg:border flex flex-1 flex-col">
              <Header />
              <main className="flex-1 flex flex-col">
                <div className="container-wrapper lg:border-x flex justify-center">
                  <div className="container md:px-6 flex flex-col flex-1 items-start py-6 lg:py-8">
                    {children}
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          </div>
          <Toaster richColors enableSystem position="top-center" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

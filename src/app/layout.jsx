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
  title: "Hackboard - Showcase your next hackathon projects",
  description:
    "Hackboard is a platform to showcase your next.js hackathon projects",
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

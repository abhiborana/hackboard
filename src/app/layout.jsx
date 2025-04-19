import { cn } from "@/lib/utils";
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
        className={cn("antialiased", geist.className)}
        cz-shortcut-listen="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

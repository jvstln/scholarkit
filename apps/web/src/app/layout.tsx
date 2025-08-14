import type { Metadata } from "next";
import { DM_Sans, Fira_Mono } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  fallback: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
});

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "scholarkit",
  description: "scholarkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          dmSans.variable,
          firaMono.variable,
          "antialiased bg-background text-foreground font-sans"
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

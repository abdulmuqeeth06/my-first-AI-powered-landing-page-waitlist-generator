import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "LaunchFast – AI Landing Page & Waitlist Generator",
  description:
    "LaunchFast helps founders ship high-converting landing pages and waitlists in minutes using AI.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}



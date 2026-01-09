import "./globals.css";
import AnimatedLayout from "@/components/ui/animated-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AnimatedLayout>{children}</AnimatedLayout>
      </body>
    </html>
  );
}

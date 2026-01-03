import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "The Unfolded Origami",
    template: "%s | The Unfolded Origami",
  },
  description: "Ideas, slowly unfolded. An essay-driven blog exploring thoughts through the metaphor of origami.",
  icons: {
    icon: "/pexels-padrinan-114977.jpg",
  },
  openGraph: {
    title: "The Unfolded Origami",
    description: "Ideas, slowly unfolded.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased min-h-screen bg-black text-white"
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="min-h-screen flex flex-col">
          <main id="main-content" className="flex-1 w-full overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

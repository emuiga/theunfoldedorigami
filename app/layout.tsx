import type { Metadata } from "next";
import { Inter, Spectral, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { MusicPlayer } from "@/components/MusicPlayer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: {
    default: "The Unfolded Origami",
    template: "%s | The Unfolded Origami",
  },
  description:
    "Ideas, slowly unfolded. An essay-driven blog exploring thoughts through the metaphor of origami.",
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
        className={`${inter.variable} ${spectral.variable} ${cormorant.variable} font-sans antialiased min-h-screen text-white`}
        style={{ background: "var(--page-bg, #0e1a14)" }}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {/* Fixed music player — lives outside page flow so it never unmounts */}
        <MusicPlayer />
        <div className="min-h-screen flex flex-col">
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

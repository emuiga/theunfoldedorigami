import type { Metadata } from "next";
import { Inter, Spectral, Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { MusicPlayerConditional } from "@/components/MusicPlayerConditional";

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

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.theunfoldedorigami.com"),
  title: {
    default: "The Unfolded Origami",
    template: "%s | The Unfolded Origami",
  },
  description:
    "Ideas, slowly unfolded. Software, sweat and everything in between by Steve Muiga.",
  icons: {
    icon: "/origami.png",
  },
  openGraph: {
    title: "The Unfolded Origami",
    description: "Ideas, slowly unfolded.",
    type: "website",
    siteName: "The Unfolded Origami",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Unfolded Origami",
    description: "Ideas, slowly unfolded.",
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
        className={`${inter.variable} ${spectral.variable} ${cormorant.variable} ${mulish.variable} font-sans antialiased min-h-screen text-white`}
        style={{ background: "var(--page-bg, #0e1a14)" }}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {/* Fixed music player — hidden on homepage, shown everywhere else */}
        <MusicPlayerConditional />
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

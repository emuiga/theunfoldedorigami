import type { Metadata } from "next";
import { Inter, Spectral } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-spectral",
});

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
        className={`${inter.variable} ${spectral.variable} font-sans antialiased min-h-screen bg-black text-white`}
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

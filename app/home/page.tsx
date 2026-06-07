import { PageHeader } from "@/components/PageHeader";
import { TypingCycler } from "@/components/TypingCycler";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Part portfolio, part open notebook. The real projects alongside the half-finished thoughts.",
};

const BG = "#042F2E";
const TEXT = "rgb(227, 237, 237)";
const ORANGE = "#E86C3D";

export default function HomePage() {
  return (
    <div className="relative min-h-screen" style={{ background: BG }}>
      <style>{`
        :root { --page-bg: ${BG}; }
        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 50;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px 180px;
        }
      `}</style>

      <div className="grain" />
      <PageHeader />

      <main className="relative z-10">
        <section className="flex flex-col items-center px-6 pt-14 pb-16 text-center">

          {/* Side labels */}
          <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-2 mb-10 px-2">
            <span
              className="text-xs tracking-[0.22em] uppercase"
              style={{  color: "rgb(245,245,220)", fontFamily: "var(--font-mulish), Mulish, sans-serif" }}
            >
              Software Engineer
            </span>
            <TypingCycler />
          </div>

          {/* Name */}
          <h1
            className="leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(4.5rem, 14vw, 11rem)",
              color: TEXT,
              letterSpacing: "-0.01em",
            }}
          >
            Steve Muiga
          </h1>

          {/* Bio */}
          <p
            className="mt-10 max-w-xl leading-relaxed"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
               color: "rgb(245,245,220)",
              letterSpacing: "0.01em",
            }}
          >
            I started this website as a place to express myself through code/ writing/ research.
          </p>

          {/* Preamble */}
          <p
            className="mt-6 max-w-lg"
            style={{
              fontFamily: "var(--font-mulish), Mulish, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.04em",
               color: "rgb(245,245,220)",
              lineHeight: "1.8",
            }}
          >
            Part portfolio, part open notebook; the real projects alongside the half-finished thoughts.
            Doing the work with the garage door open — have a look around.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mt-14"
            style={{ fontFamily: "var(--font-mulish), Mulish, sans-serif" }}
          >
            <a
              href="/origami"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                 color: "rgb(245,245,220)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textDecorationColor: "rgba(227,237,237,0.28)",
              }}
            >
              View work
            </a>

            <span style={{  color: "rgb(245,245,220)", fontSize: "0.35rem" }}>◆</span>

            <a
              href="/thoughts"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                 color: "rgb(245,245,220)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textDecorationColor: "rgba(227,237,237,0.28)",
              }}
            >
              Read thoughts
            </a>

            <span style={{  color: "rgb(245,245,220)", fontSize: "0.35rem" }}>◆</span>

            <a
              href="https://stevemuiga.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ORANGE,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textDecorationColor: "rgba(232,108,61,0.40)",
              }}
            >
              Subscribe
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

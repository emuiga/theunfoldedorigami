import { PageHeader } from "@/components/PageHeader";
import { TypingCycler } from "@/components/TypingCycler";

export const revalidate = 60;

const BG = "#042F2E";
const TEXT = "rgb(227, 237, 237)";
const ORANGE = "rgb(255, 103, 25)";

export default function Home() {
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
              style={{ color: `rgba(227,237,237,0.40)`, fontFamily: "var(--font-inter, sans-serif)" }}
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
              color: `rgba(227,237,237,0.72)`,
              letterSpacing: "0.01em",
            }}
          >
            I started this website as a place to express myself through code/ writing/ research.
          </p>

          {/* Preamble */}
          <p
            className="mt-6 max-w-lg"
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "0.75rem",
              letterSpacing: "0.04em",
              color: `rgba(227,237,237,0.42)`,
              lineHeight: "1.8",
            }}
          >
            Part portfolio, part open notebook; the real projects alongside the half-finished thoughts.
            Doing the work with the garage door open — have a look around.
          </p>

          {/* CTAs — underlined, no arrows */}
          <div
            className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mt-14"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            <a
              href="/origami"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: `rgba(227,237,237,0.70)`,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textDecorationColor: `rgba(227,237,237,0.28)`,
              }}
            >
              View work
            </a>

            <span style={{ color: `rgba(227,237,237,0.18)`, fontSize: "0.35rem" }}>◆</span>

            <a
              href="/thoughts"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: `rgba(227,237,237,0.70)`,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textDecorationColor: `rgba(227,237,237,0.28)`,
              }}
            >
              Read thoughts
            </a>

            <span style={{ color: `rgba(227,237,237,0.18)`, fontSize: "0.35rem" }}>◆</span>

            {/* Subscribe — Substack orange */}
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
                textDecorationColor: `rgba(255,103,25,0.40)`,
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

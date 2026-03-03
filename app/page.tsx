import { getAllEssays } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import { EssayListHover } from "@/components/EssayListHover";
import { NewsletterForm } from "@/components/NewsletterForm";

export const revalidate = 60;

function BikeSVG() {
  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className="w-full h-full"
    >
      {/* Rear wheel */}
      <circle cx="72" cy="124" r="50" strokeWidth="1.2" />
      <circle cx="72" cy="124" r="3.5" fill="currentColor" strokeWidth="0" />
      {/* Rear sprocket ring */}
      <circle cx="72" cy="124" r="14" strokeWidth="0.7" />
      {/* Front wheel */}
      <circle cx="208" cy="124" r="50" strokeWidth="1.2" />
      <circle cx="208" cy="124" r="3.5" fill="currentColor" strokeWidth="0" />
      {/* Bottom bracket */}
      <circle cx="140" cy="124" r="7" strokeWidth="0.8" />
      {/* Chain stay */}
      <line x1="75" y1="124" x2="133" y2="124" strokeWidth="1.2" />
      {/* Seat tube */}
      <line x1="140" y1="124" x2="118" y2="68" strokeWidth="1.5" />
      {/* Top tube */}
      <line x1="118" y1="68" x2="172" y2="68" strokeWidth="1.5" />
      {/* Down tube */}
      <line x1="172" y1="68" x2="140" y2="124" strokeWidth="1.5" />
      {/* Seat stay */}
      <line x1="118" y1="68" x2="72" y2="124" strokeWidth="1.2" />
      {/* Fork */}
      <line x1="172" y1="60" x2="208" y2="124" strokeWidth="1.5" />
      {/* Head tube */}
      <line x1="168" y1="54" x2="176" y2="72" strokeWidth="2" />
      {/* Handlebar stem */}
      <line x1="168" y1="54" x2="155" y2="46" strokeWidth="1.5" />
      {/* Handlebar */}
      <path d="M 148 43 Q 155 39 162 44" strokeWidth="1.5" fill="none" />
      {/* Seat post */}
      <line x1="118" y1="68" x2="122" y2="50" strokeWidth="1.5" />
      {/* Saddle */}
      <path d="M 113 48 Q 122 43 131 48" strokeWidth="1.8" fill="none" />
      {/* Cranks */}
      <line x1="140" y1="124" x2="128" y2="137" strokeWidth="1.5" />
      <line x1="140" y1="124" x2="152" y2="111" strokeWidth="1.5" />
      {/* Pedals */}
      <line x1="122" y1="135" x2="134" y2="139" strokeWidth="1.5" />
      <line x1="146" y1="109" x2="158" y2="113" strokeWidth="1.5" />
    </svg>
  );
}

function DumbbellSVG() {
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className="w-full h-full"
    >
      {/* Bar */}
      <line x1="62" y1="40" x2="178" y2="40" strokeWidth="2" />
      {/* Left outer plate */}
      <rect x="14" y="16" width="20" height="48" rx="4" strokeWidth="1.2" />
      {/* Left inner plate */}
      <rect x="34" y="24" width="22" height="32" rx="3" strokeWidth="1.2" />
      {/* Left collar */}
      <rect x="56" y="30" width="7" height="20" rx="1.5" strokeWidth="1.5" />
      {/* Right collar */}
      <rect x="177" y="30" width="7" height="20" rx="1.5" strokeWidth="1.5" />
      {/* Right inner plate */}
      <rect x="184" y="24" width="22" height="32" rx="3" strokeWidth="1.2" />
      {/* Right outer plate */}
      <rect x="206" y="16" width="20" height="48" rx="4" strokeWidth="1.2" />
    </svg>
  );
}

export default async function Home() {
  const essays = await getAllEssays();
  const recentEssays = essays.slice(0, 6);

  return (
    <div>
      <style>{`:root { --page-bg: #0e1a14; }`}</style>
      <PageHeader />

      {/* ─── Hero ─── */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-6 pb-12">
        <div className="max-w-7xl mx-auto w-full">

          {/* Three-column layout — Haley-style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

            {/* Left descriptors */}
            <div
              className="hidden md:flex flex-col gap-3 text-right pr-8"
              style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}
            >
              <span>Software engineer</span>
              <span>Runner · Rider</span>
              <span>Lifter</span>
            </div>

            {/* Center: Big title */}
            <div className="text-center py-8">
              <h1
                className="leading-[0.92] tracking-tight"
                style={{
                  fontFamily: "var(--font-spectral), Georgia, serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(3.5rem, 10vw, 7rem)",
                  color: "var(--color-text-primary)",
                }}
              >
                The<br />Unfolded<br />Origami
              </h1>
            </div>

            {/* Right descriptors */}
            <div
              className="hidden md:flex flex-col gap-3 text-left pl-8"
              style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}
            >
              <span>Believer</span>
              <span>Reader · Brother</span>
              <span>Nairobi</span>
            </div>
          </div>

          {/* Mobile descriptors */}
          <p
            className="md:hidden text-center text-xs tracking-wide mt-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Software engineer · Runner · Rider · Lifter · Believer · Reader
          </p>

          {/* Scroll hint */}
          <div className="flex justify-center mt-14">
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--color-text-secondary)" }}
            >
              scroll
            </span>
          </div>
        </div>
      </section>

      {/* ─── Decorative bikes panel ─── */}
      <section
        className="w-full border-y overflow-hidden"
        style={{ borderColor: "rgba(138,191,152,0.10)", color: "#1d4030" }}
      >
        <div className="flex items-end justify-center gap-4 px-4 py-4">
          {/* 5 bikes, center ones taller */}
          {[80, 110, 140, 110, 80].map((height, i) => (
            <div
              key={i}
              style={{ width: `${height * 1.56}px`, height: `${height}px`, flexShrink: 0 }}
            >
              <BikeSVG />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Essay list ─── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <EssayListHover essays={recentEssays} />
          {essays.length > 6 && (
            <div className="mt-8 text-center">
              <a
                href="/origami"
                className="text-xs tracking-widest uppercase transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              >
                see all writings →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ─── Dumbbell divider ─── */}
      <div
        className="flex items-center justify-center gap-6 px-12 py-2"
        style={{ color: "#1d4030" }}
      >
        <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.08)" }} />
        <div style={{ width: "120px", height: "40px" }}>
          <DumbbellSVG />
        </div>
        <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.08)" }} />
      </div>

      {/* ─── Poem ─── */}
      <section
        className="py-20 px-6"
        style={{ borderTop: "1px solid rgba(138,191,152,0.08)" }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-14">
            <span style={{ color: "var(--color-accent-2)", fontSize: "0.875rem" }}>＋</span>
            <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.12)" }} />
            <span
              className="text-xs italic tracking-widest uppercase"
              style={{ color: "var(--color-text-secondary)" }}
            >
              A poem on the wall
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.12)" }} />
            <span style={{ color: "var(--color-accent-2)", fontSize: "0.875rem" }}>＋</span>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            style={{
              fontFamily: "var(--font-spectral), Georgia, serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "1rem",
              lineHeight: "1.85",
              color: "rgb(230,213,172)",
            }}
          >
            <p>
              Dust if you must, but wouldn&apos;t it be better
              <br />
              To paint a picture, or write a letter,
              <br />
              Bake a cake, or plant a seed;
              <br />
              Ponder the difference between want and need?
            </p>
            <p>
              Dust if you must, but there&apos;s not much time,
              <br />
              With rivers to swim, and mountains to climb;
              <br />
              Music to hear, and books to read;
              <br />
              Friends to cherish, and life to lead.
            </p>
            <p>
              Dust if you must, but the world&apos;s out there
              <br />
              With the sun in your eyes, and the wind in your hair;
              <br />
              A flutter of snow, a shower of rain,
              <br />
              This day will not come around again.
            </p>
            <p>
              Dust if you must, but bear in mind,
              <br />
              Old age will come and it&apos;s not kind.
              <br />
              And when you go (and go you must)
              <br />
              You, yourself, will make more dust.
            </p>
          </div>
          <p
            className="text-sm mt-8 italic"
            style={{ color: "var(--color-text-secondary)" }}
          >
            ~ Rose Milligan
          </p>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section
        className="py-20 px-6 text-center"
        style={{ borderTop: "1px solid rgba(138,191,152,0.08)" }}
      >
        <h2
          className="text-2xl mb-3 font-light italic"
          style={{
            fontFamily: "var(--font-spectral), Georgia, serif",
            color: "var(--color-text-primary)",
          }}
        >
          Stay in the fold
        </h2>
        <p
          className="text-sm mb-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          New essays, slowly.
        </p>
        <div className="flex justify-center">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}

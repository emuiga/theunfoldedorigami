import { PageHeader } from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Steve Muiga — software engineer, runner, reader, believer.",
};

function DumbbellSVG() {
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className="w-full h-full"
    >
      <line x1="62" y1="40" x2="178" y2="40" strokeWidth="2" />
      <rect x="14" y="16" width="20" height="48" rx="4" strokeWidth="1.2" />
      <rect x="34" y="24" width="22" height="32" rx="3" strokeWidth="1.2" />
      <rect x="56" y="30" width="7" height="20" rx="1.5" strokeWidth="1.5" />
      <rect x="177" y="30" width="7" height="20" rx="1.5" strokeWidth="1.5" />
      <rect x="184" y="24" width="22" height="32" rx="3" strokeWidth="1.2" />
      <rect x="206" y="16" width="20" height="48" rx="4" strokeWidth="1.2" />
    </svg>
  );
}

function BikeSVG() {
  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className="w-full h-full"
    >
      <circle cx="72" cy="124" r="50" strokeWidth="1.2" />
      <circle cx="72" cy="124" r="3.5" fill="currentColor" strokeWidth="0" />
      <circle cx="72" cy="124" r="14" strokeWidth="0.7" />
      <circle cx="208" cy="124" r="50" strokeWidth="1.2" />
      <circle cx="208" cy="124" r="3.5" fill="currentColor" strokeWidth="0" />
      <circle cx="140" cy="124" r="7" strokeWidth="0.8" />
      <line x1="75" y1="124" x2="133" y2="124" strokeWidth="1.2" />
      <line x1="140" y1="124" x2="118" y2="68" strokeWidth="1.5" />
      <line x1="118" y1="68" x2="172" y2="68" strokeWidth="1.5" />
      <line x1="172" y1="68" x2="140" y2="124" strokeWidth="1.5" />
      <line x1="118" y1="68" x2="72" y2="124" strokeWidth="1.2" />
      <line x1="172" y1="60" x2="208" y2="124" strokeWidth="1.5" />
      <line x1="168" y1="54" x2="176" y2="72" strokeWidth="2" />
      <line x1="168" y1="54" x2="155" y2="46" strokeWidth="1.5" />
      <path d="M 148 43 Q 155 39 162 44" strokeWidth="1.5" fill="none" />
      <line x1="118" y1="68" x2="122" y2="50" strokeWidth="1.5" />
      <path d="M 113 48 Q 122 43 131 48" strokeWidth="1.8" fill="none" />
      <line x1="140" y1="124" x2="128" y2="137" strokeWidth="1.5" />
      <line x1="140" y1="124" x2="152" y2="111" strokeWidth="1.5" />
      <line x1="122" y1="135" x2="134" y2="139" strokeWidth="1.5" />
      <line x1="146" y1="109" x2="158" y2="113" strokeWidth="1.5" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/backg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 z-0" style={{ background: "rgba(6,18,14,0.72)" }} />
      <style>{`:root { --page-bg: #0d1e20; }`}</style>
      <PageHeader />

      <div className="relative z-10 pt-12 pb-24">

        {/* ─── Hero headline ─── */}
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-16">
          <h1
            className="leading-[0.9] tracking-tight mb-8"
            style={{
              fontFamily: "var(--font-spectral), Georgia, serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Steve Muiga builds software,<br />
            runs roads, and reads<br />
            when the world lets him.
          </h1>
          <p
            className="text-sm italic"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Software engineer. Runner. Rider. Reader. Believer.
          </p>
        </div>

        {/* ─── Dumbbell row ─── */}
        <div
          className="w-full border-y overflow-hidden py-5"
          style={{ borderColor: "rgba(138,191,152,0.10)", color: "rgba(138,191,152,0.22)" }}
        >
          <div className="flex items-center justify-center gap-8 px-8">
            {[70, 90, 110, 90, 70].map((w, i) => (
              <div
                key={i}
                style={{ width: `${w}px`, height: `${Math.round(w / 3)}px`, flexShrink: 0 }}
              >
                <DumbbellSVG />
              </div>
            ))}
          </div>
        </div>

        {/* ─── Two-column body ─── */}
        <div className="max-w-5xl mx-auto px-6 py-20">

          {/* Divider */}
          <div className="flex items-center gap-4 mb-16">
            <span style={{ color: "var(--color-accent-2)", fontSize: "0.875rem" }}>＋</span>
            <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.12)" }} />
            <span style={{ color: "var(--color-accent-2)", fontSize: "0.875rem" }}>＋</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

            {/* Left */}
            <div
              className="space-y-6 leading-relaxed"
              style={{ color: "var(--color-text-primary)", fontSize: "1rem" }}
            >
              <p>
                I&apos;m a software engineer by profession — I build things for a
                living, which means I spend a lot of time thinking about how
                systems fit together and where they break.
              </p>
              <p>
                Outside of code, I run. Long distances. The kind that require
                you to carry your own food and negotiate with yourself at
                kilometre thirty. I also cycle roads and lift weights, because
                the body and mind work better when they&apos;re both being tested.
              </p>
              <p>
                This site is my attempt at writing — slowly, carefully, without
                the pressure of a deadline. Every essay here is something I
                needed to think through out loud.
              </p>
            </div>

            {/* Right */}
            <div
              className="space-y-6 leading-relaxed"
              style={{ color: "var(--color-text-primary)", fontSize: "1rem" }}
            >
              <p>
                I&apos;m a Christian. My faith shapes how I think about
                everything — about time, about work, about what it means to do
                anything well. I don&apos;t write about faith to argue. I write
                about it because it is genuinely at the center of how I
                understand the world.
              </p>
              <p>
                I grew up as the only brother of three sisters. That fact
                shaped me more than most things — it taught me to listen, to
                hold space, and to understand that the people closest to you
                are always worth paying attention to.
              </p>
              <p>
                If you&apos;re here, you probably found an essay that meant
                something to you. I&apos;m glad it did. That&apos;s the whole point.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Bike decoration ─── */}
        <div
          className="w-full border-t overflow-hidden"
          style={{ borderColor: "rgba(138,191,152,0.08)", color: "rgba(138,191,152,0.20)" }}
        >
          <div className="flex items-end justify-center gap-4 px-6 py-4">
            {[70, 95, 120, 95, 70].map((height, i) => (
              <div
                key={i}
                style={{
                  width: `${height * 1.56}px`,
                  height: `${height}px`,
                  flexShrink: 0,
                }}
              >
                <BikeSVG />
              </div>
            ))}
          </div>
        </div>

        {/* ─── CTA ─── */}
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-4 text-center">
          <a
            href="/stay-in-the-fold"
            className="inline-block px-10 py-4 rounded-full font-medium transition-colors bg-[var(--color-button)] hover:bg-[var(--color-accent-2)] text-[var(--color-text-primary)]"
          >
            stay in the fold
          </a>
        </div>
      </div>
    </div>
  );
}

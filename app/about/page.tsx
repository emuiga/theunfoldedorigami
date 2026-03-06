import { PageHeader } from "@/components/PageHeader";
import type { Metadata } from "next";

export const revalidate = 86400; // revalidate once per day

export const metadata: Metadata = {
  title: "About",
  description: "About Steve Muiga — software engineer, Christian, amateur hybrid athlete.",
};

const DOB = new Date("2002-02-24");
const LIFE_EXPECTANCY_YEARS = 67.7; // Kenya average
const WEEKS_PER_ROW = 52;
const TOTAL_WEEKS = Math.round(LIFE_EXPECTANCY_YEARS * 52);

function LifeInWeeks() {
  const now = new Date();
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksLived = Math.min(
    Math.floor((now.getTime() - DOB.getTime()) / msPerWeek),
    TOTAL_WEEKS
  );
  const yearsLived = Math.floor(weeksLived / 52);
  const weeksRemaining = TOTAL_WEEKS - weeksLived;
  const pctLived = Math.round((weeksLived / TOTAL_WEEKS) * 100);
  const rows = Math.ceil(TOTAL_WEEKS / WEEKS_PER_ROW);

  return (
    <section className="max-w-5xl mx-auto px-3 sm:px-6 py-12 sm:py-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <span style={{ color: "rgba(196,147,90,0.7)", fontSize: "0.875rem" }}>＋</span>
        <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.10)" }} />
        <span
          style={{
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(245,245,220,0.30)",
          }}
        >
          Life in Weeks
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.10)" }} />
        <span style={{ color: "rgba(196,147,90,0.7)", fontSize: "0.875rem" }}>＋</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-10 gap-y-4 mb-10">
        {[
          { label: "Age", value: `${yearsLived} years` },
          { label: "Weeks lived", value: weeksLived.toLocaleString() },
          { label: "Weeks remaining", value: weeksRemaining.toLocaleString() },
          { label: "% elapsed", value: `${pctLived}%` },
        ].map(({ label, value }) => (
          <div key={label}>
            <p
              style={{
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: "0.6rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(245,245,220,0.25)",
                marginBottom: "2px",
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.1rem",
                fontWeight: 300,
                color: "rgba(245,245,220,0.65)",
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Two-column: grid left, commentary right */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

        {/* Dot grid */}
        <div>
          <div
            className="pb-2"
            style={{ overflowX: "auto" }}
            aria-label="Life in weeks grid"
          >
            <div
              className="liw-grid"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${WEEKS_PER_ROW}, 7px)`,
                gap: "3px",
                width: "fit-content",
              }}
            >
              {Array.from({ length: rows }, (_, rowIdx) =>
                Array.from({ length: WEEKS_PER_ROW }, (_, colIdx) => {
                  const weekIdx = rowIdx * WEEKS_PER_ROW + colIdx;
                  if (weekIdx >= TOTAL_WEEKS) return null;
                  const lived = weekIdx < weeksLived;
                  return (
                    <div
                      key={weekIdx}
                      className="liw-dot"
                      title={`Week ${weekIdx + 1}`}
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "1px",
                        background: lived
                          ? "rgba(245,245,220,0.62)"
                          : "rgba(245,245,220,0.07)",
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Legend */}
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5"
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "0.6rem",
              letterSpacing: "0.10em",
              color: "rgba(245,245,220,0.25)",
              textTransform: "uppercase",
            }}
          >
            <span className="flex items-center gap-2">
              <span className="liw-legend-dot" style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "1px", background: "rgba(245,245,220,0.62)", flexShrink: 0 }} />
              Lived
            </span>
            <span className="flex items-center gap-2">
              <span className="liw-legend-dot" style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "1px", background: "rgba(245,245,220,0.07)", border: "1px solid rgba(245,245,220,0.10)", flexShrink: 0 }} />
              Remaining
            </span>
            <span>52 weeks · 1 row = 1 year</span>
          </div>
        </div>

        {/* Commentary — sticky on desktop */}
        <div
          className="lg:sticky lg:top-24 shrink-0 lg:max-w-[260px]"
          style={{
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: "0.82rem",
            lineHeight: 1.75,
            color: "rgba(245,245,220,0.62)",
          }}
        >
          <p style={{ marginBottom: "1.2rem" }}>
            So apparently the life expectancy of a Kenyan is 67.7 years.
          </p>
          <div
            style={{
              height: "1px",
              background: "rgba(245,245,220,0.08)",
              margin: "1.4rem 0",
            }}
          />
          <p style={{ marginBottom: "0.8rem" }}>
            The original life-in-weeks idea belongs to Tim Urban. He drew it for himself
            and then made everyone else feel this existential dread.<br /> Have fun with it, see your life in Mondays.
          </p>
          <a
            href="https://waitbutwhy.com/2014/05/life-weeks.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontSize: "0.68rem",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "rgba(245,245,220,0.30)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(245,245,220,0.15)",
              paddingBottom: "1px",
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            Learn more about it here →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div
      className="about-bg min-h-screen relative"
      style={{
        backgroundImage: "url('/backg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 z-0" style={{ background: "rgba(4,47,46,0.84)" }} />
      <style>{`
        :root { --page-bg: #042F2E; }
        /* iOS Safari doesn't support background-attachment: fixed */
        @media (max-width: 767px) {
          .about-bg { background-attachment: scroll !important; }
        }
        /* Shrink Life in Weeks dots on small screens so grid fits without scrolling */
        @media (max-width: 599px) {
          .liw-grid {
            grid-template-columns: repeat(52, 5px) !important;
            gap: 2px !important;
          }
          .liw-dot { width: 5px !important; height: 5px !important; }
          .liw-legend-dot { width: 5px !important; height: 5px !important; }
        }
        @media (max-width: 399px) {
          .liw-grid {
            grid-template-columns: repeat(52, 4px) !important;
            gap: 1px !important;
          }
          .liw-dot { width: 4px !important; height: 4px !important; }
          .liw-legend-dot { width: 4px !important; height: 4px !important; }
        }
      `}</style>
      <PageHeader />

      <div className="relative z-10 pt-12 pb-24">

        {/* ─── Hero ─── */}
        <div className="max-w-5xl mx-auto px-6 pt-8 sm:pt-12 pb-10 sm:pb-16">
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
            Creative developer and a professional amateur in the world of endurance sport<br />
          </h1>
          <p
            className="text-sm italic"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Software engineer  · Amateur hybrid athlete
          </p>
        </div>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4">
            {/* <span style={{ color: "rgba(196,147,90,0.7)", fontSize: "0.875rem" }}>＋</span> */}
            <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.12)" }} />
            {/* <span style={{ color: "rgba(196,147,90,0.7)", fontSize: "0.875rem" }}>＋</span> */}
          </div>
        </div>

        {/* ─── Bio ─── */}
        <div className="max-w-5xl mx-auto px-6 py-10 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">

            <div
              className="space-y-6 leading-relaxed"
              style={{ color: "var(--color-text-primary)", fontSize: "1rem" }}
            >
              <p>
                Hi, my name is Steve and I'm a software engineer by trade. I didn't grow up around computers. 
                In fact, I built my first website a few years ago—a site for a local cafe that took me three 
                days locked in my room following an HTML & CSS tutorial. I remember its centerpiece was a massive
                <span style={{
              fontFamily: "var(--font-spectral), Georgia, serif",
              fontWeight: 5,
              fontStyle: "italic",
              fontSize: "clamp(1rem, 8vw, 1.5rem)",
              color: "var(--color-text-primary)",
            }}>"Let's meat"</span> headline that I thought was genius at the time. 
                I haven't touched that site since but I have 
                 created better and fun websites <i style={{
              fontFamily: "var(--font-spectral), Georgia, serif",
            }}>(like this one)</i> ever since. 
              </p>
              <p>
                I used to run a lot. If it involves a start, an end and a humbling journey 
                to get from one to the other then I’m probably passionate about it;  I cycle relatively long distances.
                I can squat twice your weight. I love solo hikes. All this goes to say that
                I have a questionable relationship with discomfort, which I've come to terms with. Invite me for a session!
              </p>
            </div>

            <div
              className="space-y-6 leading-relaxed"
              style={{ color: "var(--color-text-primary)", fontSize: "1rem" }}
            >
              <p>
                I&apos;m a Christian. My faith shapes how
                I think about time, work, people, and what it means to do anything well. 
              </p>
              <p>
                I have a playlist called <i style={{
              fontFamily: "var(--font-spectral), Georgia, serif",
            }}>Mimi ni Mhindie</i> because I listen to Indie. 
                I enjoy playing Kenya @50, cracks me up to see the different perceptions people have of the items they're describing.
              </p>
              <p>Simply put: I am a guy in Kenya interested in creative stuff.
                In late 2025, we tossed around the idea of starting a software company. Fast-forward and we are building 
                products at <a
                  href="https://www.origin.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "rgba(138,191,152,0.65)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(138,191,152,0.25)",
                    paddingBottom: "1px",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                >
                  Origin HQ
                </a> and learning a ton.
              </p>
              <p>One of my goals in 2026 is to simplify my defaults and build from first principles as I broaden my skillset.</p>
            </div>
          </div>
        </div>

        {/* ─── Life in Weeks ─── */}
        <LifeInWeeks />

        {/* ─── CTA ─── */}
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-4 text-center">
          <a
            href="https://stevemuiga.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-full font-medium transition-opacity hover:opacity-80"
            style={{ background: "rgb(255, 103, 25)", color: "#fff" }}
          >
            Subscribe to the newsletter
          </a>
          <p>Thanks for stopping by!</p>
        </div>
      </div>
    </div>
  );
}

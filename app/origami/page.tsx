import { PageHeader } from "@/components/PageHeader";
import { getAllProjects, getAllLabs } from "@/lib/contentful";
import { LabGrid } from "@/components/LabGrid";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects by Steve Muiga.",
};

export default async function WorkPage() {
  const [selectedWork, lab] = await Promise.all([getAllProjects(), getAllLabs()]);
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/backg3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 z-0" style={{ background: "rgba(4,47,46,0.84)" }} />
      <style>{`:root { --page-bg: #042F2E; }`}</style>
      <PageHeader />

      <div className="relative z-10 pt-16 pb-32">
        <div className="max-w-5xl mx-auto px-6">

          {/* ── Intro ── */}
          <div className="pt-10 pb-20 max-w-2xl">
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                color: "rgba(245,245,220,0.85)",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
              }}
            >
              I make stuff with<br />
              web tech.
            </h1>
            <div
              className="space-y-4"
              style={{
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: "0.88rem",
                lineHeight: 1.8,
                color: "rgba(245,245,220,0.60)",
              }}
            >
              <p>
                I work as a full-stack software engineer, and have leaned into the frontend lately
                during my time at <a
                  href="https://www.linkedin.com/company/kifwa/posts/?feedView=all"
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
                  KIFWA (Kenya Int'l Freights and Warehousing Assn.)
                </a>. I’m also tinkering with product ideas at <a
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
                </a> while working on smaller software projects in my free time.
                My studies most recently were in <a                  href="https://www.jkuat.ac.ke/"
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
                  JKUAT               
                </a>, where I specialised in Pure Mathematics, and minored in Computer Science.
                I am also an alumnus of <a                  href="https://kamilimu.org/"
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
                  the Kamilimu Limited           
                </a> which has shaped 
                most of my thinking as a professional(check them out and apply if you're a student).
                I love collaborating in small teams on impactful and creative projects. I care deeply about quality, sustainability, and accessibility. 
                And I’m a believer in continuous learning, staying humble, and letting the best ideas win.
              </p>
              <p>
                Interested in more work? Check out my dedicated developer portfolio <a
                  href="https://steve-muiga.vercel.app"
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
                  here
                </a> as I improve this page.
              </p>
              <p>
                You can find and chat me on <a
                  href="https://linkedin.com/in/stevemuiga"
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
                  LinkedIn
                </a>, for what it's worth.
              </p>
            </div>
          </div>

          {/* ── Section label ── */}
          <div className="flex items-center gap-4 mb-16">
            {/* <span style={{ color: "var(--color-accent-2)", fontSize: "0.875rem" }}>＋</span> */}
            <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.14)" }} />
            <span className="text-xs italic tracking-[0.18em] uppercase" style={{ color: "var(--color-text-secondary)" }}>
              Work
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.14)" }} />
            {/* <span style={{ color: "var(--color-accent-2)", fontSize: "0.875rem" }}>＋</span> */}
          </div>

          {/* ── Project rows ── */}
          {selectedWork.length === 0 ? (
            <p
              className="italic"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontSize: "1.1rem",
                color: "rgba(245,245,220,0.40)",
              }}
            >
              Nothing here yet — projects coming soon.
            </p>
          ) : (
            <div className="flex flex-col">
              {selectedWork.map((p) => (
                <a
                  key={p.title}
                  href={p.href ?? undefined}
                  target={p.href ? "_blank" : undefined}
                  rel={p.href ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 py-10 border-t"
                  style={{
                    borderColor: "rgba(138,191,152,0.09)",
                    textDecoration: "none",
                    cursor: p.href ? "pointer" : "default",
                  }}
                >
                  {/* Left: info */}
                  <div className="flex flex-col gap-3">
                    {/* Title + year row */}
                    <div className="flex items-baseline gap-5">
                      <h2
                        className="leading-none group-hover:italic transition-all duration-200"
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontWeight: 400,
                          fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                          color: "var(--color-text-primary)",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {p.title}
                      </h2>
                      {p.year && (
                        <span
                          className="tabular-nums shrink-0"
                          style={{
                            fontFamily: "var(--font-inter, sans-serif)",
                            fontSize: "0.72rem",
                            color: "var(--color-text-secondary)",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {p.year}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p
                      className="leading-relaxed max-w-xl"
                      style={{
                        fontFamily: "var(--font-inter, sans-serif)",
                        fontSize: "0.88rem",
                        color: "rgba(245,245,220,0.62)",
                        lineHeight: "1.75",
                      }}
                    >
                      {p.description}
                    </p>

                    {/* Visit label — visible on mobile only */}
                    {p.href && (
                      <span
                        className="md:hidden w-fit"
                        style={{
                          fontFamily: "var(--font-inter, sans-serif)",
                          fontSize: "0.68rem",
                          letterSpacing: "0.10em",
                          textTransform: "uppercase",
                          color: "rgba(138,191,152,0.65)",
                          borderBottom: "1px solid rgba(138,191,152,0.25)",
                          paddingBottom: "1px",
                        }}
                      >
                        Visit ↗
                      </span>
                    )}
                  </div>

                  {/* Right: thumbnail */}
                  {p.thumbnail && (
                    <div
                      className="shrink-0 relative overflow-hidden self-center"
                      style={{
                        width: "clamp(200px, 28vw, 340px)",
                        aspectRatio: "16 / 10",
                        borderRadius: "4px",
                        background: "rgba(245,245,220,0.04)",
                      }}
                    >
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="340px"
                      />
                    </div>
                  )}
                </a>
              ))}
              <div className="h-px" style={{ background: "rgba(138,191,152,0.09)" }} />
            </div>
          )}

          {/* ── Lab section ── */}
          <div className="mt-24">
            <div className="flex items-center gap-4 mb-12">
              {/* <span style={{ color: "var(--color-accent-2)", fontSize: "0.875rem" }}>＋</span> */}
              <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.10)" }} />
              <span className="text-xs italic tracking-[0.18em] uppercase" style={{ color: "var(--color-text-secondary)" }}>
                The Lab
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.10)" }} />
              {/* <span style={{ color: "var(--color-accent-2)", fontSize: "0.875rem" }}>＋</span> */}
            </div>

            {lab.length === 0 ? (
              <p
                className="text-center italic"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontWeight: 300,
                  fontSize: "1.1rem",
                  color: "rgba(245,245,220,0.58)",
                }}
              >
                Games, bad designs, things I&apos;m trying. Coming soon.
              </p>
            ) : (
              <LabGrid items={lab} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

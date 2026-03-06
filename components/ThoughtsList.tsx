"use client";

import { useState } from "react";
import Image from "next/image";

interface Essay {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    category?: string;
    excerpt?: string;
    image?: string;
    substackUrl?: string;
  };
}

type Tab = "all" | "technical" | "nontechnical";

const TAB_LABEL: Record<Tab, string> = {
  all: "All",
  technical: "Technical",
  nontechnical: "Non-technical",
};

export function ThoughtsList({ essays }: { essays: Essay[] }) {
  const [active, setActive] = useState<Tab>("all");

  const tabs: Tab[] = ["all", "technical", "nontechnical"];

  const filtered = essays.filter((e) => {
    if (active === "all") return true;
    const cat = e.frontmatter.category ?? "nontechnical";
    return cat === active;
  });

  return (
    <div>
      {/* ── Category tabs ── */}
      <div className="flex gap-2 mb-12 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              flexShrink: 0,
              padding: "6px 20px",
              borderRadius: "9999px",
              border: `1px solid ${
                active === tab
                  ? "rgba(245,245,220,0.35)"
                  : "rgba(245,245,220,0.12)"
              }`,
              background:
                active === tab ? "rgba(245,245,220,0.10)" : "transparent",
              color:
                active === tab
                  ? "rgba(245,245,220,0.92)"
                  : "rgba(245,245,220,0.52)",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.18s",
              fontFamily: "var(--font-inter, sans-serif)",
              fontWeight: active === tab ? 500 : 400,
            }}
          >
            {TAB_LABEL[tab]}
          </button>
        ))}
      </div>

      {/* ── Article cards ── */}
      <div className="flex flex-col">
        {filtered.length === 0 && (
          <p
            style={{
              padding: "3rem 0",
              color: "rgba(245,245,220,0.55)",
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "0.9rem",
            }}
          >
            Nothing here yet.
          </p>
        )}

        {filtered.map((essay) => {
          const href = `/essays/${essay.slug}`;

          return (
            <a
              key={essay.slug}
              href={href}
              className="group relative block w-full overflow-hidden"
              style={{
                height: "clamp(220px, 30vw, 360px)",
                textDecoration: "none",
                marginBottom: "2px",
              }}
            >
              {/* Background image */}
              {essay.frontmatter.image ? (
                <Image
                  src={essay.frontmatter.image}
                  alt={essay.frontmatter.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(20,30,25,1)" }}
                />
              )}

              {/* Title */}
              <div className="absolute inset-0 flex items-center justify-center px-8">
                <h3
                  style={{
                    fontFamily:
                      "var(--font-spectral), 'Spectral', Georgia, serif",
                    fontSize: "clamp(1.6rem, 4.5vw, 3rem)",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.96)",
                    textAlign: "center",
                    lineHeight: 1.2,
                    letterSpacing: "0.01em",
                    textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                  }}
                >
                  {essay.frontmatter.title}
                </h3>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

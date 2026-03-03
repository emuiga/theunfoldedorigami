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

// ─────────────────────────────────────────────────────────────
// McLaren F1 car is used as the image mask frame.
// /public/McLaren.png is the silhouette — ideally a PNG with
// transparent background so the mask clips cleanly to the car shape.
//
// How it works:
//  • The car outline is always visible on the page (faint, like Haley's arches)
//  • Hovering an essay fades that essay's image INTO the car shape
//  • CSS mask-image clips the image to the car's silhouette
// ─────────────────────────────────────────────────────────────

export function EssayListHover({ essays }: { essays: Essay[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const hoveredEssay = essays.find((e) => e.slug === hoveredSlug);
  const hasImage = !!hoveredEssay?.frontmatter.image;

  return (
    <div>
      {/* ── Section label ── */}
      <div className="flex items-center gap-3 mb-12">
        <span style={{ color: "var(--color-accent-2)", fontSize: "0.875rem" }}>＋</span>
        <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.14)" }} />
        <span
          className="text-xs italic tracking-[0.18em] uppercase"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Writings
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.14)" }} />
        <span style={{ color: "var(--color-accent-2)", fontSize: "0.875rem" }}>＋</span>
      </div>

      {/* ── Two-column: essay list left, McLaren frame right ── */}
      <div className="flex gap-8 xl:gap-14 items-start">

        {/* Essay list */}
        <div className="flex-1 min-w-0">
          {essays.length === 0 && (
            <p className="py-8 font-light" style={{ color: "var(--color-text-secondary)" }}>
              No essays yet.
            </p>
          )}

          <div className="divide-y" style={{ borderColor: "rgba(138,191,152,0.07)" }}>
            {essays.map((essay) => {
              const year = essay.frontmatter.date
                ? new Date(essay.frontmatter.date).getFullYear()
                : "";
              const substackUrl =
                essay.frontmatter.substackUrl ??
                `https://stevemuiga.substack.com/p/${essay.slug}`;
              const active = hoveredSlug === essay.slug;

              return (
                <a
                  key={essay.slug}
                  href={substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSlug(essay.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  className="group block py-[18px] transition-all duration-150"
                  style={{
                    paddingLeft: active ? "10px" : "0",
                    borderLeft: `2px solid ${active ? "var(--color-accent-1)" : "transparent"}`,
                  }}
                >
                  <div className="flex items-baseline gap-4 lg:gap-5">
                    <span
                      className="text-sm tabular-nums shrink-0 w-10"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {year}
                    </span>

                    <div className="flex-1 min-w-0">
                      <span
                        className="text-base lg:text-[17px] font-medium leading-snug transition-colors duration-150"
                        style={{
                          color: active
                            ? "var(--color-accent-1)"
                            : "var(--color-text-primary)",
                        }}
                      >
                        {essay.frontmatter.title}
                      </span>
                      {essay.frontmatter.excerpt && (
                        <p
                          className="text-sm mt-1 leading-snug overflow-hidden transition-all duration-200"
                          style={{
                            color: "var(--color-text-secondary)",
                            maxHeight: active ? "44px" : "0",
                            opacity: active ? 1 : 0,
                          }}
                        >
                          {essay.frontmatter.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {essay.frontmatter.category && (
                        <span
                          className="text-xs lowercase hidden sm:block"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {essay.frontmatter.category}
                        </span>
                      )}
                      <span
                        className="text-sm transition-colors duration-150"
                        style={{
                          color: active
                            ? "var(--color-accent-1)"
                            : "var(--color-text-secondary)",
                        }}
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* ── McLaren F1 car frame — desktop only ── */}
        <div
          className="hidden lg:block shrink-0"
          style={{ width: "min(520px, 42vw)" }}
        >
          <div
            className="sticky"
            style={{ top: "50vh", transform: "translateY(-50%)" }}
          >
            {/* Car frame container — intrinsic size from the image */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "5 / 2" }}
            >
              {/* ── Car outline: always on the page, like Haley's arches ── */}
              {/* brightness(0) makes any color pure black, invert(1) flips to white */}
              {/* Result: white car silhouette at low opacity on any dark bg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/McLaren.png"
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-opacity duration-500"
                style={{
                  filter: "brightness(0) invert(1)",
                  opacity: hasImage ? 0.08 : 0.18,
                }}
              />

              {/* ── Essay image masked to the car shape ── */}
              {/* mask-image uses the PNG's alpha channel as the clipping mask */}
              <div
                className="absolute inset-0 transition-opacity duration-400"
                style={{
                  WebkitMaskImage: "url('/McLaren.png')",
                  maskImage: "url('/McLaren.png')",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  opacity: hasImage ? 1 : 0,
                }}
              >
                {essays.map((essay) =>
                  essay.frontmatter.image ? (
                    <div
                      key={essay.slug}
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{ opacity: hoveredSlug === essay.slug ? 1 : 0 }}
                    >
                      <Image
                        src={essay.frontmatter.image}
                        alt={essay.frontmatter.title}
                        fill
                        className="object-cover"
                        sizes="520px"
                      />
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {/* Caption below car */}
            <p
              className="text-center text-xs mt-3 italic transition-all duration-300"
              style={{
                color: "var(--color-text-secondary)",
                opacity: hasImage ? 0.7 : 0,
              }}
            >
              {hoveredEssay?.frontmatter.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

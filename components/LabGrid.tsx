"use client";

import { useState } from "react";
import Image from "next/image";

interface LabItem {
  title: string;
  description?: string;
  href: string | null;
  thumbnail?: string;
  year?: string;
  tags: string[];
  writeup: string | null;
}

const VISUAL_TAGS = ["figma", "design", "ui", "ux"];

function isVisual(tags: string[]) {
  return tags.some((t) => VISUAL_TAGS.includes(t.toLowerCase()));
}

export function LabGrid({ items }: { items: LabItem[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {items.map((item) => {
        const visual = isVisual(item.tags);
        const active = hovered === item.title;
        const Wrapper = item.href ? "a" : "div";
        const wrapperProps = item.href
          ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
          : {};

        return (
          <Wrapper
            key={item.title}
            {...(wrapperProps as any)}
            onMouseEnter={() => setHovered(item.title)}
            onMouseLeave={() => setHovered(null)}
            className="group flex flex-col relative overflow-hidden"
            style={{
              border: "1px solid rgba(138,191,152,0.10)",
              borderRadius: "4px",
              textDecoration: "none",
              cursor: item.href ? "pointer" : "default",
              minHeight: "160px",
            }}
          >
            {visual ? (
              /* ── Visual card: image always on, title overlaid at bottom ── */
              <>
                {item.thumbnail ? (
                  <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full"
                    style={{
                      aspectRatio: "16/10",
                      background: "rgba(245,245,220,0.04)",
                    }}
                  />
                )}
                <div className="flex flex-col gap-2 p-4">
                  <TagRow tags={item.tags} />
                  <h3 style={titleStyle}>{item.title}</h3>
                  {item.description && <p style={descStyle}>{item.description}</p>}
                  <LinkRow href={item.href} writeup={item.writeup} />
                </div>
              </>
            ) : (
              /* ── Default card: strip reveal on desktop ── */
              <>
                {/* Text content */}
                <div className="flex flex-col gap-2 p-5 flex-1">
                  <TagRow tags={item.tags} />
                  <h3 style={titleStyle}>{item.title}</h3>
                  {item.description && <p style={descStyle}>{item.description}</p>}
                  <LinkRow href={item.href} writeup={item.writeup} />
                </div>

                {/* Strip reveal — desktop only */}
                {item.thumbnail && (
                  <div
                    className="hidden sm:block absolute bottom-0 left-0 right-0 overflow-hidden"
                    style={{
                      height: active ? "52%" : "0%",
                      transition: "height 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    {/* fade top edge so it blends into text above */}
                    <div
                      className="absolute inset-x-0 top-0 h-10 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(4,47,46,0.92) 0%, transparent 100%)",
                      }}
                    />
                  </div>
                )}

                {/* Mobile: static thumbnail below text */}
                {item.thumbnail && (
                  <div
                    className="block sm:hidden relative w-full"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                )}
              </>
            )}
          </Wrapper>
        );
      })}
    </div>
  );
}

/* ── Shared sub-components ── */

function TagRow({ tags }: { tags: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} style={tagStyle}>{tag}</span>
      ))}
    </div>
  );
}

function LinkRow({ href, writeup }: { href: string | null; writeup: string | null }) {
  if (!href && !writeup) return null;
  return (
    <div className="flex items-center gap-4 mt-auto pt-3">
      {href && (
        <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(138,191,152,0.55)" }}>
          Open ↗
        </span>
      )}
      {writeup && (
        <a
          href={writeup}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs uppercase tracking-widest"
          style={{ color: "rgba(196,147,90,0.65)" }}
        >
          Writeup ↗
        </a>
      )}
    </div>
  );
}

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), Georgia, serif",
  fontWeight: 400,
  fontSize: "1.2rem",
  color: "var(--color-text-primary)",
};

const descStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter, sans-serif)",
  fontSize: "0.78rem",
  color: "var(--color-text-secondary)",
  lineHeight: 1.65,
};

const tagStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter, sans-serif)",
  fontSize: "0.6rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(138,191,152,0.65)",
  border: "1px solid rgba(138,191,152,0.20)",
  borderRadius: "2px",
  padding: "2px 6px",
};

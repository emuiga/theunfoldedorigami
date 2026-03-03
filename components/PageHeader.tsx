"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/origami", label: "Work", key: "W" },
  { href: "/thoughts", label: "Thoughts", key: "T" },
  { href: "/about", label: "About Me", key: "A" },
];

const mobileNav = [
  { href: "/origami", label: "Work" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/faith", label: "Faith" },
  { href: "/coding", label: "Coding" },
  { href: "/about", label: "About Me" },
  { href: "/stay-in-the-fold", label: "Stay in the fold" },
];

export function PageHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (pathname?.startsWith(href + "/") ?? false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Desktop ── */}
      <div className="hidden md:flex items-center justify-center px-6 py-3">
        <nav
          style={{
            width: "100%",
            height: "54px",
            borderRadius: "50%",
            border: "1px solid rgba(138,191,152,0.22)",
            background: "rgba(14,26,20,0.88)",
            backdropFilter: "blur(14px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
          }}
        >
          {/* Left + */}
          <Link
            href="/"
            aria-label="Home"
            className="text-base leading-none hover:opacity-70 transition-opacity"
            style={{ color: "rgba(138,191,152,0.45)" }}
          >
            +
          </Link>

          {/* Nav links */}
          {navLinks.map(({ href, label, key }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 text-sm tracking-wide transition-colors"
              style={{
                color: isActive(href)
                  ? "var(--color-text-primary)"
                  : "var(--color-text-secondary)",
                textDecoration: isActive(href) ? "underline" : "none",
                textUnderlineOffset: "5px",
                textDecorationColor: "var(--color-accent-1)",
              }}
            >
              {label}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20px",
                  height: "18px",
                  border: "1px solid rgba(138,191,152,0.28)",
                  borderRadius: "3px",
                  color: "rgba(138,191,152,0.55)",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {key}
              </span>
            </Link>
          ))}

          {/* Right + */}
          <Link
            href="/stay-in-the-fold"
            aria-label="Subscribe"
            className="text-base leading-none hover:opacity-70 transition-opacity"
            style={{ color: "rgba(138,191,152,0.45)" }}
          >
            +
          </Link>
        </nav>
      </div>

      {/* ── Mobile ── */}
      <div
        className="md:hidden flex items-center justify-between px-5 border-b backdrop-blur-md relative"
        style={{
          height: "52px",
          borderColor: "rgba(138,191,152,0.12)",
          background: "var(--page-bg, #0e1a14)",
        }}
      >
        <Link
          href="/"
          className="text-sm tracking-[0.18em] uppercase font-light"
          style={{ color: "var(--color-text-primary)" }}
        >
          Origami
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="flex flex-col gap-[5px] items-end w-6"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-px transition-all duration-300 origin-right"
              style={{
                background: "var(--color-accent-1)",
                width: i === 1 ? (open ? "100%" : "70%") : "100%",
                transform: open
                  ? i === 0
                    ? "rotate(-45deg) translateY(7px)"
                    : i === 2
                    ? "rotate(45deg) translateY(-7px)"
                    : "scaleX(0)"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>

        {open && (
          <div
            className="absolute top-full left-0 right-0 border-b backdrop-blur-md z-50"
            style={{
              borderColor: "rgba(138,191,152,0.12)",
              background: "var(--page-bg, #0e1a14)",
            }}
          >
            <nav className="flex flex-col px-6 py-7 gap-5">
              {mobileNav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-base transition-colors"
                  style={{
                    color: isActive(href)
                      ? "var(--color-accent-1)"
                      : "var(--color-text-secondary)",
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

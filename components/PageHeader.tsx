"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/origami",   label: "Work"      },
  { href: "/thoughts",  label: "Thoughts"  },
  { href: "/interests", label: "Interests" },
  { href: "/about",     label: "About Me"  },
];

export function PageHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (pathname?.startsWith(href + "/") ?? false);

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center px-4 py-3">
      <div style={{ width: "100%", maxWidth: "780px", position: "relative" }}>
        <nav
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "9999px",
            border: "1px solid rgba(245,245,220,0.10)",
            background: "#042F2E",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 22px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 400,
              fontSize: "1rem",
              letterSpacing: "0.08em",
              color: "rgba(245,245,220,0.88)",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            S. Muiga
          </Link>

          {/* Desktop nav links */}
          <div
            className="hidden sm:flex"
            style={{ alignItems: "center", gap: "clamp(14px, 3.5vw, 32px)" }}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-inter, sans-serif)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.07em",
                  color: isActive(href) ? "rgba(245,245,220,0.98)" : "rgba(245,245,220,0.60)",
                  textDecoration: isActive(href) ? "underline" : "none",
                  textUnderlineOffset: "4px",
                  textDecorationColor: "rgba(245,245,220,0.35)",
                  transition: "color 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex sm:hidden flex-col justify-center items-center gap-[5px]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                background: "rgba(245,245,220,0.80)",
                transition: "transform 0.22s, opacity 0.22s",
                transformOrigin: "center",
                transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                background: "rgba(245,245,220,0.80)",
                transition: "opacity 0.22s",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                background: "rgba(245,245,220,0.80)",
                transition: "transform 0.22s, opacity 0.22s",
                transformOrigin: "center",
                transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div
          className="sm:hidden overflow-hidden"
          style={{
            maxHeight: open ? "260px" : "0px",
            transition: "max-height 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            style={{
              marginTop: "8px",
              borderRadius: "16px",
              border: "1px solid rgba(245,245,220,0.10)",
              background: "#042F2E",
              padding: "8px 0",
            }}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 22px",
                  fontFamily: "var(--font-inter, sans-serif)",
                  fontSize: "0.88rem",
                  letterSpacing: "0.06em",
                  color: isActive(href) ? "rgba(245,245,220,0.98)" : "rgba(245,245,220,0.60)",
                  textDecoration: "none",
                  borderLeft: isActive(href)
                    ? "2px solid rgba(138,191,152,0.6)"
                    : "2px solid transparent",
                  transition: "color 0.15s",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

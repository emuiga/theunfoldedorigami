"use client";

import Link from "next/link";
import Image from "next/image";

export function PortfolioHeader() {
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
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 400,
              fontSize: "1rem",
              letterSpacing: "0.08em",
               color: "rgb(245,245,220)",
              whiteSpace: "nowrap",
            }}
          >
            S. Muiga
          </span>

          {/* Unfolded Origami link with crane icon */}
          <Link
            href="/home"
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--font-mulish), Mulish, sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.07em",
               color: "rgb(245,245,220)",
              textDecoration: "none",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,245,220,0.85)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,220,0.55)")}
          >
            <Image
              src="/paper.png"
              alt=""
              width={16}
              height={16}
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(47%) sepia(60%) saturate(700%) hue-rotate(334deg) brightness(110%)",
              }}
            />
            Unfolded Origami
          </Link>
        </nav>
      </div>
    </header>
  );
}

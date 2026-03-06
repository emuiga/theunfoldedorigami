"use client";

import { useState } from "react";

const socialLinks = [
  { label: "Substack",  href: "https://stevemuiga.substack.com" },
  { label: "GitHub",    href: "https://github.com/emuiga" },
  { label: "LinkedIn",  href: "https://linkedin.com/in/stevemuiga" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    window.open(
      `https://stevemuiga.substack.com?email=${encodeURIComponent(trimmed)}`,
      "_blank"
    );
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer style={{ background: "var(--page-bg, #0e1a14)" }}>
      {/* Top divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ height: "1px", background: "rgba(138,191,152,0.10)" }} />
      </div>

      {/* Main footer body */}
      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-end justify-between gap-12">

        {/* Left — branding */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "rgba(245,245,220,0.80)",
              lineHeight: 1,
              marginBottom: "0.6rem",
            }}
          >
            The Unfolded Origami
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              color: "rgba(245,245,220,0.28)",
              textTransform: "uppercase",
            }}
          >
            Ideas, slowly unfolded.
          </p>
        </div>

        {/* Right — links + subscribe form */}
        <div className="flex flex-col items-start md:items-end gap-5">

          {/* Social links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-inter, sans-serif)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  color: "rgba(245,245,220,0.58)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,245,220,0.90)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,220,0.58)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Subscribe form */}
          <form onSubmit={handleSubscribe} style={{ width: "100%" }}>
            <p
              style={{
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(245,245,220,0.45)",
                marginBottom: "8px",
                textAlign: "right",
              }}
            >
              Subscribe to the newsletter
            </p>
            <div className="flex items-center gap-0" style={{ border: "1px solid rgba(245,245,220,0.10)", borderRadius: "9999px", overflow: "hidden" }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: "7px 16px",
                  fontFamily: "var(--font-inter, sans-serif)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.04em",
                  color: "rgba(245,245,220,0.65)",
                  minWidth: 0,
                }}
              />
              <button
                type="submit"
                style={{
                  background: sent ? "rgba(255,103,25,0.15)" : "rgb(255, 103, 25)",
                  border: "none",
                  borderLeft: "1px solid rgba(245,245,220,0.10)",
                  padding: "7px 16px",
                  cursor: "pointer",
                  fontFamily: "var(--font-inter, sans-serif)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: sent ? "rgb(255,103,25)" : "#fff",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {sent ? "✓ opening" : "subscribe →"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ height: "1px", background: "rgba(138,191,152,0.07)" }} />
        <div className="flex justify-between items-center py-5">
          <span
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "0.65rem",
              letterSpacing: "0.06em",
              color: "rgba(245,245,220,0.18)",
            }}
          >
            © 2026 Steve Muiga
          </span>
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic",
              fontSize: "0.8rem",
              color: "rgba(245,245,220,0.14)",
            }}
          >
            Nairobi, Kenya
          </span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

const socialLinks = [
  { label: "Substack", href: "https://stevemuiga.substack.com" },
  { label: "GitHub", href: "https://github.com/stevemuiga" },
  { label: "X / Twitter", href: "https://x.com/stevemuiga" },
  { label: "Instagram", href: "https://instagram.com/stevemuiga" },
  { label: "LinkedIn", href: "https://linkedin.com/in/stevemuiga" },
];

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-accent-1)]/10"
      style={{ background: "var(--page-bg, #0e1a14)" }}
    >
      {/* Curved "Stay in the fold?" */}
      <div className="flex justify-center pt-20 pb-4 px-6">
        <svg
          viewBox="0 0 600 190"
          className="w-full max-w-2xl"
          aria-label="Stay in the fold?"
        >
          <defs>
            <path id="footer-arc" d="M 40 175 Q 300 15 560 175" />
          </defs>
          <text
            fill="#EDE8D6"
            fontSize="50"
            fontStyle="italic"
            fontWeight="300"
            fontFamily="Georgia, 'Times New Roman', serif"
          >
            <textPath href="#footer-arc" startOffset="50%" textAnchor="middle">
              Stay in the fold?
            </textPath>
          </text>
        </svg>
      </div>

      <p className="text-center text-sm mb-16 italic text-[var(--color-text-secondary)]">
        ideas, slowly unfolded.
      </p>

      {/* Social links */}
      <div className="max-w-4xl mx-auto px-8 mb-10">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-accent-1)]/10 px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[var(--color-text-secondary)]">
        <span className="text-xs">© 2026 The Unfolded Origami</span>
        <span className="text-xs italic hidden sm:block">
          I showed you my footer, please respond.
        </span>
        <Link
          href="/stay-in-the-fold"
          className="text-xs transition-colors hover:text-[var(--color-text-primary)]"
        >
          subscribe [S]
        </Link>
      </div>
    </footer>
  );
}

import { PageHeader } from "@/components/PageHeader";
import { NewsletterForm } from "@/components/NewsletterForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stay in the Fold",
  description: "Subscribe to The Unfolded Origami newsletter.",
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen">
      <style>{`:root { --page-bg: #0e1a14; }`}</style>
      <PageHeader />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-lg mx-auto w-full text-center">

          <h1
            className="leading-tight mb-4"
            style={{
              fontFamily: "var(--font-spectral), Georgia, serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Letters from<br />the Fold
          </h1>

          <p
            className="text-base mb-12"
            style={{ color: "var(--color-accent-1)" }}
          >
            Occasional notes on thinking, building, and becoming.
          </p>

          <NewsletterForm />

          <div className="mt-10">
            <Link
              href="/"
              className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              ← back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

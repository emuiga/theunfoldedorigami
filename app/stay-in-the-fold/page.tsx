"use client";

import { useState } from "react";
import Link from "next/link";
import { VideoBackground } from "@/components/VideoBackground";
import { PageHeader } from "@/components/PageHeader";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <VideoBackground />
      <PageHeader />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24 pt-24">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[var(--color-text-primary)] mb-6 leading-tight" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }}>
              <span className="md:hidden">Letters from the<br />Fold</span>
              <span className="hidden md:block">Letters from the Fold</span>
            </h1>
            <p className="text-base md:text-xl text-[var(--color-accent-1)] font-light" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }}>
              Occasional notes on thinking, building, and becoming.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-[#111] border border-[#333] text-[var(--color-text-primary)] placeholder-[#666] focus:outline-none focus:border-[var(--color-accent-1)] transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-3 bg-[var(--color-button)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-accent-2)] transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-[var(--color-accent-1)] text-lg mb-6">Thanks for subscribing!</p>
              <Link
                href="/"
                className="text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors underline"
              >
                ← Flip this way
              </Link>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-[#888] hover:text-[var(--color-accent-1)] transition-colors text-sm"
            >
              ← Flip this way
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


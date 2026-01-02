"use client";

import { useState } from "react";
import Link from "next/link";
import { VideoBackground } from "@/components/VideoBackground";
import { PageHeader } from "@/components/PageHeader";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with your newsletter service
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <VideoBackground />
      <PageHeader />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24 pt-24">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-light text-[var(--color-text-primary)] mb-4">Stay in the Fold</h1>
            <p className="text-xl text-[var(--color-accent-1)] font-light">
              Get the latest essays and thoughts delivered to your inbox.
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
                  className="w-full px-4 py-3 bg-[#111] border border-[#333] text-[var(--color-text-primary)] placeholder-[#666] focus:outline-none focus:border-[var(--color-accent-1)] transition-colors rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-[var(--color-button)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-accent-2)] transition-colors rounded-full"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-[var(--color-accent-1)] text-lg mb-6">Thanks for subscribing!</p>
              <Link
                href="/"
                className="text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors underline"
              >
                ← Back to Home
              </Link>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-[#888] hover:text-[var(--color-accent-1)] transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


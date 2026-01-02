import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { VideoBackground } from "@/components/VideoBackground";

export default function FoldsPage() {
  return (
    <>
      <VideoBackground />
      <PageHeader />
      <div className="relative z-10 min-h-screen px-6 py-24 pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-light text-[var(--color-text-primary)] mb-6">Folds</h1>
          <p className="text-xl text-[var(--color-accent-1)] mb-12">
            Short thoughts, quick folds. Small ideas that haven't fully unfolded yet.
          </p>
          <p className="text-[#888]">Coming soon.</p>
          <Link
            href="/"
            className="inline-block mt-8 text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors"
          >
            ← Home
          </Link>
        </div>
      </div>
    </>
  );
}


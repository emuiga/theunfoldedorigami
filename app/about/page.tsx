import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { VideoBackground } from "@/components/VideoBackground";

export default function AboutPage() {
  return (
    <>
      <VideoBackground />
      <PageHeader />
      <div className="relative z-10 min-h-screen px-6 py-24 pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-light text-[var(--color-text-primary)] mb-6">About</h1>
          <div className="space-y-6 text-lg text-[#ddd] leading-relaxed">
            <p>
              The Unfolded Origami is a space for ideas that begin folded—curious, 
              compact, waiting to reveal their shape.
            </p>
            <p>
              Each essay here starts as a single fold: a question, an observation, 
              a moment of wonder. Through careful writing and reflection, these folds 
              gradually unfold into clarity.
            </p>
            <p>
              Just like origami, the process matters. There is no rushing, no skipping 
              steps. Each crease builds upon the last, creating structure from chaos, 
              meaning from confusion.
            </p>
            <p className="text-[var(--color-accent-1)]">
              Ideas, slowly unfolded.
            </p>
          </div>
          <Link
            href="/"
            className="inline-block mt-12 text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] transition-colors"
          >
            ← Home
          </Link>
        </div>
      </div>
    </>
  );
}


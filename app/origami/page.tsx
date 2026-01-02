import Link from "next/link";
import Image from "next/image";
import { getAllEssays } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import { VideoBackground } from "@/components/VideoBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origami",
  description: "All essays from The Unfolded Origami.",
};

export default async function OrigamiPage() {
  const essays = await getAllEssays();

  return (
    <>
      <VideoBackground />
      <PageHeader />
      <div className="relative z-10 min-h-screen pt-32">
        <div className="space-y-0">
          {essays.map((essay, index) => (
            <Link
              key={essay.slug}
              href={`/essays/${essay.slug}`}
              className="block group"
            >
              <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
                {essay.frontmatter.image ? (
                  <Image
                    src={essay.frontmatter.image}
                    alt={essay.frontmatter.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#111] to-[#000]" />
                )}
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                
                {/* Title overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-text-primary)] text-center px-6 max-w-5xl leading-tight">
                    {essay.frontmatter.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {essays.length === 0 && (
          <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
            <p className="text-[#888] font-light">No essays yet.</p>
          </div>
        )}
      </div>
    </>
  );
}


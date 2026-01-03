import Link from "next/link";
import Image from "next/image";
import { getEssaysByCategory } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import { VideoBackground } from "@/components/VideoBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coding",
  description: "Essays about coding and technology.",
};

export default async function CodingPage() {
  const essays = await getEssaysByCategory("coding");

  return (
    <>
      <VideoBackground />
      <PageHeader />
      <div className="relative z-10 min-h-screen pt-32">
        <div className="space-y-0">
          {essays.map((essay) => (
            <Link
              key={essay.slug}
              href={`/essays/${essay.slug}`}
              className="block"
            >
              <div className="relative w-full h-[30vh] min-h-[250px] md:h-[40vh] md:min-h-[300px] overflow-hidden">
                {essay.frontmatter.image ? (
                  <Image
                    src={essay.frontmatter.image}
                    alt={essay.frontmatter.title}
                    fill
                    className="object-cover brightness-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#111] to-[#000]" />
                )}
                
                {/* Light overlay for text readability */}
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Title overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-3xl md:text-7xl lg:text-8xl font-serif font-black text-[var(--color-text-primary)] text-center px-6 max-w-5xl leading-tight">
                    {essay.frontmatter.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {essays.length === 0 && (
          <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32">
            <p className="text-[#888] font-light">No coding essays yet.</p>
          </div>
        )}
      </div>
    </>
  );
}


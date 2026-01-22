"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Essay {
  slug: string;
  frontmatter: {
    title: string;
    image?: string;
  };
}

interface CodingContentProps {
  essays: Essay[];
}

export default function CodingContent({ essays }: CodingContentProps) {
  const [activeTab, setActiveTab] = useState<"articles" | "crafts">("articles");

  const crafts: Array<{
    slug: string;
    title: string;
    description?: string;
    image?: string;
  }> = [];

  return (
    <div className="relative z-10 min-h-screen pt-32">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8 px-6">
        <button
          onClick={() => setActiveTab("articles")}
          className={`
            px-6 py-3 font-medium transition-colors rounded-lg
            ${
              activeTab === "articles"
                ? "bg-[var(--color-button)] text-[var(--color-text-primary)]"
                : "bg-[#222] text-[#888] hover:text-[var(--color-text-primary)]"
            }
          `}
        >
          Articles
        </button>
        <button
          onClick={() => setActiveTab("crafts")}
          className={`
            px-6 py-3 font-medium transition-colors rounded-lg
            ${
              activeTab === "crafts"
                ? "bg-[var(--color-button)] text-[var(--color-text-primary)]"
                : "bg-[#222] text-[#888] hover:text-[var(--color-text-primary)]"
            }
          `}
        >
          Crafts
        </button>
      </div>

      {/* Content */}
      <div className="px-6">
        {activeTab === "articles" && (
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

            {essays.length === 0 && (
              <div className="flex items-center justify-center py-16">
                <p className="text-[#888] font-light">No coding essays yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "crafts" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-16">
            {crafts.map((craft) => (
              <Link
                key={craft.slug}
                href={`/coding/${craft.slug}`}
                className="group block"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-[#111] border border-[#333] hover:border-[var(--color-accent-1)] transition-colors">
                  {craft.image && (
                    <Image
                      src={craft.image}
                      alt={craft.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-2">
                      {craft.title}
                    </h3>
                    {craft.description && (
                      <p className="text-[#888] text-sm md:text-base">
                        {craft.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}

            {crafts.length === 0 && (
              <div className="col-span-full flex items-center justify-center py-16">
                <p className="text-[#888] font-light">No crafts yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


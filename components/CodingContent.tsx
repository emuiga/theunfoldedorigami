"use client";

import { useState } from "react";
import { EssayListHover } from "@/components/EssayListHover";

interface Essay {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    category?: string;
    excerpt?: string;
    image?: string;
    substackUrl?: string;
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
  }> = [];

  return (
    <div className="relative z-10 min-h-screen pt-16 pb-16">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10 px-6">
        <button
          onClick={() => setActiveTab("articles")}
          className={`
            px-6 py-3 font-medium transition-colors rounded-lg
            ${
              activeTab === "articles"
                ? "bg-[var(--color-button)] text-[var(--color-text-primary)]"
                : "bg-[#1a2535] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
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
                : "bg-[#1a2535] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }
          `}
        >
          Crafts
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {activeTab === "articles" && <EssayListHover essays={essays} />}

        {activeTab === "crafts" && (
          <div className="py-16 text-center">
            <p className="text-[var(--color-text-secondary)] font-light">
              {crafts.length === 0 ? "No crafts yet." : null}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

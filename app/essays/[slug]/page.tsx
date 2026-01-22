import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllEssaySlugs, getEssayBySlug } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import { VideoBackground } from "@/components/VideoBackground";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

interface EssayPageProps {
  params: Promise<{ slug: string }>;
}

// Revalidate every 60 seconds to fetch fresh Contentful data
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllEssaySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);

  if (!essay) {
    return {
      title: "Essay Not Found",
    };
  }

  return {
    title: `${essay.frontmatter.title} | The Unfolded Origami`,
    description: essay.frontmatter.excerpt || "An essay from The Unfolded Origami",
  };
}

// Generate Substack URL from slug
function getSubstackUrl(slug: string): string {
  return `https://stevemuiga.substack.com/p/${slug}`;
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  const substackUrl = getSubstackUrl(slug);

  return (
    <>
      <VideoBackground />
      <PageHeader />
      <div className="relative z-10 min-h-screen pt-32">
        {/* Image section with title overlay */}
        <div className="relative w-full h-[30vh] min-h-[250px] md:h-[40vh] md:min-h-[300px]">
          {essay.frontmatter.image ? (
            <Image
              src={essay.frontmatter.image}
              alt={essay.frontmatter.title}
              fill
              className="object-cover brightness-110"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#111] to-[#000]" />
          )}
          
          {/* Light overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Title overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl md:text-7xl lg:text-8xl font-serif font-black text-[var(--color-text-primary)] text-center px-6 max-w-5xl leading-tight">
              {essay.frontmatter.title}
            </h1>
          </div>
        </div>

        {/* Article content */}
        <div className="bg-black text-[var(--color-text-primary)]">
          <div className="max-w-3xl mx-auto px-6 py-12">
            {/* Read on Substack button */}
            <div className="mb-8 flex justify-center">
              <a
                href={substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-button)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-accent-2)] transition-colors rounded-full"
              >
                <span>Read on Substack</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
            <article className="max-w-none">
              {/* Article content */}
              <div className="max-w-none">
                <div className="substack-content [&_h1]:text-3xl [&_h1]:font-serif [&_h1]:mt-12 [&_h1]:mb-4 [&_h1]:text-[var(--color-text-primary)] [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-[var(--color-text-primary)] [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-serif [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-[var(--color-text-primary)] [&_h3]:font-semibold [&_p]:text-[#ddd] [&_a]:text-[var(--color-accent-1)] [&_a]:no-underline hover:[&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ul]:text-[#ddd] [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_ol]:text-[#ddd] [&_code]:bg-[#222] [&_code]:text-[var(--color-accent-1)] [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-[#222] [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:border [&_pre]:border-[#333] [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-accent-1)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#aaa]">
                  <ReactMarkdown>{essay.content}</ReactMarkdown>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}


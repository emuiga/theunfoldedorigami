import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllEssaySlugs, getEssayBySlug } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

interface EssayPageProps {
  params: Promise<{ slug: string }>;
}

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
    return { title: "Essay Not Found" };
  }

  return {
    title: `${essay.frontmatter.title} | The Unfolded Origami`,
    description:
      essay.frontmatter.excerpt || "An essay from The Unfolded Origami",
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  const substackUrl =
    essay.frontmatter.substackUrl ??
    `https://stevemuiga.substack.com/p/${essay.slug}`;

  return (
    <div>
      <style>{`:root { --page-bg: #0e0e0e; }`}</style>
      <PageHeader />

      {/* Cover image + title */}
      <div className="relative w-full" style={{ minHeight: "40vh" }}>
        {essay.frontmatter.image ? (
          <div className="relative w-full" style={{ height: "45vh", minHeight: "280px" }}>
            <Image
              src={essay.frontmatter.image}
              alt={essay.frontmatter.title}
              fill
              className="object-cover brightness-75"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(14,14,14,0.35)" }}
            />
            <div className="absolute inset-0 flex items-end justify-center pb-10 px-6">
              <h1
                className="text-center leading-tight max-w-4xl"
                style={{
                  fontFamily: "var(--font-spectral), Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(2rem, 6vw, 4.5rem)",
                  color: "var(--color-text-primary)",
                }}
              >
                {essay.frontmatter.title}
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center px-6 pt-24 pb-12">
            <h1
              className="text-center leading-tight max-w-3xl"
              style={{
                fontFamily: "var(--font-spectral), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(2rem, 6vw, 4rem)",
                color: "var(--color-text-primary)",
              }}
            >
              {essay.frontmatter.title}
            </h1>
          </div>
        )}
      </div>

      {/* Article content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Meta */}
        <div
          className="flex items-center gap-4 mb-10 text-sm pb-8"
          style={{
            color: "var(--color-text-secondary)",
            borderBottom: "1px solid rgba(138,191,152,0.10)",
          }}
        >
          {essay.frontmatter.date && (
            <span>
              {new Date(essay.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          )}
          {essay.frontmatter.category && (
            <>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{essay.frontmatter.category}</span>
            </>
          )}
          <span style={{ opacity: 0.4, marginLeft: "auto" }}>
            <a
              href={substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-accent-1)" }}
            >
              Read on Substack ↗
            </a>
          </span>
        </div>

        <article
          className="[&_h1]:text-2xl [&_h1]:font-serif [&_h1]:mt-12 [&_h1]:mb-4 [&_h1]:font-light
            [&_h2]:text-xl [&_h2]:font-serif [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-light
            [&_h3]:text-lg [&_h3]:font-serif [&_h3]:mt-8 [&_h3]:mb-2
            [&_p]:mb-5 [&_p]:leading-[1.85] [&_p]:text-[1.0625rem]
            [&_a]:text-[var(--color-accent-1)] [&_a]:no-underline hover:[&_a]:underline
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
            [&_li]:mb-2
            [&_code]:bg-[#1a1a1a] [&_code]:text-[var(--color-accent-1)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
            [&_pre]:bg-[#111] [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:border [&_pre]:border-[#222]
            [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--color-accent-1)]/40 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[var(--color-text-secondary)]"
          style={{
            fontFamily: "var(--font-spectral), Georgia, serif",
            fontSize: "1.0625rem",
            color: "#d4cdb8",
            lineHeight: "1.85",
          }}
        >
          <ReactMarkdown>{essay.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

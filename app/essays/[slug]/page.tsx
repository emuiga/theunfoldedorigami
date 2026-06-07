import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllEssaySlugs, getEssayBySlug, getAllEssays } from "@/lib/essays";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import type { Metadata } from "next";

interface EssayPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllEssaySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);
  if (!essay) return { title: "Essay Not Found" };
  const description = essay.frontmatter.excerpt || "An essay from The Unfolded Origami";
  return {
    title: essay.frontmatter.title,
    description,
    openGraph: {
      title: essay.frontmatter.title,
      description,
      type: "article",
      siteName: "The Unfolded Origami",
      ...(essay.frontmatter.image && {
        images: [{ url: essay.frontmatter.image, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: essay.frontmatter.title,
      description,
      ...(essay.frontmatter.image && { images: [essay.frontmatter.image] }),
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const [essay, allEssays] = await Promise.all([
    getEssayBySlug(slug),
    getAllEssays(),
  ]);

  if (!essay) notFound();

  const currentIndex = allEssays.findIndex((e) => e.slug === slug);
  const prev = currentIndex < allEssays.length - 1 ? allEssays[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allEssays[currentIndex - 1] : null;
  const substackUrl = essay.frontmatter.substackUrl ?? null;
  const backHref = essay.frontmatter.category === "technical" ? "/origami" : "/thoughts";

  return (
    <div style={{ background: "#0a1410", minHeight: "100vh" }}>
      <style>{`
        :root { --page-bg: #0a1410; }
        .prose p { margin-bottom: 1.6rem; }
        .prose h2 {
          font-family: var(--font-spectral), serif;
          font-size: 1.4rem;
          font-weight: 400;
          color: rgb(245,245,220);
          margin-top: 3rem;
          margin-bottom: 0.9rem;
        }
        .prose h3 {
          font-family: var(--font-spectral), serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: rgb(245,245,220);
          margin-top: 2.2rem;
          margin-bottom: 0.6rem;
        }
        .prose a {
          color: rgba(232,108,61,0.85);
          text-decoration: none;
          border-bottom: 1px solid rgba(232,108,61,0.30);
          padding-bottom: 1px;
          transition: color 0.15s, border-color 0.15s;
        }
        .prose a:hover { color: #E86C3D; border-color: rgba(232,108,61,0.65); }
        .prose ul { list-style: disc; margin-left: 1.5rem; margin-bottom: 1.6rem; }
        .prose ol { list-style: decimal; margin-left: 1.5rem; margin-bottom: 1.6rem; }
        .prose li { margin-bottom: 0.5rem; }
        .prose blockquote {
          border-left: 2px solid rgba(232,108,61,0.35);
          padding-left: 1.2rem;
          margin-left: 0;
          font-style: italic;
          color: rgb(245,245,220);
          margin-bottom: 1.6rem;
        }
        .prose code {
          font-size: 0.85em;
          background: rgba(245,245,220,0.06);
          border-radius: 3px;
          padding: 0.15em 0.4em;
          color: rgba(232,108,61,0.85);
        }
        .prose pre {
          background: #111;
          border: 1px solid rgba(245,245,220,0.07);
          border-radius: 6px;
          padding: 1.2rem;
          overflow-x: auto;
          margin-bottom: 1.6rem;
        }
        .prose pre code { background: none; padding: 0; color: rgb(245,245,220); }
        .back-link { transition: color 0.15s; }
        .back-link:hover { color: rgba(245,245,220,0.70) !important; }
        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: rgba(245,245,220,0.85) !important; }
      `}</style>


      <main className="max-w-2xl mx-auto px-6 pt-10 pb-28">

        {/* Site name */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
             color: "rgb(245,245,220)",
            marginBottom: "1.2rem",
            textAlign: "center",
          }}
        >
          The Unfolded Origami
        </p>

        {/* Amber rule */}
        <div style={{ height: "2px", background: "rgba(196,147,90,0.55)", marginBottom: "2rem" }} />

        {/* Article title — centred */}
        <h1
          style={{
            fontFamily: "var(--font-spectral), serif",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
            lineHeight: 1.15,
             color: "rgb(245,245,220)",
            marginBottom: "0.8rem",
          }}
        >
          {essay.frontmatter.title}
        </h1>

        {/* Excerpt subtitle */}
        {essay.frontmatter.excerpt && (
          <p
            style={{
              fontFamily: "var(--font-spectral), serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.05rem",
              lineHeight: 1.55,
               color: "rgb(245,245,220)",
              textAlign: "center",
              marginBottom: "1.4rem",
            }}
          >
            {essay.frontmatter.excerpt}
          </p>
        )}

        {/* Author + date row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.7rem", marginBottom: "2rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mulish), Mulish, sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
               color: "rgb(245,245,220)",
            }}
          >
            Steve Muiga
          </span>
          <span style={{  color: "rgb(245,245,220)", fontSize: "0.4rem" }}>◆</span>
          {essay.frontmatter.date && (
            <span
              style={{
                fontFamily: "var(--font-mulish), Mulish, sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.08em",
                 color: "rgb(245,245,220)",
              }}
            >
              {formatDate(essay.frontmatter.date)}
            </span>
          )}
          {essay.frontmatter.category && (
            <span
              style={{
                fontFamily: "var(--font-mulish), Mulish, sans-serif",
                fontSize: "0.56rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(232,108,61,0.60)",
                border: "1px solid rgba(232,108,61,0.20)",
                borderRadius: "9999px",
                padding: "2px 8px",
              }}
            >
              {essay.frontmatter.category}
            </span>
          )}
          {substackUrl && (
            <>
              <span style={{  color: "rgb(245,245,220)", fontSize: "0.4rem" }}>◆</span>
              <a
                href={substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mulish), Mulish, sans-serif",
                  fontSize: "0.60rem",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(232,108,61,0.55)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(232,108,61,0.20)",
                }}
              >
                Substack &rarr;
              </a>
            </>
          )}
        </div>

        {/* Cover image */}
        {essay.frontmatter.image && (
          <div
            className="relative w-full mb-10"
            style={{
              height: "clamp(220px, 45vw, 420px)",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <Image
              src={essay.frontmatter.image}
              alt={essay.frontmatter.title}
              fill
              className="object-cover"
              priority
              style={{ filter: "brightness(1.05)" }}
            />
          </div>
        )}

        {/* Dashed divider */}
        <div style={{ borderTop: "1px dashed rgba(245,245,220,0.12)", marginBottom: "2.5rem" }} />

        {/* Body */}
        <article
          className="prose"
          style={{
            fontFamily: "var(--font-spectral), serif",
            fontSize: "17px",
            lineHeight: "32px",
            color: "rgb(245,245,220)",
          }}
        >
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
              ),
            }}
          >
            {essay.content}
          </ReactMarkdown>
        </article>

        {/* Dashed divider */}
        <div style={{ borderTop: "1px dashed rgba(245,245,220,0.10)", margin: "3.5rem 0 2.5rem" }} />

        {/* Back link — centred */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link
            href={backHref}
            className="back-link"
            style={{
              fontFamily: "var(--font-mulish), Mulish, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
               color: "rgb(245,245,220)",
              textDecoration: "none",
            }}
          >
            &larr; Back
          </Link>
        </div>

        {/* Prev / Next */}
        <nav className="flex justify-between items-start gap-6">
          {prev ? (
            <Link href={`/essays/${prev.slug}`} style={{ textDecoration: "none", maxWidth: "45%" }}>
              <span style={{ display: "block", fontFamily: "var(--font-mulish), Mulish, sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase",  color: "rgb(245,245,220)", marginBottom: "0.5rem" }}>
                &larr; Previous
              </span>
              <span className="nav-link" style={{ fontFamily: "var(--font-spectral), serif", fontWeight: 400, fontSize: "1rem", fontStyle: "italic",  color: "rgb(245,245,220)" }}>
                {prev.frontmatter.title}
              </span>
            </Link>
          ) : <span />}

          {next ? (
            <Link href={`/essays/${next.slug}`} style={{ textDecoration: "none", maxWidth: "45%", textAlign: "right" }}>
              <span style={{ display: "block", fontFamily: "var(--font-mulish), Mulish, sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase",  color: "rgb(245,245,220)", marginBottom: "0.5rem" }}>
                Next &rarr;
              </span>
              <span className="nav-link" style={{ fontFamily: "var(--font-spectral), serif", fontWeight: 400, fontSize: "1rem", fontStyle: "italic",  color: "rgb(245,245,220)" }}>
                {next.frontmatter.title}
              </span>
            </Link>
          ) : <span />}
        </nav>
      </main>
    </div>
  );
}

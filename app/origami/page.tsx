import fs from "fs";
import path from "path";
import { PageHeader } from "@/components/PageHeader";
import { ArticleList } from "@/components/ArticleList";
import { getEssaysByCategory } from "@/lib/essays";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origami",
  description: "Technical writing by Steve Muiga.",
};

export const revalidate = 60;

function getOrigamiImages(): string[] {
  const dir = path.join(process.cwd(), "public", "origami");
  if (!fs.existsSync(dir)) return ["/paper.png"];
  const files = fs.readdirSync(dir).filter((f) =>
    /\.(png|jpg|jpeg|webp|svg)$/i.test(f)
  );
  if (files.length === 0) return ["/paper.png"];
  return files.map((f) => `/origami/${f}`);
}

export default async function OrigamiPage() {
  const essays = await getEssaysByCategory("technical");
  const images = getOrigamiImages();

  const articles = essays.map((e, i) => ({
    slug: e.slug,
    title: e.frontmatter.title,
    date: e.frontmatter.date,
    excerpt: e.frontmatter.excerpt,
    icon: images[i % images.length],
  }));

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/backg3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 z-0" style={{ background: "rgba(4,47,46,0.92)" }} />
      <style>{`:root { --page-bg: #042F2E; }`}</style>
      <PageHeader />

      <div className="relative z-10 pt-10 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 pt-8">

            {/* ── Sidebar ── */}
            <aside className="lg:sticky lg:top-24 lg:self-start lg:w-64 shrink-0 mb-12 lg:mb-0">
              <h1
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(2rem, 5vw, 2.8rem)",
                  lineHeight: 1.05,
                   color: "rgb(245,245,220)",
                  marginBottom: "1.2rem",
                }}
              >
                Origami
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-mulish), Mulish, sans-serif",
                  fontSize: "0.78rem",
                  lineHeight: 1.85,
                   color: "rgb(245,245,220)",
                  marginBottom: "2rem",
                }}
              >
                Technical writing — how I build things, what I&apos;ve learned,
                and the problems worth thinking through carefully.
              </p>
              <div style={{ height: "1px", background: "rgba(138,191,152,0.12)", marginBottom: "1.8rem" }} />
              <p
                style={{
                  fontFamily: "var(--font-mulish), Mulish, sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                   color: "rgb(245,245,220)",
                }}
              >
                {articles.length} {articles.length === 1 ? "article" : "articles"}
              </p>
            </aside>

            {/* ── Article list ── */}
            <div className="flex-1 min-w-0">
              <ArticleList articles={articles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

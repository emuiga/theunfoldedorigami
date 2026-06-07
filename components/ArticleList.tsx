"use client";

import Image from "next/image";

interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  icon: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function ArticleList({ articles, basePath = "/essays" }: { articles: Article[]; basePath?: string }) {
  return (
    <div>
      {articles.length === 0 ? (
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.1rem",
             color: "rgb(245,245,220)",
            paddingTop: "2rem",
          }}
        >
          Nothing here yet — writing coming soon.
        </p>
      ) : (
        articles.map((article, i) => (
          <a
            key={article.slug}
            href={`${basePath}/${article.slug}`}
            className="article-row group flex items-start gap-6 py-9"
            style={{
              textDecoration: "none",
              borderTop: i === 0 ? "none" : "1px dashed rgba(245,245,220,0.12)",
              position: "relative",
            }}
          >
            {/* Origami icon */}
            <div style={{ flexShrink: 0, width: "56px", height: "56px", position: "relative", marginTop: "4px" }}>
              <Image
                src={article.icon}
                alt=""
                fill
                style={{
                  objectFit: "contain",
                  filter:
                    "brightness(0) saturate(100%) invert(47%) sepia(60%) saturate(700%) hue-rotate(334deg) brightness(110%)",
                  opacity: 0.80,
                }}
                sizes="56px"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 pr-8">
              <h2
                className="article-title"
                style={{
                  fontFamily: "var(--font-spectral), serif",
                  fontWeight: 400,
                  fontSize: "30px",
                  lineHeight: "39px",
                   color: "rgb(245,245,220)",
                  marginBottom: "0.35rem",
                  transition: "color 0.15s",
                }}
              >
                {article.title}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-mulish), Mulish, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.07em",
                   color: "rgb(245,245,220)",
                  marginBottom: article.excerpt ? "0.6rem" : 0,
                }}
              >
                {formatDate(article.date)}
              </p>

              {article.excerpt && (
                <p
                  style={{
                    fontFamily: "var(--font-mulish), Mulish, sans-serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.75,
                     color: "rgb(245,245,220)",
                  }}
                >
                  {article.excerpt}
                </p>
              )}
            </div>

            {/* Arrow */}
            <span
              className="article-arrow"
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "0.9rem",
                color: "rgba(232,108,61,0.70)",
                opacity: 0,
                transition: "opacity 0.15s, transform 0.15s",
              }}
            >
              →
            </span>
          </a>
        ))
      )}

      <style>{`
        .article-row:hover .article-arrow { opacity: 1 !important; transform: translateY(-50%) translateX(4px) !important; }
        .article-row:hover .article-title { color: rgba(245,245,220,1) !important; }
      `}</style>
    </div>
  );
}

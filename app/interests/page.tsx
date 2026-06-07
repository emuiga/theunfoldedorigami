import { PageHeader } from "@/components/PageHeader";
import { getAllBooks, getAllQuotes } from "@/lib/contentful";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interests",
  description: "Books I've read and bangers that have stayed with me.",
};

function BookCard({ book, imageRight }: { book: any; imageRight: boolean }) {
  const hasReaction = !!book.reaction;

  const imageBlock = (
    <div className="book-img-wrap mx-auto sm:mx-0" style={{ position: "relative", width: 180, height: 246, flexShrink: 0 }}>
      {/* Dot pattern — extends beyond the image */}
      <div
        style={{
          position: "absolute",
          inset: "-20px",
          backgroundImage:
            "radial-gradient(circle, rgba(245,245,220,0.09) 1px, transparent 1px)",
          backgroundSize: "11px 11px",
        }}
      />
      {/* Offset warm rectangle */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: imageRight ? 10 : -10,
          width: "100%",
          height: "100%",
          background: "rgba(196,147,90,0.10)",
        }}
      />
      {/* Cover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
          background: "rgba(245,245,220,0.05)",
        }}
      >
        {book.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.cover}
            alt={book.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          /* Lettermark placeholder */
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "4rem",
                fontWeight: 300,
                 color: "rgb(245,245,220)",
              }}
            >
              {book.title?.[0] ?? "?"}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const textBlock = (
    <div
      className="w-full sm:flex-1"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignSelf: hasReaction ? "flex-start" : "center",
        maxWidth: "520px",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontWeight: 400,
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          color: "var(--color-text-primary)",
          lineHeight: 1.1,
        }}
      >
        {book.title}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-mulish), Mulish, sans-serif",
          fontSize: "0.70rem",
          letterSpacing: "0.08em",
          color: "var(--color-text-secondary)",
        }}
      >
        {book.author}
        {book.yearRead ? ` · ${book.yearRead}` : ""}
        {book.tag ? ` · ${book.tag}` : ""}
      </p>
      {hasReaction && (
        <p
          style={{
            fontFamily: "var(--font-spectral), Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.88rem",
            lineHeight: 1.8,
             color: "rgb(245,245,220)",
            maxWidth: "420px",
            marginTop: "4px",
          }}
        >
          {book.reaction}
        </p>
      )}
    </div>
  );

  return (
    <div
      className={`flex flex-col ${imageRight ? "sm:flex-row-reverse" : "sm:flex-row"} items-center gap-8`}
      style={{
        paddingTop: "52px",
        paddingBottom: "52px",
        borderTop: "1px solid rgba(138,191,152,0.09)",
      }}
    >
      {imageBlock}
      {textBlock}
    </div>
  );
}

export default async function InterestsPage() {
  const [books, quotes] = await Promise.all([getAllBooks(), getAllQuotes()]);

  return (
    <div className="min-h-screen relative" style={{ background: "#0d0f18" }}>
      <style>{`:root { --page-bg: #0d0f18; }`}</style>
      <PageHeader />

      <div className="relative z-10 pt-12 pb-24 max-w-5xl mx-auto px-6">

        {/* ─── Hero ─── */}
        <div className="pt-8 sm:pt-12 pb-10 sm:pb-16">
          <h1
            className="leading-[0.9] tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-spectral), Georgia, serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            In silence, it's best to listen to writers.
          </h1>
          <p className="text-sm italic" style={{ fontFamily: "var(--font-spectral), Georgia, serif", color: "var(--color-text-secondary)" }}>
            {/* Books I&apos;ve read · Bangers that stuck */}
            Making a list of books and words that have really stuck with me, changed my outlook, inspired me or just plain fascinated me.
          </p>
        </div>

        {/* ─── Divider ─── */}
        {/* <div className="flex items-center gap-4 mb-16">
          <span style={{ color: "rgba(196,147,90,0.7)", fontSize: "0.875rem" }}>＋</span>
          <div className="flex-1 h-px" style={{ background: "rgba(138,191,152,0.12)" }} />
          <span style={{ color: "rgba(196,147,90,0.7)", fontSize: "0.875rem" }}>＋</span>
        </div> */}

        {/* ─── Books ─── */}
        <section className="mb-28">
          <p
            style={{
              fontFamily: "var(--font-mulish), Mulish, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
               color: "rgb(245,245,220)",
              marginBottom: "0.5rem",
            }}
          >
            Books
          </p>

          {books.length === 0 ? (
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "1.15rem",
                 color: "rgb(245,245,220)",
                marginTop: "2.5rem",
              }}
            >
              The shelf is being assembled.
            </p>
          ) : (
            <div className="flex flex-col">
              {books.map((book, i) => (
                <BookCard key={book.title} book={book} imageRight={i % 2 === 0} />
              ))}
              <div className="h-px" style={{ background: "rgba(138,191,152,0.09)" }} />
            </div>
          )}
        </section>

        {/* ─── Quotes ─── */}
        <section>
          <p
            style={{
              fontFamily: "var(--font-mulish), Mulish, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
               color: "rgb(245,245,220)",
              marginBottom: "2.5rem",
            }}
          >
            Bangers
          </p>

          {quotes.length === 0 ? (
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "1.15rem",
                 color: "rgb(245,245,220)",
              }}
            >
              Words worth keeping, coming soon.
            </p>
          ) : (
            <div className="flex flex-col gap-10">
              {quotes.map((q, i) => (
                <div key={i} className="max-w-2xl">
                  <p
                    style={{
                      fontFamily: "var(--font-spectral), Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                       color: "rgb(245,245,220)",
                      lineHeight: 1.6,
                      marginBottom: "0.75rem",
                    }}
                  >
                    &ldquo;{q.text}&rdquo;
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mulish), Mulish, sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.10em",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    — {q.attribution}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

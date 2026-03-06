import { ImageResponse } from "next/og";
import { getEssayBySlug } from "@/lib/essays";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: { slug: string };
}) {
  const essay = await getEssayBySlug(params.slug);
  const title = essay?.frontmatter.title ?? "The Unfolded Origami";
  const excerpt = essay?.frontmatter.excerpt ?? "Ideas, slowly unfolded.";
  const imageUrl = essay?.frontmatter.image ?? null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0e0e0e",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Cover image */}
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
            }}
          />
        )}

        {/* Dark gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            padding: "0 72px 60px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "rgba(138,191,152,0.80)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            The Unfolded Origami
          </div>
          <div
            style={{
              fontSize: title.length > 50 ? 48 : 60,
              fontWeight: 400,
              fontStyle: "italic",
              color: "rgba(245,245,220,0.96)",
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          {excerpt && (
            <div
              style={{
                fontSize: 20,
                color: "rgba(245,245,220,0.55)",
                maxWidth: 700,
                lineHeight: 1.5,
              }}
            >
              {excerpt}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Unfolded Origami";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#042F2E",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Subtle grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(138,191,152,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(245,245,220,0.92)",
            letterSpacing: "-0.01em",
            marginBottom: 20,
          }}
        >
          The Unfolded Origami
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(138,191,152,0.75)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Ideas, slowly unfolded.
        </div>

        {/* Bottom author line */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            fontSize: 16,
            color: "rgba(245,245,220,0.35)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Steve Muiga · Nairobi, Kenya
        </div>
      </div>
    ),
    { ...size }
  );
}

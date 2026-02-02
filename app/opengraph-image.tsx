import { ImageResponse } from "next/og";

export const alt =
  "Heliograph - The modern toolchain for customer-facing builders";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #f97316 0%, #3b82f6 50%, #2563eb 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 600,
          color: "white",
          letterSpacing: "-3px",
        }}
      >
        Heliograph
      </div>

      {/* Tagline */}
      <div
        style={{
          maxWidth: "1000px",
          textAlign: "center",
          fontSize: 40,
          color: "rgba(255, 255, 255, 0.9)",
          fontWeight: 600,
          marginTop: "16px",
        }}
      >
        The modern toolchain for
      </div>
      <div
        style={{
          maxWidth: "1000px",
          textAlign: "center",
          fontSize: 48,
          background: "linear-gradient(90deg, #fdba74, #fb923c)",
          backgroundClip: "text",
          color: "transparent",
          fontWeight: 700,
        }}
      >
        customer-facing builders
      </div>

      {/* URL */}
      <div
        style={{
          padding: "32px",
          fontSize: 32,
          color: "rgba(255, 255, 255, 0.6)",
          fontWeight: 500,
        }}
      >
        heliograph.dev
      </div>
    </div>,
    {
      ...size,
    },
  );
}

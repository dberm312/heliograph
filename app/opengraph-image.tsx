import { ImageResponse } from "next/og";

export const alt = "Heliograph - Align your teams. Amplify your impact.";
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
          fontWeight: 800,
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
          fontSize: 44,
          color: "rgba(255, 255, 255, 0.7)",
          fontWeight: 500,
        }}
      >
        Align your teams.
      </div>
      <div
        style={{
          maxWidth: "1000px",
          textAlign: "center",
          fontSize: 44,
          color: "rgba(255, 255, 255, 0.7)",
          fontWeight: 500,
        }}
      >
        Amplify your impact.
      </div>

      {/* URL */}
      <div
        style={{
          padding: "32px",
          fontSize: 32,
          color: "rgba(255, 255, 255, 0.7)",
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

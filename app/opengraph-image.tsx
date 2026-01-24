import { ImageResponse } from "next/og";

export const alt = "Helioscope - Structured wide research you can trust";
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
        Helioscope
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
        Multiply your impact without losing quality.
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
        Orchestrate AI as a manager, not an engineer.
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
        helioscope.co
      </div>
    </div>,
    {
      ...size,
    },
  );
}

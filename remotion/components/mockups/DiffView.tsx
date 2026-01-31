import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";

type DiffLine = {
  type: "added" | "removed" | "context";
  content: string;
  lineNumber: number;
};

const DIFF_LINES: DiffLine[] = [
  { type: "context", content: "# Project Configuration", lineNumber: 1 },
  { type: "context", content: "", lineNumber: 2 },
  { type: "removed", content: "- deployment_target: staging", lineNumber: 3 },
  { type: "added", content: "+ deployment_target: production", lineNumber: 3 },
  { type: "context", content: "", lineNumber: 4 },
  { type: "context", content: "## ML Model Settings", lineNumber: 5 },
  { type: "removed", content: "- model_version: v2.3-beta", lineNumber: 6 },
  { type: "added", content: "+ model_version: v2.4-stable", lineNumber: 6 },
  { type: "added", content: "+ enable_caching: true", lineNumber: 7 },
  { type: "added", content: "+ cache_ttl: 3600", lineNumber: 8 },
  { type: "context", content: "", lineNumber: 9 },
  { type: "context", content: "## Performance", lineNumber: 10 },
  { type: "removed", content: "- max_batch_size: 32", lineNumber: 11 },
  { type: "added", content: "+ max_batch_size: 64", lineNumber: 11 },
];

export const DiffView: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <GlassCard
      width={500}
      height={500}
      padding={0}
      borderRadius={12}
      opacity={0.1}
      style={{ overflow: "hidden" }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          background: "rgba(0, 0, 0, 0.04)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: headerProgress,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#1f2937",
            fontFamily: FONTS.body,
          }}
        >
          config.yaml
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 12,
            fontFamily: FONTS.body,
          }}
        >
          <span style={{ color: "#16a34a" }}>+4</span>
          <span style={{ color: "#dc2626" }}>-3</span>
        </div>
      </div>

      {/* Diff content */}
      <div
        style={{
          padding: "8px 0",
          fontFamily: "monospace",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        {DIFF_LINES.map((line, index) => {
          const lineProgress = spring({
            frame: frame - 60 - index * 5,
            fps,
            config: { damping: 25, stiffness: 120 },
          });

          const opacity = interpolate(lineProgress, [0, 1], [0, 1]);
          const x = interpolate(lineProgress, [0, 1], [20, 0]);

          let bgColor = "transparent";
          let textColor = "#64748b";
          let prefix = "  ";

          if (line.type === "added") {
            bgColor = "rgba(34, 197, 94, 0.1)";
            textColor = "#16a34a";
            prefix = "+ ";
          } else if (line.type === "removed") {
            bgColor = "rgba(239, 68, 68, 0.1)";
            textColor = "#dc2626";
            prefix = "- ";
          }

          return (
            <div
              key={`${line.lineNumber}-${line.type}-${line.content.slice(0, 10)}`}
              style={{
                display: "flex",
                background: bgColor,
                padding: "2px 16px",
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              <span
                style={{
                  width: 40,
                  color: "#94a3b8",
                  textAlign: "right",
                  paddingRight: 16,
                  userSelect: "none",
                }}
              >
                {line.lineNumber}
              </span>
              <span style={{ color: textColor }}>
                {prefix}
                {line.content.replace(/^[+-]\s*/, "")}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

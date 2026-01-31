import type React from "react";
import { COLORS } from "../../utils/colors";

type MockupFrameProps = {
  children: React.ReactNode;
  title?: string;
  width?: number;
  height?: number;
  showControls?: boolean;
};

export const MockupFrame: React.FC<MockupFrameProps> = ({
  children,
  title = "Heliograph",
  width = 1400,
  height = 800,
  showControls = true,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 16,
        overflow: "hidden",
        background: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 48,
          background: "#f1f5f9",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
        }}
      >
        {showControls && (
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ef4444",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#eab308",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
          </div>
        )}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "6px 24px",
              background: "rgba(0, 0, 0, 0.05)",
              borderRadius: 8,
              fontSize: 14,
              color: "#475569",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ width: 60 }} />
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};

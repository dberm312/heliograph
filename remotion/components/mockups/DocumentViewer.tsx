import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type {
  CodeContent,
  Document,
  NotebookContent,
  PresentationContent,
} from "../../data/versionControlData";
import {
  DEMO_DOCUMENTS,
  VC_TIMING,
  getCurrentDocument,
} from "../../data/versionControlData";
import { MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

// ============================================================
// File Type Icons
// ============================================================

const FileIcon: React.FC<{ type: string; size?: number }> = ({
  type,
  size = 16,
}) => {
  const iconColor =
    type === "code"
      ? "#3b82f6"
      : type === "notebook"
        ? "#f97316"
        : "#8b5cf6";

  if (type === "code") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }

  if (type === "notebook") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }

  // Presentation
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={iconColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
};

// ============================================================
// Code View Component
// ============================================================

const CodeView: React.FC<{ content: CodeContent; entranceProgress: number }> = ({
  content,
  entranceProgress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: 12,
        lineHeight: 1.7,
        padding: "12px 0",
      }}
    >
      {content.lines.map((line, index) => {
        const lineDelay = index * 3;
        const lineProgress = spring({
          frame: frame - VC_TIMING.DOC_1_START - lineDelay,
          fps,
          config: { damping: 25, stiffness: 120 },
        });

        const opacity = interpolate(
          lineProgress * entranceProgress,
          [0, 1],
          [0, 1],
        );
        const translateX = interpolate(lineProgress, [0, 1], [15, 0]);

        return (
          <div
            key={`line-${index}-${line.text.slice(0, 10)}`}
            style={{
              display: "flex",
              background: line.highlight
                ? "rgba(251, 191, 36, 0.15)"
                : "transparent",
              borderLeft: line.highlight
                ? "3px solid #f59e0b"
                : "3px solid transparent",
              padding: "1px 12px 1px 8px",
              opacity,
              transform: `translateX(${translateX}px)`,
            }}
          >
            <span
              style={{
                width: 32,
                color: "#94a3b8",
                textAlign: "right",
                paddingRight: 12,
                userSelect: "none",
                fontSize: 11,
              }}
            >
              {index + 1}
            </span>
            <span
              style={{
                color: line.highlight ? "#92400e" : "#374151",
                whiteSpace: "pre",
              }}
            >
              {line.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// Notebook View Component
// ============================================================

const NotebookView: React.FC<{
  content: NotebookContent;
  entranceProgress: number;
}> = ({ content, entranceProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ padding: "8px 12px" }}>
      {content.cells.map((cell, index) => {
        const cellDelay = index * 8;
        const cellProgress = spring({
          frame: frame - VC_TIMING.DOC_2_START - cellDelay,
          fps,
          config: { damping: 20, stiffness: 100 },
        });

        const opacity = interpolate(
          cellProgress * entranceProgress,
          [0, 1],
          [0, 1],
        );
        const translateY = interpolate(cellProgress, [0, 1], [10, 0]);

        if (cell.type === "markdown") {
          return (
            <div
              key={`cell-${index}-md`}
              style={{
                fontSize: 16,
                fontWeight: 600,
                fontFamily: FONTS.body,
                color: "#1f2937",
                marginBottom: 12,
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              {cell.content}
            </div>
          );
        }

        return (
          <div
            key={`cell-${index}-code`}
            style={{
              marginBottom: 10,
              borderRadius: 6,
              border: "1px solid rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
              opacity,
              transform: `translateY(${translateY}px)`,
            }}
          >
            {/* Input cell */}
            <div
              style={{
                display: "flex",
                background: "rgba(0, 0, 0, 0.02)",
                padding: "6px 10px",
                gap: 8,
              }}
            >
              <span
                style={{
                  color: "#3b82f6",
                  fontFamily: "monospace",
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                In:
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#374151",
                }}
              >
                {cell.content}
              </span>
            </div>
            {/* Output cell */}
            {cell.output && (
              <div
                style={{
                  display: "flex",
                  padding: "6px 10px",
                  gap: 8,
                  background: "#fff",
                }}
              >
                <span
                  style={{
                    color: "#dc2626",
                    fontFamily: "monospace",
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  Out:
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: "#6b7280",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {cell.output}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// Presentation View Component
// ============================================================

const PresentationView: React.FC<{
  content: PresentationContent;
  entranceProgress: number;
}> = ({ content, entranceProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame: frame - VC_TIMING.DOC_3_START,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <div
      style={{
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Slide title */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          fontFamily: FONTS.display,
          color: "#1f2937",
          textAlign: "center",
          marginBottom: 24,
          opacity: interpolate(
            titleProgress * entranceProgress,
            [0, 1],
            [0, 1],
          ),
          transform: `translateY(${interpolate(titleProgress, [0, 1], [-10, 0])}px)`,
        }}
      >
        {content.title}
      </div>

      {/* Bullets */}
      <div style={{ flex: 1 }}>
        {content.bullets.map((bullet, index) => {
          const bulletDelay = index * 6;
          const bulletProgress = spring({
            frame: frame - VC_TIMING.DOC_3_START - 10 - bulletDelay,
            fps,
            config: { damping: 20, stiffness: 100 },
          });

          const opacity = interpolate(
            bulletProgress * entranceProgress,
            [0, 1],
            [0, 1],
          );
          const translateX = interpolate(bulletProgress, [0, 1], [-15, 0]);

          return (
            <div
              key={`bullet-${index}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                marginBottom: 14,
                opacity,
                transform: `translateX(${translateX}px)`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: MODULE_COLORS.stakeholderManagement.primary,
                  marginTop: 6,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontFamily: FONTS.body,
                  color: "#374151",
                  lineHeight: 1.5,
                }}
              >
                {bullet}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// Document Viewer Main Component
// ============================================================

type DocumentViewerProps = {
  width?: number | string;
  height?: number | string;
};

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  width = "100%",
  height = "100%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentDoc = getCurrentDocument(frame);

  // Calculate transition progress for crossfade
  const getDocOpacity = (doc: Document): number => {
    const docIndex = DEMO_DOCUMENTS.indexOf(doc);
    const transitions = [
      VC_TIMING.DOC_1_START,
      VC_TIMING.DOC_2_START,
      VC_TIMING.DOC_3_START,
    ];

    // If this is the current doc
    if (currentDoc.id === doc.id) {
      const transitionStart = transitions[docIndex];
      const fadeInProgress = spring({
        frame: frame - transitionStart,
        fps,
        config: { damping: 20, stiffness: 100 },
      });
      return fadeInProgress;
    }

    return 0;
  };

  // Entrance animation
  const entranceProgress = spring({
    frame: frame - VC_TIMING.DOC_1_START,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const containerOpacity = interpolate(entranceProgress, [0, 1], [0, 1]);
  const containerScale = interpolate(entranceProgress, [0, 1], [0.98, 1]);

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        borderRadius: 10,
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        opacity: containerOpacity,
        transform: `scale(${containerScale})`,
      }}
    >
      {/* File tab header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          background: "rgba(0, 0, 0, 0.03)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FileIcon type={currentDoc.type} size={14} />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              fontFamily: FONTS.body,
              color: "#374151",
            }}
          >
            {currentDoc.filename}
          </span>
        </div>
        {/* Close button (decorative) */}
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="3"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>

      {/* Document content area */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {DEMO_DOCUMENTS.map((doc) => {
          const docOpacity = getDocOpacity(doc);
          if (docOpacity === 0 && currentDoc.id !== doc.id) return null;

          return (
            <div
              key={doc.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: docOpacity,
              }}
            >
              {doc.type === "code" && (
                <CodeView
                  content={doc.content as CodeContent}
                  entranceProgress={docOpacity}
                />
              )}
              {doc.type === "notebook" && (
                <NotebookView
                  content={doc.content as NotebookContent}
                  entranceProgress={docOpacity}
                />
              )}
              {doc.type === "presentation" && (
                <PresentationView
                  content={doc.content as PresentationContent}
                  entranceProgress={docOpacity}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Version footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          background: "rgba(0, 0, 0, 0.02)",
          borderTop: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              color: "#6b7280",
              background: "rgba(0, 0, 0, 0.05)",
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            {currentDoc.linkedCommit}
          </span>
          <span
            style={{
              fontSize: 10,
              fontFamily: FONTS.body,
              color: "#9ca3af",
            }}
          >
            2 hours ago
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontFamily: FONTS.body,
              color: "#9ca3af",
              fontWeight: 500,
            }}
          >
            Author:
          </span>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: MODULE_COLORS.projectManagement.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 600,
              color: "#fff",
              fontFamily: FONTS.body,
            }}
          >
            {currentDoc.linkedStakeholder
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <span
            style={{
              fontSize: 12,
              fontFamily: FONTS.body,
              color: "#374151",
              fontWeight: 600,
            }}
          >
            {currentDoc.linkedStakeholder}
          </span>
        </div>
      </div>
    </div>
  );
};

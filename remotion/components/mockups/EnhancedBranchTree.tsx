import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Branch, Commit } from "../../data/versionControlData";
import { VC_BRANCHES, VC_TIMING } from "../../data/versionControlData";
import { FONTS } from "../../utils/fonts";

// ============================================================
// Constants
// ============================================================

const TREE_CONFIG = {
  mainX: 40,
  padding: { top: 50, bottom: 40 },
};

// ============================================================
// Minimal Commit Badge - Just shows task ID or stakeholder initials
// ============================================================

type CommitBadgeProps = {
  commit: Commit;
  x: number;
  y: number;
  progress: number;
  side?: "left" | "right";
};

const CommitBadge: React.FC<CommitBadgeProps> = ({
  commit,
  x,
  y,
  progress,
  side = "right",
}) => {
  const frame = useCurrentFrame();
  const badgeOpacity = interpolate(progress, [0, 1], [0, 1]);

  // Glow effect for cherry-pick source
  const isGlowing =
    commit.isCherryPickSource && frame >= VC_TIMING.CHERRY_PICK_START;
  const glowIntensity = isGlowing
    ? interpolate(
        Math.sin((frame - VC_TIMING.CHERRY_PICK_START) * 0.15),
        [-1, 1],
        [0.3, 0.8],
      )
    : 0;

  if (!commit.linkedTask && !commit.linkedStakeholder) return null;

  const offsetX = side === "right" ? 12 : -70;
  const lineX1 = side === "right" ? x + 8 : x - 8;
  const lineX2 = side === "right" ? x + 12 : x - 12;

  return (
    <g style={{ opacity: badgeOpacity }}>
      {/* Short connection line */}
      <line
        x1={lineX1}
        y1={y}
        x2={lineX2}
        y2={y}
        stroke="rgba(0, 0, 0, 0.12)"
        strokeWidth={1}
      />

      {/* Compact badge */}
      <foreignObject
        x={x + offsetX}
        y={y - 10}
        width={58}
        height={20}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 6px",
            background: isGlowing
              ? `rgba(16, 185, 129, ${0.15 + glowIntensity * 0.1})`
              : "rgba(255, 255, 255, 0.95)",
            borderRadius: 4,
            border: isGlowing
              ? `1px solid rgba(16, 185, 129, ${0.5 + glowIntensity * 0.3})`
              : "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: isGlowing
              ? `0 0 ${6 + glowIntensity * 6}px rgba(16, 185, 129, ${glowIntensity * 0.4})`
              : "0 1px 2px rgba(0, 0, 0, 0.05)",
            width: "fit-content",
          }}
        >
          {/* Task ID - primary display */}
          {commit.linkedTask && (
            <span
              style={{
                fontSize: 8,
                fontWeight: 600,
                fontFamily: "monospace",
                color: "#374151",
              }}
            >
              {commit.linkedTask.id}
            </span>
          )}

          {/* Stakeholder initials - if no task */}
          {!commit.linkedTask && commit.linkedStakeholder && (
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: commit.linkedStakeholder.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 7,
                fontWeight: 600,
                color: "#fff",
                fontFamily: FONTS.body,
              }}
            >
              {commit.linkedStakeholder.initials}
            </div>
          )}
        </div>
      </foreignObject>
    </g>
  );
};

// ============================================================
// Simple Branch Label
// ============================================================

type BranchLabelProps = {
  name: string;
  color: string;
  x: number;
  y: number;
  progress: number;
};

const BranchLabel: React.FC<BranchLabelProps> = ({
  name,
  color,
  x,
  y,
  progress,
}) => {
  const labelOpacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <foreignObject
      x={x}
      y={y}
      width={100}
      height={20}
      style={{ opacity: labelOpacity }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "2px 6px",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: 4,
          border: `1px solid ${color}40`,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
          }}
        />
        <span
          style={{
            fontSize: 9,
            fontWeight: 500,
            color: "#374151",
            fontFamily: FONTS.body,
          }}
        >
          {name}
        </span>
      </div>
    </foreignObject>
  );
};

// ============================================================
// Cherry Pick Arc
// ============================================================

type CherryPickArcProps = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  color: string;
  progress: number;
};

const CherryPickArc: React.FC<CherryPickArcProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  color,
  progress,
}) => {
  const controlX = (sourceX + targetX) / 2 - 30;
  const controlY = Math.min(sourceY, targetY) - 40;

  const pathLength = 250;
  const dashOffset = interpolate(progress, [0, 1], [pathLength, 0]);
  const glowIntensity = interpolate(progress, [0, 0.5, 1], [0, 0.6, 0.3]);

  return (
    <g>
      <path
        d={`M ${sourceX} ${sourceY} Q ${controlX} ${controlY} ${targetX} ${targetY}`}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
        style={{ filter: "blur(3px)", opacity: glowIntensity }}
      />
      <path
        d={`M ${sourceX} ${sourceY} Q ${controlX} ${controlY} ${targetX} ${targetY}`}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="6 4"
        strokeDashoffset={dashOffset}
      />
      {progress > 0.9 && (
        <polygon
          points={`${targetX - 3},${targetY - 5} ${targetX + 3},${targetY - 5} ${targetX},${targetY}`}
          fill={color}
          style={{ opacity: interpolate(progress, [0.9, 1], [0, 1]) }}
        />
      )}
    </g>
  );
};

// ============================================================
// Main Component
// ============================================================

type EnhancedBranchTreeProps = {
  width?: number;
  height?: number;
};

export const EnhancedBranchTree: React.FC<EnhancedBranchTreeProps> = ({
  width = 300,
  height = 500,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation progress values
  const mainBranchProgress = spring({
    frame: frame - VC_TIMING.MAIN_BRANCH_DRAW,
    fps,
    config: { damping: 30, stiffness: 60 },
  });

  const acmeBranchProgress = spring({
    frame: frame - VC_TIMING.ACME_BRANCH_DRAW,
    fps,
    config: { damping: 25, stiffness: 80 },
  });

  const techstartBranchProgress = spring({
    frame: frame - VC_TIMING.TECHSTART_BRANCH_DRAW,
    fps,
    config: { damping: 25, stiffness: 80 },
  });

  const commitsProgress = spring({
    frame: frame - VC_TIMING.COMMITS_APPEAR,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const badgesProgress = spring({
    frame: frame - VC_TIMING.BADGES_APPEAR,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const cherryPickProgress =
    frame >= VC_TIMING.CHERRY_PICK_START
      ? spring({
          frame: frame - VC_TIMING.CHERRY_PICK_START,
          fps,
          config: { damping: 15, stiffness: 40 },
        })
      : 0;

  const mergeFlashProgress =
    frame >= VC_TIMING.CHERRY_PICK_MERGE_FLASH
      ? interpolate(
          frame - VC_TIMING.CHERRY_PICK_MERGE_FLASH,
          [0, 10, 20],
          [0, 1, 0],
          { extrapolateRight: "clamp" },
        )
      : 0;

  // Layout calculations
  const treeHeight = height - TREE_CONFIG.padding.top - TREE_CONFIG.padding.bottom;
  const mainX = TREE_CONFIG.mainX;
  const acmeX = mainX + 50;
  const techstartX = mainX + 100;

  const getCommitY = (position: number): number => {
    return TREE_CONFIG.padding.top + treeHeight * position;
  };

  // Branch progress mapping
  const branchProgressMap: Record<string, number> = {
    main: mainBranchProgress,
    "acme-corp-v2": acmeBranchProgress,
    "techstart-custom": techstartBranchProgress,
  };

  const branchXMap: Record<string, number> = {
    main: mainX,
    "acme-corp-v2": acmeX,
    "techstart-custom": techstartX,
  };

  // Find cherry-pick commits
  const cherryPickSource = VC_BRANCHES.flatMap((b) => b.commits).find(
    (c) => c.isCherryPickSource,
  );
  const cherryPickTarget = VC_BRANCHES.flatMap((b) => b.commits).find(
    (c) => c.isCherryPickTarget,
  );

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        background: "rgba(255, 255, 255, 0.6)",
        borderRadius: 8,
        border: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
        aria-label="Git branch visualization"
      >
        {/* Main branch line */}
        <line
          x1={mainX}
          y1={TREE_CONFIG.padding.top}
          x2={mainX}
          y2={TREE_CONFIG.padding.top + treeHeight * mainBranchProgress}
          stroke={VC_BRANCHES[0].color}
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Acme branch */}
        {acmeBranchProgress > 0 && (
          <>
            <path
              d={`M ${mainX} ${getCommitY(0.25)}
                  Q ${mainX + 25} ${getCommitY(0.25)}
                    ${acmeX} ${getCommitY(0.3)}`}
              stroke={VC_BRANCHES[1].color}
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={150}
              strokeDashoffset={150 * (1 - acmeBranchProgress)}
            />
            <line
              x1={acmeX}
              y1={getCommitY(0.3)}
              x2={acmeX}
              y2={getCommitY(0.3) + 150 * acmeBranchProgress}
              stroke={VC_BRANCHES[1].color}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </>
        )}

        {/* TechStart branch */}
        {techstartBranchProgress > 0 && (
          <>
            <path
              d={`M ${mainX} ${getCommitY(0.45)}
                  Q ${mainX + 50} ${getCommitY(0.45)}
                    ${techstartX} ${getCommitY(0.5)}`}
              stroke={VC_BRANCHES[2].color}
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={150}
              strokeDashoffset={150 * (1 - techstartBranchProgress)}
            />
            <line
              x1={techstartX}
              y1={getCommitY(0.5)}
              x2={techstartX}
              y2={getCommitY(0.5) + 80 * techstartBranchProgress}
              stroke={VC_BRANCHES[2].color}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </>
        )}

        {/* Cherry-pick arc */}
        {cherryPickProgress > 0 && cherryPickSource && cherryPickTarget && (
          <CherryPickArc
            sourceX={acmeX}
            sourceY={getCommitY(cherryPickSource.position)}
            targetX={mainX}
            targetY={getCommitY(cherryPickTarget.position)}
            color={VC_BRANCHES[1].color}
            progress={cherryPickProgress}
          />
        )}

        {/* Commit dots and badges */}
        {VC_BRANCHES.map((branch) => {
          const branchProgress = branchProgressMap[branch.name] || 0;
          const branchX = branchXMap[branch.name];

          return branch.commits.map((commit) => {
            const commitY = getCommitY(commit.position);
            const dotOpacity = interpolate(
              branchProgress,
              [commit.position - 0.1, commit.position],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );

            const isCherryPickResult =
              commit.isCherryPickTarget && frame >= VC_TIMING.CHERRY_PICK_COMPLETE;

            return (
              <g key={commit.id}>
                {/* Commit dot */}
                <circle
                  cx={branchX}
                  cy={commitY}
                  r={branch.name === "main" ? 5 : 4}
                  fill={branch.color}
                  opacity={dotOpacity}
                  style={{
                    filter:
                      isCherryPickResult && mergeFlashProgress > 0
                        ? `drop-shadow(0 0 ${6 + mergeFlashProgress * 8}px ${branch.color})`
                        : undefined,
                  }}
                />

                {/* Cherry-pick result ring */}
                {isCherryPickResult && (
                  <circle
                    cx={branchX}
                    cy={commitY}
                    r={10}
                    fill="none"
                    stroke={VC_BRANCHES[1].color}
                    strokeWidth={1.5}
                    strokeDasharray="3 2"
                    opacity={mergeFlashProgress > 0 ? mergeFlashProgress : 0.4}
                  />
                )}

                {/* Badges - only show for commits with linked tasks */}
                {commit.linkedTask && (
                  <CommitBadge
                    commit={commit}
                    x={branchX}
                    y={commitY}
                    progress={badgesProgress * branchProgress * commitsProgress}
                    side={branch.name === "main" ? "left" : "right"}
                  />
                )}
              </g>
            );
          });
        })}

        {/* Branch labels - positioned at the top */}
        <BranchLabel
          name="main"
          color={VC_BRANCHES[0].color}
          x={mainX - 10}
          y={TREE_CONFIG.padding.top - 25}
          progress={mainBranchProgress}
        />
        <BranchLabel
          name="acme-corp-v2"
          color={VC_BRANCHES[1].color}
          x={acmeX - 5}
          y={getCommitY(0.28) - 20}
          progress={acmeBranchProgress}
        />
        <BranchLabel
          name="techstart"
          color={VC_BRANCHES[2].color}
          x={techstartX - 5}
          y={getCommitY(0.48) - 20}
          progress={techstartBranchProgress}
        />
      </svg>
    </div>
  );
};

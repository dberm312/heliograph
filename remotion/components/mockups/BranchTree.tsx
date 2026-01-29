import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

type Branch = {
  name: string;
  color: string;
  forkPoint: number;
  commits: number;
};

const BRANCHES: Branch[] = [
  {
    name: "main",
    color: MODULE_COLORS.versionControl.primary,
    forkPoint: 0,
    commits: 5,
  },
  { name: "acme-corp-v2", color: "#10b981", forkPoint: 0.3, commits: 3 },
  { name: "techstart-custom", color: "#8b5cf6", forkPoint: 0.6, commits: 2 },
];

type BranchTreeProps = {
  showMerge?: boolean;
};

export const BranchTree: React.FC<BranchTreeProps> = ({
  showMerge = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main branch line animation
  const mainLineProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 30, stiffness: 60 },
  });

  // Branch fork animations
  const branch1Progress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 25, stiffness: 80 },
  });

  const branch2Progress = spring({
    frame: frame - 90,
    fps,
    config: { damping: 25, stiffness: 80 },
  });

  // Label animations
  const labelsProgress = spring({
    frame: frame - 100,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Merge animation
  const mergeProgress = showMerge
    ? spring({
        frame: frame - 220,
        fps,
        config: { damping: 15, stiffness: 100 },
      })
    : 0;

  const treeHeight = 500;
  const treeWidth = 300;
  const mainX = 60;

  return (
    <div
      style={{
        width: treeWidth,
        height: treeHeight,
        position: "relative",
      }}
    >
      {/* Main branch line */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: treeWidth,
          height: treeHeight,
          overflow: "visible",
        }}
        aria-labelledby="branch-tree-title"
        role="img"
      >
        <title id="branch-tree-title">Git branch visualization</title>
        {/* Main line */}
        <line
          x1={mainX}
          y1={20}
          x2={mainX}
          y2={20 + (treeHeight - 40) * mainLineProgress}
          stroke={BRANCHES[0].color}
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* Fork lines */}
        {/* Branch 1 - acme-corp-v2 */}
        <path
          d={`M ${mainX} ${20 + treeHeight * 0.3}
              Q ${mainX + 40} ${20 + treeHeight * 0.3}
                ${mainX + 80} ${20 + treeHeight * 0.35}`}
          stroke={BRANCHES[1].color}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={200}
          strokeDashoffset={200 * (1 - branch1Progress)}
        />
        <line
          x1={mainX + 80}
          y1={20 + treeHeight * 0.35}
          x2={mainX + 80}
          y2={20 + treeHeight * 0.35 + 120 * branch1Progress}
          stroke={BRANCHES[1].color}
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Branch 2 - techstart-custom */}
        <path
          d={`M ${mainX} ${20 + treeHeight * 0.55}
              Q ${mainX + 60} ${20 + treeHeight * 0.55}
                ${mainX + 120} ${20 + treeHeight * 0.6}`}
          stroke={BRANCHES[2].color}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={200}
          strokeDashoffset={200 * (1 - branch2Progress)}
        />
        <line
          x1={mainX + 120}
          y1={20 + treeHeight * 0.6}
          x2={mainX + 120}
          y2={20 + treeHeight * 0.6 + 80 * branch2Progress}
          stroke={BRANCHES[2].color}
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Merge line */}
        {showMerge && mergeProgress > 0 && (
          <path
            d={`M ${mainX + 80} ${20 + treeHeight * 0.35 + 120}
                Q ${mainX + 40} ${20 + treeHeight * 0.7}
                  ${mainX} ${20 + treeHeight * 0.75}`}
            stroke={BRANCHES[1].color}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={200}
            strokeDashoffset={200 * (1 - mergeProgress)}
          />
        )}

        {/* Commit dots on main */}
        {[0.1, 0.25, 0.45, 0.65, 0.85].map((pos) => {
          const dotOpacity = interpolate(
            mainLineProgress,
            [pos - 0.1, pos],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <circle
              key={`main-${pos}`}
              cx={mainX}
              cy={20 + treeHeight * pos}
              r={6}
              fill={BRANCHES[0].color}
              opacity={dotOpacity}
            />
          );
        })}

        {/* Commit dots on branch 1 */}
        {[0.4, 0.5, 0.6].map((pos) => (
          <circle
            key={`b1-${pos}`}
            cx={mainX + 80}
            cy={20 + treeHeight * pos}
            r={5}
            fill={BRANCHES[1].color}
            opacity={branch1Progress}
          />
        ))}

        {/* Commit dots on branch 2 */}
        {[0.65, 0.75].map((pos) => (
          <circle
            key={`b2-${pos}`}
            cx={mainX + 120}
            cy={20 + treeHeight * pos}
            r={5}
            fill={BRANCHES[2].color}
            opacity={branch2Progress}
          />
        ))}

        {/* Merge indicator */}
        {showMerge && mergeProgress > 0 && (
          <circle
            cx={mainX}
            cy={20 + treeHeight * 0.75}
            r={8}
            fill={BRANCHES[1].color}
            opacity={mergeProgress}
            style={{
              filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))",
            }}
          />
        )}
      </svg>

      {/* Branch labels */}
      <div
        style={{
          position: "absolute",
          left: mainX + 20,
          top: 30,
          opacity: labelsProgress,
          transform: `translateX(${interpolate(labelsProgress, [0, 1], [-10, 0])}px)`,
        }}
      >
        <BranchLabel name="main" color={BRANCHES[0].color} />
      </div>

      <div
        style={{
          position: "absolute",
          left: mainX + 100,
          top: treeHeight * 0.38,
          opacity: branch1Progress,
          transform: `translateX(${interpolate(branch1Progress, [0, 1], [-10, 0])}px)`,
        }}
      >
        <BranchLabel name="acme-corp-v2" color={BRANCHES[1].color} />
      </div>

      <div
        style={{
          position: "absolute",
          left: mainX + 140,
          top: treeHeight * 0.62,
          opacity: branch2Progress,
          transform: `translateX(${interpolate(branch2Progress, [0, 1], [-10, 0])}px)`,
        }}
      >
        <BranchLabel name="techstart-custom" color={BRANCHES[2].color} />
      </div>
    </div>
  );
};

const BranchLabel: React.FC<{ name: string; color: string }> = ({
  name,
  color,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "4px 10px",
      background: "rgba(0, 0, 0, 0.3)",
      borderRadius: 6,
      border: `1px solid ${color}40`,
    }}
  >
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: color,
      }}
    />
    <span
      style={{
        fontSize: 12,
        fontWeight: 500,
        color: COLORS.textSecondary,
        fontFamily: FONTS.body,
      }}
    >
      {name}
    </span>
  </div>
);

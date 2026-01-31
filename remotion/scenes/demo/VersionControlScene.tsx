import { AbsoluteFill } from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { FeatureCommentary } from "../../components/FeatureCommentary";
import { DocumentViewer } from "../../components/mockups/DocumentViewer";
import { EnhancedBranchTree } from "../../components/mockups/EnhancedBranchTree";
import { MockupFrame } from "../../components/mockups/MockupFrame";
import { VC_FEATURE_ITEMS } from "../../data/versionControlData";
import { MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

const SCENE_PADDING = 40;
const PANEL_GAP = 32;
// Left panel takes 1/3 of the available width
const LEFT_PANEL_WIDTH = Math.floor((1920 - SCENE_PADDING * 2 - PANEL_GAP) / 3);
// Right panel (mockup) takes remaining 2/3
const MOCKUP_WIDTH = 1920 - SCENE_PADDING * 2 - LEFT_PANEL_WIDTH - PANEL_GAP;
const MOCKUP_HEIGHT = 1080 - SCENE_PADDING * 2;

// Inside mockup content split
const CONTENT_GAP = 24;
const DOC_VIEWER_RATIO = 0.67; // 2/3
const BRANCH_TREE_RATIO = 0.33; // 1/3

export const VersionControlScene: React.FC = () => {
  // Content area dimensions (inside MockupFrame, accounting for title bar)
  const contentHeight = MOCKUP_HEIGHT - 48; // 48px title bar
  const contentPadding = 24;
  const innerHeight = contentHeight - contentPadding * 2;
  const innerWidth = MOCKUP_WIDTH - contentPadding * 2 - 2; // -2 for borders

  const docViewerWidth = (innerWidth - CONTENT_GAP) * DOC_VIEWER_RATIO;
  const branchTreeWidth = (innerWidth - CONTENT_GAP) * BRANCH_TREE_RATIO;

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.3} />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: SCENE_PADDING,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: PANEL_GAP,
          }}
        >
          {/* Left Panel - Feature Commentary */}
          <div
            style={{
              width: LEFT_PANEL_WIDTH,
              height: MOCKUP_HEIGHT,
              flexShrink: 0,
              background: "#ffffff",
              borderRadius: 16,
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            }}
          >
            <FeatureCommentary
              title="Version Control"
              items={VC_FEATURE_ITEMS}
              accentColor={MODULE_COLORS.versionControl.primary}
            />
          </div>

          {/* Right Panel - Version Control Mockup */}
          <div>
            <MockupFrame
              title="Heliograph — Version Control"
              width={MOCKUP_WIDTH}
              height={MOCKUP_HEIGHT}
            >
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  padding: contentPadding,
                  gap: CONTENT_GAP,
                }}
              >
                {/* Left side - Document Viewer */}
                <div
                  style={{
                    width: docViewerWidth,
                    height: innerHeight,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#64748b",
                      fontFamily: FONTS.body,
                      marginBottom: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Document
                  </div>
                  <div style={{ flex: 1 }}>
                    <DocumentViewer width="100%" height="100%" />
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: 1,
                    background: "rgba(0, 0, 0, 0.08)",
                    alignSelf: "stretch",
                  }}
                />

                {/* Right side - Branch Tree */}
                <div
                  style={{
                    width: branchTreeWidth,
                    height: innerHeight,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#64748b",
                      fontFamily: FONTS.body,
                      marginBottom: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Branches & History
                  </div>
                  <div style={{ flex: 1 }}>
                    <EnhancedBranchTree
                      width={branchTreeWidth}
                      height={innerHeight - 32}
                    />
                  </div>
                </div>
              </div>
            </MockupFrame>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { FeatureCommentary } from "../../components/FeatureCommentary";
import { ContentHeader } from "../../components/mockups/ContentHeader";
import { IssueList } from "../../components/mockups/IssueCard";
import { MockupFrame } from "../../components/mockups/MockupFrame";
import { PeoplePersonaList } from "../../components/mockups/PeoplePersonaList";
import { ProjectList } from "../../components/mockups/ProjectList";
import { RequirementList } from "../../components/mockups/RequirementCard";
import { DetailPanelHeader, TabBar } from "../../components/mockups/TabBar";
import { TaskView } from "../../components/mockups/TaskView";
import {
  ACME_INDIVIDUALS,
  ACME_PERSONAS,
  DEVELOPER_ISSUES,
  DEVELOPER_REQUIREMENTS,
  FEATURE_ITEMS,
  PROJECTS,
  TIMING,
  getActiveTab,
  getViewState,
} from "../../data/stakeholderData";
import { FONTS } from "../../utils/fonts";

const SCENE_PADDING = 40;
const PANEL_GAP = 32;
// Left panel takes 1/3 of the available width
const LEFT_PANEL_WIDTH = Math.floor((1920 - SCENE_PADDING * 2 - PANEL_GAP) / 3);
// Right panel (mockup) takes remaining 2/3
const MOCKUP_WIDTH = 1920 - SCENE_PADDING * 2 - LEFT_PANEL_WIDTH - PANEL_GAP;
const MOCKUP_HEIGHT = 1080 - SCENE_PADDING * 2;

// Project overview component for right panel in early phases
const ProjectOverview: React.FC<{
  visible: boolean;
  entranceDelay: number;
}> = ({ visible, entranceDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!visible) return null;

  const entrance = spring({
    frame: frame - entranceDelay,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const x = interpolate(entrance, [0, 1], [30, 0]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          fontSize: 48,
          marginBottom: 16,
          opacity: 0.3,
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#64748b"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <div
        style={{
          fontSize: 16,
          color: "#94a3b8",
          fontFamily: FONTS.body,
          textAlign: "center",
          maxWidth: 280,
          lineHeight: 1.6,
        }}
      >
        Select a project to view stakeholders, personas, and their requirements
      </div>
    </div>
  );
};

export const StakeholderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine current view state based on frame
  const viewState = getViewState(frame);
  const activeTab = getActiveTab(frame);

  // Selection states based on timing
  const selectedProjectIndex = frame >= TIMING.PROJECT_CLICK ? 0 : -1; // Select Acme project
  const selectedStakeholderId =
    frame >= TIMING.PERSONA_SELECT ? "developer" : undefined; // Select Developer persona

  // Calculate transitions for panel slides
  const projectsToPeopleProgress = spring({
    frame: frame - TIMING.PHASE_1_END,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const showProjects = frame < TIMING.PHASE_1_END + 20;
  const showPeoplePanel = frame >= TIMING.PHASE_1_END - 10;
  const showDetailPanel = frame >= TIMING.PHASE_2_END - 20;

  // Breadcrumb based on view state
  const breadcrumb =
    viewState === "projects"
      ? ["Projects"]
      : viewState === "people"
        ? ["Projects", "Acme Platform Migration"]
        : ["Projects", "Acme Platform Migration", "Developer"];

  // Tab configuration
  const tabs = [
    {
      id: "requirements",
      label: "Requirements",
      count: DEVELOPER_REQUIREMENTS.length,
    },
    { id: "tasks", label: "Tasks", count: 3 },
    { id: "issues", label: "Issues", count: DEVELOPER_ISSUES.length },
  ];

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
              title="Stakeholder Intelligence"
              items={FEATURE_ITEMS}
            />
          </div>

          {/* Right Panel - Mockup */}
          <MockupFrame
            title="Heliograph — Stakeholder Intelligence"
            width={MOCKUP_WIDTH}
            height={MOCKUP_HEIGHT}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Content Header with logo and breadcrumb */}
              <ContentHeader breadcrumb={breadcrumb} entranceDelay={15} />

              {/* Main content area */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  padding: 20,
                  gap: 20,
                  overflow: "hidden",
                }}
              >
                {/* Left Panel - Projects or People/Personas */}
                <div
                  style={{
                    width: 220,
                    flexShrink: 0,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Projects List - slides out */}
                  {showProjects && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateX(${interpolate(
                          projectsToPeopleProgress,
                          [0, 1],
                          [0, -240],
                        )}px)`,
                        opacity: interpolate(
                          projectsToPeopleProgress,
                          [0, 0.5],
                          [1, 0],
                        ),
                      }}
                    >
                      <ProjectList
                        projects={PROJECTS}
                        selectedIndex={selectedProjectIndex}
                        baseDelay={35}
                      />
                    </div>
                  )}

                  {/* People/Personas List - slides in */}
                  {showPeoplePanel && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateX(${interpolate(
                          projectsToPeopleProgress,
                          [0, 1],
                          [240, 0],
                        )}px)`,
                        opacity: interpolate(
                          projectsToPeopleProgress,
                          [0.5, 1],
                          [0, 1],
                        ),
                      }}
                    >
                      <PeoplePersonaList
                        individuals={ACME_INDIVIDUALS}
                        personas={ACME_PERSONAS}
                        selectedId={selectedStakeholderId}
                        baseDelay={TIMING.PHASE_1_END + 15}
                      />
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: 1,
                    background: "rgba(0, 0, 0, 0.08)",
                  }}
                />

                {/* Right Panel - Overview or Detail View */}
                <div
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Project Overview - shown initially */}
                  {!showDetailPanel && (
                    <ProjectOverview
                      visible={viewState === "projects"}
                      entranceDelay={60}
                    />
                  )}

                  {/* Detail View with Tabs */}
                  {showDetailPanel && (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Detail header */}
                      <DetailPanelHeader
                        stakeholderName="Developer"
                        stakeholderType="persona"
                        entranceDelay={TIMING.PHASE_2_END - 15}
                      />

                      {/* Tab bar */}
                      <TabBar
                        tabs={tabs}
                        activeTabId={activeTab}
                        entranceDelay={TIMING.PHASE_2_END - 10}
                      />

                      {/* Tab content */}
                      <div
                        style={{
                          flex: 1,
                          overflow: "auto",
                        }}
                      >
                        {activeTab === "requirements" && (
                          <RequirementList
                            requirements={DEVELOPER_REQUIREMENTS}
                            baseDelay={TIMING.PHASE_2_END + 5}
                            visible
                          />
                        )}
                        {activeTab === "tasks" && (
                          <TaskView />
                        )}
                        {activeTab === "issues" && (
                          <IssueList
                            issues={DEVELOPER_ISSUES}
                            baseDelay={TIMING.TAB_ISSUES + 10}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </MockupFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MODULE_COLORS, STATUS_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";

type Task = {
  id: string;
  client: string;
  title: string;
  status: "backlog" | "inProgress" | "review" | "done";
  priority: "high" | "medium" | "low";
};

const SAMPLE_TASKS: Task[] = [
  {
    id: "1",
    client: "Acme Corp",
    title: "Deploy ML model",
    status: "inProgress",
    priority: "high",
  },
  {
    id: "2",
    client: "TechStart",
    title: "API integration review",
    status: "review",
    priority: "medium",
  },
  {
    id: "3",
    client: "Acme Corp",
    title: "Data pipeline optimization",
    status: "done",
    priority: "high",
  },
  {
    id: "4",
    client: "DataFlow",
    title: "Dashboard v2 design",
    status: "backlog",
    priority: "low",
  },
  {
    id: "5",
    client: "TechStart",
    title: "Security audit prep",
    status: "inProgress",
    priority: "high",
  },
  {
    id: "6",
    client: "DataFlow",
    title: "User analytics setup",
    status: "backlog",
    priority: "medium",
  },
  {
    id: "7",
    client: "Acme Corp",
    title: "Documentation update",
    status: "review",
    priority: "low",
  },
  {
    id: "8",
    client: "TechStart",
    title: "Load testing complete",
    status: "done",
    priority: "medium",
  },
];

const COLUMNS = [
  { key: "backlog" as const, label: "Backlog", color: STATUS_COLORS.backlog },
  {
    key: "inProgress" as const,
    label: "In Progress",
    color: STATUS_COLORS.inProgress,
  },
  { key: "review" as const, label: "Review", color: STATUS_COLORS.review },
  { key: "done" as const, label: "Done", color: STATUS_COLORS.done },
];

const CLIENT_COLORS: Record<string, string> = {
  "Acme Corp": MODULE_COLORS.projectManagement.primary,
  TechStart: MODULE_COLORS.versionControl.primary,
  DataFlow: MODULE_COLORS.stakeholderManagement.primary,
};

type TaskCardProps = {
  task: Task;
  delay: number;
  isHighlighted?: boolean;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  delay,
  isHighlighted = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const y = interpolate(entrance, [0, 1], [15, 0]);

  // Subtle highlight pulse for selected card
  const highlightPulse = isHighlighted
    ? interpolate(Math.sin(frame * 0.08), [-1, 1], [0.8, 1])
    : 0;

  return (
    <div
      style={{
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
      }}
    >
      <GlassCard
        padding={14}
        borderRadius={10}
        opacity={0.12}
        style={{
          borderLeft: `3px solid ${CLIENT_COLORS[task.client] || COLORS.accent}`,
          boxShadow: isHighlighted
            ? `0 0 20px rgba(249, 115, 22, ${highlightPulse * 0.3})`
            : "none",
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: CLIENT_COLORS[task.client] || COLORS.accent,
            fontFamily: FONTS.body,
            marginBottom: 5,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {task.client}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#1f2937",
            fontFamily: FONTS.body,
            lineHeight: 1.3,
          }}
        >
          {task.title}
        </div>
        <div
          style={{
            marginTop: 8,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 9,
              fontWeight: 600,
              padding: "2px 6px",
              borderRadius: 3,
              background:
                task.priority === "high"
                  ? "rgba(239, 68, 68, 0.15)"
                  : task.priority === "medium"
                    ? "rgba(234, 179, 8, 0.15)"
                    : "rgba(107, 114, 128, 0.15)",
              color:
                task.priority === "high"
                  ? "#dc2626"
                  : task.priority === "medium"
                    ? "#ca8a04"
                    : "#6b7280",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
            }}
          >
            {task.priority}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

type KanbanBoardProps = {
  highlightClient?: string;
  showDragAnimation?: boolean;
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  showDragAnimation = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Column headers entrance
  const columnsEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Highlight the first "inProgress" task after frame 150
  const shouldHighlight = showDragAnimation && frame >= 150;

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: 20,
        height: "100%",
      }}
    >
      {COLUMNS.map((column, colIndex) => {
        const columnOpacity = interpolate(columnsEntrance, [0, 1], [0, 1]);
        const columnY = interpolate(columnsEntrance, [0, 1], [-20, 0]);

        const tasksInColumn = SAMPLE_TASKS.filter(
          (t) => t.status === column.key,
        );

        return (
          <div
            key={column.key}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              transform: `translateY(${columnY}px)`,
              opacity: columnOpacity,
            }}
          >
            {/* Column header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingBottom: 10,
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: column.color,
                }}
              />
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1f2937",
                  fontFamily: FONTS.body,
                }}
              >
                {column.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#94a3b8",
                  fontFamily: FONTS.body,
                  marginLeft: "auto",
                }}
              >
                {tasksInColumn.length}
              </div>
            </div>

            {/* Tasks */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {tasksInColumn.map((task, taskIndex) => {
                // Highlight the first inProgress task
                const isHighlighted =
                  shouldHighlight &&
                  task.status === "inProgress" &&
                  taskIndex === 0;

                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    delay={50 + colIndex * 12 + taskIndex * 8}
                    isHighlighted={isHighlighted}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

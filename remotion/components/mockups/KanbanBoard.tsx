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
    title: "Deploy ML model to production",
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
  isDragging?: boolean;
  dragProgress?: number;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  delay,
  isDragging = false,
  dragProgress = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const y = interpolate(entrance, [0, 1], [20, 0]);

  // Drag animation
  const dragX = isDragging ? interpolate(dragProgress, [0, 1], [0, 280]) : 0;
  const dragRotate = isDragging
    ? interpolate(dragProgress, [0, 0.5, 1], [0, 3, 0])
    : 0;
  const dragScale = isDragging
    ? interpolate(dragProgress, [0, 0.5, 1], [1, 1.05, 1])
    : 1;

  return (
    <div
      style={{
        transform: `translateY(${y}px) translateX(${dragX}px) rotate(${dragRotate}deg) scale(${scale * dragScale})`,
        opacity,
        zIndex: isDragging ? 10 : 1,
      }}
    >
      <GlassCard
        padding={16}
        borderRadius={12}
        opacity={isDragging ? 0.15 : 0.1}
        style={{
          borderLeft: `3px solid ${CLIENT_COLORS[task.client] || COLORS.accent}`,
          boxShadow: isDragging
            ? "0 12px 40px rgba(0,0,0,0.3)"
            : "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: CLIENT_COLORS[task.client] || COLORS.accent,
            fontFamily: FONTS.body,
            marginBottom: 6,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {task.client}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: COLORS.textPrimary,
            fontFamily: FONTS.body,
            lineHeight: 1.4,
          }}
        >
          {task.title}
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "3px 8px",
              borderRadius: 4,
              background:
                task.priority === "high"
                  ? "rgba(239, 68, 68, 0.2)"
                  : task.priority === "medium"
                    ? "rgba(234, 179, 8, 0.2)"
                    : "rgba(107, 114, 128, 0.2)",
              color:
                task.priority === "high"
                  ? "#fca5a5"
                  : task.priority === "medium"
                    ? "#fde047"
                    : "#9ca3af",
              textTransform: "uppercase",
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

  // Drag animation progress (starts at frame 180, lasts 60 frames)
  const dragProgress = showDragAnimation
    ? interpolate(frame, [180, 240], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const isDragging = showDragAnimation && frame >= 180 && frame <= 240;

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        padding: 24,
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
              gap: 12,
              transform: `translateY(${columnY}px)`,
              opacity: columnOpacity,
            }}
          >
            {/* Column header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingBottom: 12,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: column.color,
                }}
              />
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontFamily: FONTS.body,
                }}
              >
                {column.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.textMuted,
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
                gap: 10,
              }}
            >
              {tasksInColumn.map((task, taskIndex) => {
                // Special handling for the dragging task
                const isThisDragging =
                  isDragging && task.status === "inProgress" && taskIndex === 0;

                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    delay={60 + colIndex * 15 + taskIndex * 10}
                    isDragging={isThisDragging}
                    dragProgress={dragProgress}
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

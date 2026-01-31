import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";

type Task = {
  id: string;
  title: string;
  description: string;
  stakeholder: {
    name: string;
    initials: string;
    company: string;
    role: string;
  };
  status: "todo" | "in_progress" | "done";
  priority: "high" | "medium" | "low";
  dueDate: string;
};

const TASKS: Task[] = [
  {
    id: "1",
    title: "Review Q4 product roadmap",
    description: "Analyze proposed features and provide feedback on timeline feasibility. Coordinate with engineering leads.",
    stakeholder: { name: "Sarah Chen", initials: "SC", company: "Acme Corp", role: "CTO" },
    status: "in_progress",
    priority: "high",
    dueDate: "Jan 15",
  },
  {
    id: "2",
    title: "Finalize API documentation",
    description: "Complete OpenAPI spec and developer guides for v2 endpoints.",
    stakeholder: { name: "Marcus Johnson", initials: "MJ", company: "TechStart", role: "VP Engineering" },
    status: "todo",
    priority: "medium",
    dueDate: "Jan 18",
  },
  {
    id: "3",
    title: "Security compliance audit",
    description: "Review SOC2 requirements and prepare documentation.",
    stakeholder: { name: "Elena Rodriguez", initials: "ER", company: "DataFlow", role: "Product Lead" },
    status: "done",
    priority: "high",
    dueDate: "Jan 10",
  },
];

const STAKEHOLDER_COLORS: Record<string, string> = {
  "Sarah Chen": MODULE_COLORS.projectManagement.primary,
  "Marcus Johnson": MODULE_COLORS.versionControl.primary,
  "Elena Rodriguez": MODULE_COLORS.stakeholderManagement.primary,
};

const STATUS_CONFIG = {
  todo: { label: "To Do", color: "#6b7280", bg: "rgba(107, 114, 128, 0.2)" },
  in_progress: { label: "In Progress", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.2)" },
  done: { label: "Done", color: "#10b981", bg: "rgba(16, 185, 129, 0.2)" },
};

type TaskRowProps = {
  task: Task;
  delay: number;
  isSelected?: boolean;
  onClick?: () => void;
};

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  delay,
  isSelected = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const x = interpolate(entrance, [0, 1], [-20, 0]);

  const stakeholderColor = STAKEHOLDER_COLORS[task.stakeholder.name] || COLORS.accent;
  const status = STATUS_CONFIG[task.status];

  return (
    <div
      style={{
        transform: `translateX(${x}px)`,
        opacity,
      }}
    >
      <GlassCard
        padding={12}
        borderRadius={10}
        opacity={isSelected ? 0.2 : 0.1}
        style={{
          border: isSelected
            ? `1px solid ${MODULE_COLORS.projectManagement.primary}`
            : "1px solid rgba(0, 0, 0, 0.05)",
          boxShadow: isSelected
            ? `0 0 20px rgba(249, 115, 22, 0.2)`
            : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Checkbox */}
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              border: `2px solid ${task.status === "done" ? "#10b981" : "rgba(0, 0, 0, 0.2)"}`,
              background: task.status === "done" ? "#10b981" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {task.status === "done" && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          {/* Task content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: task.status === "done" ? "#94a3b8" : "#1f2937",
                fontFamily: FONTS.body,
                textDecoration: task.status === "done" ? "line-through" : "none",
              }}
            >
              {task.title}
            </div>
          </div>

          {/* Stakeholder avatar */}
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${stakeholderColor}, ${stakeholderColor}88)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              fontWeight: 600,
              color: "white",
              fontFamily: FONTS.body,
              flexShrink: 0,
            }}
          >
            {task.stakeholder.initials}
          </div>

          {/* Status badge */}
          <div
            style={{
              padding: "3px 8px",
              borderRadius: 4,
              background: status.bg,
              fontSize: 10,
              fontWeight: 600,
              color: status.color,
              fontFamily: FONTS.body,
            }}
          >
            {status.label}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

type TaskDetailProps = {
  task: Task;
  entranceProgress: number;
};

const TaskDetail: React.FC<TaskDetailProps> = ({ task, entranceProgress }) => {
  const frame = useCurrentFrame();
  const stakeholderColor = STAKEHOLDER_COLORS[task.stakeholder.name] || COLORS.accent;
  const status = STATUS_CONFIG[task.status];

  const x = interpolate(entranceProgress, [0, 1], [50, 0]);
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  // Activity items appear sequentially
  const activity1Opacity = interpolate(entranceProgress, [0.5, 0.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const activity2Opacity = interpolate(entranceProgress, [0.7, 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Typing animation for adding a comment
  const commentTypingStart = 200;
  const typingProgress = interpolate(frame, [commentTypingStart, commentTypingStart + 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const commentText = "Updated timeline confirmed with Sarah";
  const visibleChars = Math.floor(typingProgress * commentText.length);
  const displayComment = commentText.slice(0, visibleChars);
  const showCursor = frame >= commentTypingStart && frame % 15 < 10 && typingProgress < 1;

  return (
    <div
      style={{
        transform: `translateX(${x}px)`,
        opacity,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              border: `2px solid ${task.status === "done" ? "#10b981" : "rgba(0, 0, 0, 0.2)"}`,
              background: task.status === "done" ? "#10b981" : "transparent",
            }}
          />
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#1f2937",
              fontFamily: FONTS.body,
              flex: 1,
            }}
          >
            {task.title}
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#64748b",
            fontFamily: FONTS.body,
            lineHeight: 1.5,
          }}
        >
          {task.description}
        </div>
      </div>

      {/* Meta info */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 10, color: "#64748b", fontFamily: FONTS.body, marginBottom: 4, textTransform: "uppercase" }}>Status</div>
          <div style={{ padding: "4px 10px", borderRadius: 6, background: status.bg, fontSize: 11, fontWeight: 600, color: status.color, fontFamily: FONTS.body }}>
            {status.label}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#64748b", fontFamily: FONTS.body, marginBottom: 4, textTransform: "uppercase" }}>Priority</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: task.priority === "high" ? "#ef4444" : task.priority === "medium" ? "#f59e0b" : "#6b7280" }} />
            <span style={{ fontSize: 12, color: "#1f2937", fontFamily: FONTS.body, textTransform: "capitalize" }}>{task.priority}</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#64748b", fontFamily: FONTS.body, marginBottom: 4, textTransform: "uppercase" }}>Due Date</div>
          <span style={{ fontSize: 12, color: "#1f2937", fontFamily: FONTS.body }}>{task.dueDate}</span>
        </div>
      </div>

      {/* Stakeholder section */}
      <GlassCard padding={12} borderRadius={10} opacity={0.08} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: "#64748b", fontFamily: FONTS.body, marginBottom: 8, textTransform: "uppercase" }}>Assigned Stakeholder</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${stakeholderColor}, ${stakeholderColor}88)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              color: "white",
              fontFamily: FONTS.body,
            }}
          >
            {task.stakeholder.initials}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#1f2937", fontFamily: FONTS.body }}>{task.stakeholder.name}</div>
            <div style={{ fontSize: 11, color: "#64748b", fontFamily: FONTS.body }}>{task.stakeholder.role} · {task.stakeholder.company}</div>
          </div>
        </div>
      </GlassCard>

      {/* Activity */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: "#64748b", fontFamily: FONTS.body, marginBottom: 10, textTransform: "uppercase" }}>Activity</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 10, opacity: activity1Opacity }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", marginTop: 5, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 12, color: "#1f2937", fontFamily: FONTS.body }}>Task created and assigned to {task.stakeholder.name}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", fontFamily: FONTS.body }}>2 days ago</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, opacity: activity2Opacity }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", marginTop: 5, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 12, color: "#1f2937", fontFamily: FONTS.body }}>Status changed to In Progress</div>
              <div style={{ fontSize: 10, color: "#94a3b8", fontFamily: FONTS.body }}>1 day ago</div>
            </div>
          </div>
          {typingProgress > 0 && (
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: MODULE_COLORS.projectManagement.primary, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: "#1f2937", fontFamily: FONTS.body }}>
                  {displayComment}{showCursor && <span style={{ color: MODULE_COLORS.projectManagement.primary }}>|</span>}
                </div>
                <div style={{ fontSize: 10, color: "#94a3b8", fontFamily: FONTS.body }}>Just now</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TaskView: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entrance
  const headerEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Task click happens at frame 100, detail panel slides in
  const showDetail = frame >= 100;
  const detailEntrance = spring({
    frame: frame - 100,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  // Selected task
  const selectedTask = TASKS[0];

  return (
    <div style={{ padding: 20, height: "100%", display: "flex", gap: 20 }}>
      {/* Left side - Task list */}
      <div style={{
        flex: showDetail ? "0 0 45%" : 1,
        display: "flex",
        flexDirection: "column",
        transition: "flex 0.3s ease",
      }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            opacity: interpolate(headerEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerEntrance, [0, 1], [-10, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1f2937", fontFamily: FONTS.body }}>Tasks</div>
            <div style={{ fontSize: 11, color: "#64748b", fontFamily: FONTS.body, padding: "2px 6px", background: "rgba(0, 0, 0, 0.05)", borderRadius: 4 }}>
              3 items
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["All", "Active"].map((filter, i) => (
              <div
                key={filter}
                style={{
                  padding: "4px 10px",
                  borderRadius: 5,
                  background: i === 0 ? "rgba(249, 115, 22, 0.15)" : "rgba(0, 0, 0, 0.05)",
                  fontSize: 11,
                  fontWeight: 500,
                  color: i === 0 ? MODULE_COLORS.projectManagement.primary : "#64748b",
                  fontFamily: FONTS.body,
                }}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>

        {/* Task list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TASKS.map((task, index) => (
            <TaskRow
              key={task.id}
              task={task}
              delay={50 + index * 12}
              isSelected={showDetail && task.id === selectedTask.id}
            />
          ))}
        </div>
      </div>

      {/* Right side - Task detail */}
      {showDetail && (
        <div style={{
          flex: "0 0 53%",
          borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          paddingLeft: 20,
        }}>
          <TaskDetail task={selectedTask} entranceProgress={detailEntrance} />
        </div>
      )}
    </div>
  );
};

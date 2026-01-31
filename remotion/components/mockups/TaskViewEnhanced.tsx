import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ASSIGNEE_GRADIENTS,
  DEMO_INBOX_MESSAGES,
  DEMO_WORK_ITEMS,
  INBOX_MESSAGE_TYPE_CONFIG,
  TASK_STAKEHOLDER_COLORS,
  TASK_STATUS_CONFIG,
  TASK_TIMING,
  WORK_ITEM_TYPE_CONFIG,
  type Assignee,
  type InboxMessage,
  type WorkItem,
} from "../../data/taskData";
import { COLORS, MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";

// ============================================================
// Assignee Avatar Component
// ============================================================

type AssigneeAvatarProps = {
  assignee?: Assignee;
  fallbackInitials: string;
  fallbackColor: string;
  size?: number;
};

const AssigneeAvatar: React.FC<AssigneeAvatarProps> = ({
  assignee,
  fallbackInitials,
  fallbackColor,
  size = 22,
}) => {
  const getBackground = () => {
    if (!assignee) {
      return `linear-gradient(135deg, ${fallbackColor}, ${fallbackColor}88)`;
    }
    if (assignee.type === "ai_agent") {
      return ASSIGNEE_GRADIENTS.ai_agent;
    }
    if (assignee.type === "team") {
      return ASSIGNEE_GRADIENTS.team;
    }
    const color = TASK_STAKEHOLDER_COLORS[assignee.name] || fallbackColor;
    return ASSIGNEE_GRADIENTS.human(color);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: getBackground(),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.4,
          fontWeight: 600,
          color: "white",
          fontFamily: FONTS.body,
          flexShrink: 0,
        }}
      >
        {assignee?.initials || fallbackInitials}
      </div>
      {/* Team member count badge */}
      {assignee?.type === "team" && assignee.memberCount && (
        <div
          style={{
            position: "absolute",
            bottom: -2,
            right: -4,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#1f2937",
            border: "1.5px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
            fontWeight: 700,
            color: "white",
            fontFamily: FONTS.body,
          }}
        >
          {assignee.memberCount}
        </div>
      )}
    </div>
  );
};

// ============================================================
// Work Item Type Badge Component
// ============================================================

type TypeBadgeProps = {
  type: "epic" | "story" | "task";
  status?: "todo" | "in_progress" | "done";
};

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, status }) => {
  const config = WORK_ITEM_TYPE_CONFIG[type];

  // For tasks, show checkbox instead of badge
  if (type === "task") {
    return (
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 3,
          border: `2px solid ${status === "done" ? "#10b981" : "rgba(0, 0, 0, 0.2)"}`,
          background: status === "done" ? "#10b981" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {status === "done" && (
          <svg
            width="8"
            height="8"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6L5 9L10 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        width: 18,
        height: 18,
        borderRadius: 4,
        background: config.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 700,
        color: config.color,
        fontFamily: FONTS.body,
        flexShrink: 0,
      }}
    >
      {config.icon}
    </div>
  );
};

// ============================================================
// Work Item Row Component (Left Panel List Item)
// ============================================================

type WorkItemRowProps = {
  item: WorkItem;
  delay: number;
  isSelected?: boolean;
  isLastChild?: boolean;
  showConnector?: boolean;
};

const WorkItemRow: React.FC<WorkItemRowProps> = ({
  item,
  delay,
  isSelected = false,
  isLastChild = false,
  showConnector = false,
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

  const typeConfig = WORK_ITEM_TYPE_CONFIG[item.type];
  const status = TASK_STATUS_CONFIG[item.status];
  const indent = typeConfig.indent;

  return (
    <div
      style={{
        transform: `translateX(${x}px)`,
        opacity,
        position: "relative",
      }}
    >
      {/* Tree connector lines */}
      {indent > 0 && showConnector && (
        <>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: indent - 14,
              top: isLastChild ? 0 : -4,
              bottom: isLastChild ? "50%" : -4,
              width: 2,
              background: "rgba(0, 0, 0, 0.08)",
              borderRadius: 1,
            }}
          />
          {/* Horizontal connector */}
          <div
            style={{
              position: "absolute",
              left: indent - 14,
              top: "50%",
              width: 10,
              height: 2,
              background: "rgba(0, 0, 0, 0.08)",
              borderRadius: 1,
            }}
          />
        </>
      )}

      <div style={{ marginLeft: indent }}>
        <GlassCard
          padding={item.type === "epic" ? 14 : 10}
          borderRadius={10}
          opacity={isSelected ? 0.2 : 0.1}
          style={{
            border: isSelected
              ? `1px solid ${MODULE_COLORS.projectManagement.primary}`
              : "1px solid rgba(0, 0, 0, 0.05)",
            boxShadow: isSelected ? "0 0 20px rgba(249, 115, 22, 0.2)" : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Type badge / checkbox */}
            <TypeBadge type={item.type} status={item.status} />

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: item.type === "epic" ? 14 : item.type === "story" ? 13 : 12,
                  fontWeight: item.type === "task" ? 500 : 600,
                  color: item.status === "done" ? "#94a3b8" : "#1f2937",
                  fontFamily: FONTS.body,
                  textDecoration: item.status === "done" ? "line-through" : "none",
                }}
              >
                {item.title}
              </div>
            </div>

            {/* Assignee avatar */}
            <AssigneeAvatar
              assignee={item.assignee}
              fallbackInitials={item.stakeholder.initials}
              fallbackColor={TASK_STAKEHOLDER_COLORS[item.stakeholder.name] || COLORS.accent}
              size={item.type === "epic" ? 26 : 22}
            />

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
    </div>
  );
};

// ============================================================
// Inbox Message Row Component
// ============================================================

type InboxMessageRowProps = {
  message: InboxMessage;
  entranceProgress: number;
  isHighlighted?: boolean;
};

const InboxMessageRow: React.FC<InboxMessageRowProps> = ({
  message,
  entranceProgress,
  isHighlighted = false,
}) => {
  const msgConfig = INBOX_MESSAGE_TYPE_CONFIG[message.type];
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);
  const y = interpolate(entranceProgress, [0, 1], [10, 0]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <GlassCard
        padding={10}
        borderRadius={8}
        opacity={isHighlighted ? 0.15 : 0.08}
        style={{
          border: isHighlighted
            ? `1px solid ${msgConfig.color}40`
            : "1px solid rgba(0, 0, 0, 0.03)",
          boxShadow: isHighlighted ? `0 0 12px ${msgConfig.color}15` : "none",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          {/* Message type icon */}
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: msgConfig.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: msgConfig.color,
              fontFamily: FONTS.body,
              flexShrink: 0,
            }}
          >
            {msgConfig.icon}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Author and timestamp */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <AssigneeAvatar
                assignee={{
                  type: message.author.type,
                  name: message.author.name,
                  initials: message.author.initials,
                }}
                fallbackInitials={message.author.initials}
                fallbackColor={COLORS.accent}
                size={16}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#1f2937",
                  fontFamily: FONTS.body,
                }}
              >
                {message.author.name}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "#94a3b8",
                  fontFamily: FONTS.body,
                }}
              >
                {message.timestamp}
              </span>
              {/* Unread indicator */}
              {!message.isRead && (
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: msgConfig.color,
                    marginLeft: "auto",
                  }}
                />
              )}
            </div>

            {/* Message content */}
            <div
              style={{
                fontSize: 11,
                color: "#374151",
                fontFamily: FONTS.body,
                lineHeight: 1.4,
              }}
            >
              {message.content}
            </div>

            {/* Work item link */}
            <div
              style={{
                marginTop: 6,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "2px 6px",
                borderRadius: 4,
                background: "rgba(0, 0, 0, 0.04)",
                fontSize: 9,
                color: "#64748b",
                fontFamily: FONTS.body,
              }}
            >
              <span style={{ fontWeight: 600 }}>
                {message.workItemType.charAt(0).toUpperCase()}
              </span>
              <span>{message.workItemTitle}</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// ============================================================
// Work Item Detail Component (Right Panel)
// ============================================================

type WorkItemDetailProps = {
  item: WorkItem;
  entranceProgress: number;
  inboxMessages: InboxMessage[];
};

const WorkItemDetail: React.FC<WorkItemDetailProps> = ({
  item,
  entranceProgress,
  inboxMessages,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const status = TASK_STATUS_CONFIG[item.status];
  const typeConfig = WORK_ITEM_TYPE_CONFIG[item.type];

  const x = interpolate(entranceProgress, [0, 1], [50, 0]);
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  // Activity items appear sequentially
  const activity1Opacity = interpolate(entranceProgress, [0.5, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const activity2Opacity = interpolate(entranceProgress, [0.7, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Inbox section entrance
  const inboxEntrance = spring({
    frame: frame - TASK_TIMING.INBOX_APPEAR,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  // Message highlight animation
  const messageHighlightProgress = interpolate(
    frame,
    [TASK_TIMING.INBOX_MESSAGE_HIGHLIGHT, TASK_TIMING.INBOX_MESSAGE_HIGHLIGHT + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Typing animation for adding a comment
  const commentTypingStart = TASK_TIMING.TYPING_START;
  const typingProgress = interpolate(
    frame,
    [commentTypingStart, commentTypingStart + 60],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const commentText = "Yes, let's support both - SAML 2.0 for enterprise and OIDC for modern apps";
  const visibleChars = Math.floor(typingProgress * commentText.length);
  const displayComment = commentText.slice(0, visibleChars);
  const showCursor =
    frame >= commentTypingStart && frame % 15 < 10 && typingProgress < 1;

  // Linked requirement highlight animation
  const linkedReqHighlight = interpolate(
    frame,
    [TASK_TIMING.LINKED_REQ_HIGHLIGHT, TASK_TIMING.LINKED_REQ_HIGHLIGHT + 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Get parent context for breadcrumb
  const parentItem = item.parentId
    ? DEMO_WORK_ITEMS.find((i) => i.id === item.parentId)
    : undefined;
  const grandparentItem = parentItem?.parentId
    ? DEMO_WORK_ITEMS.find((i) => i.id === parentItem.parentId)
    : undefined;

  // Filter messages for this item
  const relevantMessages = inboxMessages.filter(
    (msg) => msg.workItemId === item.id
  );

  // Calculate unread count
  const unreadCount = relevantMessages.filter((m) => !m.isRead).length;

  return (
    <div
      style={{
        transform: `translateX(${x}px)`,
        opacity,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Breadcrumb - show hierarchy context */}
      {parentItem && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 8,
            fontSize: 10,
            color: "#64748b",
            fontFamily: FONTS.body,
          }}
        >
          {grandparentItem && (
            <>
              <span
                style={{
                  padding: "2px 5px",
                  borderRadius: 3,
                  background: WORK_ITEM_TYPE_CONFIG.epic.bg,
                  color: WORK_ITEM_TYPE_CONFIG.epic.color,
                  fontWeight: 600,
                }}
              >
                E
              </span>
              <span>{grandparentItem.title}</span>
              <span style={{ color: "#cbd5e1" }}>›</span>
            </>
          )}
          <span
            style={{
              padding: "2px 5px",
              borderRadius: 3,
              background: WORK_ITEM_TYPE_CONFIG[parentItem.type].bg,
              color: WORK_ITEM_TYPE_CONFIG[parentItem.type].color,
              fontWeight: 600,
            }}
          >
            {WORK_ITEM_TYPE_CONFIG[parentItem.type].icon}
          </span>
          <span>{parentItem.title}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <TypeBadge type={item.type} status={item.status} />
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#1f2937",
              fontFamily: FONTS.body,
              flex: 1,
            }}
          >
            {item.title}
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#64748b",
            fontFamily: FONTS.body,
            lineHeight: 1.5,
          }}
        >
          {item.description}
        </div>
      </div>

      {/* Meta info */}
      <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
        <div>
          <div
            style={{
              fontSize: 9,
              color: "#64748b",
              fontFamily: FONTS.body,
              marginBottom: 3,
              textTransform: "uppercase",
            }}
          >
            Status
          </div>
          <div
            style={{
              padding: "3px 8px",
              borderRadius: 5,
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
        <div>
          <div
            style={{
              fontSize: 9,
              color: "#64748b",
              fontFamily: FONTS.body,
              marginBottom: 3,
              textTransform: "uppercase",
            }}
          >
            Priority
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background:
                  item.priority === "high"
                    ? "#ef4444"
                    : item.priority === "medium"
                      ? "#f59e0b"
                      : "#6b7280",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "#1f2937",
                fontFamily: FONTS.body,
                textTransform: "capitalize",
              }}
            >
              {item.priority}
            </span>
          </div>
        </div>
        {item.dueDate && (
          <div>
            <div
              style={{
                fontSize: 9,
                color: "#64748b",
                fontFamily: FONTS.body,
                marginBottom: 3,
                textTransform: "uppercase",
              }}
            >
              Due Date
            </div>
            <span
              style={{ fontSize: 11, color: "#1f2937", fontFamily: FONTS.body }}
            >
              {item.dueDate}
            </span>
          </div>
        )}
      </div>

      {/* Assignee section */}
      {item.assignee && (
        <GlassCard
          padding={10}
          borderRadius={8}
          opacity={0.08}
          style={{ marginBottom: 12 }}
        >
          <div
            style={{
              fontSize: 9,
              color: "#64748b",
              fontFamily: FONTS.body,
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            Assignee
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AssigneeAvatar
              assignee={item.assignee}
              fallbackInitials={item.stakeholder.initials}
              fallbackColor={TASK_STAKEHOLDER_COLORS[item.stakeholder.name] || COLORS.accent}
              size={28}
            />
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#1f2937",
                  fontFamily: FONTS.body,
                }}
              >
                {item.assignee.name}
              </div>
              {item.assignee.type === "ai_agent" && (
                <div
                  style={{
                    fontSize: 9,
                    color: "#8b5cf6",
                    fontFamily: FONTS.body,
                  }}
                >
                  AI Agent
                </div>
              )}
              {item.assignee.type === "team" && (
                <div
                  style={{
                    fontSize: 9,
                    color: "#14b8a6",
                    fontFamily: FONTS.body,
                  }}
                >
                  {item.assignee.memberCount} members
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      )}

      {/* Linked Requirement section */}
      {item.linkedRequirement && (
        <GlassCard
          padding={10}
          borderRadius={8}
          opacity={0.08}
          style={{
            marginBottom: 12,
            border: `1px solid ${MODULE_COLORS.stakeholderManagement.primary}${Math.round(
              linkedReqHighlight * 60,
            )
              .toString(16)
              .padStart(2, "0")}`,
            boxShadow:
              linkedReqHighlight > 0
                ? `0 0 ${12 * linkedReqHighlight}px ${MODULE_COLORS.stakeholderManagement.primary}20`
                : "none",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: "#64748b",
              fontFamily: FONTS.body,
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            Linked Requirement
          </div>
          <div style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
            <div
              style={{
                width: 3,
                minHeight: 32,
                borderRadius: 2,
                background: MODULE_COLORS.stakeholderManagement.primary,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#1f2937",
                  fontFamily: FONTS.body,
                }}
              >
                {item.linkedRequirement.title}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#64748b",
                  fontFamily: FONTS.body,
                  marginTop: 2,
                }}
              >
                From: {item.linkedRequirement.stakeholder}
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Activity / Decisions - Compact */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            fontSize: 9,
            color: "#64748b",
            fontFamily: FONTS.body,
            marginBottom: 8,
            textTransform: "uppercase",
          }}
        >
          Activity
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 8, opacity: activity1Opacity }}>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#10b981",
                marginTop: 5,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "#1f2937",
                  fontFamily: FONTS.body,
                }}
              >
                {item.type === "task" && item.linkedRequirement
                  ? `Created from "${item.linkedRequirement.title}"`
                  : `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} created`}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "#94a3b8",
                  fontFamily: FONTS.body,
                }}
              >
                2 days ago
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, opacity: activity2Opacity }}>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#f59e0b",
                marginTop: 5,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "#1f2937",
                  fontFamily: FONTS.body,
                }}
              >
                Assigned to {item.assignee?.name || "team"}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "#94a3b8",
                  fontFamily: FONTS.body,
                }}
              >
                1 day ago
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inbox Section */}
      {inboxEntrance > 0 && (
        <div
          style={{
            flex: 1,
            opacity: interpolate(inboxEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(inboxEntrance, [0, 1], [15, 0])}px)`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: "#64748b",
                fontFamily: FONTS.body,
                textTransform: "uppercase",
              }}
            >
              Inbox
            </div>
            {unreadCount > 0 && (
              <div
                style={{
                  padding: "2px 6px",
                  borderRadius: 8,
                  background: "#ef4444",
                  fontSize: 9,
                  fontWeight: 600,
                  color: "white",
                  fontFamily: FONTS.body,
                }}
              >
                {unreadCount}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {relevantMessages.slice(0, 2).map((msg, idx) => (
              <InboxMessageRow
                key={msg.id}
                message={msg}
                entranceProgress={interpolate(
                  inboxEntrance,
                  [idx * 0.2, idx * 0.2 + 0.5],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )}
                isHighlighted={idx === 0 && messageHighlightProgress > 0.5}
              />
            ))}

            {/* Typing response to inbox message */}
            {typingProgress > 0 && relevantMessages.length > 0 && (
              <GlassCard
                padding={10}
                borderRadius={8}
                opacity={0.08}
                style={{
                  borderLeft: `3px solid ${MODULE_COLORS.projectManagement.primary}`,
                }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <AssigneeAvatar
                    assignee={{
                      type: "human",
                      name: "You",
                      initials: "ME",
                    }}
                    fallbackInitials="ME"
                    fallbackColor={MODULE_COLORS.projectManagement.primary}
                    size={16}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#1f2937",
                        fontFamily: FONTS.body,
                        lineHeight: 1.4,
                      }}
                    >
                      {displayComment}
                      {showCursor && (
                        <span
                          style={{ color: MODULE_COLORS.projectManagement.primary }}
                        >
                          |
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// Main TaskViewEnhanced Component
// ============================================================

export const TaskViewEnhanced: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entrance
  const headerEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Task click happens at TASK_CLICK frame, detail panel slides in
  const showDetail = frame >= TASK_TIMING.TASK_CLICK;
  const detailEntrance = spring({
    frame: frame - TASK_TIMING.TASK_CLICK,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  // Selected item - select the first task (task-1)
  const selectedItem = DEMO_WORK_ITEMS.find((item) => item.id === "task-1")!;

  // Determine which items are last children for tree connector rendering
  const getIsLastChild = (item: WorkItem, index: number) => {
    if (!item.parentId) return false;
    // Find all siblings
    const siblings = DEMO_WORK_ITEMS.filter((i) => i.parentId === item.parentId);
    return siblings[siblings.length - 1].id === item.id;
  };

  return (
    <div style={{ padding: 20, height: "100%", display: "flex", gap: 20 }}>
      {/* Left side - Work item hierarchy */}
      <div
        style={{
          flex: showDetail ? "0 0 42%" : 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
            opacity: interpolate(headerEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerEntrance, [0, 1], [-10, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#1f2937",
                fontFamily: FONTS.body,
              }}
            >
              Work Items
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#64748b",
                fontFamily: FONTS.body,
                padding: "2px 6px",
                background: "rgba(0, 0, 0, 0.05)",
                borderRadius: 4,
              }}
            >
              {DEMO_WORK_ITEMS.length} items
            </div>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {["All", "Active"].map((filter, i) => (
              <div
                key={filter}
                style={{
                  padding: "3px 8px",
                  borderRadius: 5,
                  background:
                    i === 0
                      ? "rgba(249, 115, 22, 0.15)"
                      : "rgba(0, 0, 0, 0.05)",
                  fontSize: 10,
                  fontWeight: 500,
                  color:
                    i === 0
                      ? MODULE_COLORS.projectManagement.primary
                      : "#64748b",
                  fontFamily: FONTS.body,
                }}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>

        {/* Work item hierarchy list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {DEMO_WORK_ITEMS.map((item, index) => (
            <WorkItemRow
              key={item.id}
              item={item}
              delay={40 + index * TASK_TIMING.CARD_STAGGER}
              isSelected={showDetail && item.id === selectedItem.id}
              isLastChild={getIsLastChild(item, index)}
              showConnector={item.depth > 0}
            />
          ))}
        </div>
      </div>

      {/* Right side - Work item detail */}
      {showDetail && (
        <div
          style={{
            flex: "0 0 56%",
            borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
            paddingLeft: 20,
            overflow: "hidden",
          }}
        >
          <WorkItemDetail
            item={selectedItem}
            entranceProgress={detailEntrance}
            inboxMessages={DEMO_INBOX_MESSAGES}
          />
        </div>
      )}
    </div>
  );
};

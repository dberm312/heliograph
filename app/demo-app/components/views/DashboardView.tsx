"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { KANBAN_COLUMNS, TASK_STATUS_CONFIG } from "../../constants";
import { useDemo } from "../../context/DemoContext";
import { sortByDateDesc } from "../../utils";
import { ActivityItem } from "../cards/ActivityItem";

export function DashboardView() {
  const { state, dispatch } = useDemo();

  // Calculate stats
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter((t) => t.status === "done").length;
  const urgentTasks = state.tasks.filter(
    (t) => t.priority === "urgent" && t.status !== "done",
  ).length;
  const inProgressTasks = state.tasks.filter(
    (t) => t.status === "inProgress",
  ).length;

  const totalPeople = state.persons.length;
  const stakeholderCount = state.persons.filter((p) =>
    p.personType.includes("stakeholder"),
  ).length;
  const executorCount = state.persons.filter((p) =>
    p.personType.includes("executor"),
  ).length;

  const totalRequirements = state.requirements.length;
  const completedRequirements = state.requirements.filter(
    (r) => r.status === "completed",
  ).length;

  // Tasks by status for mini chart
  const tasksByStatus = KANBAN_COLUMNS.map((status) => ({
    status,
    count: state.tasks.filter((t) => t.status === status).length,
    config: TASK_STATUS_CONFIG[status],
  }));

  // Recent activity (last 10)
  const recentActivity = sortByDateDesc(state.activities).slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">
          Dashboard
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Overview of your projects and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Tasks */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <ClipboardList
                className="w-5 h-5 text-orange-300"
                aria-hidden="true"
              />
            </div>
            {urgentTasks > 0 && (
              <span className="flex items-center gap-1 text-xs text-red-400">
                <AlertTriangle className="w-3 h-3" />
                {urgentTasks} urgent
              </span>
            )}
          </div>
          <div className="text-2xl font-display font-semibold text-white">
            {totalTasks}
          </div>
          <p className="text-sm text-white/50">Total tasks</p>
        </div>

        {/* In Progress */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-300" aria-hidden="true" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-400" aria-hidden="true" />
          </div>
          <div className="text-2xl font-display font-semibold text-white">
            {inProgressTasks}
          </div>
          <p className="text-sm text-white/50">In progress</p>
        </div>

        {/* Completed */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle2
                className="w-5 h-5 text-green-300"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="text-2xl font-display font-semibold text-white">
            {completedTasks}
          </div>
          <p className="text-sm text-white/50">Completed</p>
        </div>

        {/* People */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-300" aria-hidden="true" />
            </div>
          </div>
          <div className="text-2xl font-display font-semibold text-white">
            {totalPeople}
          </div>
          <p className="text-sm text-white/50">
            {stakeholderCount} stakeholder{stakeholderCount !== 1 ? "s" : ""},{" "}
            {executorCount} executor{executorCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Task distribution */}
        <div className="lg:col-span-2 bg-white/5 rounded-xl border border-white/10 p-5">
          <h2 className="font-medium text-white mb-4">Task Distribution</h2>
          <div className="flex items-end gap-2 h-32">
            {tasksByStatus.map(({ status, count, config }) => {
              const height = totalTasks > 0 ? (count / totalTasks) * 100 : 0;
              return (
                <div
                  key={status}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t-lg transition-all duration-300"
                    style={{
                      height: `${Math.max(height, 4)}%`,
                      backgroundColor: config.color,
                      opacity: count > 0 ? 1 : 0.3,
                    }}
                  />
                  <div className="text-center">
                    <div className="text-xs font-medium text-white/70">
                      {count}
                    </div>
                    <div className="text-[10px] text-white/40 truncate max-w-[60px]">
                      {config.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Requirements summary */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-white">Requirements</h2>
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "SET_VIEW", payload: "requirements" })
              }
              className="text-xs text-orange-300 hover:text-orange-200 transition-colors"
            >
              View all
            </button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center">
              <FileText
                className="w-7 h-7 text-orange-300"
                aria-hidden="true"
              />
            </div>
            <div>
              <div className="text-2xl font-display font-semibold text-white">
                {totalRequirements}
              </div>
              <p className="text-sm text-white/50">Total requirements</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Completed</span>
              <span className="text-green-400">{completedRequirements}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">In Progress</span>
              <span className="text-orange-400">
                {
                  state.requirements.filter((r) => r.status === "inProgress")
                    .length
                }
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Pending</span>
              <span className="text-yellow-400">
                {
                  state.requirements.filter(
                    (r) => r.status === "pending" || r.status === "draft",
                  ).length
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <h2 className="font-medium text-white mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <div className="divide-y divide-white/5">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/40 italic py-4 text-center">
            No activity yet. Start by adding tasks or requirements.
          </p>
        )}
      </div>
    </div>
  );
}

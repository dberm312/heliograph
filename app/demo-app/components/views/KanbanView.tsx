"use client";

import { Filter, Plus } from "lucide-react";
import { useState } from "react";
import { KANBAN_COLUMNS, TASK_STATUS_CONFIG } from "../../constants";
import { useDemo } from "../../context/DemoContext";
import type { Task, TaskStatus } from "../../types";
import { TaskCard } from "../cards/TaskCard";
import { TaskForm } from "../forms/TaskForm";
import { Modal } from "../modals/Modal";

export function KanbanView() {
  const { state, dispatch, getPersonById } = useDemo();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterPersonId, setFilterPersonId] = useState<string | null>(null);

  // Filter tasks
  const filteredTasks = filterPersonId
    ? state.tasks.filter(
        (t) =>
          t.stakeholderIds.includes(filterPersonId) ||
          t.executorIds.includes(filterPersonId),
      )
    : state.tasks;

  // Group tasks by status
  const tasksByStatus = KANBAN_COLUMNS.reduce(
    (acc, status) => {
      acc[status] = filteredTasks.filter((t) => t.status === status);
      return acc;
    },
    {} as Record<TaskStatus, Task[]>,
  );

  const handleDrop = (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      dispatch({ type: "MOVE_TASK", payload: { taskId, newStatus } });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Get all unique persons involved in tasks for filter dropdown
  const involvedPersonIds = new Set<string>();
  for (const task of state.tasks) {
    for (const id of task.stakeholderIds) involvedPersonIds.add(id);
    for (const id of task.executorIds) involvedPersonIds.add(id);
  }
  const filterOptions = Array.from(involvedPersonIds)
    .map(getPersonById)
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">
            Tasks
          </h1>
          <p className="text-sm text-white/50 mt-1">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
            {filterPersonId && " (filtered)"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter dropdown */}
          <div className="relative">
            <select
              value={filterPersonId || ""}
              onChange={(e) => setFilterPersonId(e.target.value || null)}
              className="appearance-none bg-white/5 border border-white/10 rounded-lg
                px-3 py-2 pr-8 text-sm text-white/80
                focus:outline-none focus:border-white/30
                cursor-pointer"
            >
              <option value="">All people</option>
              {filterOptions.map((person) => (
                <option key={person!.id} value={person!.id}>
                  {person!.name}
                </option>
              ))}
            </select>
            <Filter
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Add task button */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
              bg-orange-500/20 text-orange-300 border border-orange-500/30
              hover:bg-orange-500/30 transition-colors duration-200
              text-sm font-medium"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add Task
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((status) => {
          const config = TASK_STATUS_CONFIG[status];
          const tasks = tasksByStatus[status];

          return (
            <div
              key={status}
              className="flex-shrink-0 w-72 flex flex-col"
              onDrop={(e) => handleDrop(e, status)}
              onDragOver={handleDragOver}
            >
              {/* Column header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: config.color }}
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold text-white">
                  {config.label}
                </h3>
                <span className="text-xs text-white/50 ml-auto">
                  {tasks.length}
                </span>
              </div>

              {/* Tasks list */}
              <div
                className="flex-1 space-y-3 min-h-[200px] p-2 -m-2 rounded-lg
                  transition-colors duration-200
                  hover:bg-white/5"
              >
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => setEditingTask(task)}
                  />
                ))}

                {tasks.length === 0 && (
                  <div className="flex items-center justify-center h-24 text-sm text-white/30 italic">
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Task"
        size="lg"
      >
        <TaskForm
          onSubmit={(task) => {
            dispatch({ type: "ADD_TASK", payload: task });
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
        size="lg"
      >
        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={(updates) => {
              dispatch({
                type: "UPDATE_TASK",
                payload: { id: editingTask.id, ...updates },
              });
              setEditingTask(null);
            }}
            onCancel={() => setEditingTask(null)}
            onDelete={() => {
              dispatch({ type: "DELETE_TASK", payload: editingTask.id });
              setEditingTask(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

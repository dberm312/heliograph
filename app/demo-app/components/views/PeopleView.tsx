"use client";

import { Filter, Plus, Users } from "lucide-react";
import { useState } from "react";
import { useDemo } from "../../context/DemoContext";
import type { Person, PersonType } from "../../types";
import { PersonCard } from "../cards/PersonCard";
import { RequirementStatusBadge } from "../common/StatusBadge";
import { TaskStatusBadge } from "../common/StatusBadge";
import { EmptyState } from "../common/EmptyState";
import { PersonForm } from "../forms/PersonForm";
import { Modal } from "../modals/Modal";

type FilterType = "all" | PersonType;

export function PeopleView() {
  const { state, dispatch, getRequirementsByStakeholder, getTasksByPerson } =
    useDemo();
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  // Filter persons
  const filteredPersons =
    filterType === "all"
      ? state.persons
      : state.persons.filter((p) => p.personType.includes(filterType));

  // Get selected person's details
  const selectedRequirements = selectedPerson
    ? getRequirementsByStakeholder(selectedPerson.id)
    : [];
  const selectedTasksFor = selectedPerson
    ? getTasksByPerson(selectedPerson.id, "stakeholder")
    : [];
  const selectedTasksBy = selectedPerson
    ? getTasksByPerson(selectedPerson.id, "executor")
    : [];

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Left panel - Person list */}
      <div className="w-96 flex flex-col shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-white">
              People
            </h1>
            <p className="text-sm text-white/50 mt-1">
              {filteredPersons.length} person
              {filteredPersons.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg
              bg-purple-500/20 text-purple-300 border border-purple-500/30
              hover:bg-purple-500/30 transition-colors duration-200
              text-sm font-medium"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add
          </button>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-white/40" aria-hidden="true" />
          <div className="flex gap-1">
            {(["all", "stakeholder", "executor"] as FilterType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterType === type
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {type === "all"
                  ? "All"
                  : type.charAt(0).toUpperCase() + type.slice(1) + "s"}
              </button>
            ))}
          </div>
        </div>

        {/* Person list */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {filteredPersons.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              isSelected={selectedPerson?.id === person.id}
              onClick={() => setSelectedPerson(person)}
            />
          ))}

          {filteredPersons.length === 0 && (
            <EmptyState
              icon={Users}
              title="No people found"
              description={
                filterType === "all"
                  ? "Add your first person to get started."
                  : `No ${filterType}s found. Try a different filter.`
              }
              action={
                filterType === "all"
                  ? {
                      label: "Add Person",
                      onClick: () => setIsAddModalOpen(true),
                    }
                  : undefined
              }
            />
          )}
        </div>
      </div>

      {/* Right panel - Person details */}
      <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-6 overflow-y-auto">
        {selectedPerson ? (
          <div className="space-y-6">
            {/* Person header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-white">
                  {selectedPerson.name}
                </h2>
                <p className="text-white/60">
                  {selectedPerson.role} at {selectedPerson.company}
                </p>
                <p className="text-sm text-white/40 mt-1">
                  {selectedPerson.email}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingPerson(selectedPerson)}
                className="px-3 py-1.5 rounded-lg text-sm
                  bg-white/5 text-white/60 border border-white/10
                  hover:bg-white/10 hover:text-white/80 transition-colors"
              >
                Edit
              </button>
            </div>

            {/* Requirements section (if stakeholder) */}
            {selectedPerson.personType.includes("stakeholder") && (
              <div>
                <h3 className="font-medium text-white/80 mb-3">
                  Requirements ({selectedRequirements.length})
                </h3>
                {selectedRequirements.length > 0 ? (
                  <div className="space-y-2">
                    {selectedRequirements.map((req) => (
                      <div
                        key={req.id}
                        className="p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white/90">
                            {req.title}
                          </span>
                          <RequirementStatusBadge status={req.status} />
                        </div>
                        {req.description && (
                          <p className="text-xs text-white/50 line-clamp-2">
                            {req.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white/40 italic">
                    No requirements yet
                  </p>
                )}
              </div>
            )}

            {/* Tasks for this person (as stakeholder) */}
            {selectedTasksFor.length > 0 && (
              <div>
                <h3 className="font-medium text-white/80 mb-3">
                  Tasks for {selectedPerson.name.split(" ")[0]} (
                  {selectedTasksFor.length})
                </h3>
                <div className="space-y-2">
                  {selectedTasksFor.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white/90">
                          {task.title}
                        </span>
                        <TaskStatusBadge status={task.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks by this person (as executor) */}
            {selectedTasksBy.length > 0 && (
              <div>
                <h3 className="font-medium text-white/80 mb-3">
                  Tasks by {selectedPerson.name.split(" ")[0]} (
                  {selectedTasksBy.length})
                </h3>
                <div className="space-y-2">
                  {selectedTasksBy.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white/90">
                          {task.title}
                        </span>
                        <TaskStatusBadge status={task.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-white/40">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a person to view details</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Person Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Person"
      >
        <PersonForm
          onSubmit={(person) => {
            dispatch({ type: "ADD_PERSON", payload: person });
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Person Modal */}
      <Modal
        isOpen={!!editingPerson}
        onClose={() => setEditingPerson(null)}
        title="Edit Person"
      >
        {editingPerson && (
          <PersonForm
            person={editingPerson}
            onSubmit={(updates) => {
              dispatch({
                type: "UPDATE_PERSON",
                payload: { id: editingPerson.id, ...updates },
              });
              setEditingPerson(null);
              // Update selected person if it was edited
              if (selectedPerson?.id === editingPerson.id) {
                setSelectedPerson({
                  ...editingPerson,
                  ...updates,
                } as Person);
              }
            }}
            onCancel={() => setEditingPerson(null)}
            onDelete={() => {
              dispatch({ type: "DELETE_PERSON", payload: editingPerson.id });
              setEditingPerson(null);
              if (selectedPerson?.id === editingPerson.id) {
                setSelectedPerson(null);
              }
            }}
          />
        )}
      </Modal>
    </div>
  );
}

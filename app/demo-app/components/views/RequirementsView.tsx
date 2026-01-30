"use client";

import { FileText, Plus } from "lucide-react";
import { useState } from "react";
import { useDemo } from "../../context/DemoContext";
import type { Requirement } from "../../types";
import { groupBy } from "../../utils";
import { RequirementCard } from "../cards/RequirementCard";
import { Avatar } from "../common/Avatar";
import { EmptyState } from "../common/EmptyState";
import { RequirementForm } from "../forms/RequirementForm";
import { Modal } from "../modals/Modal";

export function RequirementsView() {
  const { state, dispatch, getPersonById } = useDemo();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] =
    useState<Requirement | null>(null);

  // Group requirements by stakeholder
  const requirementsByStakeholder = groupBy(
    state.requirements,
    "stakeholderId"
  );

  // Get stakeholders who can have requirements
  const stakeholders = state.persons.filter((p) =>
    p.personType.includes("stakeholder")
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">
            Requirements
          </h1>
          <p className="text-sm text-white/50 mt-1">
            {state.requirements.length} requirement
            {state.requirements.length !== 1 ? "s" : ""} across{" "}
            {requirementsByStakeholder.size} stakeholder
            {requirementsByStakeholder.size !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          disabled={stakeholders.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
            bg-orange-500/20 text-orange-300 border border-orange-500/30
            hover:bg-orange-500/30 transition-colors duration-200
            text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          title={
            stakeholders.length === 0
              ? "Add a stakeholder first"
              : "Add requirement"
          }
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          Add Requirement
        </button>
      </div>

      {/* Requirements grouped by stakeholder */}
      {state.requirements.length > 0 ? (
        <div className="space-y-8">
          {Array.from(requirementsByStakeholder.entries()).map(
            ([stakeholderId, requirements]) => {
              const stakeholder = getPersonById(stakeholderId);
              if (!stakeholder) return null;

              return (
                <div key={stakeholderId}>
                  {/* Stakeholder header */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar
                      name={stakeholder.name}
                      avatar={stakeholder.avatar}
                      company={stakeholder.company}
                      size="md"
                    />
                    <div>
                      <h2 className="font-medium text-white">
                        {stakeholder.name}
                      </h2>
                      <p className="text-xs text-white/50">
                        {stakeholder.role} at {stakeholder.company} •{" "}
                        {requirements.length} requirement
                        {requirements.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Requirements grid */}
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {requirements.map((req) => (
                      <RequirementCard
                        key={req.id}
                        requirement={req}
                        onClick={() => setEditingRequirement(req)}
                      />
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No requirements yet"
          description={
            stakeholders.length === 0
              ? "Add a stakeholder first, then you can track their requirements."
              : "Start tracking stakeholder requirements to keep everyone aligned."
          }
          action={
            stakeholders.length > 0
              ? {
                  label: "Add Requirement",
                  onClick: () => setIsAddModalOpen(true),
                }
              : undefined
          }
        />
      )}

      {/* Add Requirement Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Requirement"
        size="lg"
      >
        <RequirementForm
          onSubmit={(requirement) => {
            dispatch({ type: "ADD_REQUIREMENT", payload: requirement });
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Requirement Modal */}
      <Modal
        isOpen={!!editingRequirement}
        onClose={() => setEditingRequirement(null)}
        title="Edit Requirement"
        size="lg"
      >
        {editingRequirement && (
          <RequirementForm
            requirement={editingRequirement}
            onSubmit={(updates) => {
              dispatch({
                type: "UPDATE_REQUIREMENT",
                payload: { id: editingRequirement.id, ...updates },
              });
              setEditingRequirement(null);
            }}
            onCancel={() => setEditingRequirement(null)}
            onDelete={() => {
              dispatch({
                type: "DELETE_REQUIREMENT",
                payload: editingRequirement.id,
              });
              setEditingRequirement(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

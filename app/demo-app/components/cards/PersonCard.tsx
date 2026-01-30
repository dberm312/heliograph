"use client";

import { useDemo } from "../../context/DemoContext";
import type { Person } from "../../types";
import { getCompanyColor } from "../../utils";
import { Avatar } from "../common/Avatar";
import { PersonTypeBadge } from "../common/PersonTypeBadge";

interface PersonCardProps {
  person: Person;
  isSelected?: boolean;
  onClick?: () => void;
}

export function PersonCard({ person, isSelected, onClick }: PersonCardProps) {
  const { getRequirementsByStakeholder, getTasksByPerson } = useDemo();

  const requirements = person.personType.includes("stakeholder")
    ? getRequirementsByStakeholder(person.id)
    : [];
  const tasksAsStakeholder = getTasksByPerson(person.id, "stakeholder");
  const tasksAsExecutor = getTasksByPerson(person.id, "executor");

  const companyColor = getCompanyColor(person.company);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-xl transition-all duration-200
        border bg-white/5 hover:bg-white/8
        ${
          isSelected
            ? "border-purple-500/50 ring-1 ring-purple-500/30"
            : "border-white/10 hover:border-white/20"
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar
          name={person.name}
          avatar={person.avatar}
          company={person.company}
          size="lg"
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white truncate">{person.name}</h3>
          <p className="text-sm text-white/60 truncate">{person.role}</p>
          <p
            className="text-xs mt-1 truncate"
            style={{ color: companyColor }}
          >
            {person.company}
          </p>

          {/* Type badges */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {person.personType.map((type) => (
              <PersonTypeBadge key={type} type={type} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col items-end gap-1 text-xs text-white/50">
          {requirements.length > 0 && (
            <span>{requirements.length} req</span>
          )}
          {tasksAsStakeholder.length > 0 && (
            <span>{tasksAsStakeholder.length} tasks (for)</span>
          )}
          {tasksAsExecutor.length > 0 && (
            <span>{tasksAsExecutor.length} tasks (by)</span>
          )}
        </div>
      </div>
    </button>
  );
}

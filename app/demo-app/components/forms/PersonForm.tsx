"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { PERSON_TYPE_COLORS } from "../../constants";
import type { NewPerson, Person, PersonType } from "../../types";
import { getInitials } from "../../utils";

interface PersonFormProps {
  person?: Person;
  onSubmit: (person: NewPerson) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const PERSON_TYPES: PersonType[] = ["stakeholder", "executor"];

export function PersonForm({
  person,
  onSubmit,
  onCancel,
  onDelete,
}: PersonFormProps) {
  const [name, setName] = useState(person?.name || "");
  const [email, setEmail] = useState(person?.email || "");
  const [role, setRole] = useState(person?.role || "");
  const [company, setCompany] = useState(person?.company || "");
  const [personType, setPersonType] = useState<PersonType[]>(
    person?.personType || ["stakeholder"]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || personType.length === 0) return;

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      avatar: person?.avatar || getInitials(name),
      role: role.trim(),
      company: company.trim(),
      personType,
    });
  };

  const toggleType = (type: PersonType) => {
    if (personType.includes(type)) {
      // Don't allow removing if it's the only type
      if (personType.length > 1) {
        setPersonType(personType.filter((t) => t !== type));
      }
    } else {
      setPersonType([...personType, type]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="person-name"
          className="block text-sm font-medium text-white/70 mb-2"
        >
          Name <span className="text-red-400">*</span>
        </label>
        <input
          id="person-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter full name..."
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
            text-white placeholder-white/30 focus:outline-none focus:border-white/30"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="person-email"
          className="block text-sm font-medium text-white/70 mb-2"
        >
          Email
        </label>
        <input
          id="person-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
            text-white placeholder-white/30 focus:outline-none focus:border-white/30"
        />
      </div>

      {/* Role & Company */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="person-role"
            className="block text-sm font-medium text-white/70 mb-2"
          >
            Role
          </label>
          <input
            id="person-role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. CTO, Engineer"
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
              text-white placeholder-white/30 focus:outline-none focus:border-white/30"
          />
        </div>

        <div>
          <label
            htmlFor="person-company"
            className="block text-sm font-medium text-white/70 mb-2"
          >
            Company
          </label>
          <input
            id="person-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Corp"
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
              text-white placeholder-white/30 focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      {/* Person Type */}
      <div>
        <label className="block text-sm font-medium text-white/70 mb-2">
          Type <span className="text-red-400">*</span>
        </label>
        <p className="text-xs text-white/40 mb-3">
          Select at least one. A person can be both a stakeholder and an
          executor.
        </p>
        <div className="flex gap-3">
          {PERSON_TYPES.map((type) => {
            const isSelected = personType.includes(type);
            const color = PERSON_TYPE_COLORS[type];

            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? "ring-2"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: `${color}20`,
                        color: color,
                        borderColor: `${color}50`,
                        // @ts-expect-error ringColor is valid
                        "--tw-ring-color": `${color}50`,
                      }
                    : undefined
                }
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
              text-red-400 hover:bg-red-500/10 transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-white/60 hover:text-white/80
              hover:bg-white/5 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name.trim() || personType.length === 0}
            className="px-6 py-2 rounded-lg bg-purple-500/20 text-purple-300
              border border-purple-500/30 hover:bg-purple-500/30
              transition-colors text-sm font-medium
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {person ? "Save Changes" : "Add Person"}
          </button>
        </div>
      </div>
    </form>
  );
}

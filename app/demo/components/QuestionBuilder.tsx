"use client";

import { useState } from "react";
import {
  Type,
  Star,
  SmilePlus,
  Sliders,
  X,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Trash2,
} from "lucide-react";
import type { Question, QuestionType } from "@/types/heliogram";
import { generateQuestionId } from "@/lib/utils/id";

interface QuestionBuilderProps {
  questions: Question[];
  onChange: (questions: Question[]) => void;
}

const questionTypeConfig: Record<
  QuestionType,
  { icon: typeof Type; label: string; description: string }
> = {
  text: {
    icon: Type,
    label: "Text",
    description: "Open-ended text response",
  },
  rating: {
    icon: Star,
    label: "Rating",
    description: "5-star rating scale",
  },
  reaction: {
    icon: SmilePlus,
    label: "Reaction",
    description: "Emoji or thumbs feedback",
  },
  scale: {
    icon: Sliders,
    label: "Scale",
    description: "1-10 numeric scale",
  },
};

function createDefaultQuestion(type: QuestionType, order: number): Question {
  const base = {
    id: generateQuestionId(),
    label: "",
    required: true,
    order,
  };

  switch (type) {
    case "text":
      return { ...base, type: "text", multiline: true, placeholder: "" };
    case "rating":
      return {
        ...base,
        type: "rating",
        maxRating: 5,
        labels: { low: "Poor", high: "Excellent" },
      };
    case "reaction":
      return { ...base, type: "reaction", variant: "emoji" };
    case "scale":
      return {
        ...base,
        type: "scale",
        min: 1,
        max: 10,
        step: 1,
        labels: { min: "Low", max: "High" },
      };
  }
}

interface QuestionEditorProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function QuestionEditor({
  question,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: QuestionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(!question.label);
  const config = questionTypeConfig[question.type];
  const Icon = config.icon;

  return (
    <div className="glass-card noise-texture relative rounded-xl overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-1 text-white/40">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp();
            }}
            disabled={isFirst}
            className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Move up"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown();
            }}
            disabled={isLast}
            className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Move down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="w-8 h-8 rounded-lg bg-orange-400/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-orange-400" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white font-medium truncate">
            {question.label || "Untitled question"}
          </p>
          <p className="text-xs text-white/40">{config.label}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm("Delete this question?")) onDelete();
          }}
          className="p-2 text-white/40 hover:text-red-400 transition-colors"
          aria-label="Delete question"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Expanded editor */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-4">
          {/* Label */}
          <div>
            <label className="block text-sm text-white/60 mb-1">
              Question <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              value={question.label}
              onChange={(e) => onUpdate({ ...question, label: e.target.value })}
              placeholder="Enter your question..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
            />
          </div>

          {/* Required toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Required</span>
            <button
              type="button"
              onClick={() =>
                onUpdate({ ...question, required: !question.required })
              }
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                question.required ? "bg-orange-400" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  question.required ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Type-specific options */}
          {question.type === "text" && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Multiline</span>
                <button
                  type="button"
                  onClick={() =>
                    onUpdate({ ...question, multiline: !question.multiline })
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                    question.multiline ? "bg-orange-400" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                      question.multiline ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Placeholder
                </label>
                <input
                  type="text"
                  value={question.placeholder || ""}
                  onChange={(e) =>
                    onUpdate({ ...question, placeholder: e.target.value })
                  }
                  placeholder="Optional placeholder text..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
                />
              </div>
            </>
          )}

          {question.type === "reaction" && (
            <div>
              <label className="block text-sm text-white/60 mb-2">Style</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onUpdate({ ...question, variant: "emoji" })}
                  className={`flex-1 py-3 rounded-xl text-center transition-all duration-300 ${
                    question.variant === "emoji"
                      ? "bg-orange-400/30 border border-orange-400/50"
                      : "bg-white/10 border border-white/10 hover:bg-white/15"
                  }`}
                >
                  <span className="text-xl">😊</span>
                  <p className="text-xs text-white/60 mt-1">Emoji</p>
                </button>
                <button
                  type="button"
                  onClick={() => onUpdate({ ...question, variant: "thumbs" })}
                  className={`flex-1 py-3 rounded-xl text-center transition-all duration-300 ${
                    question.variant === "thumbs"
                      ? "bg-orange-400/30 border border-orange-400/50"
                      : "bg-white/10 border border-white/10 hover:bg-white/15"
                  }`}
                >
                  <span className="text-xl">👍</span>
                  <p className="text-xs text-white/60 mt-1">Thumbs</p>
                </button>
              </div>
            </div>
          )}

          {question.type === "rating" && question.labels && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Low label
                </label>
                <input
                  type="text"
                  value={question.labels.low}
                  onChange={(e) =>
                    onUpdate({
                      ...question,
                      labels: { ...question.labels!, low: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  High label
                </label>
                <input
                  type="text"
                  value={question.labels.high}
                  onChange={(e) =>
                    onUpdate({
                      ...question,
                      labels: { ...question.labels!, high: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
                />
              </div>
            </div>
          )}

          {question.type === "scale" && question.labels && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Min label
                </label>
                <input
                  type="text"
                  value={question.labels.min}
                  onChange={(e) =>
                    onUpdate({
                      ...question,
                      labels: { ...question.labels!, min: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Max label
                </label>
                <input
                  type="text"
                  value={question.labels.max}
                  onChange={(e) =>
                    onUpdate({
                      ...question,
                      labels: { ...question.labels!, max: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function QuestionBuilder({ questions, onChange }: QuestionBuilderProps) {
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  const addQuestion = (type: QuestionType) => {
    const newQuestion = createDefaultQuestion(type, questions.length);
    onChange([...questions, newQuestion]);
    setShowTypeSelector(false);
  };

  const updateQuestion = (index: number, updated: Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = updated;
    onChange(newQuestions);
  };

  const deleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    // Reorder
    onChange(newQuestions.map((q, i) => ({ ...q, order: i })));
  };

  const moveQuestion = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= questions.length) return;

    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[newIndex]] = [
      newQuestions[newIndex],
      newQuestions[index],
    ];
    // Update order
    onChange(newQuestions.map((q, i) => ({ ...q, order: i })));
  };

  return (
    <div className="space-y-4">
      {/* Questions list */}
      {questions.map((question, index) => (
        <QuestionEditor
          key={question.id}
          question={question}
          onUpdate={(q) => updateQuestion(index, q)}
          onDelete={() => deleteQuestion(index)}
          onMoveUp={() => moveQuestion(index, "up")}
          onMoveDown={() => moveQuestion(index, "down")}
          isFirst={index === 0}
          isLast={index === questions.length - 1}
        />
      ))}

      {/* Add question button / type selector */}
      {showTypeSelector ? (
        <div className="glass-card noise-texture relative rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-white">Choose question type</h4>
            <button
              onClick={() => setShowTypeSelector(false)}
              className="p-1 text-white/40 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(questionTypeConfig) as QuestionType[]).map((type) => {
              const config = questionTypeConfig[type];
              const Icon = config.icon;
              return (
                <button
                  key={type}
                  onClick={() => addQuestion(type)}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-400/30 transition-all duration-300 text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-400/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{config.label}</p>
                    <p className="text-xs text-white/50">{config.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowTypeSelector(true)}
          className="w-full py-4 rounded-xl border-2 border-dashed border-white/20 hover:border-orange-400/50 text-white/60 hover:text-white transition-all duration-300"
        >
          + Add Question
        </button>
      )}
    </div>
  );
}

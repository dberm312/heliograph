"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  ListChecks,
  Eye,
} from "lucide-react";
import { useHeliograms } from "@/lib/hooks/useHeliograms";
import { QuestionBuilder } from "../components/QuestionBuilder";
import { QuestionRenderer } from "../components/QuestionRenderer";
import type { Question, HeliogramStatus } from "@/types/heliogram";

type Step = "basics" | "questions" | "preview";

const steps: { id: Step; label: string; icon: typeof FileText }[] = [
  { id: "basics", label: "Basics", icon: FileText },
  { id: "questions", label: "Questions", icon: ListChecks },
  { id: "preview", label: "Preview", icon: Eye },
];

export default function CreatePage() {
  const router = useRouter();
  const { createHeliogram } = useHeliograms();

  const [currentStep, setCurrentStep] = useState<Step>("basics");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [status, setStatus] = useState<HeliogramStatus>("active");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const validateBasics = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateQuestions = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (questions.length === 0) {
      newErrors.questions = "Add at least one question";
    }
    const emptyLabels = questions.filter((q) => !q.label.trim());
    if (emptyLabels.length > 0) {
      newErrors.questions = "All questions must have a label";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === "basics") {
      if (validateBasics()) {
        setCurrentStep("questions");
      }
    } else if (currentStep === "questions") {
      if (validateQuestions()) {
        setCurrentStep("preview");
      }
    }
  };

  const handleBack = () => {
    if (currentStep === "questions") {
      setCurrentStep("basics");
    } else if (currentStep === "preview") {
      setCurrentStep("questions");
    }
  };

  const handleCreate = () => {
    const heliogram = createHeliogram({
      title: title.trim(),
      description: description.trim() || undefined,
      questions,
      status,
      context: project.trim() ? { project: project.trim() } : undefined,
    });
    router.push(`/demo/${heliogram.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="font-display text-3xl font-bold text-white">
          Create Heliogram
        </h1>
      </div>

      {/* Progress steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentStepIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-orange-400 text-white"
                      : isCompleted
                        ? "bg-emerald-500/30 text-emerald-400"
                        : "bg-white/10 text-white/40"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/40"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                    index < currentStepIndex ? "bg-emerald-500/50" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="glass-card noise-texture relative rounded-2xl p-8">
        {currentStep === "basics" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Title <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({});
                }}
                placeholder="e.g., Product Feedback Survey"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this Heliogram about?"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 resize-none transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Project / Context
              </label>
              <input
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="e.g., Q1 Product Launch"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-300"
              />
            </div>
          </div>
        )}

        {currentStep === "questions" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="font-display text-xl font-semibold text-white mb-2">
                Add Questions
              </h2>
              <p className="text-white/60 text-sm">
                Build your feedback form by adding questions below.
              </p>
            </div>

            <QuestionBuilder questions={questions} onChange={setQuestions} />

            {errors.questions && (
              <p className="text-red-400 text-sm mt-4">{errors.questions}</p>
            )}
          </div>
        )}

        {currentStep === "preview" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="font-display text-xl font-semibold text-white mb-2">
                Preview
              </h2>
              <p className="text-white/60 text-sm">
                This is how your Heliogram will appear to respondents.
              </p>
            </div>

            {/* Preview card */}
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                {title}
              </h3>
              {description && (
                <p className="text-white/60 text-sm mb-6">{description}</p>
              )}

              <div className="space-y-6">
                {questions
                  .sort((a, b) => a.order - b.order)
                  .map((question) => (
                    <QuestionRenderer
                      key={question.id}
                      question={question}
                      value={undefined}
                      onChange={() => {}}
                    />
                  ))}
              </div>
            </div>

            {/* Status selector */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <label className="block text-sm font-medium text-white mb-3">
                Initial Status
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStatus("active")}
                  className={`flex-1 py-3 rounded-xl text-center font-medium transition-all duration-300 ${
                    status === "active"
                      ? "bg-emerald-500/30 border border-emerald-500/50 text-emerald-300"
                      : "bg-white/10 border border-white/10 text-white/60 hover:bg-white/15"
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`flex-1 py-3 rounded-xl text-center font-medium transition-all duration-300 ${
                    status === "draft"
                      ? "bg-white/20 border border-white/30 text-white"
                      : "bg-white/10 border border-white/10 text-white/60 hover:bg-white/15"
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === "basics"}
          className="flex items-center gap-2 px-6 py-3 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {currentStep === "preview" ? (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-8 py-3 bg-orange-400 hover:bg-orange-300 text-white font-semibold rounded-xl transition-colors duration-300"
          >
            <Check className="w-5 h-5" />
            Create Heliogram
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors duration-300"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

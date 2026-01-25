"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle, BarChart3 } from "lucide-react";
import { useHeliograms } from "@/lib/hooks/useHeliograms";
import { useResponses } from "@/lib/hooks/useResponses";
import { QuestionRenderer } from "../components/QuestionRenderer";
import { StatusBadge } from "../components/StatusBadge";
import type { QuestionResponse, Respondent } from "@/types/heliogram";

export default function HeliogramPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { getHeliogram, isHydrated } = useHeliograms();
  const { addResponse, getResponseCount } = useResponses();

  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [respondent, setRespondent] = useState<Respondent>({
    name: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heliogram = getHeliogram(id);

  if (!isHydrated) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="glass-card noise-texture relative rounded-2xl p-8">
          <p className="text-white/60 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!heliogram) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="glass-card noise-texture relative rounded-2xl p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-white mb-4">
            Heliogram not found
          </h1>
          <p className="text-white/60 mb-6">
            This Heliogram may have been deleted or doesn&apos;t exist.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 text-orange-300 hover:text-orange-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerChange = (questionId: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    heliogram.questions.forEach((question) => {
      if (question.required) {
        const answer = answers[question.id];
        if (answer === undefined || answer === "") {
          newErrors[question.id] = "This field is required";
        }
      }
    });

    if (!respondent.name.trim()) {
      newErrors.respondentName = "Please enter your name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const responses: QuestionResponse[] = heliogram.questions.map((q) => ({
      questionId: q.id,
      value: answers[q.id] ?? "",
    }));

    addResponse(heliogram.id, {
      responses,
      respondent: {
        name: respondent.name.trim(),
        email: respondent.email?.trim() || undefined,
        role: respondent.role?.trim() || undefined,
      },
      source: "direct",
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto animate-scale-in">
        <div className="glass-card noise-texture relative rounded-2xl p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Thank you!
          </h2>
          <p className="text-white/60 mb-8">
            Your feedback has been submitted successfully.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setAnswers({});
                setRespondent({ name: "", email: "", role: "" });
              }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors duration-300"
            >
              Submit Another Response
            </button>
            <Link
              href="/demo"
              className="px-6 py-3 text-white/60 hover:text-white transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const responseCount = getResponseCount(heliogram.id);
  const sortedQuestions = [...heliogram.questions].sort(
    (a, b) => a.order - b.order
  );

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/demo"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <Link
          href={`/demo/${heliogram.id}/responses`}
          className="flex items-center gap-2 text-white/60 hover:text-orange-300 transition-colors text-sm"
        >
          <BarChart3 className="w-4 h-4" />
          {responseCount} responses
        </Link>
      </div>

      {/* Form Card */}
      <div className="glass-card noise-texture relative rounded-2xl p-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <StatusBadge status={heliogram.status} />
            {heliogram.context?.project && (
              <span className="text-xs text-white/40">
                {heliogram.context.project}
              </span>
            )}
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            {heliogram.title}
          </h1>
          {heliogram.description && (
            <p className="text-white/60">{heliogram.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Questions */}
          <div className="space-y-6">
            {sortedQuestions.map((question, index) => (
              <div
                key={question.id}
                className={`animate-fade-in-up delay-${(index % 4) * 100 + 100}`}
              >
                <QuestionRenderer
                  question={question}
                  value={answers[question.id]}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                  error={errors[question.id]}
                />
              </div>
            ))}
          </div>

          {/* Respondent Info */}
          <div className="pt-6 border-t border-white/10">
            <h3 className="text-sm font-medium text-white/80 mb-4">
              Your Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Name <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  value={respondent.name}
                  onChange={(e) =>
                    setRespondent((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-300"
                />
                {errors.respondentName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.respondentName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Role</label>
                <input
                  type="text"
                  value={respondent.role || ""}
                  onChange={(e) =>
                    setRespondent((prev) => ({ ...prev, role: e.target.value }))
                  }
                  placeholder="Your role"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-400 hover:bg-orange-300 disabled:bg-orange-400/50 text-white font-semibold rounded-xl transition-colors duration-300"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

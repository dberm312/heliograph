"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BarChart3, List, Users } from "lucide-react";
import { useHeliograms } from "@/lib/hooks/useHeliograms";
import { useResponses } from "@/lib/hooks/useResponses";
import { ResponseCard } from "../../components/ResponseCard";
import { ResponseStats } from "../../components/ResponseStats";
import { EmptyState } from "../../components/EmptyState";

type ViewMode = "stats" | "list";

export default function ResponsesPage() {
  const params = useParams();
  const id = params.id as string;

  const { getHeliogram, isHydrated } = useHeliograms();
  const { getResponsesForHeliogram } = useResponses();

  const [viewMode, setViewMode] = useState<ViewMode>("stats");

  const heliogram = getHeliogram(id);
  const responses = getResponsesForHeliogram(id);

  if (!isHydrated) {
    return (
      <div className="animate-fade-in">
        <div className="glass-card noise-texture relative rounded-2xl p-8">
          <p className="text-white/60 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!heliogram) {
    return (
      <div className="animate-fade-in">
        <div className="glass-card noise-texture relative rounded-2xl p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-white mb-4">
            Heliogram not found
          </h1>
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

  const sortedResponses = [...responses].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link
            href={`/demo/${heliogram.id}`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Heliogram
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mb-1">
            {heliogram.title}
          </h1>
          <p className="text-white/60">Response Analytics</p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 p-1 bg-white/10 rounded-xl">
          <button
            onClick={() => setViewMode("stats")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              viewMode === "stats"
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Stats
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              viewMode === "list"
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" />
            Responses
          </button>
        </div>
      </div>

      {/* Summary bar */}
      <div className="glass-card noise-texture relative rounded-xl p-4 mb-8">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="w-5 h-5 text-orange-400" aria-hidden="true" />
              <span className="text-2xl font-display font-bold text-white">
                {responses.length}
              </span>
            </div>
            <p className="text-sm text-white/50">Total Responses</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl font-display font-bold text-white">
                {heliogram.questions.length}
              </span>
            </div>
            <p className="text-sm text-white/50">Questions</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl font-display font-bold text-white">
                {responses.length > 0
                  ? new Date(
                      sortedResponses[0].submittedAt
                    ).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  : "-"}
              </span>
            </div>
            <p className="text-sm text-white/50">Last Response</p>
          </div>
        </div>
      </div>

      {/* Content */}
      {responses.length === 0 ? (
        <EmptyState
          title="No responses yet"
          description="Share your Heliogram to start collecting feedback from your team and stakeholders."
          actionLabel="View Heliogram"
          actionHref={`/demo/${heliogram.id}`}
        />
      ) : viewMode === "stats" ? (
        <ResponseStats responses={responses} questions={heliogram.questions} />
      ) : (
        <div className="space-y-4">
          {sortedResponses.map((response, index) => (
            <div
              key={response.id}
              className={`animate-fade-in-up delay-${(index % 4) * 100 + 100}`}
            >
              <ResponseCard
                response={response}
                questions={heliogram.questions}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

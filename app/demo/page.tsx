"use client";

import { useHeliograms } from "@/lib/hooks/useHeliograms";
import { useResponses } from "@/lib/hooks/useResponses";
import { HeliogramCard } from "./components/HeliogramCard";
import { EmptyState } from "./components/EmptyState";

export default function DemoPage() {
  const { heliograms, isHydrated, deleteHeliogram } = useHeliograms();
  const { getResponseCount } = useResponses();

  if (!isHydrated) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            My Heliograms
          </h1>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          My Heliograms
        </h1>
        <p className="text-white/60">
          Create feedback forms and collect insights from your stakeholders.
        </p>
      </div>

      {heliograms.length === 0 ? (
        <EmptyState
          title="No Heliograms yet"
          description="Create your first Heliogram to start collecting feedback from your team and stakeholders."
          actionLabel="Create Heliogram"
          actionHref="/demo/create"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heliograms.map((heliogram, index) => (
            <div
              key={heliogram.id}
              className={`animate-fade-in-up delay-${(index % 4) * 100 + 100}`}
            >
              <HeliogramCard
                heliogram={heliogram}
                responseCount={getResponseCount(heliogram.id)}
                onDelete={deleteHeliogram}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

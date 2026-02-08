"use client";

import dynamic from "next/dynamic";

const ExcalidrawWrapper = dynamic(
  () => import("@/components/ExcalidrawWrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900">
        <div className="text-white/60">Loading whiteboard...</div>
      </div>
    ),
  },
);

export function ExcalidrawLoader() {
  return <ExcalidrawWrapper />;
}

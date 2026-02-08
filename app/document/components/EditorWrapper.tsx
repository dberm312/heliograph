"use client";

import dynamic from "next/dynamic";

const DocumentEditor = dynamic(
  () => import("./DocumentEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-4xl mx-auto">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] shadow-2xl min-h-[60vh] flex items-center justify-center">
          <p className="text-white/30 text-sm">Loading editor...</p>
        </div>
      </div>
    ),
  }
);

export default function EditorWrapper() {
  return <DocumentEditor />;
}

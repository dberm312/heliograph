import type { Metadata } from "next";
import EditorWrapper from "./components/EditorWrapper";

export const metadata: Metadata = {
  title: "Document - Heliograph",
  description: "Rich text editor with diagram support",
};

export default function DocumentPage() {
  return (
    <main className="px-6 py-8 min-h-[calc(100vh-60px)]">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-1">
          Document
        </h1>
        <p className="text-white/50 text-sm">
          Rich text editor with diagram support
        </p>
      </div>
      <EditorWrapper />
    </main>
  );
}

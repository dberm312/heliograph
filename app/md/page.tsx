import type { Metadata } from "next";
import { MarkdownEditor } from "./components/MarkdownEditor";

export const metadata: Metadata = {
  title: "Markdown Editor - Heliograph",
  description: "A WYSIWYG markdown editor. Write, import, and export markdown files.",
};

export default function MarkdownEditorPage() {
  return (
    <main className="min-h-[calc(100vh-56px)] flex flex-col">
      <MarkdownEditor />
    </main>
  );
}

"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode } from "@lexical/code";

import { ExcalidrawNode } from "../nodes/ExcalidrawNode";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import SlashCommandPlugin from "../plugins/SlashCommandPlugin";

const theme = {
  paragraph: "mb-1 text-white/90 leading-relaxed",
  heading: {
    h1: "text-3xl font-display font-bold text-white mb-3 mt-6",
    h2: "text-2xl font-display font-semibold text-white mb-2 mt-5",
    h3: "text-xl font-display font-medium text-white mb-2 mt-4",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "bg-white/10 rounded px-1.5 py-0.5 font-mono text-sm text-orange-300",
  },
  list: {
    ul: "list-disc pl-6 mb-2 text-white/90",
    ol: "list-decimal pl-6 mb-2 text-white/90",
    listitem: "mb-1",
    nested: {
      listitem: "list-none",
    },
  },
  quote:
    "border-l-3 border-orange-400/50 pl-4 italic text-white/60 my-3",
  code: "bg-white/5 rounded-lg p-4 font-mono text-sm block my-3 overflow-x-auto text-orange-200",
};

function onError(error: Error) {
  console.error("Lexical error:", error);
}

const initialConfig = {
  namespace: "HeliographDocument",
  theme,
  onError,
  nodes: [
    HeadingNode,
    QuoteNode,
    CodeNode,
    ListNode,
    ListItemNode,
    ExcalidrawNode,
  ],
};

export default function DocumentEditor() {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="w-full max-w-4xl mx-auto">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] shadow-2xl overflow-hidden">
          <ToolbarPlugin />
          <div className="relative min-h-[60vh]">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="outline-none px-8 py-6 min-h-[60vh] text-base" />
              }
              placeholder={
                <div className="absolute top-6 left-8 text-white/30 pointer-events-none text-base">
                  Start writing, or type{" "}
                  <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded text-white/40">
                    /
                  </span>{" "}
                  for commands...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ListPlugin />
            <SlashCommandPlugin />
          </div>
        </div>
      </div>
    </LexicalComposer>
  );
}

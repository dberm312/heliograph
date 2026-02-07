"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { common, createLowlight } from "lowlight";
import { useCallback, useRef, useState } from "react";
import TurndownService from "turndown";
import { marked } from "marked";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Link as LinkIcon,
  ImageIcon,
  Highlighter,
  Undo,
  Redo,
  Download,
  Upload,
  FileText,
  Minus,
  Pilcrow,
} from "lucide-react";

const lowlight = createLowlight(common);

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
});

// Improve turndown rules for better markdown output
turndownService.addRule("highlight", {
  filter: "mark",
  replacement(content) {
    return `==${content}==`;
  },
});

turndownService.addRule("strikethrough", {
  filter: ["del", "s"],
  replacement(content) {
    return `~~${content}~~`;
  },
});

function ToolbarButton({
  onClick,
  isActive = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-md transition-all duration-150 ${
        isActive
          ? "bg-white/20 text-white shadow-sm"
          : "text-white/60 hover:text-white hover:bg-white/10"
      } ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-white/15 mx-1" />;
}

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> | null }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const exportMarkdown = useCallback(() => {
    if (!editor) return;
    const html = editor.getHTML();
    const markdown = turndownService.turndown(html);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  }, [editor]);

  const importMarkdown = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!editor) return;
      const file = e.target.files?.[0];
      if (!file) return;
      const text = await file.text();
      const html = await marked(text);
      editor.commands.setContent(html);
      // Reset file input so the same file can be re-imported
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [editor],
  );

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-white/10 bg-white/5">
      {/* Undo / Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo size={16} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Block type: Paragraph, Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        isActive={editor.isActive("paragraph") && !editor.isActive("heading")}
        title="Paragraph"
      >
        <Pilcrow size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Inline formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold"
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic"
      >
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline"
      >
        <UnderlineIcon size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        isActive={editor.isActive("highlight")}
        title="Highlight"
      >
        <Highlighter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        title="Inline Code"
      >
        <Code size={16} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Numbered List"
      >
        <ListOrdered size={16} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        title="Align Right"
      >
        <AlignRight size={16} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Block elements */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="Quote"
      >
        <Quote size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        title="Code Block"
      >
        <FileText size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        <Minus size={16} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Link & Image */}
      <ToolbarButton
        onClick={setLink}
        isActive={editor.isActive("link")}
        title="Link"
      >
        <LinkIcon size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={addImage} title="Image">
        <ImageIcon size={16} />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Import / Export */}
      <ToolbarButton
        onClick={() => fileInputRef.current?.click()}
        title="Import Markdown"
      >
        <Upload size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={exportMarkdown} title="Export Markdown">
        <Download size={16} />
      </ToolbarButton>
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        onChange={importMarkdown}
        className="hidden"
      />
    </div>
  );
}

export function MarkdownEditor() {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // replaced by CodeBlockLowlight
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-300 underline underline-offset-2 hover:text-blue-200 cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      TextStyle,
      Color,
    ],
    editorProps: {
      attributes: {
        class: "outline-none min-h-[calc(100vh-180px)] px-8 py-6 prose-editor",
      },
    },
    onUpdate({ editor }) {
      const text = editor.state.doc.textContent;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
      setCharCount(text.length);
    },
    immediatelyRender: false,
  });

  return (
    <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto mt-4 mb-8 rounded-xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl">
      <Toolbar editor={editor} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
      <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/10 bg-white/5 text-xs text-white/40">
        <span>
          {wordCount} {wordCount === 1 ? "word" : "words"} &middot; {charCount}{" "}
          {charCount === 1 ? "character" : "characters"}
        </span>
        <span>Markdown</span>
      </div>
    </div>
  );
}

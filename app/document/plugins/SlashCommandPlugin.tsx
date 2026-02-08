"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_DOWN_COMMAND,
  type LexicalEditor,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { $createExcalidrawNode } from "../nodes/ExcalidrawNode";

interface CommandOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  onSelect: (editor: LexicalEditor) => void;
}

const SLASH_COMMANDS: CommandOption[] = [
  {
    title: "Diagram",
    description: "Insert an Excalidraw diagram",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    onSelect: (editor: LexicalEditor) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const node = $createExcalidrawNode();
          selection.insertNodes([node]);
        }
      });
    },
  },
];

export default function SlashCommandPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef(query);
  queryRef.current = query;

  const filteredCommands = SLASH_COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().startsWith(query.toLowerCase())
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const executeCommand = useCallback(
    (command: CommandOption) => {
      // Remove the slash and query text from the editor
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchor = selection.anchor;
          const anchorNode = anchor.getNode();
          const text = anchorNode.getTextContent();
          const slashIndex = text.lastIndexOf("/");
          if (slashIndex !== -1) {
            // Select the slash command text and remove it
            selection.anchor.set(anchor.key, slashIndex, "text");
            selection.focus.set(anchor.key, anchor.offset, "text");
            selection.removeText();
          }
        }
      });
      // Then insert the node
      command.onSelect(editor);
      closeMenu();
    },
    [editor, closeMenu]
  );

  useEffect(() => {
    const removeKeyDown = editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event: KeyboardEvent) => {
        if (isOpen) {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedIndex((prev) =>
              prev < filteredCommands.length - 1 ? prev + 1 : 0
            );
            return true;
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredCommands.length - 1
            );
            return true;
          }
          if (event.key === "Enter" || event.key === "Tab") {
            event.preventDefault();
            if (filteredCommands[selectedIndex]) {
              executeCommand(filteredCommands[selectedIndex]);
            }
            return true;
          }
          if (event.key === "Escape") {
            event.preventDefault();
            closeMenu();
            return true;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      removeKeyDown();
    };
  }, [editor, isOpen, selectedIndex, filteredCommands, executeCommand, closeMenu]);

  useEffect(() => {
    const removeTextContent = editor.registerTextContentListener(() => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          closeMenu();
          return;
        }

        const anchor = selection.anchor;
        const anchorNode = anchor.getNode();
        const textContent = anchorNode.getTextContent();
        const textUpToCursor = textContent.slice(0, anchor.offset);

        // Check for slash at start of line or after a space
        const match = textUpToCursor.match(/(?:^|\s)\/([\w]*)$/);
        if (match) {
          setQuery(match[1]);
          setSelectedIndex(0);
          setIsOpen(true);

          // Position the menu near the cursor
          const domSelection = window.getSelection();
          if (domSelection && domSelection.rangeCount > 0) {
            const range = domSelection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setPosition({
              top: rect.bottom + window.scrollY + 4,
              left: rect.left + window.scrollX,
            });
          }
        } else if (isOpen) {
          closeMenu();
        }
      });
    });

    return () => {
      removeTextContent();
    };
  }, [editor, isOpen, closeMenu]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeMenu]);

  if (!isOpen || filteredCommands.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-[100] w-64 bg-gray-900/95 backdrop-blur-xl border border-white/15 rounded-lg shadow-2xl overflow-hidden"
      style={{ top: position.top, left: position.left }}
    >
      <div className="px-3 py-2 border-b border-white/10">
        <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
          Commands
        </span>
      </div>
      {filteredCommands.map((command, index) => (
        <button
          key={command.title}
          type="button"
          className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
            index === selectedIndex
              ? "bg-orange-500/20 text-white"
              : "text-white/70 hover:bg-white/5"
          }`}
          onClick={() => executeCommand(command)}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <div
            className={`flex-shrink-0 p-1.5 rounded-md ${
              index === selectedIndex
                ? "bg-orange-500/30 text-orange-300"
                : "bg-white/10 text-white/50"
            }`}
          >
            {command.icon}
          </div>
          <div>
            <div className="text-sm font-medium">{command.title}</div>
            <div className="text-xs text-white/40">{command.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

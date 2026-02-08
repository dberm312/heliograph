"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { $isExcalidrawNode } from "../nodes/ExcalidrawNode";

interface ExcalidrawComponentProps {
  nodeKey: string;
  data: string;
}

export default function ExcalidrawComponent({
  nodeKey,
  data,
}: ExcalidrawComponentProps) {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [elements, setElements] = useState(() => {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  });
  const excalidrawRef = useRef<any>(null);
  const [ExcalidrawComp, setExcalidrawComp] = useState<any>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((mod) => {
      setExcalidrawComp(() => mod.Excalidraw);
    });
  }, []);

  const saveData = useCallback(
    (newElements: readonly any[]) => {
      const filtered = newElements.filter((el: any) => !el.isDeleted);
      setElements(filtered);
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isExcalidrawNode(node)) {
          node.setData(JSON.stringify(filtered));
        }
      });
    },
    [editor, nodeKey]
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    if (excalidrawRef.current) {
      const sceneElements = excalidrawRef.current.getSceneElements();
      saveData(sceneElements);
    }
    setIsOpen(false);
  }, [saveData]);

  const hasContent = elements.length > 0;

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
          <span className="text-gray-700 font-medium text-sm">
            Excalidraw Diagram
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
            type="button"
          >
            Save & Close
          </button>
        </div>
        <div className="flex-1">
          {ExcalidrawComp && (
            <ExcalidrawComp
              ref={excalidrawRef}
              initialData={{
                elements: elements,
                appState: { viewBackgroundColor: "#ffffff" },
              }}
              theme="light"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="my-3 mx-0 cursor-pointer group relative"
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOpen();
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className="relative rounded-lg border border-white/15 bg-white/5 overflow-hidden transition-all duration-200 group-hover:border-orange-400/40 group-hover:bg-white/8"
        style={{ aspectRatio: "16/9", maxWidth: "100%" }}
      >
        {hasContent ? (
          <ExcalidrawPreview elements={elements} ExcalidrawComp={ExcalidrawComp} />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white/30"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            <span className="text-white/40 text-sm">
              Click to edit diagram
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
          <span className="text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-md backdrop-blur-sm">
            Click to edit
          </span>
        </div>
      </div>
    </div>
  );
}

function ExcalidrawPreview({
  elements,
  ExcalidrawComp,
}: {
  elements: any[];
  ExcalidrawComp: any;
}) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    if (!elements.length) return;
    import("@excalidraw/excalidraw").then(async (mod) => {
      try {
        const exported = await mod.exportToSvg({
          elements,
          appState: {
            exportWithDarkMode: true,
            viewBackgroundColor: "transparent",
          },
          files: null,
        });
        setSvg(exported.outerHTML);
      } catch {
        // Silently fail preview
      }
    });
  }, [elements]);

  if (!svg) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/30 text-sm">Loading preview...</span>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

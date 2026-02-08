"use client";

import type {
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";

import { DecoratorNode } from "lexical";
import { lazy, Suspense } from "react";

const ExcalidrawComponent = lazy(
  () => import("../components/ExcalidrawComponent")
);

export type SerializedExcalidrawNode = Spread<
  {
    data: string;
  },
  SerializedLexicalNode
>;

export class ExcalidrawNode extends DecoratorNode<React.ReactElement> {
  __data: string;

  static getType(): string {
    return "excalidraw";
  }

  static clone(node: ExcalidrawNode): ExcalidrawNode {
    return new ExcalidrawNode(node.__data, node.__key);
  }

  static importJSON(serializedNode: SerializedExcalidrawNode): ExcalidrawNode {
    return new ExcalidrawNode(serializedNode.data);
  }

  constructor(data = "[]", key?: NodeKey) {
    super(key);
    this.__data = data;
  }

  exportJSON(): SerializedExcalidrawNode {
    return {
      data: this.__data,
      type: "excalidraw",
      version: 1,
    };
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const div = document.createElement("div");
    div.style.display = "contents";
    return div;
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const element = document.createElement("div");
    element.setAttribute("data-lexical-excalidraw", "true");
    element.textContent = this.__data;
    return { element };
  }

  setData(data: string): void {
    const self = this.getWritable();
    self.__data = data;
  }

  getData(): string {
    return this.__data;
  }

  decorate(_editor: LexicalEditor, config: EditorConfig): React.ReactElement {
    return (
      <Suspense fallback={<ExcalidrawPlaceholder />}>
        <ExcalidrawComponent nodeKey={this.__key} data={this.__data} />
      </Suspense>
    );
  }
}

function ExcalidrawPlaceholder() {
  return (
    <div
      className="flex items-center justify-center bg-white/5 border border-white/10 rounded-lg"
      style={{ aspectRatio: "16/9", maxWidth: "100%" }}
    >
      <p className="text-white/40 text-sm">Loading diagram...</p>
    </div>
  );
}

export function $createExcalidrawNode(data = "[]"): ExcalidrawNode {
  return new ExcalidrawNode(data);
}

export function $isExcalidrawNode(
  node: LexicalNode | null | undefined
): node is ExcalidrawNode {
  return node instanceof ExcalidrawNode;
}

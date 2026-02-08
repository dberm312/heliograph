"use client";

import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

export default function ExcalidrawWrapper() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Excalidraw theme="dark" />
    </div>
  );
}

import type { Metadata } from "next";
import { ExcalidrawLoader } from "./ExcalidrawLoader";

export const metadata: Metadata = {
  title: "Draw - Heliograph",
  description: "Whiteboard for sketching and diagramming",
};

export default function DrawPage() {
  return (
    <div className="h-[calc(100vh-60px)] w-full relative">
      <ExcalidrawLoader />
    </div>
  );
}

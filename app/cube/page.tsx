import type { Metadata } from "next";
import { CubeScene } from "@/components/cube/CubeScene";

export const metadata: Metadata = {
  title: "Cube Demo - Heliograph",
  description:
    "Interactive 3D cube animation showcasing Heliograph's three pillars: CRM, Project Management, and Version Control.",
};

export default function CubePage() {
  return (
    <main className="relative">
      <CubeScene />
    </main>
  );
}

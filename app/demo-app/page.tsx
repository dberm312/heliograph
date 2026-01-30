import type { Metadata } from "next";
import { DemoApp } from "./components/DemoApp";
import { DemoProvider } from "./context/DemoContext";

export const metadata: Metadata = {
  title: "App | Heliograph",
  description:
    "Interactive CRM and Project Management demo. Track tasks, manage stakeholders, and monitor requirements - all in one place.",
};

export default function AppPage() {
  return (
    <DemoProvider>
      <DemoApp />
    </DemoProvider>
  );
}

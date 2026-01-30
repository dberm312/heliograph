"use client";

import { useDemo } from "../context/DemoContext";
import { DashboardView } from "./views/DashboardView";
import { KanbanView } from "./views/KanbanView";
import { PeopleView } from "./views/PeopleView";
import { RequirementsView } from "./views/RequirementsView";
import { DemoHeader } from "./DemoHeader";

export function DemoApp() {
  const { state } = useDemo();

  const renderView = () => {
    switch (state.activeView) {
      case "dashboard":
        return <DashboardView />;
      case "tasks":
        return <KanbanView />;
      case "people":
        return <PeopleView />;
      case "requirements":
        return <RequirementsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <DemoHeader />
      <main className="pt-4 pb-8 px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
        {renderView()}
      </main>
    </div>
  );
}

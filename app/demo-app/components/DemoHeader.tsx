"use client";

import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  RotateCcw,
  Users,
} from "lucide-react";
import Link from "next/link";
import { VIEW_CONFIG } from "../constants";
import { useDemo } from "../context/DemoContext";
import type { ViewType } from "../types";

const VIEW_ICONS = {
  dashboard: LayoutDashboard,
  tasks: ClipboardList,
  people: Users,
  requirements: FileText,
} as const;

export function DemoHeader() {
  const { state, dispatch } = useDemo();

  const handleViewChange = (view: ViewType) => {
    dispatch({ type: "SET_VIEW", payload: view });
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Reset demo to initial state? This will clear all your changes.",
      )
    ) {
      dispatch({ type: "RESET_STATE" });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center">
              <span className="font-display font-bold text-sm">H</span>
            </div>
            <span className="font-display font-semibold text-lg hidden sm:inline">
              Heliograph
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1" role="tablist">
            {(Object.keys(VIEW_CONFIG) as ViewType[]).map((view) => {
              const Icon = VIEW_ICONS[view];
              const config = VIEW_CONFIG[view];
              const isActive = state.activeView === view;

              return (
                <button
                  key={view}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleViewChange(view)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white/90 hover:bg-white/5"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden md:inline">{config.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                text-white/60 hover:text-white/90 hover:bg-white/5 transition-all duration-200"
              title="Reset demo to initial state"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Plus } from "lucide-react";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/demo",
      label: "My Heliograms",
      icon: LayoutGrid,
      exact: true,
    },
    {
      href: "/demo/create",
      label: "Create New",
      icon: Plus,
      exact: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Sub-navigation */}
      <nav className="px-6 py-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Page content */}
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

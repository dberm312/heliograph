"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

/**
 * A section that triggers child animations when it scrolls into view.
 * Children with animation classes will animate when the section enters the viewport
 * and reset when it leaves, allowing re-animation on subsequent views.
 */
export function AnimatedSection({
  children,
  className = "",
  threshold = 0.15,
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold });

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? "in-view" : "out-of-view"}`}
    >
      {children}
    </div>
  );
}

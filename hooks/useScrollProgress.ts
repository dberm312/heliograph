"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollProgressOptions {
  /** Reference to the scroll container element */
  containerRef: React.RefObject<HTMLElement | null>;
}

interface ScrollProgressReturn {
  /** Normalized progress 0-1 based on scroll position within container */
  progress: number;
}

export function useScrollProgress({
  containerRef,
}: UseScrollProgressOptions): ScrollProgressReturn {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const calculateProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Calculate how far we've scrolled through the container
    // When top of container is at top of viewport: progress = 0
    // When bottom of container is at bottom of viewport: progress = 1
    const scrollableDistance = containerHeight - viewportHeight;
    const scrolled = -rect.top;

    const newProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    setProgress(newProgress);
  }, [containerRef]);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(calculateProgress);
  }, [calculateProgress]);

  useEffect(() => {
    // Initial calculation
    calculateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, calculateProgress]);

  return { progress };
}

/**
 * Interpolate a value based on progress within an input range
 */
export function interpolate(
  progress: number,
  inputRange: [number, number],
  outputRange: [number, number],
): number {
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;

  if (progress <= inMin) return outMin;
  if (progress >= inMax) return outMax;

  const ratio = (progress - inMin) / (inMax - inMin);
  return outMin + ratio * (outMax - outMin);
}

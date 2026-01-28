"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = false,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (triggerOnce) {
        if (entry.isIntersecting && !hasTriggered.current) {
          setIsInView(true);
          hasTriggered.current = true;
        }
      } else {
        setIsInView(entry.isIntersecting);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, handleIntersection]);

  return { ref, isInView };
}

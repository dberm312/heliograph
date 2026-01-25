"use client";

import { useLocalStorage } from "./useLocalStorage";
import type {
  Heliogram,
  HeliogramId,
  CreateHeliogramInput,
} from "@/types/heliogram";
import { generateHeliogramId } from "@/lib/utils/id";
import { SAMPLE_HELIOGRAMS } from "@/lib/data/sampleData";

const STORAGE_KEY = "heliograph_heliograms";

export function useHeliograms() {
  const [heliograms, setHeliograms, isHydrated] = useLocalStorage<Heliogram[]>(
    STORAGE_KEY,
    SAMPLE_HELIOGRAMS
  );

  const createHeliogram = (data: CreateHeliogramInput): Heliogram => {
    const now = new Date().toISOString();
    const newHeliogram: Heliogram = {
      ...data,
      id: generateHeliogramId(),
      createdAt: now,
      updatedAt: now,
    };
    setHeliograms((prev) => [...prev, newHeliogram]);
    return newHeliogram;
  };

  const updateHeliogram = (
    id: HeliogramId,
    data: Partial<Omit<Heliogram, "id" | "createdAt">>
  ) => {
    setHeliograms((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, ...data, updatedAt: new Date().toISOString() } : h
      )
    );
  };

  const deleteHeliogram = (id: HeliogramId) => {
    setHeliograms((prev) => prev.filter((h) => h.id !== id));
  };

  const getHeliogram = (id: HeliogramId): Heliogram | undefined => {
    return heliograms.find((h) => h.id === id);
  };

  return {
    heliograms,
    isHydrated,
    createHeliogram,
    updateHeliogram,
    deleteHeliogram,
    getHeliogram,
  };
}

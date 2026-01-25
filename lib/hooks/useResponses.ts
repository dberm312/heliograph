"use client";

import { useLocalStorage } from "./useLocalStorage";
import type {
  HeliogramResponse,
  HeliogramId,
  ResponseId,
  CreateResponseInput,
} from "@/types/heliogram";
import { generateResponseId } from "@/lib/utils/id";
import { SAMPLE_RESPONSES } from "@/lib/data/sampleData";

const STORAGE_KEY = "heliograph_responses";

export function useResponses() {
  const [responses, setResponses, isHydrated] = useLocalStorage<
    HeliogramResponse[]
  >(STORAGE_KEY, SAMPLE_RESPONSES);

  const addResponse = (
    heliogramId: HeliogramId,
    data: CreateResponseInput
  ): HeliogramResponse => {
    const newResponse: HeliogramResponse = {
      ...data,
      id: generateResponseId(),
      heliogramId,
      submittedAt: new Date().toISOString(),
    };
    setResponses((prev) => [...prev, newResponse]);
    return newResponse;
  };

  const getResponsesForHeliogram = (
    heliogramId: HeliogramId
  ): HeliogramResponse[] => {
    return responses.filter((r) => r.heliogramId === heliogramId);
  };

  const deleteResponse = (id: ResponseId) => {
    setResponses((prev) => prev.filter((r) => r.id !== id));
  };

  const getResponseCount = (heliogramId: HeliogramId): number => {
    return responses.filter((r) => r.heliogramId === heliogramId).length;
  };

  return {
    responses,
    isHydrated,
    addResponse,
    getResponsesForHeliogram,
    deleteResponse,
    getResponseCount,
  };
}

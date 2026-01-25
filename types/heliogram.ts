// Heliogram Types for Heliograph Demo

// ID Types
export type HeliogramId = string; // Format: "hg_" + 12 chars
export type ResponseId = string; // Format: "resp_" + 12 chars
export type QuestionId = string; // Format: "q_" + 8 chars

// Question Types
export type QuestionType = "text" | "rating" | "reaction" | "scale";

interface BaseQuestion {
  id: QuestionId;
  type: QuestionType;
  label: string;
  required: boolean;
  order: number;
}

export interface TextQuestion extends BaseQuestion {
  type: "text";
  placeholder?: string;
  maxLength?: number;
  multiline: boolean;
}

export interface RatingQuestion extends BaseQuestion {
  type: "rating";
  maxRating: 5;
  labels?: {
    low: string;
    high: string;
  };
}

export interface ReactionQuestion extends BaseQuestion {
  type: "reaction";
  variant: "thumbs" | "emoji";
}

export interface ScaleQuestion extends BaseQuestion {
  type: "scale";
  min: number;
  max: number;
  step: number;
  labels?: {
    min: string;
    max: string;
  };
}

export type Question =
  | TextQuestion
  | RatingQuestion
  | ReactionQuestion
  | ScaleQuestion;

// Heliogram Status
export type HeliogramStatus = "draft" | "active" | "closed";

// Main Heliogram Interface
export interface Heliogram {
  id: HeliogramId;
  title: string;
  description?: string;
  questions: Question[];
  status: HeliogramStatus;
  createdAt: string; // ISO date string
  updatedAt: string;
  context?: {
    project?: string;
    client?: string;
    tags?: string[];
  };
}

// Response Types
export interface QuestionResponse {
  questionId: QuestionId;
  value: string | number;
}

export interface Respondent {
  name: string;
  email?: string;
  role?: string;
}

export interface HeliogramResponse {
  id: ResponseId;
  heliogramId: HeliogramId;
  responses: QuestionResponse[];
  respondent: Respondent;
  submittedAt: string; // ISO date string
  source?: "direct" | "embed" | "email";
}

// For creating new items (omit generated fields)
export type CreateHeliogramInput = Omit<
  Heliogram,
  "id" | "createdAt" | "updatedAt"
>;

export type CreateResponseInput = Omit<
  HeliogramResponse,
  "id" | "heliogramId" | "submittedAt"
>;

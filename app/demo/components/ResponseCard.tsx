import { User, Clock } from "lucide-react";
import type { HeliogramResponse, Question } from "@/types/heliogram";

interface ResponseCardProps {
  response: HeliogramResponse;
  questions: Question[];
}

const EMOJI_OPTIONS = ["😍", "😊", "😐", "😕", "😢"];
const THUMBS_OPTIONS = ["👍", "👎"];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatValue(
  value: string | number,
  question: Question
): React.ReactNode {
  switch (question.type) {
    case "rating":
      return (
        <span className="text-orange-300">
          {"★".repeat(value as number)}
          {"☆".repeat(5 - (value as number))}
        </span>
      );
    case "reaction":
      const options =
        question.variant === "emoji" ? EMOJI_OPTIONS : THUMBS_OPTIONS;
      return <span className="text-2xl">{options[value as number]}</span>;
    case "scale":
      return (
        <span className="text-orange-300 font-semibold">
          {value} / {question.max}
        </span>
      );
    default:
      return <span className="text-white/80">{value}</span>;
  }
}

export function ResponseCard({ response, questions }: ResponseCardProps) {
  const questionsMap = new Map(questions.map((q) => [q.id, q]));

  return (
    <div className="glass-card noise-texture relative rounded-xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <User className="w-5 h-5 text-white/60" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium text-white">{response.respondent.name}</p>
            {response.respondent.role && (
              <p className="text-sm text-white/50">{response.respondent.role}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <Clock className="w-3 h-3" aria-hidden="true" />
          <span>{formatDate(response.submittedAt)}</span>
        </div>
      </div>

      {/* Responses */}
      <div className="space-y-3">
        {response.responses.map((r) => {
          const question = questionsMap.get(r.questionId);
          if (!question) return null;

          return (
            <div key={r.questionId} className="border-t border-white/5 pt-3">
              <p className="text-sm text-white/50 mb-1">{question.label}</p>
              <div>{formatValue(r.value, question)}</div>
            </div>
          );
        })}
      </div>

      {/* Source badge */}
      {response.source && (
        <div className="mt-4 pt-3 border-t border-white/5">
          <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/40">
            via {response.source}
          </span>
        </div>
      )}
    </div>
  );
}

"use client";

import { Star } from "lucide-react";
import type { Question } from "@/types/heliogram";

interface QuestionRendererProps {
  question: Question;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  error?: string;
}

const EMOJI_OPTIONS = ["😍", "😊", "😐", "😕", "😢"];
const THUMBS_OPTIONS = ["👍", "👎"];

export function QuestionRenderer({
  question,
  value,
  onChange,
  error,
}: QuestionRendererProps) {
  const renderQuestion = () => {
    switch (question.type) {
      case "text":
        return (
          <div>
            {question.multiline ? (
              <textarea
                value={(value as string) || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={question.placeholder}
                maxLength={question.maxLength}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 resize-none transition-all duration-300"
                rows={4}
              />
            ) : (
              <input
                type="text"
                value={(value as string) || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={question.placeholder}
                maxLength={question.maxLength}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-300"
              />
            )}
            {question.maxLength && (
              <div className="text-right text-xs text-white/40 mt-1">
                {((value as string) || "").length} / {question.maxLength}
              </div>
            )}
          </div>
        );

      case "rating":
        return (
          <div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => onChange(rating)}
                  className="p-1 transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400/50 rounded"
                  aria-label={`Rate ${rating} out of 5`}
                >
                  <Star
                    className={`w-8 h-8 transition-colors duration-200 ${
                      rating <= (value as number)
                        ? "fill-orange-400 text-orange-400"
                        : "text-white/30 hover:text-white/50"
                    }`}
                  />
                </button>
              ))}
            </div>
            {question.labels && (
              <div className="flex justify-between text-xs text-white/40 mt-2 px-1">
                <span>{question.labels.low}</span>
                <span>{question.labels.high}</span>
              </div>
            )}
          </div>
        );

      case "reaction":
        const options =
          question.variant === "emoji" ? EMOJI_OPTIONS : THUMBS_OPTIONS;
        return (
          <div className="flex items-center gap-3">
            {options.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onChange(index)}
                className={`text-3xl p-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400/50 ${
                  value === index
                    ? "bg-orange-400/30 scale-110 ring-2 ring-orange-400/50"
                    : "bg-white/10 hover:bg-white/20 hover:scale-105"
                }`}
                aria-label={`Select ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        );

      case "scale":
        return (
          <div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 min-w-[2ch]">
                {question.min}
              </span>
              <input
                type="range"
                min={question.min}
                max={question.max}
                step={question.step}
                value={(value as number) || question.min}
                onChange={(e) => onChange(Number(e.target.value))}
                className="flex-1 h-2 rounded-full bg-white/20 appearance-none cursor-pointer accent-orange-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-400 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <span className="text-sm text-white/60 min-w-[2ch]">
                {question.max}
              </span>
            </div>
            <div className="text-center mt-2">
              <span className="text-2xl font-display font-bold text-orange-300">
                {(value as number) || question.min}
              </span>
            </div>
            {question.labels && (
              <div className="flex justify-between text-xs text-white/40 mt-1 px-8">
                <span>{question.labels.min}</span>
                <span>{question.labels.max}</span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-white font-medium">
          {question.label}
          {question.required && (
            <span className="text-orange-400 ml-1" aria-label="required">
              *
            </span>
          )}
        </span>
      </label>
      {renderQuestion()}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

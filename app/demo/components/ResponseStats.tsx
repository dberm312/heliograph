import { Star, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import type { HeliogramResponse, Question } from "@/types/heliogram";

interface ResponseStatsProps {
  responses: HeliogramResponse[];
  questions: Question[];
}

const EMOJI_OPTIONS = ["😍", "😊", "😐", "😕", "😢"];

type RatingStats = { type: "rating"; average: number; distribution: number[]; total: number };
type ScaleStats = { type: "scale"; average: number; total: number; min: number; max: number };
type ThumbsStats = { type: "thumbs"; thumbsUp: number; thumbsDown: number; total: number };
type EmojiStats = { type: "emoji"; distribution: number[]; total: number };
type TextStats = { type: "text"; samples: string[]; total: number };
type QuestionStats = RatingStats | ScaleStats | ThumbsStats | EmojiStats | TextStats;

export function ResponseStats({ responses, questions }: ResponseStatsProps) {
  if (responses.length === 0) {
    return null;
  }

  const getStatsForQuestion = (question: Question): QuestionStats | null => {
    const questionResponses = responses
      .map((r) => r.responses.find((qr) => qr.questionId === question.id))
      .filter(Boolean);

    switch (question.type) {
      case "rating": {
        const values = questionResponses.map((r) => r!.value as number);
        const average = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        const distribution = [1, 2, 3, 4, 5].map(
          (rating) => values.filter((v) => v === rating).length
        );
        return { type: "rating", average, distribution, total: values.length };
      }
      case "scale": {
        const values = questionResponses.map((r) => r!.value as number);
        const average = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        return { type: "scale", average, total: values.length, min: question.min, max: question.max };
      }
      case "reaction": {
        const values = questionResponses.map((r) => r!.value as number);
        if (question.variant === "thumbs") {
          const thumbsUp = values.filter((v) => v === 0).length;
          const thumbsDown = values.filter((v) => v === 1).length;
          return { type: "thumbs", thumbsUp, thumbsDown, total: values.length };
        }
        const distribution = EMOJI_OPTIONS.map(
          (_, i) => values.filter((v) => v === i).length
        );
        return { type: "emoji", distribution, total: values.length };
      }
      case "text": {
        const values = questionResponses
          .map((r) => r!.value as string)
          .filter((v) => v.trim());
        return { type: "text", samples: values.slice(0, 3), total: values.length };
      }
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {questions
        .sort((a, b) => a.order - b.order)
        .map((question) => {
          const stats = getStatsForQuestion(question);
          if (!stats) return null;

          return (
            <div
              key={question.id}
              className="glass-card noise-texture relative rounded-xl p-5"
            >
              <h4 className="text-sm text-white/60 mb-3">{question.label}</h4>

              {stats.type === "rating" && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-display font-bold text-orange-300">
                      {stats.average.toFixed(1)}
                    </span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(stats.average)
                              ? "fill-orange-400 text-orange-400"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/40">
                      ({stats.total} responses)
                    </span>
                  </div>
                  <div className="space-y-2">
                    {stats.distribution
                      .map((count, i) => ({ rating: i + 1, count }))
                      .reverse()
                      .map(({ rating, count }) => (
                        <div
                          key={rating}
                          className="flex items-center gap-3"
                        >
                          <span className="text-xs text-white/40 w-4">
                            {rating}
                          </span>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-400 rounded-full transition-all duration-500"
                              style={{
                                width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-white/40 w-8">
                            {count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {stats.type === "scale" && (
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-display font-bold text-orange-300">
                      {stats.average.toFixed(1)}
                    </span>
                    <span className="text-white/40">
                      / {stats.max}
                    </span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-300 rounded-full transition-all duration-500"
                      style={{
                        width: `${(stats.average / stats.max) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-white/40 mt-2">
                    {stats.total} responses
                  </p>
                </div>
              )}

              {stats.type === "thumbs" && (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <ThumbsUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">
                        {stats.thumbsUp}
                      </p>
                      <p className="text-xs text-white/40">
                        {stats.total > 0 ? Math.round((stats.thumbsUp / stats.total) * 100) : 0}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <ThumbsDown className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">
                        {stats.thumbsDown}
                      </p>
                      <p className="text-xs text-white/40">
                        {stats.total > 0 ? Math.round((stats.thumbsDown / stats.total) * 100) : 0}%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {stats.type === "emoji" && (
                <div className="flex items-end gap-4">
                  {EMOJI_OPTIONS.map((emoji, i) => {
                    const count = stats.distribution[i];
                    const percentage =
                      stats.total > 0 ? (count / stats.total) * 100 : 0;
                    return (
                      <div key={emoji} className="flex flex-col items-center">
                        <span className="text-xs text-white/40 mb-1">
                          {count}
                        </span>
                        <div className="w-8 bg-white/10 rounded-t-sm">
                          <div
                            className="bg-orange-400/50 rounded-t-sm transition-all duration-500"
                            style={{ height: `${Math.max(4, percentage)}px` }}
                          />
                        </div>
                        <span className="text-xl mt-1">{emoji}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {stats.type === "text" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>{stats.total} responses</span>
                  </div>
                  {stats.samples.map((sample, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-white/5 border-l-2 border-orange-400/50"
                    >
                      <p className="text-white/80 text-sm italic">
                        &ldquo;{sample}&rdquo;
                      </p>
                    </div>
                  ))}
                  {stats.total > 3 && (
                    <p className="text-xs text-white/40">
                      + {stats.total - 3} more responses
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

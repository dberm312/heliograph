"use client";

import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ScrollAnimation";

interface StaticCTAProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryText?: string;
}

export function StaticCTA({
  heading = "Stop living in disconnected worlds",
  description = "One platform where Product, Engineering, and Customer teams finally sync.",
  ctaText = "Get Early Access",
  ctaHref = "https://forms.gle/8eMhsfNjWp2hXFuX9",
  secondaryText = "Join the forward-deployed teams transforming how they ship custom solutions.",
}: StaticCTAProps) {
  return (
    <section className="px-6 py-4 relative">
      {/* Subtle background overlay for visual separation */}
      <div
        className="absolute inset-0 bg-linear-to-b from-transparent via-white/3 to-transparent"
        aria-hidden="true"
      />

      <AnimatedSection className="max-w-3xl mx-auto relative">
        {/* Glass card container for the CTA */}
        <div className="glass-card rounded-3xl p-8 md:p-12 noise-texture text-center">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4 animate-fade-in-up">
            {heading}
          </h2>

          <p className="text-lg md:text-xl text-white/60 mb-8 animate-fade-in-up delay-100">
            {description}
          </p>

          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass-card rounded-full px-8 py-4 text-lg font-semibold text-white hover:text-orange-200 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 animate-fade-in-up delay-200"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>

          <p className="text-sm text-white/40 mt-6 animate-fade-in-up delay-300">
            {secondaryText}
          </p>
        </div>
      </AnimatedSection>
    </section>
  );
}

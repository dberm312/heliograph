import {
  ArrowRight,
  ClipboardList,
  GitBranch,
  Play,
  Users,
} from "lucide-react";
import { CTACubeScene } from "@/components/cube/CTACubeScene";
import { AnimatedSection } from "@/components/ScrollAnimation";

export const metadata = {
  title: "Demo | Heliograph",
  description:
    "See Heliograph in action. Watch how our three core modules work together to transform how customer-facing teams ship solutions.",
};

export default function DemoPage() {
  return (
    <div className="min-h-screen text-white/90 relative">
      {/* Decorative gradient orbs */}
      <div
        className="hidden md:block gradient-orb w-[500px] h-[500px] bg-orange-400/20 -top-32 -right-32 absolute"
        aria-hidden="true"
      />
      <div
        className="hidden md:block gradient-orb w-[400px] h-[400px] bg-blue-400/15 top-1/3 -left-48 absolute"
        aria-hidden="true"
      />
      <div
        className="hidden md:block gradient-orb w-[300px] h-[300px] bg-purple-400/10 bottom-1/4 right-1/4 absolute"
        aria-hidden="true"
      />

      <main className="overflow-x-clip">
        {/* Hero Section */}
        <section className="px-6 pt-24 pb-16 md:pt-32 md:pb-24 relative">
          {/* Light beam decorations */}
          <div
            className="light-beam w-[2px] h-48 absolute top-0 right-1/3 rotate-12 opacity-40"
            aria-hidden="true"
          />
          <div
            className="light-beam w-px h-32 absolute top-16 left-1/4 -rotate-6 opacity-25"
            aria-hidden="true"
          />

          <AnimatedSection className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
              <Play className="w-4 h-4 text-orange-300" aria-hidden="true" />
              <span className="text-sm text-white/70">Product Demo</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up delay-100">
              <span className="block">See Heliograph</span>
              <span className="block gradient-text">in Action</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-200">
              Watch how our three core modules work together to transform the
              way customer-facing teams ship solutions.
            </p>
          </AnimatedSection>
        </section>

        {/* Video Section */}
        <section className="px-6 py-8 md:py-16 relative">
          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="relative animate-fade-in-up delay-300">
              {/* Video container with glass effect */}
              <div className="glass-card rounded-3xl p-2 md:p-3 noise-texture overflow-hidden">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900/50">
                  {/* Video element */}
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="/videos/demo-poster.jpg"
                    preload="metadata"
                  >
                    <source
                      src="/videos/heliograph-demo.mp4"
                      type="video/mp4"
                    />
                    <track
                      kind="captions"
                      srcLang="en"
                      label="English"
                      default
                    />
                    Your browser does not support the video tag.
                  </video>

                  {/* Fallback overlay while video loads */}
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 pointer-events-none opacity-0 transition-opacity duration-300">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto border border-white/20">
                        <Play
                          className="w-8 h-8 text-white ml-1"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-white/60 text-sm">Video loading...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative glow behind video */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-20"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #3b82f6 50%, #8b5cf6 100%)",
                  transform: "scale(1.1)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Video caption */}
            <p className="text-center text-white/50 text-sm mt-6 animate-fade-in-up delay-400">
              45 seconds · Full walkthrough of all three modules
            </p>
          </AnimatedSection>
        </section>

        {/* Feature Breakdown Section */}
        <section className="px-6 py-20 md:py-32 relative">
          <div
            className="absolute inset-0 bg-white/3 backdrop-blur-sm"
            aria-hidden="true"
          />

          <AnimatedSection className="max-w-6xl mx-auto relative">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 animate-fade-in-up">
                What you just saw
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto animate-fade-in-up delay-100">
                Three integrated modules working in harmony
              </p>
            </div>

            {/* Module cards */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Project Management */}
              <div className="glass-card rounded-3xl p-8 lg:p-10 relative noise-texture animate-fade-in-up delay-200 group hover:border-orange-400/30 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <ClipboardList
                      className="w-6 h-6 text-orange-300"
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    className="w-3 h-3 rounded-full bg-orange-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3">
                  Project Management
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Kanban-style boards connected to your CRM. See which client
                  needs what, who&apos;s working on it, and drag tasks between
                  statuses.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/20">
                    Task Boards
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/20">
                    Client Filtering
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/20">
                    Priority Tracking
                  </span>
                </div>
              </div>

              {/* Version Control */}
              <div className="glass-card rounded-3xl p-8 lg:p-10 relative noise-texture animate-fade-in-up delay-300 group hover:border-blue-400/30 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <GitBranch
                      className="w-6 h-6 text-blue-300"
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    className="w-3 h-3 rounded-full bg-blue-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3">
                  Version Control
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Git-style branching for all artifacts. Fork client-specific
                  variants, view diffs, and merge improvements back to your core
                  version.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    Branch Visualization
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    Diff View
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    Merge Actions
                  </span>
                </div>
              </div>

              {/* Stakeholder Management */}
              <div className="glass-card rounded-3xl p-8 lg:p-10 relative noise-texture animate-fade-in-up delay-400 group hover:border-purple-400/30 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Users
                      className="w-6 h-6 text-purple-300"
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    className="w-3 h-3 rounded-full bg-purple-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3">
                  Stakeholder Management
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Centralized contact tracking with linked requirements. Select
                  a stakeholder to see their specific needs and current status.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Contact Cards
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Requirements
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Status Tracking
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Quick Stats Section */}
        <section className="px-6 py-16 md:py-24">
          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="text-center animate-fade-in-up delay-100">
                <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                  3
                </div>
                <div className="text-sm md:text-base text-white/50">
                  Integrated Modules
                </div>
              </div>
              <div className="text-center animate-fade-in-up delay-200">
                <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                  1
                </div>
                <div className="text-sm md:text-base text-white/50">
                  Unified Platform
                </div>
              </div>
              <div className="text-center animate-fade-in-up delay-300">
                <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                  ∞
                </div>
                <div className="text-sm md:text-base text-white/50">
                  Custom Solutions
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Next Steps Section */}
        <section className="px-6 py-16 md:py-24 relative">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 animate-fade-in-up">
              Ready to see more?
            </h2>
            <p className="text-lg text-white/60 mb-8 animate-fade-in-up delay-100">
              Get early access to Heliograph and be among the first to transform
              how your team ships custom solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <a
                href="https://forms.gle/8eMhsfNjWp2hXFuX9"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-400 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
              >
                Get Early Access
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white/80 font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Back to Home
              </a>
            </div>
          </AnimatedSection>
        </section>

        {/* CTA Section with Cube */}
        <section className="relative overflow-visible">
          <CTACubeScene
            heading="See the whole picture"
            description="One platform where all your workflows finally connect."
            ctaText="Get Early Access"
            ctaHref="https://forms.gle/8eMhsfNjWp2hXFuX9"
            secondaryText="Join the teams building the future of customer solutions."
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10 relative">
        <div
          className="absolute inset-0 bg-linear-to-t from-blue-900/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative">
          <span className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Heliograph
          </span>
          <a
            href="/"
            className="text-sm text-white/50 hover:text-white/70 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </footer>
    </div>
  );
}

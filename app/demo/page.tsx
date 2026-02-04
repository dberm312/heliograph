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
    "See Heliograph in action. Watch how our three core modules work together to transform how forward-deployed teams ship solutions.",
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
              way forward-deployed teams ship solutions.
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

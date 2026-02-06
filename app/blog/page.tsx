import { BookOpen, Layers, Lightbulb, Merge, Users } from "lucide-react";
import { AnimatedSection } from "@/components/ScrollAnimation";

export const metadata = {
  title: "Blog | Heliograph",
  description:
    "Exploring cross-functional best practices and bringing together the best from product, engineering, and customer-facing worlds.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen text-white/90 relative">
      {/* Decorative gradient orbs */}
      <div
        className="hidden md:block gradient-orb w-[500px] h-[500px] bg-orange-400/20 -top-32 -right-32 absolute animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="hidden md:block gradient-orb w-[400px] h-[400px] bg-blue-400/15 top-1/3 -left-48 absolute"
        aria-hidden="true"
      />

      <main className="overflow-x-clip">
        {/* Hero Section */}
        <section className="px-6 pt-8 pb-16 relative">
          <div
            className="light-beam w-[2px] h-48 absolute top-0 right-1/4 rotate-12 opacity-40"
            aria-hidden="true"
          />

          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
                <span className="block">The Heliograph</span>
                <span className="block gradient-text">Blog</span>
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto animate-fade-in-up delay-100">
                Exploring cross-functional best practices—bringing together the
                best from product, engineering, and customer-facing worlds.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* Coming Soon Section */}
        <section className="px-6 py-16 relative">
          <div
            className="absolute inset-0 bg-white/3 backdrop-blur-sm"
            aria-hidden="true"
          />

          <AnimatedSection className="max-w-4xl mx-auto relative">
            <div className="glass-card rounded-3xl p-8 md:p-12 noise-texture text-center">
              <div className="animate-float mb-6">
                <BookOpen
                  className="w-16 h-16 mx-auto text-orange-300 icon-glow"
                  aria-hidden="true"
                />
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 animate-fade-in-up">
                Coming Soon
              </h2>

              <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100">
                We&apos;re building a collection of insights on how to work
                cross-functionally in modern organizations. Our posts will
                explore how to bring the best practices from different
                worlds—product management, software engineering, customer
                success, and consulting—into unified, modern workflows.
              </p>

              <div className="border-t border-white/10 pt-8 mt-8">
                <p className="text-sm text-white/50 mb-6 uppercase tracking-wide font-medium">
                  Topics we&apos;ll be exploring
                </p>

                <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
                  <div className="flex items-start gap-3 animate-fade-in-up delay-200">
                    <Merge
                      className="w-5 h-5 text-orange-300 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-white/70 text-sm">
                      Bridging the gap between product and engineering workflows
                    </span>
                  </div>

                  <div className="flex items-start gap-3 animate-fade-in-up delay-300">
                    <Users
                      className="w-5 h-5 text-orange-300 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-white/70 text-sm">
                      Customer-facing engineering best practices
                    </span>
                  </div>

                  <div className="flex items-start gap-3 animate-fade-in-up delay-400">
                    <Layers
                      className="w-5 h-5 text-orange-300 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-white/70 text-sm">
                      Version control for non-code artifacts
                    </span>
                  </div>

                  <div className="flex items-start gap-3 animate-fade-in-up delay-500">
                    <Lightbulb
                      className="w-5 h-5 text-orange-300 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-white/70 text-sm">
                      Lessons from forward-deployed engineering teams
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Newsletter CTA - Optional for later */}
        <section className="px-6 py-16 relative">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <p className="text-white/50 text-sm animate-fade-in-up">
              Check back soon for our first posts, or{" "}
              <a
                href="https://forms.gle/8eMhsfNjWp2hXFuX9"
                className="text-orange-300 hover:text-orange-200 underline underline-offset-2 transition-colors"
              >
                sign up for early access
              </a>{" "}
              to get notified when we publish.
            </p>
          </AnimatedSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10 relative">
        <div
          className="absolute inset-0 bg-linear-to-t from-blue-900/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative">
          <span className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Heliograph
          </span>
        </div>
      </footer>
    </div>
  );
}

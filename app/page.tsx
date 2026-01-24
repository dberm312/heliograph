import {
  ArrowRight,
  Bot,
  Briefcase,
  Building2,
  Code2,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen text-white/90 overflow-x-hidden">
      {/* Decorative gradient orbs */}
      <div
        className="gradient-orb w-[600px] h-[600px] bg-orange-400/30 -top-48 -right-48 fixed animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="gradient-orb w-[500px] h-[500px] bg-blue-400/20 top-1/2 -left-64 fixed"
        aria-hidden="true"
      />

      <main>
        {/* Hero Video */}
        <section className="relative">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-h-[70vh] object-cover"
            aria-label="Heliograph promotional video showcasing the platform"
          >
            <source src="/videos/heliograph-promo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Video overlay gradient */}
          <div
            className="absolute inset-0 bg-linear-to-t from-blue-600/80 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </section>

        {/* Hero Text - Asymmetric layout */}
        <section className="px-6 pt-16 pb-32 md:pt-24 md:pb-40 relative">
          {/* Light beam decoration */}
          <div
            className="light-beam w-[2px] h-64 absolute top-0 left-1/4 rotate-12 opacity-50"
            aria-hidden="true"
          />
          <div
            className="light-beam w-px h-48 absolute top-12 left-1/3 -rotate-6 opacity-30"
            aria-hidden="true"
          />

          <div className="max-w-6xl mx-auto">
            {/* Offset headline for asymmetry */}
            <div className="md:ml-12 lg:ml-24">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
                <span className="block animate-fade-in-up">Align your</span>
                <span className="block animate-fade-in-up delay-100 gradient-text">
                  teams.
                </span>
                <span className="block animate-fade-in-up delay-200 mt-2">
                  Amplify your
                </span>
                <span className="block animate-fade-in-up delay-300 text-orange-300">
                  impact.
                </span>
              </h1>
            </div>

            {/* Offset description */}
            <div className="md:ml-auto md:mr-12 lg:mr-24 md:max-w-xl mt-8">
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed animate-fade-in-up delay-500">
                Heliograph transforms how B2B companies bridge the gap between
                customer-facing innovation and core product development.
              </p>
            </div>
          </div>
        </section>

        {/* Problem Section - Cards at varying heights */}
        <section className="px-6 py-20 md:py-32 relative">
          <div
            className="absolute inset-0 bg-white/3 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className="max-w-5xl mx-auto relative">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-16 text-center animate-fade-in-up">
              The Convergence Challenge
            </h2>

            {/* Asymmetric card layout with varying heights */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1 - Normal */}
              <div className="glass-card rounded-3xl p-8 relative noise-texture animate-fade-in-up delay-100">
                <div className="animate-float">
                  <ArrowRight
                    className="w-10 h-10 mb-6 text-orange-300 icon-glow"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  Product to Services
                </h3>
                <p className="text-white/60 leading-relaxed">
                  B2B companies must create custom approaches for every
                  customer. What starts as &quot;we&apos;ll productize
                  later&quot; becomes permanent.
                </p>
              </div>

              {/* Card 2 - Elevated */}
              <div className="glass-card rounded-3xl p-8 relative noise-texture md:-mt-8 animate-fade-in-up delay-200">
                <div className="animate-float delay-200">
                  <ArrowRight
                    className="w-10 h-10 mb-6 text-orange-300 icon-glow rotate-180"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  Services to Product
                </h3>
                <p className="text-white/60 leading-relaxed">
                  Consulting firms race to productize expertise. The pressure to
                  capture and reuse intellectual property is existential.
                </p>
              </div>

              {/* Card 3 - Lowered */}
              <div className="glass-card rounded-3xl p-8 relative noise-texture md:mt-8 animate-fade-in-up delay-300">
                <div className="animate-float delay-400">
                  <Lightbulb
                    className="w-10 h-10 mb-6 text-orange-300 icon-glow"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  Missing Infrastructure
                </h3>
                <p className="text-white/60 leading-relaxed">
                  Both end up where custom work and core capabilities must flow
                  together—but the tools don&apos;t exist.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section - Staggered 2-column with offset */}
        <section className="px-6 py-20 md:py-32 relative">
          {/* Decorative elements */}
          <div
            className="light-beam w-[3px] h-96 absolute bottom-0 right-1/4 -rotate-12 opacity-40"
            aria-hidden="true"
          />

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 animate-fade-in-up">
                Connect the Edge to the Core
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto animate-fade-in-up delay-100">
                Turn custom work into strategic intelligence. Enable teams to
                move as one.
              </p>
            </div>

            {/* Staggered 2x2 grid with offset positioning */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Row 1 */}
              <div className="glass-card rounded-3xl p-10 relative noise-texture animate-slide-in-left delay-200">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 animate-float">
                    <Sparkles
                      className="w-12 h-12 text-orange-300 icon-glow"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-4">
                      Edge-to-Core Intelligence
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      AI automatically tracks every custom request across your
                      organization. Surface patterns, identify what should
                      become core, and see draft implementations—not just
                      reports.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-10 relative noise-texture md:mt-16 animate-slide-in-right delay-300">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 animate-float delay-200">
                    <MessageSquare
                      className="w-12 h-12 text-orange-300 icon-glow"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-4">
                      Heliograms
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      Lightweight, embeddable feedback forms that capture
                      stakeholder input with full attribution. Think Typeform
                      meets Loom meets decision intelligence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="glass-card rounded-3xl p-10 relative noise-texture md:-mt-8 animate-slide-in-left delay-400">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 animate-float delay-400">
                    <Bot
                      className="w-12 h-12 text-orange-300 icon-glow"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-4">
                      AI-Native Workspace
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      A platform where humans and AI collaborate natively. AI
                      agents create customizations, generate forms, and draft
                      code—with humans making the final call.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-10 relative noise-texture md:mt-8 animate-slide-in-right delay-500">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 animate-float delay-600">
                    <Users
                      className="w-12 h-12 text-orange-300 icon-glow"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-4">
                      Cross-Functional Collaboration
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      Break down silos. Sales shares signals with context,
                      engineering provides real-time feasibility, and product
                      decides with full visibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience - Floating badges with organic placement */}
        <section className="px-6 py-20 md:py-32 relative">
          <div
            className="absolute inset-0 bg-white/3 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className="max-w-5xl mx-auto relative">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-center animate-fade-in-up">
              Built for the Convergence
            </h2>
            <p className="text-lg text-white/60 text-center mb-16 max-w-xl mx-auto animate-fade-in-up delay-100">
              Organizations navigating the space between custom solutions and
              scalable products.
            </p>

            {/* Floating badge layout */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3 animate-scale-in delay-200">
                <Building2
                  className="w-6 h-6 text-orange-300"
                  aria-hidden="true"
                />
                <span className="text-sm md:text-base text-white/80">
                  B2B with high-touch success
                </span>
              </div>

              <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3 animate-scale-in delay-300 md:mt-8">
                <Code2
                  className="w-6 h-6 text-orange-300"
                  aria-hidden="true"
                />
                <span className="text-sm md:text-base text-white/80">
                  Enterprise software with FDE teams
                </span>
              </div>

              <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3 animate-scale-in delay-400">
                <Briefcase
                  className="w-6 h-6 text-orange-300"
                  aria-hidden="true"
                />
                <span className="text-sm md:text-base text-white/80">
                  Consulting firms productizing IP
                </span>
              </div>

              <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3 animate-scale-in delay-500 md:-mt-4">
                <Zap className="w-6 h-6 text-orange-300" aria-hidden="true" />
                <span className="text-sm md:text-base text-white/80">
                  Professional services going digital
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">
              Ready to align your teams?
            </h2>
            <p className="text-xl text-white/60 mb-10 animate-fade-in-up delay-100">
              Join the companies transforming how they bridge edge innovation
              and core development.
            </p>
            <div className="animate-fade-in-up delay-200">
              <a
                href="mailto:hello@heliograph.co"
                className="inline-flex items-center gap-2 glass-card rounded-full px-8 py-4 text-lg font-semibold text-white hover:text-orange-200 transition-colors duration-300"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
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
          <p className="text-sm text-white/40 italic text-center md:text-right max-w-md">
            Named after the heliograph—a device that focused the sun&apos;s
            broad energy into precise, directed signals.
          </p>
        </div>
      </footer>
    </div>
  );
}

import {
  Bot,
  ChevronRight,
  ClipboardList,
  GitBranch,
  LayoutList,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { CTACubeScene } from "@/components/cube/CTACubeScene";
import { StaticCTA } from "@/components/StaticCTA";
import { DemoVideoSection } from "@/components/DemoVideoSection";
import { AnimatedSection } from "@/components/ScrollAnimation";

export default function Home() {
  return (
    <div className="min-h-screen text-white/90 relative">
      {/* Decorative gradient orbs - hidden on mobile to prevent overflow */}
      <div
        className="hidden md:block gradient-orb w-[600px] h-[600px] bg-orange-400/30 -top-48 -right-48 absolute animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="hidden md:block gradient-orb w-[500px] h-[500px] bg-blue-400/20 top-1/2 -left-64 absolute"
        aria-hidden="true"
      />

      <main className="overflow-x-clip">
        {/* Hero Text - Asymmetric layout */}
        <section className="px-6 pt-8 pb-8 relative">
          {/* Light beam decoration */}
          <div
            className="light-beam w-[2px] h-64 absolute top-0 left-1/4 rotate-12 opacity-50"
            aria-hidden="true"
          />
          <div
            className="light-beam w-px h-48 absolute top-12 left-1/3 -rotate-6 opacity-30"
            aria-hidden="true"
          />

          <AnimatedSection className="max-w-6xl mx-auto">
            {/* Offset headline for asymmetry */}
            <div className="md:ml-12 lg:ml-24">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
                <span className="block animate-fade-in-up">The modern</span>
                <span className="block animate-fade-in-up delay-100">
                  toolchain for
                </span>
                <span className="block animate-fade-in-up delay-200 gradient-text">
                  customer-facing
                </span>
                <span className="block animate-fade-in-up delay-300 text-orange-300">
                  builders.
                </span>
              </h1>
            </div>

            {/* Offset description */}
            <div className="md:ml-auto md:mr-12 lg:mr-24 md:max-w-xl mt-8">
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed animate-fade-in-up delay-400 mb-4">
                Quickly align, build, and codify your customer solutions.
              </p>
              <p className="text-lg text-white/70 leading-relaxed animate-fade-in-up delay-500 mb-6">
                One integrated platform combining project management, version
                control, and stakeholder tracking—built for people who ship
                custom solutions.
              </p>
              {/* Role list */}
              <div className="flex flex-wrap gap-3 animate-fade-in-up delay-600">
                <span className="text-sm text-white/70 px-3 py-1.5 rounded-full border border-white/20 bg-white/10">
                  Forward Deployed Engineers
                </span>
                <span className="text-sm text-white/70 px-3 py-1.5 rounded-full border border-white/20 bg-white/10">
                  Consultants
                </span>
                <span className="text-sm text-white/70 px-3 py-1.5 rounded-full border border-white/20 bg-white/10">
                  Customer Success
                </span>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Early CTA - Static version */}
        <StaticCTA />

        {/* Product Demo Video */}
        <DemoVideoSection />

        {/* Problem Section - The Struggle */}
        <section className="px-6 py-20 md:py-32 relative">
          <div
            className="absolute inset-0 bg-white/3 backdrop-blur-sm"
            aria-hidden="true"
          />

          <AnimatedSection className="max-w-5xl mx-auto relative">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-center animate-fade-in-up">
              Your teams use different tools. They don&apos;t talk.
            </h2>
            <p className="text-lg text-white/60 text-center mb-16 max-w-3xl mx-auto animate-fade-in-up delay-100">
              Product lives in Linear and Notion. Engineering lives in GitHub.
              Sales lives in CRMs and spreadsheets. The moment you need to ship
              a custom solution, you&apos;re cobbling together workflows across
              three worlds that were never designed to connect.
            </p>

            {/* Three-stage progression */}
            <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0">
              {/* Stage 1 - What You Have */}
              <div className="flex-1 flex flex-col items-center text-center animate-fade-in-up delay-200">
                <div className="glass-card rounded-2xl p-6 w-full h-full noise-texture border-orange-400/20 flex flex-col">
                  <p className="text-sm text-orange-300 font-medium mb-4 uppercase tracking-wide">
                    What you have
                  </p>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <LayoutList
                        className="w-5 h-5 text-white/60"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-white/70">
                        Product: Linear, Jira, Notion
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <GitBranch
                        className="w-5 h-5 text-white/60"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-white/70">
                        Engineering: GitHub, GitLab
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users
                        className="w-5 h-5 text-white/60"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-white/70">
                        Sales: Salesforce, HubSpot, sheets
                      </span>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mt-4">
                    Great tools—for their own worlds
                  </p>
                </div>
              </div>

              {/* Arrow 1 */}
              <div
                className="flex items-center justify-center py-2 md:py-0 md:px-4"
                aria-hidden="true"
              >
                <ChevronRight className="w-6 h-6 text-white/30 rotate-90 md:rotate-0" />
              </div>

              {/* Stage 2 - Where It Breaks */}
              <div className="flex-1 flex flex-col items-center text-center animate-fade-in-up delay-300">
                <div className="glass-card rounded-2xl p-6 w-full h-full noise-texture flex flex-col">
                  <p className="text-sm text-white/50 font-medium mb-4 uppercase tracking-wide">
                    Where it breaks
                  </p>
                  <ul className="space-y-2.5 text-left text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-0.5" aria-hidden="true">
                        ×
                      </span>
                      Product roadmaps disconnect from engineering reality
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-0.5" aria-hidden="true">
                        ×
                      </span>
                      Customer requirements live in someone&apos;s CRM notes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-0.5" aria-hidden="true">
                        ×
                      </span>
                      Engineering ships—but sales doesn&apos;t know what changed
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-0.5" aria-hidden="true">
                        ×
                      </span>
                      Three tools, three sources of truth, zero sync
                    </li>
                  </ul>
                </div>
              </div>

              {/* Arrow 2 */}
              <div
                className="flex items-center justify-center py-2 md:py-0 md:px-4"
                aria-hidden="true"
              >
                <ChevronRight className="w-6 h-6 text-white/30 rotate-90 md:rotate-0" />
              </div>

              {/* Stage 3 - What's Missing */}
              <div className="flex-1 flex flex-col items-center text-center animate-fade-in-up delay-400">
                <div className="glass-card rounded-2xl p-6 w-full h-full noise-texture border-blue-400/20 flex flex-col">
                  <p className="text-sm text-blue-300 font-medium mb-4 uppercase tracking-wide">
                    What&apos;s missing
                  </p>
                  <div className="flex justify-center my-auto">
                    <div className="animate-float">
                      <Sparkles
                        className="w-16 h-16 text-blue-300 icon-glow"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <p className="text-white/80 text-sm ">
                    One platform that connects Product, Engineering, and
                    Customer teams
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Three Core Modules Section */}
        <section className="px-6 py-20 md:py-32 relative">
          {/* Decorative elements */}
          <div
            className="light-beam w-[3px] h-96 absolute bottom-0 right-1/4 -rotate-12 opacity-40"
            aria-hidden="true"
          />

          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 animate-fade-in-up">
                One integrated platform
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto animate-fade-in-up delay-100">
                Three core modules. Built for the way customer-facing builders
                actually work.
              </p>
            </div>

            {/* Staggered 3-column grid */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Module 1 - Project Management */}
              <div className="glass-card rounded-3xl p-8 lg:p-10 relative noise-texture animate-fade-in-up delay-200 flex flex-col">
                <div className="animate-float">
                  <ClipboardList
                    className="w-14 h-14 mb-6 text-orange-300 icon-glow"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">
                  Project Management
                </h3>
                <p className="text-sm text-orange-300/80 mb-4">
                  Built for custom solutions
                </p>
                <p className="text-white/60 leading-relaxed mb-6 flex-1">
                  Ship many solutions to individual customers, not one product
                  to many users. Tasks connect directly to CRM data—see which
                  client needs what, who&apos;s working on it, and what&apos;s
                  next.
                </p>
                <div className="ai-badge mt-auto">
                  <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                  AI agents search and implement tasks
                </div>
              </div>

              {/* Module 2 - Version Control (Elevated) */}
              <div className="glass-card rounded-3xl p-8 lg:p-10 relative noise-texture animate-fade-in-up delay-300 flex flex-col">
                <div className="animate-float delay-200">
                  <GitBranch
                    className="w-14 h-14 mb-6 text-orange-300 icon-glow"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">
                  Version Control & Review
                </h3>
                <p className="text-sm text-orange-300/80 mb-4">
                  For everything, not just code
                </p>
                <p className="text-white/60 leading-relaxed mb-6 flex-1">
                  Git-style versioning for presentations, project plans, and
                  documentation. Branch for client-specific variants while
                  maintaining connection to your core &quot;main&quot; version.
                </p>
                <div className="ai-badge mt-auto">
                  <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                  Multiple AI agents propose variants
                </div>
              </div>

              {/* Module 3 - Stakeholder Management */}
              <div className="glass-card rounded-3xl p-8 lg:p-10 relative noise-texture animate-fade-in-up delay-400 flex flex-col">
                <div className="animate-float delay-400">
                  <Users
                    className="w-14 h-14 mb-6 text-orange-300 icon-glow"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">
                  Stakeholder Management
                </h3>
                <p className="text-sm text-orange-300/80 mb-4">
                  Requirements meet reality
                </p>
                <p className="text-white/60 leading-relaxed mb-6 flex-1">
                  Stop keeping requirements in someone&apos;s head or scattered
                  Notion docs. Track different requirement versions for
                  different stakeholders in one place.
                </p>
                <div className="ai-badge mt-auto">
                  <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                  AI informed by stakeholder context
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Why Now Section */}
        <section className="px-6 py-20 md:py-32 relative">
          <div
            className="absolute inset-0 bg-white/3 backdrop-blur-sm"
            aria-hidden="true"
          />

          <AnimatedSection className="max-w-5xl mx-auto relative">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-16 text-center animate-fade-in-up">
              The moment is now
            </h2>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1 - AI Acceleration */}
              <div className="glass-card rounded-3xl p-8 relative noise-texture animate-fade-in-up delay-100 flex flex-col">
                <div className="animate-float">
                  <Zap
                    className="w-10 h-10 mb-6 text-orange-300 icon-glow"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 gradient-text-orange">
                  Building is faster than ever
                </h3>
                <p className="text-white/60 leading-relaxed flex-1">
                  AI has shifted the bottleneck from &quot;can we build
                  it?&quot; to &quot;should we build it and for
                  whom?&quot;—exactly where customer-facing builders operate.
                </p>
              </div>

              {/* Card 2 - Role Maturation (Elevated) */}
              <div className="glass-card rounded-3xl p-8 relative noise-texture animate-fade-in-up delay-200 flex flex-col">
                <div className="animate-float delay-200">
                  <TrendingUp
                    className="w-10 h-10 mb-6 text-orange-300 icon-glow"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 gradient-text-orange">
                  Customer-facing builders are the new standard
                </h3>
                <p className="text-white/60 leading-relaxed flex-1">
                  Palantir. Databricks. Every AI startup. Customer-facing
                  building has become a core function, not an experiment.
                </p>
              </div>

              {/* Card 3 - AI-Native */}
              <div className="glass-card rounded-3xl p-8 relative noise-texture animate-fade-in-up delay-300 flex flex-col">
                <div className="animate-float delay-400">
                  <Bot
                    className="w-10 h-10 mb-6 text-orange-300 icon-glow"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 gradient-text-orange">
                  AI-native by design
                </h3>
                <p className="text-white/60 leading-relaxed flex-1">
                  Building now means AI integration from day one—structured
                  data, clear APIs, workflows where AI searches, implements, and
                  iterates.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Target Audience - Floating badges */}
        <section className="px-6 py-20 md:py-32 relative">
          <AnimatedSection className="max-w-5xl mx-auto relative">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-center animate-fade-in-up">
              Built for customer-facing teams
            </h2>
            <p className="text-lg text-white/60 text-center mb-16 max-w-xl mx-auto animate-fade-in-up delay-100">
              Builders who sit at the intersection of sales, consulting, and
              engineering.
            </p>

            {/* Floating badge layout */}
            <div className="justify-center gap-4 md:gap-5 grid grid-cols-3 auto-rows-fr text-center">
              <div className="glass-card rounded-2xl px-6 py-4 flex items-center justify-center animate-scale-in delay-200">
                <span className="text-sm md:text-base text-white/80 font-medium">
                  Forward-Deployed Engineers
                </span>
              </div>

              <div className="glass-card rounded-2xl px-6 py-4 flex items-center justify-center animate-scale-in delay-300">
                <span className="text-sm md:text-base text-white/80 font-medium">
                  Solutions Engineers
                </span>
              </div>

              <div className="glass-card rounded-2xl px-6 py-4 flex items-center justify-center animate-scale-in delay-400">
                <span className="text-sm md:text-base text-white/80 font-medium">
                  Technical Account Managers
                </span>
              </div>

              <div className="glass-card rounded-2xl px-6 py-4 flex items-center justify-center animate-scale-in delay-500">
                <span className="text-sm md:text-base text-white/80 font-medium">
                  Customer Engineers
                </span>
              </div>

              <div className="glass-card rounded-2xl px-6 py-4 flex items-center justify-center animate-scale-in delay-600">
                <span className="text-sm md:text-base text-white/80 font-medium">
                  Implementation Teams
                </span>
              </div>

              <div className="glass-card rounded-2xl px-6 py-4 flex items-center justify-center animate-scale-in delay-700">
                <span className="text-sm md:text-base text-white/80 font-medium">
                  AI Startup Founders
                </span>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* CTA Section with Cube Animation */}
        <section className="relative overflow-visible">
          <CTACubeScene
            heading="Stop living in disconnected worlds"
            description="One platform where Product, Engineering, and Customer teams finally sync."
            ctaText="Get Early Access"
            ctaHref="https://forms.gle/8eMhsfNjWp2hXFuX9"
            secondaryText="Join the customer-facing builders transforming how they ship custom solutions."
          />
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

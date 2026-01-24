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
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen text-white/80">
      <main>
        {/* Hero */}
        <section className="px-6 pt-16 pb-24 md:pt-24 md:pb-32 text-white/80">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Align your teams.
              <br />
              Amplify your impact.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Heliograph transforms how B2B companies bridge the gap between
              customer-facing innovation and core product development.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="px-6 py-16 md:py-24 bg-white/5 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
              The Convergence Challenge
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                <ArrowRight className="w-8 h-8 mb-4 text-orange-300" />
                <h3 className="font-semibold mb-2">Product to Services</h3>
                <p className="text-white/70 text-sm">
                  B2B companies must create custom approaches for every
                  customer. What starts as &quot;we&apos;ll productize
                  later&quot; becomes permanent.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                <ArrowRight className="w-8 h-8 mb-4 text-orange-300 rotate-180" />
                <h3 className="font-semibold mb-2">Services to Product</h3>
                <p className="text-white/70 text-sm">
                  Consulting firms race to productize expertise. The pressure to
                  capture and reuse intellectual property is existential.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                <Lightbulb className="w-8 h-8 mb-4 text-orange-300" />
                <h3 className="font-semibold mb-2">Missing Infrastructure</h3>
                <p className="text-white/70 text-sm">
                  Both end up where custom work and core capabilities must flow
                  together—but the tools don&apos;t exist.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
              Connect the Edge to the Core
            </h2>
            <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
              Turn custom work into strategic intelligence. Enable teams to move
              as one.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-10 h-10 mb-4 text-orange-300" />
                <h3 className="text-xl font-semibold mb-3">
                  Edge-to-Core Intelligence
                </h3>
                <p className="text-white/70">
                  AI automatically tracks every custom request across your
                  organization. Surface patterns, identify what should become
                  core, and see draft implementations—not just reports.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <MessageSquare className="w-10 h-10 mb-4 text-orange-300" />
                <h3 className="text-xl font-semibold mb-3">Heliograms</h3>
                <p className="text-white/70">
                  Lightweight, embeddable feedback forms that capture
                  stakeholder input with full attribution. Think Typeform meets
                  Loom meets decision intelligence.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <Bot className="w-10 h-10 mb-4 text-orange-300" />
                <h3 className="text-xl font-semibold mb-3">
                  AI-Native Workspace
                </h3>
                <p className="text-white/70">
                  A platform where humans and AI collaborate natively. AI agents
                  create customizations, generate forms, and draft code—with
                  humans making the final call.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <Users className="w-10 h-10 mb-4 text-orange-300" />
                <h3 className="text-xl font-semibold mb-3">
                  Cross-Functional Collaboration
                </h3>
                <p className="text-white/70">
                  Break down silos. Sales shares signals with context,
                  engineering provides real-time feasibility, and product
                  decides with full visibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="px-6 py-16 md:py-24 bg-white/5 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">
              Built for the Convergence
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/10">
                <Building2 className="w-6 h-6 mx-auto mb-2 text-orange-300" />
                <p className="text-sm text-white/80">
                  B2B companies with high-touch customer success
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/10">
                <Code2 className="w-6 h-6 mx-auto mb-2 text-orange-300" />
                <p className="text-sm text-white/80">
                  Enterprise software with FDE teams
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/10">
                <Briefcase className="w-6 h-6 mx-auto mb-2 text-orange-300" />
                <p className="text-sm text-white/80">
                  Consulting firms productizing IP
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/10">
                <Sparkles className="w-6 h-6 mx-auto mb-2 text-orange-300" />
                <p className="text-sm text-white/80">
                  Professional services going digital
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Heliograph
          </span>
          <p className="text-sm text-white/40 italic">
            Named after the heliograph—a device that focused the sun&apos;s
            broad energy into precise, directed signals.
          </p>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";
import HeroGridBlocks from "./components/HeroGridBlocks";

export default function Home() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Hero */}
      <div className="relative px-6 py-20 md:py-28 text-center">
        <div className="hero-radial" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <HeroGridBlocks />
        <div className="pointer-events-none relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-contrast mb-6 tracking-tight leading-tight">
            Win the AI native future.
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
            Your AI transformation partner. We set and execute your enterprise AI
            strategy at startup speed.
          </p>
          <div className="pointer-events-auto flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-accent text-contrast py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition duration-300 font-semibold"
            >
              Get Started
            </Link>
            <a
              href="https://app.adventureflow.ai"
              className="bg-primary border border-subtle text-contrast py-3 px-6 rounded-lg hover:bg-secondary transition duration-300 font-semibold"
            >
              See Flowchat →
            </a>
          </div>
          <p className="mt-2 pt-2 text-secondary text-sm">
            Want a demo of AI-native software we build?{" "}
            <a
              href="https://app.adventureflow.ai"
              className="text-contrast font-medium hover:underline"
            >
              Check out Flowchat
            </a>
          </p>
        </div>
      </div>

      {/* Our approach */}
      <section className="px-6 py-16 md:py-20 border-t border-subtle">
        <h2 className="text-2xl md:text-3xl font-bold text-contrast text-center mb-4">
          Our approach
        </h2>
        <p className="text-secondary text-center max-w-xl mx-auto mb-12">
          We help you shift from AI-absent to AI-native—strategy, build, and
          iteration without the overhead.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-surface-light p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-contrast mb-2">
              Strategy
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              No six-month strategy work. We get right to work on audits that
              surface the most compelling AI use cases for your business.
            </p>
          </div>
          <div className="card-surface-light p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-contrast mb-2">
              Transformation
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              Custom partnerships that combine change management and AI tooling
              with baseline metrics to drive measurable ROI.
            </p>
          </div>
          <div className="card-surface-light p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-contrast mb-2">
              Engineering
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              Outcome-based product and engineering work. We ship production
              software faster—you pay for value delivered, not hours logged.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 md:py-20 border-t border-subtle">
        <h2 className="text-2xl md:text-3xl font-bold text-contrast text-center mb-4">
          Real stories, real results
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          <blockquote className="card-surface-light p-6 rounded-lg">
            <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-3">
              EE Systems Design
            </p>
            <p className="text-contrast text-sm leading-relaxed mb-4">
              Jeff made foundational contributions to our product, delivering
              high-impact features on an aggressive timeline across a full tech
              stack. He brings a holistic focus to product development, always
              keeping the end-user experience in view. His work is consistently
              thoughtful, high quality, and aligned with the broader product
              vision.
            </p>
            <footer className="text-secondary text-sm font-semibold">
              Corbin Klett & Antony Samuel, Co-founders, Artifact.engineer (YC
              W25)
            </footer>
          </blockquote>
          <blockquote className="card-surface-light p-6 rounded-lg">
            <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-3">
              Battery Energy Storage
            </p>
            <p className="text-contrast text-sm leading-relaxed mb-4">
              I had the pleasure of working with Jeff on a monitoring platform
              for brownfield and greenfield IoT devices. Jeff played a critical
              role in every aspect—from architecting the platform to
              implementing graphing features and managing over-the-air firmware
              updates. His deep expertise with AWS stood out, and his ability to
              approach complex challenges with clarity and creativity made him an
              invaluable collaborator. I highly recommend Jeff and would welcome
              the opportunity to work with him again.
            </p>
            <footer className="text-secondary text-sm font-semibold">
              Michael Bengston, Solutions Engineer at Anker (formerly Lead PM,
              HomeGrid)
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Provocative section */}
      <section className="px-6 py-16 md:py-20 border-t border-subtle text-center">
        <p className="text-xl md:text-2xl text-contrast font-semibold mb-4">
          You have a choice. Disrupt yourself. Or be disrupted by others.
        </p>
        <p className="text-secondary max-w-2xl mx-auto leading-relaxed">
          As the cost of intelligence approaches zero, businesses need to
          transition from AI-absent to AI-native to stay relevant. We don't care
          only about today—we care about the AI native future, and helping you win it.
        </p>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 md:py-20 border-t border-subtle">
        <h2 className="text-2xl md:text-3xl font-bold text-contrast text-center mb-4">
          Questions? We have answers
        </h2>
        <div className="max-w-2xl mx-auto mt-10 space-y-2">
          <details className="card-surface-light rounded-lg group">
            <summary className="p-4 cursor-pointer list-none font-semibold text-contrast flex justify-between items-center">
              What does AI transformation mean for us?
              <span className="text-secondary group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="px-4 pb-4 text-secondary text-sm leading-relaxed">
              We identify your biggest bottlenecks, design AI-driven solutions that
              scale, train your people to use them reliably, and repeat. It's
              strategy and implementation together—no long strategy-only phase.
            </p>
          </details>
          <details className="card-surface-light rounded-lg group">
            <summary className="p-4 cursor-pointer list-none font-semibold text-contrast flex justify-between items-center">
              Who do you typically work with?
              <span className="text-secondary group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="px-4 pb-4 text-secondary text-sm leading-relaxed">
              Companies that are motivated to become AI-first but lack the
              resources or speed internally—from VC-backed startups to
              established enterprises in construction, energy, and
              manufacturing.
            </p>
          </details>
          <details className="card-surface-light rounded-lg group">
            <summary className="p-4 cursor-pointer list-none font-semibold text-contrast flex justify-between items-center">
              How does pricing work?
              <span className="text-secondary group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="px-4 pb-4 text-secondary text-sm leading-relaxed">
              It depends on scope. For engineering and product work we often work
              on a subscription or outcome-based basis. For transformation we
              build a custom partnership. Get in touch and we'll give you a
              concrete answer.
            </p>
          </details>
          <details className="card-surface-light rounded-lg group">
            <summary className="p-4 cursor-pointer list-none font-semibold text-contrast flex justify-between items-center">
              What is Flowchat?
              <span className="text-secondary group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="px-4 pb-4 text-secondary text-sm leading-relaxed">
              Flowchat is our AI-powered product for project strategy and
              execution. It helps teams organize context, surface insights from
              docs, and generate emails, decks, and updates—built especially for
              construction and renewable energy. You can try it at
              app.adventureflow.ai.
            </p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:py-20 border-t border-subtle text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-contrast mb-4">
          Stay on the right side of history.
        </h2>
        <p className="text-secondary mb-8 max-w-xl mx-auto">
          Ready to win the AI native future? Get in touch for a conversation—no
          commitment required.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-accent text-contrast py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition duration-300 font-semibold"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}

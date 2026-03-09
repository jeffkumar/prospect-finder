import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 border-t border-subtle">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-contrast mb-8">About Adventure Flow</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-12">
          <div className="flex-1">
            <p className="text-lg text-secondary leading-relaxed mb-6">
              Adventure Flow was founded by <strong className="font-semibold">Jeff Kumar</strong> at the end of 2024. After over a decade building software across energy, infrastructure, and developer tools, Jeff set out to help companies move faster with AI-native solutions.
            </p>
            <a href="/contact" className="bg-accent text-contrast py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition duration-300 inline-block">
              Get in Touch
            </a>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-2">
              <Image
                src="/jeff-profile.jpg"
                alt="Profile photo"
                fill
                priority
                sizes="128px"
                className="object-cover"
              />
            </div>
            <p className="text-secondary font-semibold">Founder</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-contrast mb-6">What We&apos;ve Built</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-surface-light p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-contrast mb-2">Battery Energy Storage (BESS)</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Customer portals, installer apps, and warranty management tools for battery manufacturers in the renewables space.
            </p>
          </div>
          <div className="card-surface-light p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-contrast mb-2">EE Systems Design</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Startup MVP for Artifact (YC W25) — an AI-powered platform for electrical engineering systems design and management.
            </p>
          </div>
          <div className="card-surface-light p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-contrast mb-2">Observability</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Real-time monitoring, IoT dashboards, and alerting systems that give teams full visibility into their assets and infrastructure.
            </p>
          </div>
          <div className="card-surface-light p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-contrast mb-2">Agentic PM Software</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Flowchat — an AI-native tool for product and project managers that keeps project context and generates emails, decks, and updates.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="/contact" className="bg-accent text-contrast py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition duration-300 font-semibold">
            Work With Us
          </a>
        </div>
      </div>
    </section>
  );
}

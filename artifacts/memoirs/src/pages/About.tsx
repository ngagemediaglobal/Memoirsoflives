import { Link } from "wouter";

const OBJECTIVES = [
  "Build a multi-format storytelling platform — video, audio, and written — that captures lives in full depth.",
  "Grow an engaged audience across YouTube, social media, and podcast platforms around authentic human stories.",
  "Evolve into a documentary series on major streaming platforms.",
  "Host Memoirs Live — a recorded public storytelling event for community engagement.",
  "Monetise through content licensing, sponsorships, merchandise, and digital distribution.",
];

const AUDIENCES = [
  {
    label: "Millennials & Gen Z",
    description: "People hungry for meaning, cultural depth, and real stories that go beyond surface-level content.",
  },
  {
    label: "Diaspora Communities",
    description: "Individuals seeking reconnection with heritage, language, and the living stories of home.",
  },
  {
    label: "Researchers & Journalists",
    description: "Professionals working in oral history, cultural documentation, biography, and long-form storytelling.",
  },
  {
    label: "Families & Communities",
    description: "Anyone who wants to preserve the story of a person they love — before those memories are lost.",
  },
];

const PHASES = [
  {
    number: "Phase 1",
    label: "Development",
    period: "Month 1",
    items: [
      "Finalise branding, visual identity, and theme song",
      "Secure first 6 subjects — public figures, community voices, and compelling everyday lives",
      "Acquire and arrange filming equipment and studio setup",
      "Build the production team: Director, Cinematographer, Editor, Producer",
      "Design the YouTube channel and social platforms",
    ],
  },
  {
    number: "Phase 2",
    label: "Production",
    period: "Months 2–3",
    items: [
      "Film and edit the first 6–10 episodes",
      "Create promotional assets, thumbnails, teaser reels, and trailers",
      "Develop the intro video, episode format, and storytelling arc",
      "Create the branded Memoirs Journal for documentation",
    ],
  },
  {
    number: "Phase 3",
    label: "Launch & Distribution",
    period: "Month 4",
    items: [
      "Launch the Memoirs YouTube channel with the first 3 episodes",
      "Weekly episode drops across YouTube, Spotify, and Apple Podcasts",
      "Email newsletter campaign with story excerpts",
      "Strategic guest rollout to grow audience through their networks",
    ],
  },
  {
    number: "Phase 4",
    label: "Growth & Partnerships",
    period: "Months 5–9",
    items: [
      "Collaborate with legacy NGOs, embassies, and cultural ministries",
      "Begin shooting Memoirs: The Documentary Series (longer format)",
      "Host Memoirs Live — a recorded public storytelling event",
      "Explore distribution partnerships with Netflix, Amazon, EbonyLife, and others",
    ],
  },
];

export default function About() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="inline-block mb-8 px-3 py-1 border border-background/20 text-background/50 text-xs font-medium uppercase tracking-widest rounded-sm">
            About the Initiative
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight tracking-tight mb-8">
            Every life has<br />a story worth telling.
          </h1>
          <p className="text-xl text-background/60 leading-relaxed max-w-2xl font-serif">
            Memoirs is a storytelling platform on a mission to document the lives, experiences, and wisdom of remarkable people — from public figures and community leaders to the everyday individuals whose stories hold lasting value.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-6">Vision</h2>
              <p className="text-2xl md:text-3xl font-serif leading-relaxed text-foreground">
                To preserve and share the untold stories, wisdom, and lived experiences of remarkable people — public figures, community voices, and everyday individuals — for posterity, inspiration, and learning.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-6">Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To build an engaging, multi-format storytelling platform that captures rich human lives through video, audio, and the written word — and grows into a permanent repository of wisdom, identity, and history.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                We are not here only for the famous. The deepest wisdom often sits in unexpected places — in the activist who changed a neighbourhood, the craftsman who gave fifty years to a single skill, the immigrant who rebuilt a life from nothing, the teacher whose name a hundred people still carry with them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-12">Core Objectives</h2>
          <div className="flex flex-col divide-y divide-border">
            {OBJECTIVES.map((obj, i) => (
              <div key={i} className="flex items-start gap-8 py-8">
                <span className="font-serif text-2xl text-muted-foreground/40 shrink-0 w-8 text-right">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-lg text-foreground leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-12">Who We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AUDIENCES.map((aud) => (
              <div key={aud.label} className="p-8 border border-border rounded-sm hover:border-primary/40 transition-colors">
                <h3 className="font-serif text-xl mb-3">{aud.label}</h3>
                <p className="text-muted-foreground leading-relaxed">{aud.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-16">
            <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-4">Work Plan</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-background">Phase by Phase</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PHASES.map((phase) => (
              <div key={phase.number} className="p-8 border border-background/10 rounded-sm">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-medium uppercase tracking-widest text-background/40">{phase.number}</span>
                  <span className="text-xs font-medium text-primary/80 border border-primary/30 px-2 py-1 rounded-sm uppercase tracking-widest">
                    {phase.period}
                  </span>
                </div>
                <h4 className="font-serif text-2xl text-background mb-6">{phase.label}</h4>
                <ul className="flex flex-col gap-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-background/60 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participate */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Be Part of the Archive</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            If you know someone whose story deserves to be told — or carry a story of your own — we want to hear it. Memoirs is a platform for any voice, any background, any life that holds meaning for others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contribute"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Share a Story
            </Link>
            <Link
              href="/stories"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-border px-8 text-sm font-medium transition-colors hover:bg-accent"
            >
              Browse the Archive
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

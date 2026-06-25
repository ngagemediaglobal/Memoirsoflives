import { useState } from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { useGetMemoirStats, useGetFeaturedMemoirs, useGetRecentMemoirs, useSubscribeNewsletter, useListStoreProducts } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

const PLATFORMS = [
  {
    name: "YouTube",
    description: "Watch full episodes",
    href: "https://www.youtube.com/@Memoirs_ng",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Spotify",
    description: "Listen on the go",
    href: "https://spotify.com/show/memoirs",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: "Apple Podcasts",
    description: "Subscribe & listen",
    href: "https://podcasts.apple.com/podcast/memoirs",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.003 0C5.374 0 0 5.374 0 12.003c0 6.628 5.374 12.002 12.003 12.002 6.628 0 12.002-5.374 12.002-12.002C24.005 5.374 18.631 0 12.003 0zm0 4.37a7.633 7.633 0 0 1 7.633 7.633c0 4.215-3.418 7.633-7.633 7.633A7.633 7.633 0 0 1 4.37 12.003 7.633 7.633 0 0 1 12.003 4.37zm0 1.527a6.106 6.106 0 0 0-6.106 6.106 6.106 6.106 0 0 0 6.106 6.106 6.106 6.106 0 0 0 6.106-6.106 6.106 6.106 0 0 0-6.106-6.106zm0 2.29c.422 0 .764.342.764.764v4.585c0 .422-.342.764-.764.764a.764.764 0 0 1-.764-.764V8.951c0-.422.342-.764.764-.764zm0 6.87a.955.955 0 0 1 .955.955.955.955 0 0 1-.955.955.955.955 0 0 1-.955-.955.955.955 0 0 1 .955-.955z"/>
      </svg>
    ),
  },
];


function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const { mutate, isPending } = useSubscribeNewsletter({
    mutation: {
      onSuccess: (data) => {
        setMessage(data.message);
        setSubmitted(true);
      },
      onError: () => {
        setMessage("Something went wrong. Please try again.");
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    mutate({ data: { email: email.trim(), name: name.trim() || null } });
  };

  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <span className="inline-block mb-6 px-3 py-1 border border-background/20 text-background/50 text-xs font-medium uppercase tracking-widest rounded-sm">
          Stay Connected
        </span>
        <h2 className="text-3xl md:text-4xl font-serif mb-4">
          Stories delivered to your inbox.
        </h2>
        <p className="text-background/60 leading-relaxed mb-10 max-w-lg mx-auto">
          Subscribe for new story excerpts, episode alerts, and updates from the Memoirs archive — never more than once a week.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-serif text-background/90">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 w-full rounded-sm bg-background/10 border border-background/20 px-4 text-sm text-background placeholder:text-background/40 focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-sm bg-background/10 border border-background/20 px-4 text-sm text-background placeholder:text-background/40 focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
            {message && (
              <p className="text-sm text-destructive-foreground bg-destructive/20 px-3 py-2 rounded-sm text-left">{message}</p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="h-12 rounded-sm bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Subscribing…" : "Subscribe"}
            </button>
            <p className="text-xs text-background/30 mt-1">
              No spam. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useGetMemoirStats();
  const { data: featuredMemoirs, isLoading: featuredLoading } = useGetFeaturedMemoirs();
  const { data: recentMemoirs, isLoading: recentLoading } = useGetRecentMemoirs();
  const { data: storeProducts, isLoading: storeLoading } = useListStoreProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 lg:py-44 bg-foreground text-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block mb-8 px-3 py-1 border border-background/20 text-background/60 text-xs font-medium uppercase tracking-widest rounded-sm">
              Storytelling Platform
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-medium leading-tight tracking-tight mb-8">
              Stories that deserve<br />to outlive their tellers.
            </h1>
            <p className="text-xl md:text-2xl text-background/70 mb-12 max-w-2xl leading-relaxed font-serif">
              Memoirs is a storytelling platform that documents the lives, experiences, and wisdom of remarkable people — public figures, community voices, and everyday individuals whose stories hold value for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href="/request"
                className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Request a Memoir
              </Link>
              <a
                href="https://www.youtube.com/@Memoirs_ng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-background/20 bg-transparent px-8 text-sm font-medium text-background transition-colors hover:bg-background/10"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Watch on YouTube
              </a>
              <Link
                href="/stories"
                className="inline-flex h-12 items-center justify-center rounded-sm border border-background/20 bg-transparent px-8 text-sm font-medium text-background transition-colors hover:bg-background/10"
              >
                Read the Archive
              </Link>
            </div>

            {/* Platform Links */}
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-xs font-medium uppercase tracking-widest text-background/40">Also available on</span>
              <a href="https://spotify.com/show/memoirs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/50 hover:text-background/90 transition-colors text-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                Spotify
              </a>
              <a href="https://podcasts.apple.com/podcast/memoirs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/50 hover:text-background/90 transition-colors text-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12.003 0C5.374 0 0 5.374 0 12.003c0 6.628 5.374 12.002 12.003 12.002 6.628 0 12.002-5.374 12.002-12.002C24.005 5.374 18.631 0 12.003 0zm0 4.37a7.633 7.633 0 0 1 7.633 7.633c0 4.215-3.418 7.633-7.633 7.633A7.633 7.633 0 0 1 4.37 12.003 7.633 7.633 0 0 1 12.003 4.37zm0 1.527a6.106 6.106 0 0 0-6.106 6.106 6.106 6.106 0 0 0 6.106 6.106 6.106 6.106 0 0 0 6.106-6.106 6.106 6.106 0 0 0-6.106-6.106zm0 2.29c.422 0 .764.342.764.764v4.585c0 .422-.342.764-.764.764a.764.764 0 0 1-.764-.764V8.951c0-.422.342-.764.764-.764zm0 6.87a.955.955 0 0 1 .955.955.955.955 0 0 1-.955.955.955.955 0 0 1-.955-.955.955.955 0 0 1 .955-.955z"/></svg>
                Apple Podcasts
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif text-primary">
                {statsLoading ? <Skeleton className="h-12 w-20" /> : stats?.totalMemoirs || 0}
              </span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Stories Archived</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif text-primary">
                {statsLoading ? <Skeleton className="h-12 w-20" /> : stats?.totalContributors || 0}
              </span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Contributors</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif text-primary">
                {statsLoading ? <Skeleton className="h-12 w-20" /> : stats?.totalCategories || 0}
              </span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Collections</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif text-primary">3</span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Platforms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Watch & Listen Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Watch &amp; Listen</h2>
            <p className="text-muted-foreground max-w-2xl">
              Memoirs stories come to life across video, audio, and written formats — available on YouTube and all major podcast platforms so every story reaches the widest possible audience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLATFORMS.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-6 p-8 border border-border rounded-sm bg-background hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-sm bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {platform.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-1 group-hover:text-primary transition-colors">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-primary flex items-center gap-2 mt-auto">
                  Open
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 transition-transform group-hover:translate-x-1"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lives */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Featured Lives</h2>
              <p className="text-muted-foreground max-w-2xl">Stories of profound impact — curated from the archive.</p>
            </div>
            <Link href="/stories" className="hidden md:inline-flex text-sm font-medium text-primary hover:underline underline-offset-4">
              Full archive
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="w-full aspect-[4/5] rounded-sm" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            ) : featuredMemoirs?.length === 0 ? (
              <p className="text-muted-foreground col-span-3 text-center py-12">No featured stories yet.</p>
            ) : featuredMemoirs?.map(memoir => (
              <Link key={memoir.id} href={`/stories/${memoir.id}`} className="group flex flex-col gap-6">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-sm">
                  {memoir.imageUrl ? (
                    <img
                      src={memoir.imageUrl}
                      alt={memoir.subjectName}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                      <span className="font-serif text-4xl text-muted-foreground opacity-50 italic">
                        {memoir.subjectName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium uppercase tracking-widest text-foreground rounded-sm">
                      {memoir.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-serif group-hover:text-primary transition-colors">
                    {memoir.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <span>{memoir.subjectName}</span>
                    {memoir.subjectAge && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span>Age {memoir.subjectAge}</span>
                      </>
                    )}
                  </div>
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                    {memoir.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Additions */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-16 text-center">Recently Added</h2>

          <div className="flex flex-col gap-12">
            {recentLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-6 border-b border-border pb-12">
                  <Skeleton className="w-24 h-32 shrink-0 rounded-sm" />
                  <div className="flex-1 flex flex-col gap-3">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))
            ) : recentMemoirs?.map(memoir => (
              <Link key={memoir.id} href={`/stories/${memoir.id}`} className="group flex flex-col sm:flex-row gap-8 items-start border-b border-border pb-12 last:border-0 hover:bg-muted/30 p-4 -mx-4 rounded-sm transition-colors">
                <div className="w-full sm:w-32 aspect-[3/4] shrink-0 bg-muted overflow-hidden rounded-sm">
                  {memoir.imageUrl && (
                    <img
                      src={memoir.imageUrl}
                      alt={memoir.subjectName}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium uppercase tracking-widest text-primary">
                      {memoir.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(memoir.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif group-hover:text-primary transition-colors">
                    {memoir.title}
                  </h3>
                  <div className="text-sm font-medium">
                    {memoir.subjectName} {memoir.subjectAge && <span className="text-muted-foreground">— Age {memoir.subjectAge}</span>}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    {memoir.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/stories"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View Full Archive
            </Link>
          </div>
        </div>
      </section>

      {/* Legacy Store Preview */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">Legacy Store</span>
              <h2 className="text-3xl md:text-4xl font-serif">Gifts that outlive the moment.</h2>
              <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
                Thoughtfully designed items for preserving stories and honouring the people who shaped your life.
              </p>
            </div>
            <Link
              href="/store"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 shrink-0 ml-8"
            >
              Shop all
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {storeLoading
              ? [...Array(4)].map((_, i) => (
                  <div key={i} className="border border-border rounded animate-pulse">
                    <div className="aspect-square bg-muted/50 rounded-t" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted/50 rounded w-3/4" />
                      <div className="h-3 bg-muted/30 rounded w-full" />
                    </div>
                  </div>
                ))
              : storeProducts?.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    href="/store"
                    className="group flex flex-col border border-border rounded hover:border-primary/40 transition-all duration-200 bg-background"
                  >
                    <div className="aspect-square bg-muted/30 rounded-t flex items-center justify-center relative">
                      {product.featured && (
                        <span className="absolute top-2 left-2 text-xs font-medium bg-primary/15 text-primary px-2 py-0.5 rounded-sm">
                          Popular
                        </span>
                      )}
                      <span className="text-4xl">
                        {{ journals: "📔", keepsakes: "🎁", gifts: "🃏", stationery: "✉️" }[product.category] ?? "📦"}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{product.tagline}</p>
                      <p className="text-sm font-semibold mt-3">
                        {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(product.priceKobo / 100)}
                      </p>
                    </div>
                  </Link>
                ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/store"
              className="inline-flex h-11 items-center justify-center rounded-sm border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Shop all items
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSection />

      {/* CTA Banner */}
      <section className="py-24 bg-primary/5 border-y border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Know a story that deserves to be told?</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed text-lg">
            Every life contains a universe of experience. Whether it belongs to a public figure, a community pillar, a family member, or a person whose name no one yet knows — if the story has value, it belongs here.
          </p>
          <Link
            href="/contribute"
            className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-10 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Share a Story
          </Link>
        </div>
      </section>
    </div>
  );
}

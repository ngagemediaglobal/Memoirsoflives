import { Link } from "wouter";
import { format } from "date-fns";
import { useGetMemoirStats, useGetFeaturedMemoirs, useGetRecentMemoirs } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useGetMemoirStats();
  const { data: featuredMemoirs, isLoading: featuredLoading } = useGetFeaturedMemoirs();
  const { data: recentMemoirs, isLoading: recentLoading } = useGetRecentMemoirs();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 lg:py-40 bg-foreground text-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight tracking-tight mb-8">
              A sacred archive<br />of human lives.
            </h1>
            <p className="text-xl md:text-2xl text-background/80 mb-12 max-w-2xl leading-relaxed font-serif">
              We preserve the stories of those who lived deeply, so future generations may find wisdom in their words.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/stories"
                className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Read Stories
              </Link>
              <Link
                href="/contribute"
                className="inline-flex h-12 items-center justify-center rounded-sm border border-background/20 bg-transparent px-8 text-sm font-medium text-background transition-colors hover:bg-background/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Share a Memory
              </Link>
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
                {statsLoading ? <Skeleton className="h-12 w-24" /> : stats?.totalMemoirs || 0}
              </span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Stories Preserved</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif text-primary">
                {statsLoading ? <Skeleton className="h-12 w-24" /> : stats?.totalContributors || 0}
              </span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Contributors</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif text-primary">
                {statsLoading ? <Skeleton className="h-12 w-24" /> : stats?.totalCategories || 0}
              </span>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Collections</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Memoirs */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Featured Lives</h2>
              <p className="text-muted-foreground max-w-2xl">Stories of profound impact, curated from our archive.</p>
            </div>
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
              className="inline-flex h-12 items-center justify-center rounded-sm border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              View All Archive
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

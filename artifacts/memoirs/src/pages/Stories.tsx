import { useState } from "react";
import { Link } from "wouter";
import { useListMemoirs, useListCategories } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  
  const { data: categories, isLoading: categoriesLoading } = useListCategories();
  const { data: memoirs, isLoading: memoirsLoading } = useListMemoirs({
    category: activeCategory
  });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mb-16">
        <h1 className="text-5xl md:text-6xl font-serif mb-6">The Archive</h1>
        <p className="text-xl text-muted-foreground font-serif leading-relaxed">
          Browse the collected stories. Each entry is a testament to a life lived, 
          preserved for those who seek to understand the human experience.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0 md:sticky md:top-28">
          <h3 className="font-medium uppercase tracking-widest text-sm mb-6 text-muted-foreground">Collections</h3>
          {categoriesLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-6 w-5/6" />
            </div>
          ) : (
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setActiveCategory(undefined)}
                  className={cn(
                    "text-left w-full transition-colors hover:text-foreground text-sm font-medium",
                    !activeCategory ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  All Stories
                </button>
              </li>
              {categories?.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.name)}
                    className={cn(
                      "text-left w-full transition-colors hover:text-foreground text-sm flex items-center justify-between font-medium",
                      activeCategory === category.name ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs opacity-50">{category.memoirCount}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Stories Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
          {memoirsLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="w-full aspect-[4/5] rounded-sm" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          ) : memoirs?.length === 0 ? (
            <div className="col-span-full py-24 text-center">
              <p className="text-muted-foreground text-lg mb-4">No stories found in this collection yet.</p>
              <button 
                onClick={() => setActiveCategory(undefined)}
                className="text-primary hover:underline font-medium"
              >
                View all stories
              </button>
            </div>
          ) : memoirs?.map(memoir => (
            <Link key={memoir.id} href={`/stories/${memoir.id}`} className="group flex flex-col gap-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-sm">
                {memoir.imageUrl ? (
                  <img 
                    src={memoir.imageUrl} 
                    alt={memoir.subjectName} 
                    className="object-cover w-full h-full filter grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                    <span className="font-serif text-4xl text-muted-foreground opacity-50 italic">
                      {memoir.subjectName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-center gap-2 text-white/90 text-xs font-medium uppercase tracking-widest">
                    <span>{memoir.category}</span>
                    {memoir.readTimeMinutes && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-white/50" />
                        <span>{memoir.readTimeMinutes} min read</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-serif group-hover:text-primary transition-colors leading-tight">
                  {memoir.title}
                </h3>
                <div className="text-sm font-medium mt-1">
                  {memoir.subjectName}
                </div>
                <p className="text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                  {memoir.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

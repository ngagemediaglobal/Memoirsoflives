import { useParams } from "wouter";
import { useGetMemoir, getGetMemoirQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function StoryDetail() {
  const params = useParams();
  const id = Number(params.id);
  
  const { data: memoir, isLoading, error } = useGetMemoir(id, {
    query: {
      enabled: !!id,
      queryKey: getGetMemoirQueryKey(id)
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-6 w-1/2 mb-12" />
        <Skeleton className="w-full aspect-[21/9] mb-12" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error || !memoir) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-serif mb-4">Story not found</h2>
        <p className="text-muted-foreground">The story you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <article className="pb-24">
      {/* Header */}
      <header className="pt-16 pb-12 md:pt-24 md:pb-16 text-center max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            {memoir.category}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {memoir.readTimeMinutes ? `${memoir.readTimeMinutes} min read` : "Read story"}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8">
          {memoir.title}
        </h1>
        
        <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
          <div className="font-serif text-xl text-foreground">
            {memoir.subjectName}
          </div>
          <div className="text-sm">
            {memoir.subjectTitle && <span>{memoir.subjectTitle}</span>}
            {memoir.subjectTitle && memoir.subjectAge && <span className="mx-2">•</span>}
            {memoir.subjectAge && <span>Age {memoir.subjectAge}</span>}
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {memoir.imageUrl && (
        <div className="w-full max-w-6xl mx-auto px-4 mb-16 md:mb-24">
          <div className="aspect-[21/9] sm:aspect-[2.5/1] overflow-hidden rounded-sm bg-muted relative">
            <img 
              src={memoir.imageUrl} 
              alt={memoir.subjectName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="prose prose-lg md:prose-xl prose-stone mx-auto font-sans leading-relaxed text-foreground/90">
          <p className="lead font-serif text-2xl md:text-3xl text-foreground mb-12 italic opacity-90">
            {memoir.excerpt}
          </p>
          
          <div 
            className="whitespace-pre-wrap font-serif"
            dangerouslySetInnerHTML={{ __html: memoir.fullStory }}
          />
        </div>
        
        <div className="mt-20 pt-10 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Archived on {format(new Date(memoir.createdAt), "MMMM d, yyyy")}
          </div>
        </div>
      </div>
    </article>
  );
}

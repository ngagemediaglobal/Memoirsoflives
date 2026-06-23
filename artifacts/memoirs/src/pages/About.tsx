export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="text-4xl md:text-6xl font-serif mb-8 text-center">About Memoirs</h1>
      
      <div className="prose prose-lg md:prose-xl prose-stone mx-auto font-serif leading-relaxed text-foreground/90">
        <p className="lead italic text-2xl text-center text-muted-foreground mb-12">
          "To be forgotten is to die twice. To be remembered is to live forever."
        </p>

        <p>
          Memoirs was born from a simple, profound realization: every single human life contains an entire universe of experience, and most of those universes vanish when the person passes.
        </p>

        <p>
          We build monuments to presidents and generals, we write biographies of billionaires and celebrities, but the deepest wisdom often lives quietly next door. The grandmother who survived a war with her joy intact. The quiet teacher who changed the trajectory of a hundred lives. The craftsman who spent fifty years perfecting a single skill.
        </p>

        <h2 className="text-3xl font-serif mt-12 mb-6 text-foreground">Our Mission</h2>

        <p>
          This is a sacred archive. It is not a social network. There are no likes, no comments, no algorithmic feeds designed to hijack your attention. It is a digital library in a noisy world—a quiet place where extraordinary ordinary people are remembered.
        </p>

        <p>
          We exist to preserve the texture of human lives. We want the small details, the turning points, the hard-won wisdom, the heartbreaks, and the quiet triumphs. We want the stories that matter.
        </p>

        <div className="bg-muted p-8 my-12 rounded-sm border-l-4 border-primary">
          <h3 className="font-serif text-xl mb-4 text-foreground mt-0">Contribute to the Archive</h3>
          <p className="text-base font-sans m-0">
            If you hold the memory of someone whose story deserves to outlast them, we invite you to leave it here. Write it with care. Write it with love. Make it worthy of the life it represents.
          </p>
        </div>
      </div>
    </div>
  );
}

import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <span className="font-serif text-2xl font-bold italic tracking-tighter opacity-90">
            Memoirs
          </span>
          <p className="mt-6 max-w-sm text-background/70 leading-relaxed">
            A sacred archive of human lives. We preserve the stories of those who lived deeply, 
            so future generations may find wisdom in their words.
          </p>
        </div>
        
        <div>
          <h4 className="font-serif text-lg mb-6">Explore</h4>
          <ul className="space-y-4 text-background/70">
            <li>
              <Link href="/stories" className="hover:text-white transition-colors">All Stories</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">Our Mission</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-serif text-lg mb-6">Participate</h4>
          <ul className="space-y-4 text-background/70">
            <li>
              <Link href="/contribute" className="hover:text-white transition-colors">Share a Memory</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-background/10 text-center text-background/50 text-sm">
        <p>&copy; {new Date().getFullYear()} Memoirs Initiative. All rights reserved.</p>
      </div>
    </footer>
  );
}

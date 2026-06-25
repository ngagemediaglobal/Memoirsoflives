import { Link } from "wouter";
import logoFull from "@assets/Asset_1-1_1782271796331.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <img
            src={logoFull}
            alt="Memoirs"
            className="h-9 w-auto"
          />
          <p className="mt-6 max-w-sm text-background/60 leading-relaxed">
            A video storytelling initiative preserving the untold lives, wisdom, and experiences of elders and public figures — for posterity, inspiration, and the generations that follow.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <a
              href="https://youtube.com/@memoirsinitiative"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-background/40 hover:text-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/memoirs.ng?igsh=MWRwbm8wZXBnYmRndQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-background/40 hover:text-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://spotify.com/show/memoirs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="text-background/40 hover:text-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </a>
            <a
              href="https://podcasts.apple.com/podcast/memoirs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apple Podcasts"
              className="text-background/40 hover:text-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.003 0C5.374 0 0 5.374 0 12.003c0 6.628 5.374 12.002 12.003 12.002 6.628 0 12.002-5.374 12.002-12.002C24.005 5.374 18.631 0 12.003 0zm0 4.37a7.633 7.633 0 0 1 7.633 7.633c0 4.215-3.418 7.633-7.633 7.633A7.633 7.633 0 0 1 4.37 12.003 7.633 7.633 0 0 1 12.003 4.37zm0 1.527a6.106 6.106 0 0 0-6.106 6.106 6.106 6.106 0 0 0 6.106 6.106 6.106 6.106 0 0 0 6.106-6.106 6.106 6.106 0 0 0-6.106-6.106zm0 2.29c.422 0 .764.342.764.764v4.585c0 .422-.342.764-.764.764a.764.764 0 0 1-.764-.764V8.951c0-.422.342-.764.764-.764zm0 6.87a.955.955 0 0 1 .955.955.955.955 0 0 1-.955.955.955.955 0 0 1-.955-.955.955.955 0 0 1 .955-.955z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Explore</h4>
          <ul className="space-y-4 text-background/60">
            <li><Link href="/stories" className="hover:text-primary transition-colors">All Stories</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Mission</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">The Roadmap</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Participate</h4>
          <ul className="space-y-4 text-background/60">
            <li><Link href="/contribute" className="hover:text-primary transition-colors">Share a Memory</Link></li>
            <li><a href="https://youtube.com/@memoirsinitiative" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Watch on YouTube</a></li>
            <li><a href="https://spotify.com/show/memoirs" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Listen on Spotify</a></li>
            <li><a href="https://podcasts.apple.com/podcast/memoirs" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Apple Podcasts</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-background/10 text-center text-background/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Memoirs Initiative. All rights reserved.</p>
      </div>
    </footer>
  );
}

import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import logoFull from "@assets/Asset_1-1_1782271796331.png";

export function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/stories", label: "Archive" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src={logoFull}
            alt="Memoirs"
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://youtube.com/@memoirsinitiative"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Watch
          </a>
          <div className="h-4 w-px bg-border mx-2" />
          <Link
            href="/contribute"
            className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Share a Story
          </Link>
        </nav>
      </div>
    </header>
  );
}

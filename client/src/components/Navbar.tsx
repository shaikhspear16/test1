import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@assets/GIC_Logo_Brown_1768797787406.webp";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Education", href: "/education" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50">
      <a
        href="https://mohid.co/go/YQWPllK"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-amber-600 text-white text-center text-sm font-semibold py-2 px-4 hover:bg-amber-700 transition-colors"
        data-testid="link-announcement-bar"
      >
        🌙 Last 10 Nights of Ramadan — Automate Your Donations →
      </a>

      <div className="bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto container px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <img src={logo} alt="GIC Logo" className="h-12 w-auto" width={56} height={42} />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary leading-tight">Georgetown</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Islamic Center</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`hover:text-primary transition-colors ${location === link.href ? "text-primary font-bold" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/donate">
              <Button data-testid="button-donate" className="bg-primary hover:bg-primary/90 text-white rounded-full px-4 sm:px-6 text-sm sm:text-base">
                <Heart className="mr-1 sm:mr-2 h-4 w-4" /> Donate
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out grid ${isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="bg-background border-b border-border/50 px-4 py-6 max-w-7xl mx-auto container flex flex-col gap-4 text-lg font-medium">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={location === link.href ? "text-primary font-bold" : "hover:text-primary transition-colors"} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Heart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@assets/GIC_Logo_Brown_1768797787406.webp";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Education", href: "/education" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Funeral", href: "/services#funeral-services" },
      { name: "Marriage", href: "/services#marriage-services" },
    ],
  },
  { name: "Calendar", href: "/calendar" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50">
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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative group">
                  {/* Trigger */}
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 hover:text-primary transition-colors ${location === link.href ? "text-primary font-bold" : ""}`}
                  >
                    {link.name}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150">
                    <div className="bg-background border border-border/60 rounded-lg shadow-lg py-1 min-w-[140px]">
                      {link.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-primary transition-colors ${location === link.href ? "text-primary font-bold" : ""}`}
                >
                  {link.name}
                </Link>
              )
            )}
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

        {/* Mobile nav */}
        <div
          className={`md:hidden overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out grid ${isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="bg-background border-b border-border/50 px-4 py-6 max-w-7xl mx-auto container flex flex-col gap-4 text-lg font-medium">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href}>
                    <button
                      className={`flex items-center gap-1 w-full text-left ${location === link.href ? "text-primary font-bold" : "hover:text-primary transition-colors"}`}
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      {link.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      className={`overflow-hidden transition-[grid-template-rows,opacity] duration-200 grid ${mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="flex flex-col gap-3 pl-4 pt-3">
                          {link.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              className="text-base text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={location === link.href ? "text-primary font-bold" : "hover:text-primary transition-colors"}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

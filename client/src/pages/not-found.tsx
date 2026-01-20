import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X,
  AlertCircle,
  Home as HomeIcon
} from "lucide-react";
import { Button as UIButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@assets/GIC_Logo_Brown_1768797787406.png";

export default function NotFound() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto container px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <img src={logo} alt="GIC Logo" className="h-12 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary leading-tight">Georgetown</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Islamic Center</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/education" className="hover:text-primary transition-colors">Education</Link>
            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/donate" className="hidden sm:block">
              <UIButton className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                <Heart className="mr-2 h-4 w-4" /> Donate
              </UIButton>
            </Link>

            <UIButton 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </UIButton>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border/50 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto container px-4 py-6 flex flex-col gap-4 text-lg font-medium">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/education" onClick={() => setIsMenuOpen(false)}>Education</Link>
                <Link href="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link href="/donate" className="sm:hidden" onClick={() => setIsMenuOpen(false)}>
                  <UIButton className="w-full bg-primary text-white rounded-full">
                    <Heart className="mr-2 h-4 w-4" /> Donate
                  </UIButton>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow flex items-center justify-center bg-secondary/10 py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <AlertCircle className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-4xl font-black text-primary mb-4 leading-tight">404</h2>
              <h3 className="text-xl font-bold mb-4">Page Not Found</h3>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                The page you are looking for might have been moved or doesn't exist.
              </p>
              <Link href="/">
                <UIButton size="lg" className="rounded-full bg-primary px-10">
                  <HomeIcon className="mr-2 h-4 w-4" /> Back to Home
                </UIButton>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto container px-4">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={logo} alt="GIC Logo" className="h-10 brightness-0 invert" />
                <span className="text-xl font-bold">Georgetown Islamic Center</span>
              </div>
              <p className="text-background/60 mb-8 max-w-sm">
                Serving the spiritual and social needs of the Muslim community in Georgetown, Round Rock, and surrounding areas.
              </p>
              <div className="flex gap-4">
                <UIButton size="icon" variant="outline" className="rounded-full border-background/20 hover:bg-background/10">
                  <Youtube className="h-4 w-4" />
                </UIButton>
                <UIButton size="icon" variant="outline" className="rounded-full border-background/20 hover:bg-background/10">
                  <Mail className="h-4 w-4" />
                </UIButton>
                <UIButton size="icon" variant="outline" className="rounded-full border-background/20 hover:bg-background/10">
                  <Phone className="h-4 w-4" />
                </UIButton>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Location</h4>
              <div className="flex gap-3 text-background/60">
                <MapPin className="h-5 w-5 shrink-0" />
                <p>7275 Co Rd 110,<br/>Round Rock, TX 78665</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Contact</h4>
              <div className="space-y-4 text-background/60">
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0" />
                  <p>512-522-4595</p>
                </div>
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0" />
                  <p>info@gicmasjid.org</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/10 mt-16 pt-8 text-center text-sm text-background/40">
            © {new Date().getFullYear()} Georgetown Islamic Center. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

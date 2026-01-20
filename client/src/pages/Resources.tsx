import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  UserPlus, 
  Heart, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Clock,
  HandHelping,
  Library,
  BookOpen,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@assets/GIC_Logo_Brown_1768797787406.png";

const RESOURCE_GROUPS = [
  {
    title: "Services & Support",
    icon: HandHelping,
    resources: [
      { name: "Imam's Office Hours", link: "#", icon: Clock },
      { name: "Funeral Services", link: "https://www.gicmasjid.org/funeral-services", icon: MapPin },
      { name: "GAMRC Relief Application", link: "https://www.gamrc.org/relief", icon: FileText },
      { name: "SMS Consent Form", link: "https://us.mohid.co/tx/austin/gic/masjid/online/donation", icon: MessageSquare }
    ]
  },
  {
    title: "New Muslim Resources",
    icon: UserPlus,
    resources: [
      { name: "New Muslim Resource Guide", link: "#", icon: BookOpen },
      { name: "New Muslim Contact Form", link: "https://bit.ly/gic_new_muslim", icon: FileText }
    ]
  },
  {
    title: "Forms & Requests",
    icon: FileText,
    resources: [
      { name: "Nikkah Request Form", link: "https://bit.ly/gic_nikkah", icon: Heart },
      { name: "Ramadan Excuse Letter", link: "#", icon: FileText },
      { name: "Eid Excuse Letter", link: "#", icon: FileText }
    ]
  }
];

const ISLAM_RESOURCES = [
  { name: "Why Islam?", link: "https://www.whyislam.org", description: "Clear and concise answers to common questions about Islam." },
  { name: "Islam Religion", link: "https://www.islamreligion.com", description: "Comprehensive articles and videos on the core beliefs and practices." },
  { name: "The Quran in English", link: "https://quran.com", description: "Read and listen to the translation of the Holy Quran." }
];

export default function Resources() {
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
            <Link href="/resources" className="hover:text-primary transition-colors text-primary font-bold">Resources</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/donate" className="hidden sm:block">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                <Heart className="mr-2 h-4 w-4" /> Donate
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
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
                <Link href="/resources" className="text-primary font-bold" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link href="/donate" className="sm:hidden" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary text-white rounded-full">
                    <Heart className="mr-2 h-4 w-4" /> Donate
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 hero-gradient">
          <div className="max-w-7xl mx-auto container px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
                Community Hub
              </Badge>
              <h2 className="text-5xl font-black mb-6">Community <span className="text-primary italic">Resources</span></h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Access essential services, forms, and educational materials to support your journey and community life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Islam Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
              <div className="bg-secondary/30 p-8 rounded-3xl border border-primary/5 shadow-inner flex-1">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Library className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Understanding Islam</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Islam is a complete way of life centered around the submission to the will of Allah (One God) 
                  and following the teachings of Prophet Muhammad (peace be upon him). We believe in faith, 
                  prayer, charity, fasting, and the pilgrimage.
                </p>
                <div className="space-y-4">
                  {ISLAM_RESOURCES.map((res) => (
                    <a 
                      key={res.name} 
                      href={res.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block p-4 bg-white rounded-2xl border border-border/50 hover:border-primary/30 transition-all shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-primary">{res.name}</span>
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">{res.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-12 bg-secondary/10">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {RESOURCE_GROUPS.map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 bg-white/50 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="bg-primary/5 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <group.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl">{group.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border/50">
                        {group.resources.map((res) => (
                          <a 
                            key={res.name} 
                            href={res.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <res.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              <span className="text-sm font-medium">{res.name}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
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
                <Button size="icon" variant="outline" className="rounded-full border-background/20 hover:bg-background/10">
                  <Youtube className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full border-background/20 hover:bg-background/10">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full border-background/20 hover:bg-background/10">
                  <Phone className="h-4 w-4" />
                </Button>
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

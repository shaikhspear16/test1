import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight, 
  Youtube, 
  ArrowRight,
  Bell,
  Heart,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import logo from "@assets/GIC_Logo_Brown_1768797787406.png";
import flyer1 from "@assets/arabic_1768797774024.jpeg";
import flyer2 from "@assets/ramadan_1768797774026.jpeg";
import flyer3 from "@assets/tafsir_1768797774026.jpeg";

const PRAYER_TIMES = [
  { name: "Fajr", time: "5:45 AM", iqamah: "6:15 AM" },
  { name: "Dhuhr", time: "12:35 PM", iqamah: "1:00 PM" },
  { name: "Asr", time: "3:45 PM", iqamah: "4:15 PM" },
  { name: "Maghrib", time: "6:05 PM", iqamah: "6:10 PM" },
  { name: "Isha", time: "7:25 PM", iqamah: "7:45 PM" },
  { name: "Jumu'ah 1", time: "1:15 PM", iqamah: "1:30 PM" },
  { name: "Jumu'ah 2", time: "2:15 PM", iqamah: "2:30 PM" },
];

const FLYERS = [flyer1, flyer2, flyer3];

export default function Home() {
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="GIC Logo" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary leading-tight">Georgetown</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Islamic Center</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="/" className="hover:text-primary transition-colors text-primary font-bold">Home</a>
            <a href="#" className="hover:text-primary transition-colors">Events</a>
            <a href="/education" className="hover:text-primary transition-colors">Education</a>
            <a href="/resources" className="hover:text-primary transition-colors">Resources</a>
            <a href="/about" className="hover:text-primary transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="/donate" className="hidden sm:block">
              <Button data-testid="button-donate" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                <Heart className="mr-2 h-4 w-4" /> Donate
              </Button>
            </a>

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
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4 text-lg font-medium">
                <a href="/" className="text-primary font-bold" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Events</a>
                <a href="/education" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Education</a>
                <a href="/resources" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Resources</a>
                <a href="/about" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="/donate" className="sm:hidden" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary text-white rounded-full">
                    <Heart className="mr-2 h-4 w-4" /> Donate
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 hero-gradient">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/20 px-3 py-1">
                  Welcome to GIC
                </Badge>
                <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                  A Place for <span className="text-primary italic">Faith</span> and Community
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                  Join us at Georgetown Islamic Center as we grow together in knowledge, 
                  worship, and service to our community in the heart of Texas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/donate">
                    <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                      Donate Now
                    </Button>
                  </a>
                  <a href="#about">
                    <Button size="lg" variant="outline" className="rounded-full px-8">
                      Learn More
                    </Button>
                  </a>
                </div>
              </motion.div>

              {/* Prayer Times Table - Visible Early */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative lg:justify-self-end w-full max-w-md"
              >
                <Card className="shadow-2xl border-none bg-white/95 backdrop-blur-sm overflow-hidden">
                  <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-bold text-sm">Prayer Times</span>
                    </div>
                    <span className="text-xs opacity-90">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                      {PRAYER_TIMES.map((prayer) => (
                        <div key={prayer.name} className="flex items-center justify-between px-4 py-2 hover:bg-muted/30 transition-colors">
                          <span className="font-semibold text-base w-24">{prayer.name}</span>
                          <div className="flex gap-4 text-right flex-1 justify-end">
                            <div className="min-w-[60px]">
                              <p className="text-[9px] uppercase tracking-tighter text-muted-foreground">Begins</p>
                              <p className="font-medium text-sm">{prayer.time}</p>
                            </div>
                            <div className="min-w-[60px]">
                              <p className="text-[9px] uppercase tracking-tighter text-muted-foreground italic">Iqamah</p>
                              <p className="font-bold text-primary text-sm">{prayer.iqamah}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Event Flyer Gallery */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h3 className="text-4xl font-bold mb-4">Upcoming Events</h3>
                <p className="text-muted-foreground max-w-xl">Stay connected with our community through educational seminars, youth programs, and family gatherings.</p>
              </div>
              <Button variant="ghost" className="group">
                View All Events <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <Carousel 
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                {FLYERS.map((flyer, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-4">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="rounded-2xl overflow-hidden shadow-lg border border-border"
                    >
                      <img src={flyer} alt={`Event Flyer ${index + 1}`} className="w-full h-auto object-cover aspect-[3/4]" />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* Education Section / DUA Link */}
        <section className="py-12 bg-white border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
                Educational Partner
              </Badge>
              <h3 className="text-4xl font-bold mb-6">Darul Uloom Austin</h3>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Darul Uloom Austin (DUA) is a premier Islamic educational institution that provides holistic learning 
                at our GIC campus, serving the community since 2007.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://darululoomaustin.org" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-primary px-8">
                    Visit DUA Website
                  </Button>
                </a>
                <a href="/education">
                  <Button variant="outline" className="rounded-full px-8">
                    View Programs at GIC
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About & Video Section */}
        <section id="about" className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-black">
                {/* Embedded Youtube Mockup */}
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/qxhQ3qq2T-w" 
                  title="GIC Lectures"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-4xl font-bold mb-6">Growing Together <br/>In Texas</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  The Georgetown Islamic Center (GIC) is more than just a masjid. It's a vibrant hub for Muslims in the Round Rock and Georgetown area to connect, learn, and contribute.
                </p>
                <div className="space-y-4">
                  {[
                    "Weekly Educational Programs",
                    "Youth Mentorship & Activities",
                    "Community Outreach Initiatives",
                    "Family Support Services"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-10 rounded-full bg-primary" size="lg">
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 border-8 border-white rounded-full" />
             <div className="absolute -bottom-24 -right-24 w-96 h-96 border-8 border-white rounded-full" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <Bell className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h3 className="text-4xl font-bold mb-4">Join Our Community</h3>
            <p className="text-primary-foreground/80 mb-10 text-lg">
              Subscribe to our newsletter to receive weekly updates on prayer times, community events, and special announcements.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4">
              <Input 
                data-testid="input-email"
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full px-6 flex-grow"
              />
              <Button data-testid="button-subscribe" size="lg" className="h-14 bg-accent text-accent-foreground hover:bg-accent/90 font-bold rounded-full px-10">
                Subscribe Now
              </Button>
            </form>
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

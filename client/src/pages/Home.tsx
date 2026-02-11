import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Bell,
  Download,
  ExternalLink
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import flyer1 from "@assets/arabic_1768797774024.jpeg";
import flyer2 from "@assets/ramadan_1768797774026.jpeg";
import flyer3 from "@assets/tafsir_1768797774026.jpeg";
import flyerNoorKids from "@assets/WhatsApp_Image_2025-12-28_at_12.00.16_1768851179406.jpeg";
import flyerSistersTafseer from "@assets/WhatsApp_Image_2026-01-08_at_12.23.56_1768851179408.jpeg";
import flyerPotluck from "@assets/WhatsApp_Image_2026-01-08_at_10.29.36_1768851179408.jpeg";
import type { Event } from "@shared/schema";

const PRAYER_TIMES = [
  { name: "Fajr", time: "5:45 AM", iqamah: "6:15 AM" },
  { name: "Dhuhr", time: "12:35 PM", iqamah: "1:00 PM" },
  { name: "Asr", time: "3:45 PM", iqamah: "4:15 PM" },
  { name: "Maghrib", time: "6:05 PM", iqamah: "6:10 PM" },
  { name: "Isha", time: "7:25 PM", iqamah: "7:45 PM" },
  { name: "Jumu'ah 1", time: "1:15 PM", iqamah: "1:30 PM" },
  { name: "Jumu'ah 2", time: "2:15 PM", iqamah: "2:30 PM" },
];

interface DisplayEvent {
  id?: number;
  imageUrl: string;
  title?: string | null;
  description?: string | null;
  registrationLink?: string | null;
}

const FALLBACK_FLYERS: DisplayEvent[] = [
  { 
    imageUrl: flyerNoorKids, 
    title: "Family Night with Noor Kids", 
    registrationLink: "https://tinyurl.com/GIC-2026-NoorKids",
    description: "Join us for an engaging session with Br. Amin Aaser from Noor Kids. Featuring inspiring stories and interactive learning."
  },
  { 
    imageUrl: flyerPotluck, 
    title: "Monthly Community Potluck", 
    registrationLink: "https://tinyurl.com/GIC-Monthly-Potluck",
    description: "A monthly gathering to strengthen community bonds. Speaker: Mufti Hassan from Chicago."
  },
  { 
    imageUrl: flyerSistersTafseer, 
    title: "Sisters Tafseer Class", 
    description: "Join us as we journey through the Tafseer of the Qur'an with Imam Osama Hussain and Muallimah Umme Yahya."
  },
  { imageUrl: flyer1, title: "Arabic Language Class" },
  { imageUrl: flyer2, title: "Ramadan Prep" },
  { imageUrl: flyer3, title: "Weekly Tafsir" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [selectedFlyer, setSelectedFlyer] = useState<DisplayEvent | null>(null);

  const { data: dbEvents } = useQuery({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json() as Promise<Event[]>;
    },
  });

  const displayEvents: DisplayEvent[] = dbEvents && dbEvents.length > 0
    ? dbEvents.map(e => ({
        id: e.id,
        imageUrl: e.imageUrl,
        title: e.title,
        description: e.description,
        registrationLink: e.registrationLink,
      }))
    : FALLBACK_FLYERS;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 hero-gradient">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-12 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                  Georgetown Islamic Center
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed italic">
                  "The best among you are those who have the best manners and character." [<a href="https://sunnah.com/bukhari:6029" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">Bukhari</a>]
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link href="/donate">
                    <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                      Donate Now
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="rounded-full px-8">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative lg:justify-self-end w-full max-w-md mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/20 overflow-hidden p-2">
                  <Card className="border-none bg-transparent shadow-none">
                    <CardContent className="p-2">
                      <div className="space-y-0.5">
                        {PRAYER_TIMES.map((prayer) => (
                          <div key={prayer.name} className="flex items-center justify-between px-4 py-2 rounded-2xl hover:bg-primary/5 transition-colors group">
                            <span className="font-bold text-base text-foreground/80 group-hover:text-primary transition-colors">{prayer.name}</span>
                            <div className="flex gap-6 text-right">
                              <div className="min-w-[65px]">
                                <p className="text-[9px] uppercase tracking-tighter text-muted-foreground mb-0">Begins</p>
                                <p className="font-medium text-sm text-foreground/70">{prayer.time}</p>
                              </div>
                              <div className="min-w-[65px] bg-primary/5 rounded-xl px-2 py-0.5 border border-primary/10">
                                <p className="text-[9px] uppercase tracking-tighter text-primary/60 font-bold mb-0 italic">Iqamah</p>
                                <p className="font-black text-primary text-sm">{prayer.iqamah}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 p-1">
                        <Button 
                          variant="default" 
                          className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold h-11 shadow-lg shadow-primary/10"
                          onClick={() => window.open('https://masjidal.com/widget/monthly/?masjid_id=xwLVMDKJ', '_blank')}
                        >
                          <Download className="mr-2 h-4 w-4" /> Monthly Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Event Flyer Gallery */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">Upcoming Events</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">Stay connected with our community through educational seminars, youth programs, and family gatherings.</p>
            </div>

            <Carousel 
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                {displayEvents.map((event, index) => (
                  <CarouselItem key={event.id || index} className="md:basis-1/2 lg:basis-1/3 p-4">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="rounded-2xl overflow-hidden shadow-lg border border-border cursor-pointer"
                      onClick={() => setSelectedFlyer(event)}
                    >
                      <img src={event.imageUrl} alt={event.title || "Event"} className="w-full h-auto object-cover aspect-[3/4]" />
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

        {/* Flyer Modal */}
        <Dialog open={!!selectedFlyer} onOpenChange={(open) => !open && setSelectedFlyer(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-background/95 backdrop-blur-md">
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              <div className="flex-1 bg-black/5 flex items-center justify-center p-4">
                <img 
                  src={selectedFlyer?.imageUrl} 
                  alt={selectedFlyer?.title || "Event"} 
                  className="max-h-full max-w-full object-contain shadow-2xl rounded-lg"
                />
              </div>
              {(selectedFlyer?.description || selectedFlyer?.registrationLink) && (
                <div className="w-full md:w-80 p-8 flex flex-col justify-center bg-white border-l border-border">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-black text-primary leading-tight">{selectedFlyer?.title}</DialogTitle>
                  </DialogHeader>
                  
                  {selectedFlyer?.description && (
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {selectedFlyer.description}
                    </p>
                  )}

                  {selectedFlyer?.registrationLink && (
                    <div className="space-y-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary/60">Registration</p>
                      <a 
                        href={selectedFlyer.registrationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button className="w-full bg-primary hover:bg-primary/90 rounded-full h-12 text-base font-bold">
                          Register Now <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Education Section / DUA Link */}
        <section className="py-12 bg-white border-t border-border/50">
              <div className="max-w-7xl mx-auto container px-4">
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
                <Link href="/education">
                  <Button variant="outline" className="rounded-full px-8">
                    View Programs at GIC
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About & Video Section */}
        <section id="about" className="py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center text-center lg:text-left">
              <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-black w-full lg:flex-1">
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
              <div className="order-1 lg:order-2 lg:flex-1">
                <h3 className="text-4xl font-bold mb-6">Growing Together <br/>In Texas</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  The Georgetown Islamic Center (GIC) is more than just a masjid. It's a vibrant hub for Muslims in the Round Rock and Georgetown area to connect, learn, and contribute.
                </p>
                <div className="space-y-4 max-w-sm mx-auto lg:mx-0 text-left">
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
                <Link href="/about">
                  <Button className="mt-10 rounded-full bg-primary" size="lg">
                    Learn More About Us
                  </Button>
                </Link>
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
          
        <div className="max-w-7xl mx-auto container px-4 relative z-10 text-center max-w-xl">
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

      <Footer />
    </div>
  );
}

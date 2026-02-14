import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Bell,
  Download
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
import { ImageLightbox } from "@/components/ImageLightbox";
import flyer1 from "@assets/arabic_1768797774024.jpeg";
import flyer2 from "@assets/ramadan_1768797774026.jpeg";
import flyer3 from "@assets/tafsir_1768797774026.jpeg";
import flyerNoorKids from "@assets/WhatsApp_Image_2025-12-28_at_12.00.16_1768851179406.jpeg";
import flyerSistersTafseer from "@assets/WhatsApp_Image_2026-01-08_at_12.23.56_1768851179408.jpeg";
import flyerPotluck from "@assets/WhatsApp_Image_2026-01-08_at_10.29.36_1768851179408.jpeg";
import expansionImg from "@assets/expansion_1771091257029.jpg";
import type { Event } from "@shared/schema";

interface PrayerTime {
  name: string;
  adhan: string;
  iqamah?: string;
}

interface DisplayEvent {
  id?: number;
  imageUrl: string;
  title?: string | null;
  description?: string | null;
  registrationLink?: string | null;
  registrationLinkText?: string | null;
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
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedFlyer, setSelectedFlyer] = useState<DisplayEvent | null>(null);

  const { data: prayerTimes } = useQuery<PrayerTime[]>({
    queryKey: ["/api/prayer-times"],
    queryFn: async () => {
      const res = await fetch("/api/prayer-times");
      if (!res.ok) throw new Error("Failed to fetch prayer times");
      return res.json();
    },
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });

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
        registrationLinkText: e.registrationLinkText,
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
                    <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/85 transition-colors">
                      Donate Now
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="rounded-full px-8 hover:bg-secondary/80 transition-colors">
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
                        {prayerTimes ? prayerTimes.map((prayer) => (
                          <div key={prayer.name} className="flex items-center justify-between px-4 py-2 rounded-2xl hover:bg-primary/5 transition-colors group" data-testid={`prayer-${prayer.name.toLowerCase().replace(/['\s]/g, '-')}`}>
                            <span className="font-bold text-base text-foreground/80 group-hover:text-primary transition-colors">{prayer.name}</span>
                            <div className="flex gap-6 text-right">
                              <div className="min-w-[65px]">
                                <p className="text-[9px] uppercase tracking-tighter text-muted-foreground mb-0">Adhan</p>
                                <p className="font-medium text-sm text-foreground/70">{prayer.adhan}</p>
                              </div>
                              {prayer.iqamah && (
                                <div className="min-w-[65px] bg-primary/5 rounded-xl px-2 py-0.5 border border-primary/10">
                                  <p className="text-[9px] uppercase tracking-tighter text-primary/60 font-bold mb-0 italic">Iqamah</p>
                                  <p className="font-black text-primary text-sm">{prayer.iqamah}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )) : (
                          <div className="flex justify-center py-4">
                            <p className="text-sm text-muted-foreground">Loading prayer times...</p>
                          </div>
                        )}
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
              <p className="text-muted-foreground max-w-xl mx-auto">Stay connected through educational programs, community gatherings, and special events for all ages.</p>
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
        <ImageLightbox item={selectedFlyer} onClose={() => setSelectedFlyer(null)} />

        {/* GIC Expansion Section */}
        <section className="py-12 bg-white border-t border-border/50">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={expansionImg}
                  alt="GIC Expansion - New 2 acre property adjacent to existing masjid"
                  className="w-full h-auto"
                  data-testid="img-expansion"
                />
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  Alhamdulillah
                </Badge>
                <h3 className="text-2xl font-bold mb-4">GIC Expansion</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  With the Help and Mercy of Allah <span className="font-arabic">&#xFDFA;</span>, and through your generous support, we have successfully closed on the purchase of the 2 acres adjacent to GIC. May Allah accept every contribution, place barakah in your wealth, health, and families.
                </p>
                <a href="https://donorbox.org/let-s-secure-a-new-land-for-gic-masjid" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-primary px-8 hover:bg-primary/85 transition-colors" data-testid="button-expansion-donate">
                    Support the Expansion
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section / DUA Link */}
        <section className="py-12 bg-white border-t border-border/50">
              <div className="max-w-7xl mx-auto container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
                Educational Partner
              </Badge>
              <h3 className="text-4xl font-bold mb-6">Darul Uloom Austin (DUA)</h3>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Darul Uloom Austin is an Islamic educational institution dedicated to teaching the Qur’an and Islamic studies. GIC serves as one of its three campuses.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://darululoomaustin.org" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-primary px-8 hover:bg-primary/85 transition-colors">
                    Visit DUA Website
                  </Button>
                </a>
                <Link href="/education">
                  <Button variant="outline" className="rounded-full px-8 hover:bg-secondary/80 transition-colors">
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
                <h3 className="text-4xl font-bold mb-6">Building the Future Together</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Georgetown Islamic Center is creating a strong foundation for Muslims in the Round Rock and Georgetown area — a place to strengthen faith, nurture families, and grow a lasting community.
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
                  <Button className="mt-10 rounded-full bg-primary hover:bg-primary/85 transition-colors" size="lg">
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
            {newsletterStatus === "success" ? (
              <p className="text-lg text-white/90 font-medium" data-testid="text-newsletter-success">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                if (!email.trim()) return;
                setNewsletterStatus("loading");
                try {
                  const res = await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email.trim() }),
                  });
                  if (!res.ok) throw new Error();
                  setNewsletterStatus("success");
                  setEmail("");
                } catch {
                  setNewsletterStatus("error");
                }
              }} className="flex flex-col sm:flex-row gap-4">
                <Input 
                  data-testid="input-email"
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (newsletterStatus === "error") setNewsletterStatus("idle"); }}
                  className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full px-6 flex-grow"
                  required
                />
                <Button data-testid="button-subscribe" size="lg" className="h-14 bg-accent text-accent-foreground hover:bg-accent/85 font-bold rounded-full px-10 transition-colors" disabled={newsletterStatus === "loading"}>
                  {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe Now"}
                </Button>
                {newsletterStatus === "error" && (
                  <p className="text-red-200 text-sm mt-2 sm:mt-0 sm:self-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

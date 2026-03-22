import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
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
import flyer1 from "@assets/arabic_1768797774024.webp";
import flyer2 from "@assets/ramadan_1768797774026.webp";
import flyer3 from "@assets/tafsir_1768797774026.webp";
import flyerNoorKids from "@assets/WhatsApp_Image_2025-12-28_at_12.00.16_1768851179406.webp";
import flyerSistersTafseer from "@assets/WhatsApp_Image_2026-01-08_at_12.23.56_1768851179408.webp";
import flyerPotluck from "@assets/WhatsApp_Image_2026-01-08_at_10.29.36_1768851179408.webp";
import flyer1Sm from "@assets/arabic_1768797774024_400w.webp";
import flyer2Sm from "@assets/ramadan_1768797774026_400w.webp";
import flyer3Sm from "@assets/tafsir_1768797774026_400w.webp";
import flyerNoorKidsSm from "@assets/WhatsApp_Image_2025-12-28_at_12.00.16_1768851179406_400w.webp";
import flyerSistersTafseerSm from "@assets/WhatsApp_Image_2026-01-08_at_12.23.56_1768851179408_400w.webp";
import flyerPotluckSm from "@assets/WhatsApp_Image_2026-01-08_at_10.29.36_1768851179408_400w.webp";
import type { Event } from "@shared/schema";

interface PrayerTime {
  name: string;
  adhan: string;
  iqamah?: string;
}

interface DisplayEvent {
  id?: number;
  imageUrl: string;
  imageSrcSet?: string;
  title?: string | null;
  description?: string | null;
  registrationLink?: string | null;
  registrationLinkText?: string | null;
}

const FALLBACK_FLYERS: DisplayEvent[] = [
  { 
    imageUrl: flyerNoorKids,
    imageSrcSet: `${flyerNoorKidsSm} 400w, ${flyerNoorKids} 800w`,
    title: "Family Night with Noor Kids", 
    registrationLink: "https://tinyurl.com/GIC-2026-NoorKids",
    description: "Join us for an engaging session with Br. Amin Aaser from Noor Kids. Featuring inspiring stories and interactive learning."
  },
  { 
    imageUrl: flyerPotluck,
    imageSrcSet: `${flyerPotluckSm} 400w, ${flyerPotluck} 800w`,
    title: "Monthly Community Potluck", 
    registrationLink: "https://tinyurl.com/GIC-Monthly-Potluck",
    description: "A monthly gathering to strengthen community bonds. Speaker: Mufti Hassan from Chicago."
  },
  { 
    imageUrl: flyerSistersTafseer,
    imageSrcSet: `${flyerSistersTafseerSm} 400w, ${flyerSistersTafseer} 800w`,
    title: "Sisters Tafseer Class", 
    description: "Join us as we journey through the Tafseer of the Qur'an with Imam Osama Hussain and Muallimah Umme Yahya."
  },
  { imageUrl: flyer1, imageSrcSet: `${flyer1Sm} 400w, ${flyer1} 800w`, title: "Arabic Language Class" },
  { imageUrl: flyer2, imageSrcSet: `${flyer2Sm} 400w, ${flyer2} 800w`, title: "Ramadan Prep" },
  { imageUrl: flyer3, imageSrcSet: `${flyer3Sm} 400w, ${flyer3} 800w`, title: "Weekly Tafsir" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedFlyer, setSelectedFlyer] = useState<DisplayEvent | null>(null);

  useEffect(() => {
    if (!customElements.get('lite-youtube')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://esm.sh/lite-youtube-embed/src/lite-yt-embed.css';
      document.head.appendChild(link);
      // @ts-ignore - external URL module
      import('https://esm.sh/lite-youtube-embed');
    }
  }, []);

  const { data: prayerData } = useQuery<{ daily: PrayerTime[]; jummah: PrayerTime[] }>({
    queryKey: ["/api/prayer-times"],
    queryFn: async () => {
      const res = await fetch("/api/prayer-times");
      if (!res.ok) throw new Error("Failed to fetch prayer times");
      const all: PrayerTime[] = await res.json();
      return {
        daily: all.filter((p) => !p.name.includes("Jumu'ah")),
        jummah: all.filter((p) => p.name.includes("Jumu'ah")),
      };
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
      {/* <AnnouncementBar /> */}

      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 hero-gradient">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-12 text-center lg:text-left">
              <div className="flex-1 animate-fade-in-up">
                <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                  Georgetown Islamic Center
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed italic">
                  "The best among you are those who have the best manners and character." [Bukhari]
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
              </div>

              <div className="relative lg:justify-self-end w-full max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/20 overflow-hidden p-2">
                  <Card className="border-none bg-transparent shadow-none">
                    <CardContent className="p-2">
                      <div className="space-y-0">
                        {prayerData ? (
                          <>
                            {/* Header Row */}
                            <div className="grid grid-cols-3 gap-2 px-4 py-3 border-b border-border/50 font-bold text-[10px] uppercase tracking-wide text-muted-foreground">
                              <span className="text-left">Prayer</span>
                              <span className="text-center">Adhan</span>
                              <span className="text-center">Iqamah</span>
                            </div>

                            {/* Daily Prayers */}
                            {prayerData.daily.map((prayer) => (
                              <div key={prayer.name} className="grid grid-cols-3 gap-2 px-4 py-2.5 items-center hover:bg-primary/5 transition-colors group" data-testid={`prayer-${prayer.name.toLowerCase().replace(/['\s]/g, '-')}`}>
                                <span className="text-left font-bold text-sm text-foreground/80 group-hover:text-primary transition-colors">{prayer.name}</span>
                                <span className="text-center text-sm font-medium text-foreground/70">{prayer.adhan}</span>
                                {prayer.iqamah ? (
                                  <span className="text-center">
                                    <span className="inline-block bg-primary/5 rounded-lg px-1.5 py-0.5 border border-primary/10 font-black text-primary text-xs">{prayer.iqamah}</span>
                                  </span>
                                ) : (
                                  <span />
                                )}
                              </div>
                            ))}

                            {/* Divider */}
                            {prayerData.jummah.length > 0 && (
                              <hr className="border-t-2 border-border my-1.5 mx-2" />
                            )}

                            {/* Jummah Prayers */}
                            {prayerData.jummah.map((prayer) => (
                              <div key={prayer.name} className="grid grid-cols-3 gap-2 px-4 py-2.5 items-center hover:bg-primary/5 transition-colors group" data-testid={`prayer-${prayer.name.toLowerCase().replace(/['\s]/g, '-')}`}>
                                <span className="text-left font-bold text-sm text-foreground/80 group-hover:text-primary transition-colors">{prayer.name}</span>
                                <span className="text-center text-sm font-medium text-foreground/70">{prayer.adhan}</span>
                                {prayer.iqamah ? (
                                  <span className="text-center">
                                    <span className="inline-block bg-primary/5 rounded-lg px-1.5 py-0.5 border border-primary/10 font-black text-primary text-xs">{prayer.iqamah}</span>
                                  </span>
                                ) : (
                                  <span />
                                )}
                              </div>
                            ))}
                          </>
                        ) : (
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
              </div>
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
                    <div
                      className="rounded-2xl overflow-hidden shadow-lg border border-border cursor-pointer transition-transform duration-300 hover:-translate-y-2.5"
                      onClick={() => setSelectedFlyer(event)}
                    >
                      <img
                        src={event.imageUrl}
                        srcSet={event.imageSrcSet}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        alt={event.title || "Event"}
                        className="w-full h-auto object-cover aspect-[3/4]"
                        width={400}
                        height={533}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
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

        {/* Loan Payoff Section */}
        <section className="py-8 bg-white border-t border-border/50">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-3" data-testid="text-loan-payoff">Loan Payoff</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Support the effort to make GIC debt-free. Every donation counts.
              </p>
              <a href="https://us.mohid.co/tx/austin/gic/masjid/online/donation/2" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-primary px-8 hover:bg-primary/85 transition-colors" data-testid="button-loan-payoff">
                  Support Now
                </Button>
              </a>
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
              <div
                className="order-2 lg:order-1 rounded-3xl overflow-hidden shadow-2xl w-full lg:flex-1"
                dangerouslySetInnerHTML={{ __html: '<lite-youtube videoid="qxhQ3qq2T-w" playlabel="Play: GIC Lectures" style="display:block;width:100%;aspect-ratio:16/9"></lite-youtube>' }}
              />
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
                  className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-full px-6 flex-grow"
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

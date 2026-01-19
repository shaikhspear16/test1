import { motion } from "framer-motion";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  ChevronRight,
  ExternalLink,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@assets/GIC_Logo_Brown_1768797787406.png";

const PROGRAMS = [
  {
    title: "Full-Time Programs",
    description: "Dedicated Hifz and academic tracks for both boys and girls.",
    icon: GraduationCap,
  },
  {
    title: "Naseeha Seminary",
    description: "Deep dive into traditional Islamic sciences and spirituality.",
    icon: BookOpen,
  },
  {
    title: "Deen Intensives",
    description: "Short-term programs focused on specific areas of Islamic knowledge.",
    icon: Users,
  },
  {
    title: "GIC Academic Tracks",
    description: "Integrated academic and Islamic education at our GIC campus.",
    icon: GraduationCap,
  }
];

export default function Education() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
              <img src={logo} alt="GIC Logo" className="h-12 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary leading-tight">Georgetown</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Islamic Center</p>
              </div>
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="#" className="hover:text-primary transition-colors">Events</a>
            <a href="/education" className="hover:text-primary transition-colors text-primary font-bold">Education</a>
            <a href="#" className="hover:text-primary transition-colors">Resources</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
          </div>

          <a href="/donate">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
              <Heart className="mr-2 h-4 w-4" /> Donate
            </Button>
          </a>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 hero-gradient">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
                Education & Knowledge
              </Badge>
              <h2 className="text-5xl font-black mb-6">Darul Uloom <span className="text-primary italic">Austin</span></h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Empowering the next generation through a holistic blend of traditional Islamic scholarship and contemporary academic excellence.
              </p>
              <Button asChild className="rounded-full bg-primary px-8 h-12">
                <a href="https://darululoomaustin.org" target="_blank" rel="noopener noreferrer">
                  Visit Official DUA Website <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Blurb Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-12 items-start">
                <div className="md:col-span-2">
                  <h3 className="text-3xl font-bold mb-6">Our Journey & Impact</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Starting in 2007 at NAMCC, Darul Uloom Austin (DUA) has since expanded to include girls and boys full-time programs, 
                    Naseeha seminary programs, Deen Intensives, and GIC academic tracks.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    In 2025, DUA celebrates its 16th graduation with 28 alumni now serving in diverse roles—from Islamic scholarship 
                    to industry and higher education.
                  </p>
                </div>
                <div className="bg-secondary/30 p-8 rounded-3xl border border-primary/10">
                  <div className="space-y-6">
                    <div>
                      <p className="text-4xl font-black text-primary">2007</p>
                      <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Founded</p>
                    </div>
                    <div>
                      <p className="text-4xl font-black text-primary">16</p>
                      <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Graduations</p>
                    </div>
                    <div>
                      <p className="text-4xl font-black text-primary">28</p>
                      <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Active Alumni</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4">Academic Programs</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">Diverse educational tracks designed to meet the needs of our community members at every stage of their journey.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROGRAMS.map((program, index) => (
                <Card key={program.title} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <program.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
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

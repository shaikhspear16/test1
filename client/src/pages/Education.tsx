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
  Heart,
  Calendar,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@assets/GIC_Logo_Brown_1768797787406.png";

const EDUCATION_CATEGORIES = [
  {
    title: "Quran Programs",
    provider: "DUA at GIC",
    description: "Foundational and advanced Quranic studies for various age groups.",
    icon: BookOpen,
    items: [
      "Full-time Hifdh Program",
      "After School Quran Programs",
      "Summer Quran Intensives"
    ],
    link: "https://darululoomaustin.org/quran",
    linkText: "View Quran Programs"
  },
  {
    title: "Seminary Programs",
    provider: "DUA at GIC",
    description: "In-depth traditional Islamic sciences for serious students of knowledge.",
    icon: GraduationCap,
    items: [
      "1 Year Full-Time Seminary",
      "3 Year Part-Time Naseeha Program",
      "Summer Deen Intensives"
    ],
    link: "https://darululoomaustin.org/seminary",
    linkText: "Explore Seminary"
  },
  {
    title: "Al Iman Academy",
    provider: "GIC Sunday School",
    description: "Weekly Islamic education focusing on character and foundational knowledge.",
    icon: Users,
    items: [
      "Weekend Islamic Studies",
      "Arabic Language Tracks",
      "Youth Character Building"
    ],
    link: "https://www.alimanacademy.org",
    linkText: "Visit Al Iman Academy"
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
                GIC Education
              </Badge>
              <h2 className="text-5xl font-black mb-6">Nurturing <span className="text-primary italic">Knowledge</span> & Faith</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Georgetown Islamic Center is proud to host diverse educational programs catering to all ages, 
                from foundational Quranic studies to advanced seminary tracks.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {EDUCATION_CATEGORIES.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <category.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{category.provider}</Badge>
                      </div>
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                      <CardDescription className="text-sm">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3 mb-8">
                        {category.items.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg mt-auto">
                        <a href={category.link} target="_blank" rel="noopener noreferrer">
                          {category.linkText} <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Summer Special Section */}
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl p-12 shadow-2xl relative overflow-hidden border border-primary/5">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <span className="text-sm font-bold uppercase tracking-widest text-accent">Summer 2026</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-6">Deen Intensive & Summer Programs</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Make your summer meaningful. Join our annual Deen Intensive and summer Quran programs 
                    designed for youth and adults seeking a spiritual boost.
                  </p>
                  <Button size="lg" className="rounded-full bg-primary px-10">
                    Registration Opening Soon
                  </Button>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="p-6 bg-secondary/20 rounded-2xl border border-primary/5">
                    <Calendar className="h-6 w-6 text-primary mb-2" />
                    <p className="font-bold">June - July</p>
                    <p className="text-xs text-muted-foreground uppercase">Program Dates</p>
                  </div>
                  <div className="p-6 bg-secondary/20 rounded-2xl border border-primary/5">
                    <Users className="h-6 w-6 text-primary mb-2" />
                    <p className="font-bold">All Ages</p>
                    <p className="text-xs text-muted-foreground uppercase">Target Groups</p>
                  </div>
                </div>
              </div>
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

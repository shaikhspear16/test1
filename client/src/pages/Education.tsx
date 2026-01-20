import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  ExternalLink,
  Calendar,
  Sparkles
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 hero-gradient">
          <div className="max-w-7xl mx-auto container px-4 text-center">
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

        {/* Programs Accordion Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto container px-4 max-w-4xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Quran Programs */}
              <AccordionItem value="quran" className="border border-border/50 rounded-2xl overflow-hidden px-4 bg-white shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Quran Programs</h3>
                      <p className="text-sm text-muted-foreground">Full-time Hifz, After School & Summer Programs</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="space-y-8 pl-16">
                    <div>
                      <h4 className="font-bold text-lg mb-2">Darul Uloom Austin Full Time Quran Hifz</h4>
                      <p className="text-muted-foreground mb-4">
                        Students will memorize the Quran, learn to recite with proper tajweed and learn the basics of Aqaaid, Ahadeeth, Akhlaq, Fiqh, and Taareekh in the Safer Series Curriculum.
                      </p>
                      <div className="bg-secondary/20 p-4 rounded-xl mb-4 text-sm">
                        <p className="font-bold mb-1">Class Hours:</p>
                        <p>Mon - Thu: 8 am - 2 pm</p>
                        <p>Fri: 8 am - 12 pm</p>
                        <p>Sat: 8 am - 2 pm</p>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <a href="https://darululoomaustin.org/quran" target="_blank" rel="noopener noreferrer">Learn More at DUA</a>
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2">Darul Uloom Austin After School Program</h4>
                      <p className="text-muted-foreground mb-4">
                        Students will learn to connect with the Book of Allah (SWT) and build a solid Islamic foundation in Aqeeda, Hadith, Akhlaq, Fiqh, and Tareekh.
                      </p>
                      <div className="bg-secondary/20 p-4 rounded-xl mb-4 text-sm">
                        <p className="font-bold mb-1">Class Hours:</p>
                        <p>Mon - Thu: 5 pm - 7:00 pm at GIC</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Seminary Programs */}
              <AccordionItem value="seminary" className="border border-border/50 rounded-2xl overflow-hidden px-4 bg-white shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Seminary Programs</h3>
                      <p className="text-sm text-muted-foreground">Naseeha Program & Full-time Seminary</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="space-y-8 pl-16">
                    <div>
                      <h4 className="font-bold text-lg mb-2">DUA Seminary Naseeha Program</h4>
                      <p className="text-muted-foreground mb-4">
                        The Naseeha Program aims to help our students live Islamically in a secular environment through sacred knowledge and time with Ulama.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        {["Arabic Syntax", "Morphology", "Personal Development", "Hadith", "Aqidah", "Fiqh"].map(item => (
                          <div key={item} className="flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-primary" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <a href="https://darululoomaustin.org/seminary" target="_blank" rel="noopener noreferrer">Learn More at DUA</a>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Al Iman Sunday School */}
              <AccordionItem value="aliman" className="border border-border/50 rounded-2xl overflow-hidden px-4 bg-white shadow-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Al Iman Sunday School</h3>
                      <p className="text-sm text-muted-foreground">Weekly Islamic education for children</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="space-y-6 pl-16">
                    <p className="text-muted-foreground">
                      Sunday School 2025. Every Sunday from 10AM to 2:15PM at GIC.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-secondary/20 p-4 rounded-xl text-sm">
                        <p className="font-bold mb-2">Curriculum Includes:</p>
                        <ul className="space-y-1">
                          <li>• Quran Memorization & Tajweed</li>
                          <li>• Arabic Language with Grammar</li>
                          <li>• Islamic Studies & Aqeedah</li>
                          <li>• Tarbiyya & Seerah</li>
                        </ul>
                      </div>
                      <div className="bg-secondary/20 p-4 rounded-xl text-sm">
                        <p className="font-bold mb-2">Key Dates:</p>
                        <p>Open House: Aug 24, 2025</p>
                        <p>First Day: Sept 14, 2025</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a href="https://alimanaustin.org" target="_blank" rel="noopener noreferrer">Visit Al Iman Academy</a>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Summer Special Section */}
        <section className="py-12 bg-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="max-w-7xl mx-auto container px-4">
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

      <Footer />
    </div>
  );
}

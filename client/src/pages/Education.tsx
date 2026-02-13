import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageLightbox, LightboxItem } from "@/components/ImageLightbox";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  ExternalLink
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import fulltimeFlyer from "@assets/fulltime_1770955258901.avif";
import afterschoolFlyer from "@assets/afterschool_1770955258901.avif";
import naseehaFlyer from "@assets/naseeha_1770955258900.avif";
import sundaySchoolFlyer from "@assets/Aliman_Sunday_School_2025_1770955258901.avif";

interface ProgramCard {
  imageUrl: string;
  title: string;
  description: string;
  registrationLink: string;
  registrationText: string;
}

function ProgramItem({ program, onImageClick }: { program: ProgramCard; onImageClick: (item: LightboxItem) => void }) {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 items-start">
      <div
        className="w-full md:w-64 shrink-0 cursor-pointer group"
        onClick={() => onImageClick(program)}
        data-testid={`img-program-${program.title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <img
          src={program.imageUrl}
          alt={program.title}
          className="w-full rounded-xl shadow-md transition-transform group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-lg mb-2">{program.title}</h4>
        <p className="text-muted-foreground mb-4">{program.description}</p>
        <Button asChild variant="outline" size="sm" data-testid={`link-register-${program.title.toLowerCase().replace(/\s+/g, '-')}`}>
          <a href={program.registrationLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-3 w-3" /> {program.registrationText}
          </a>
        </Button>
      </div>
    </div>
  );
}

const QURAN_PROGRAMS: ProgramCard[] = [
  {
    imageUrl: fulltimeFlyer,
    title: "Full Time Quran Hifz Program",
    description: "Students will memorize the Quran, learn to recite with proper tajweed and learn the basics of Aqaaid, Ahadeeth, Akhlaq, Fiqh, and Taareekh in the Safar Series Curriculum. Ages 7-15, separate classes for boys and girls.",
    registrationLink: "https://us.mohid.co/tx/austin/dua/muntazim/online/assigncourse/300",
    registrationText: "Register at GIC",
  },
  {
    imageUrl: afterschoolFlyer,
    title: "After School Program",
    description: "Students will learn to recite Quran with Tajweed and learn some Surahs, along with the Safar Series Curriculum covering Aqaaid, Ahadeeth, Akhlaq, Fiqh, and Taareekh.",
    registrationLink: "https://us.mohid.co/tx/austin/dua/muntazim/online/assigncourse/300",
    registrationText: "Register at GIC",
  },
];

const SEMINARY_PROGRAMS: ProgramCard[] = [
  {
    imageUrl: naseehaFlyer,
    title: "Naseeha Program",
    description: "A two-year foundational part-time course designed to provide students with a deeper understanding of their faith. Whether one aspires to become a scholar or serve the community, this program offers a balanced curriculum covering Arabic Syntax, Morphology, Hadith, Aqidah, Fiqh, and Personal Development. For students 14 years and above.",
    registrationLink: "https://us.mohid.co/tx/austin/dua/muntazim/online/assigncourse/300",
    registrationText: "Register Now",
  },
];

const SUNDAY_SCHOOL_PROGRAMS: ProgramCard[] = [
  {
    imageUrl: sundaySchoolFlyer,
    title: "Al Iman Sunday School 2025",
    description: "Every Sunday from 10:00 AM to 2:15 PM at GIC. Curriculum includes Quran Memorization & Tajweed, Arabic Language with Grammar, Islamic Studies & Aqeedah, and Tarbiyya & Seerah.",
    registrationLink: "https://alimanaustin.org",
    registrationText: "Visit Al Iman Academy",
  },
];

export default function Education() {
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section - compact */}
        <section className="py-10 hero-gradient">
          <div className="max-w-7xl mx-auto container px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-black mb-3">Education at GIC</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Georgetown Islamic Center hosts diverse educational programs for all ages,
                from Quranic studies to advanced seminary tracks.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Programs Accordion Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto container px-4 max-w-4xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Quran Programs */}
              <AccordionItem value="quran" className="border border-border/50 rounded-2xl overflow-hidden px-4 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:bg-primary/5 group">
                <AccordionTrigger className="hover:no-underline py-6" data-testid="accordion-quran">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold transition-colors group-hover:text-primary">Quran Programs</h3>
                      <p className="text-sm text-muted-foreground">Full-time Hifz, After School & Summer Programs</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="space-y-8 pl-4 sm:pl-16">
                    {QURAN_PROGRAMS.map((program) => (
                      <ProgramItem key={program.title} program={program} onImageClick={setLightboxItem} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Seminary Programs */}
              <AccordionItem value="seminary" className="border border-border/50 rounded-2xl overflow-hidden px-4 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:bg-primary/5 group">
                <AccordionTrigger className="hover:no-underline py-6" data-testid="accordion-seminary">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold transition-colors group-hover:text-primary">Seminary Programs</h3>
                      <p className="text-sm text-muted-foreground">Naseeha Program & Full-time Seminary</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="space-y-8 pl-4 sm:pl-16">
                    {SEMINARY_PROGRAMS.map((program) => (
                      <ProgramItem key={program.title} program={program} onImageClick={setLightboxItem} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Al Iman Sunday School */}
              <AccordionItem value="aliman" className="border border-border/50 rounded-2xl overflow-hidden px-4 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:bg-primary/5 group">
                <AccordionTrigger className="hover:no-underline py-6" data-testid="accordion-sunday-school">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold transition-colors group-hover:text-primary">Al Iman Sunday School</h3>
                      <p className="text-sm text-muted-foreground">Weekly Islamic education for children</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="space-y-6 pl-4 sm:pl-16">
                    {SUNDAY_SCHOOL_PROGRAMS.map((program) => (
                      <ProgramItem key={program.title} program={program} onImageClick={setLightboxItem} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Darul Uloom Austin Section */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  Educational Partner
                </Badge>
              </div>
              <h3 className="text-3xl font-bold mb-4">Darul Uloom Austin (DUA)</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Darul Uloom Austin is a 501(c)(3) non-profit institution with a mission to prepare future leaders with sound Islamic knowledge and spiritual and ethical values, rooted in the sacred teachings of the Qur'an and Sunnah.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Over the years, DUA has grown to operate multiple campuses including NAMCC, ICBC, and GIC, offering full-time and part-time Hifdh, After School, and Seminary programs. The institution is powered by dedicated teachers, experienced scholars, and a nurturing community.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Starting in 2007, DUA has since expanded to include girls and boys full-time programs, Naseeha seminary programs, Deen Intensives, and GIC academic tracks. In 2025, DUA celebrates its 16th graduation with 28 alumni now serving in diverse roles — from Islamic scholarship to industry and higher education.
              </p>
              <a href="https://darululoomaustin.org" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-primary px-8" data-testid="link-dua-website">
                  <ExternalLink className="mr-2 h-4 w-4" /> Visit Darul Uloom Austin
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <ImageLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      <Footer />
    </div>
  );
}

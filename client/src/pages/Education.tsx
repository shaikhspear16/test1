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

import fulltimeFlyer from "@assets/fulltime_1770955258901.avif";
import afterschoolFlyer from "@assets/afterschool_1770955258901.avif";
import naseehaFlyer from "@assets/naseeha_1770955258900.avif";
import sundaySchoolFlyer from "@assets/Aliman_Sunday_School_2025_1770955258901.avif";

export default function Education() {
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
                    <div>
                      <h4 className="font-bold text-lg mb-2">Full Time Quran Hifz Program</h4>
                      <p className="text-muted-foreground mb-4">
                        Students will memorize the Quran, learn to recite with proper tajweed and learn the basics of Aqaaid, Ahadeeth, Akhlaq, Fiqh, and Taareekh in the Safar Series Curriculum. Ages 7-15, separate classes for boys and girls.
                      </p>
                      <div className="bg-secondary/20 p-4 rounded-xl mb-4 text-sm">
                        <p className="font-bold mb-1">Class Hours:</p>
                        <p>Mon - Thu: 8:00 AM - 2:00 PM</p>
                        <p>Fri: 8:00 AM - 12:00 PM</p>
                        <p className="mt-2 font-bold">Tuition:</p>
                        <p>$400/month (1st student) · $350/month (additional)</p>
                      </div>
                      <img src={fulltimeFlyer} alt="Full Time Hifz Program Flyer" className="w-full max-w-sm rounded-xl shadow-md mb-4" />
                      <Button asChild variant="outline" size="sm" data-testid="link-register-fulltime">
                        <a href="https://us.mohid.co/tx/austin/dua/muntazim/online/assigncourse/300" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" /> Register at GIC
                        </a>
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2">After School Program</h4>
                      <p className="text-muted-foreground mb-4">
                        Students will learn to recite Quran with Tajweed and learn some Surahs, along with the Safar Series Curriculum covering Aqaaid, Ahadeeth, Akhlaq, Fiqh, and Taareekh.
                      </p>
                      <div className="bg-secondary/20 p-4 rounded-xl mb-4 text-sm">
                        <p className="font-bold mb-1">Class Hours:</p>
                        <p>Mon - Thu: 5:00 PM - 7:00 PM at GIC</p>
                        <p className="mt-2 font-bold">Tuition:</p>
                        <p>$125/month (1st student) · $100/month (additional)</p>
                      </div>
                      <img src={afterschoolFlyer} alt="After School Program Flyer" className="w-full max-w-sm rounded-xl shadow-md mb-4" />
                      <Button asChild variant="outline" size="sm" data-testid="link-register-afterschool">
                        <a href="https://us.mohid.co/tx/austin/dua/muntazim/online/assigncourse/300" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" /> Register at GIC
                        </a>
                      </Button>
                    </div>
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
                    <div>
                      <h4 className="font-bold text-lg mb-2">Naseeha Program (Part-Time)</h4>
                      <p className="text-muted-foreground mb-4">
                        A two-year foundational part-time course designed to provide students with a deeper understanding of their faith. Whether one aspires to become a scholar or serve the community in other capacities, this program offers a balanced curriculum to nurture both the intellect and character. For students 14 years and above.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        {["Arabic Syntax", "Morphology", "Personal Development", "Hadith", "Aqidah", "Fiqh"].map(item => (
                          <div key={item} className="flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-primary" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="bg-secondary/20 p-4 rounded-xl mb-4 text-sm">
                        <p className="font-bold mb-1">Schedule:</p>
                        <p>September to May</p>
                        <p>Saturdays & Sundays: 11:00 AM - 2:00 PM</p>
                        <p className="mt-2 font-bold">Tuition:</p>
                        <p>$150/month (1st student) · $100/month (additional)</p>
                        <p>$100 book fee (yearly)</p>
                      </div>
                      <img src={naseehaFlyer} alt="Naseeha Program Flyer" className="w-full max-w-sm rounded-xl shadow-md mb-4" />
                      <Button asChild variant="outline" size="sm" data-testid="link-register-naseeha">
                        <a href="https://us.mohid.co/tx/austin/dua/muntazim/online/assigncourse/300" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" /> Register Now
                        </a>
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2">Full-Time Seminary Year 1</h4>
                      <p className="text-muted-foreground mb-4">
                        The One-Year Alim Program is a transformative experience designed to build a strong foundation in Islamic sciences. Through a full-time schedule and immersive curriculum, students grow spiritually, academically, and personally. For students 14 years and above.
                      </p>
                      <div className="bg-secondary/20 p-4 rounded-xl mb-4 text-sm">
                        <p className="font-bold mb-1">Schedule:</p>
                        <p>August 2025 to May 2026</p>
                        <p>Mon - Thu: 8:00 AM - 4:00 PM</p>
                        <p>Fri: 8:00 AM - 12:00 PM</p>
                        <p className="mt-2 font-bold">Curriculum:</p>
                        <p>Spiritual Purification, Aqeedah, Arabic Grammar, Seerah, Tajwid, Arabic Literature</p>
                        <p className="mt-2 font-bold">Tuition:</p>
                        <p>$400/month (1st student) · $350/month (additional)</p>
                        <p>$100 book fee (yearly)</p>
                      </div>
                      <Button asChild variant="outline" size="sm" data-testid="link-register-seminary">
                        <a href="https://us.mohid.co/tx/austin/dua/muntazim/online/assigncourse/300" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" /> Register Now
                        </a>
                      </Button>
                    </div>
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
                    <p className="text-muted-foreground">
                      Sunday School 2025 — Every Sunday from 10:00 AM to 2:15 PM at GIC.
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
                    <img src={sundaySchoolFlyer} alt="Al Iman Sunday School 2025 Flyer" className="w-full max-w-sm rounded-xl shadow-md" />
                    <Button asChild variant="outline" size="sm" data-testid="link-aliman-academy">
                      <a href="https://alimanaustin.org" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3 w-3" /> Visit Al Iman Academy
                      </a>
                    </Button>
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

      <Footer />
    </div>
  );
}

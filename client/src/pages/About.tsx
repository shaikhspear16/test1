import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  History, 
  Target, 
  Compass, 
  ArrowRight,
  Sparkles,
  Milestone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TIMELINE = [
  {
    year: "2018",
    title: "Founding",
    description: "Established by families in Georgetown and North Round Rock, gathering in homes and parks to build community."
  },
  {
    year: "2022",
    title: "Land Acquisition",
    description: "Purchased a 6.5-acre property for $2.4M. Renovated horse stables into the first musalla by Ramadan."
  },
  {
    year: "2023",
    title: "Expansion",
    description: "Renovated and extended the primary house on the property into a permanent masjid facility."
  },
  {
    year: "2025",
    title: "Growth",
    description: "Acquired adjacent 2-acre property to improve traffic flow and provide space for a DUA Seminary building."
  }
];

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

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
                About GIC
              </Badge>
              <h2 className="text-5xl font-black mb-6">Our <span className="text-primary italic">Story</span> & Vision</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A community-led effort to establish a spiritual and educational home for Muslims in Georgetown, Hutto, and North Round Rock.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <Card className="border-none shadow-lg bg-secondary/20 p-8 rounded-3xl">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To create a comprehensive institution serving our local community through a vibrant Masjid and a dedicated Islamic Education Center. We strive to seek the pleasure of Allah by spreading the authentic teachings of Islam in light of the Qur’an and Sunnah.
                </p>
              </Card>

              <Card className="border-none shadow-lg bg-primary/5 p-8 rounded-3xl">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Moonsighting Policy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  GIC follows the Central Hilal Committee of North America (CHC) for determining Ramadan and Eid dates. This unified approach ensures we celebrate together as a community, following verified moon sighting claims across the US.
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-primary mt-4 font-bold">
                  <a href="https://hilalcommittee.org/" target="_blank" rel="noopener noreferrer">
                    Visit CHC Website <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-12 bg-secondary/10">
          <div className="max-w-7xl mx-auto container px-4 max-w-4xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-2">
                <History className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-primary">Our Journey</span>
              </div>
              <h3 className="text-3xl font-bold">The GIC Milestone</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
              {TIMELINE.map((item, index) => (
                <motion.div 
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  {/* Dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Milestone className="h-4 w-4" />
                  </div>
                  {/* Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-border/50 bg-white shadow-sm">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-primary">{item.year}</div>
                    </div>
                    <div className="font-bold text-slate-900 mb-1">{item.title}</div>
                    <div className="text-muted-foreground text-sm leading-relaxed">{item.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Long Term Goal Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 border-8 border-white rounded-full" />
             <div className="absolute -bottom-24 -right-24 w-96 h-96 border-8 border-white rounded-full" />
          </div>
          <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
            <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h3 className="text-3xl font-bold mb-6">Our Long Term Goal</h3>
            <p className="text-xl leading-relaxed opacity-90 italic">
              "To establish a world-class seminary that will produce the future scholars of Islam, serving the community and the world at large."
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

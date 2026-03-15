import { useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  FileText, 
  UserPlus, 
  ExternalLink,
  MessageSquare,
  Clock,
  HandHelping,
  Library,
  BookOpen,
  ChevronRight,
  MapPin,
  Heart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RESOURCE_GROUPS = [
  {
    title: "Services & Support",
    icon: HandHelping,
    resources: [
      { name: "Imam's Office Hours", link: "https://calendly.com/webapps-a_s/30minswithshaykhosama", icon: Clock },
      { name: "Funeral Services", link: "https://www.icgamuslimcemetery.org/", icon: MapPin },
      { name: "GIC Bylaws", link: "https://df1da1ab-4c2b-4a24-a2a0-f5c2975d946d.filesusr.com/ugd/eea850_b32378b8bd3d4851af56846d681fedbb.pdf", icon: FileText },
      { name: "GAMRC Relief Application", link: "https://austinzakat.org/ApplyForHelp", icon: FileText },
      { name: "SMS Consent Form", link: "/sms-consent", icon: MessageSquare, internal: true }
    ]
  },
  {
    title: "New Muslim Resources",
    icon: UserPlus,
    resources: [
      { name: "New Muslim Resource Guide", link: "https://newmuslimguide.com/en", icon: BookOpen },
      { name: "New Muslim Contact Form", link: "https://docs.google.com/forms/d/e/1FAIpQLSdJ5ym4gYL3QyoXNzzzk5R0R2vMOr4LiPREqF6N9iJFAr2I2w/viewform", icon: FileText }
    ]
  },
  {
    title: "Forms & Requests",
    icon: FileText,
    resources: [
      { name: "Nikkah Request Form", link: "https://docs.google.com/forms/d/e/1FAIpQLSdqZ7ILcDGEEUQez_jJPWa-d0jESr3US37ga2Q6WMf6JKX5hw/viewform?pli=1", icon: Heart },
      { name: "Ramadan Excuse Letter", link: "https://docs.google.com/document/d/1KycE7-qqiG-Mel1KvLGIvcMQgMinj9DxatniaygXknI/edit?pli=1&tab=t.0", icon: FileText },
      { name: "Eid Excuse Letter", link: "https://docs.google.com/document/d/1Ix8yenJZQ7ZDMK9znHomkHhEDrNmFs_vsiqLpxd3qAU/edit?pli=1&tab=t.0", icon: FileText }
    ]
  }
];

const ISLAM_RESOURCES = [
  { name: "Why Islam?", link: "https://www.whyislam.org", description: "Clear and concise answers to common questions about Islam." },
  { name: "Islam Religion", link: "https://www.islamreligion.com", description: "Comprehensive articles and videos on the core beliefs and practices." },
  { name: "The Quran in English", link: "https://quran.com", description: "Read and listen to the translation of the Holy Quran." }
];

export default function Resources() {
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
                Community Hub
              </Badge>
              <h2 className="text-5xl font-black mb-6">Community <span className="text-primary italic">Resources</span></h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Access essential services, forms, and educational materials to support your journey and community life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Islam Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
              <div className="bg-secondary/30 p-8 rounded-3xl border border-primary/5 shadow-inner flex-1">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Library className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Understanding Islam</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Islam is a complete way of life centered around the submission to the will of Allah (One God) 
                  and following the teachings of Prophet Muhammad (peace be upon him). We believe in faith, 
                  prayer, charity, fasting, and the pilgrimage.
                </p>
                <div className="space-y-4">
                  {ISLAM_RESOURCES.map((res) => (
                    <a 
                      key={res.name} 
                      href={res.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block p-4 bg-white rounded-2xl border border-border/50 hover:border-primary/30 transition-all shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-primary">{res.name}</span>
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">{res.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-12 bg-secondary/10">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {RESOURCE_GROUPS.map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 bg-white/50 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="bg-primary/5 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <group.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl">{group.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border/50">
                        {group.resources.map((res) => (
                          res.internal ? (
                            <Link 
                              key={res.name} 
                              href={res.link}
                              className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <res.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span className="text-sm font-medium">{res.name}</span>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </Link>
                          ) : (
                            <a 
                              key={res.name} 
                              href={res.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <res.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span className="text-sm font-medium">{res.name}</span>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </a>
                          )
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { motion } from "framer-motion";
import { 
  Heart, 
  CreditCard, 
  Send, 
  Building2, 
  ChevronRight,
  Mail,
  MapPin,
  Youtube,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@assets/GIC_Logo_Brown_1768797787406.png";

const DONATION_METHODS = [
  {
    title: "Credit Card",
    description: "Donate by category (Sadaqa, Zakat, Construction, etc) using the Mohid portal.",
    icon: CreditCard,
    actionText: "Donate via Mohid",
    link: "https://us.mohid.co/tx/austin/gic/masjid/online/donation",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Zelle",
    description: "Direct bank transfer. Please specify category in memo.",
    icon: Send,
    details: [
      { label: "General", value: "donate@gicmasjid.org" },
      { label: "Expansion", value: "expansion@gicmasjid.org" }
    ],
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Benevity",
    description: "Company matching program. Search for 'Georgetown Islamic Center' on your portal.",
    icon: Building2,
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Check",
    description: "Make payable to 'Georgetown Islamic Center'.",
    icon: Mail,
    details: [
      { label: "Address", value: "7275 Co Rd 110 Round Rock, TX 78665" }
    ],
    color: "bg-green-50 text-green-600"
  }
];

export default function Donate() {
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
            <a href="#" className="hover:text-primary transition-colors">Education</a>
            <a href="#" className="hover:text-primary transition-colors">Resources</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
          </div>

          <Button data-testid="button-donate-active" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 pointer-events-none opacity-80">
            <Heart className="mr-2 h-4 w-4" /> Support Us
          </Button>
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
                Support GIC
              </Badge>
              <h2 className="text-5xl font-black mb-6">Invest in Your <span className="text-primary italic">Akhirah</span></h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed italic">
                “Whoever builds a mosque, desiring thereby Allah’s pleasure, Allah builds for him the like of it in paradise.” — [Bukhari]
              </p>
              <div className="bg-white/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 max-w-xl mx-auto inline-block">
                <p className="text-sm font-medium">
                  GIC is a 501(c)(3) nonprofit (EIN 83-1967983) organization. 
                  <span className="block text-primary mt-1">All donations are tax-deductible.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Donation Methods Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {DONATION_METHODS.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center mb-4`}>
                        <method.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-2xl">{method.title}</CardTitle>
                      <CardDescription className="text-sm min-h-[3rem]">{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {method.details && (
                        <div className="space-y-2">
                          {method.details.map((detail) => (
                            <div key={detail.label} className="text-sm">
                              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">{detail.label}</span>
                              <span className="font-medium break-all">{detail.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {method.link && (
                        <Button 
                          asChild 
                          className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg"
                        >
                          <a href={method.link} target="_blank" rel="noopener noreferrer">
                            {method.actionText} <ChevronRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action for Expansion */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <h3 className="text-3xl font-bold mb-6">Support Our Expansion</h3>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                As our community grows, so does our need for a larger space. Join us in building a legacy for 
                future generations in Georgetown and Round Rock.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full bg-primary px-10">
                  Expansion Project Info
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10">
                  Recurring Donation
                </Button>
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

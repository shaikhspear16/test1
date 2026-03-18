import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
  Phone,
  DollarSign,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      { label: "General", value: "donate@gicmasjid.org" }
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
    title: "PayPal",
    description: "Donate securely through PayPal with any credit card or PayPal balance.",
    icon: DollarSign,
    actionText: "Donate via PayPal",
    link: "https://www.paypal.com/donate/?hosted_button_id=Z5EWC3S6HFKZC",
    color: "bg-sky-50 text-sky-600"
  },
  {
    title: "Venmo",
    description: "Quick and easy donation through Venmo.",
    icon: Smartphone,
    actionText: "Donate via Venmo",
    link: "https://venmo.com/GIC-Masjid",
    color: "bg-teal-50 text-teal-600"
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

import { RamadanDonationSection } from "@/components/RamadanDonationSection";

export default function Donate() {
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
                Support GIC
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-4">Invest in Your <span className="text-primary italic">Akhirah</span></h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed italic">
                “Whoever builds a mosque, desiring thereby Allah’s pleasure, Allah builds for him the like of it in paradise.” — [Bukhari]
              </p>
              <div className="bg-white/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 max-w-xl mx-auto inline-block">
                <p className="text-sm font-medium">
                  GIC is a 501(c)(3) nonprofit (EIN 83-1967983). 
                  <span className="text-primary ml-1">Donations are tax-deductible.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* <RamadanDonationSection showCard /> */}

        {/* Donation Methods Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
      </main>

      <Footer />
    </div>
  );
}

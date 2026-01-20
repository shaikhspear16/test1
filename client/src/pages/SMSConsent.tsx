import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { MessageSquare, Bell, Shield, Info, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function SMSConsent() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Thank you for your consent. This is a mockup, so no data was actually saved.",
    });
    setPhoneNumber("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-12 hero-gradient">
          <div className="max-w-7xl mx-auto container px-4">
            <Link href="/resources">
              <Button variant="ghost" className="mb-6 gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Resources
              </Button>
            </Link>
            
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  Stay Informed
                </Badge>
                <h1 className="text-4xl md:text-5xl font-black mb-6">SMS Alerts <span className="text-primary italic">Consent</span> Form</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Enter your mobile phone number below to receive SMS updates from Georgetown Islamic Center (GIC). 
                  Our text messages will include community announcements, event notifications, prayer time reminders, and other important updates.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-none shadow-xl bg-secondary/10 p-2 rounded-[2rem]">
                  <CardHeader className="p-8">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <MessageSquare className="h-6 w-6 text-primary" />
                      Sign Up for Alerts
                    </CardTitle>
                    <CardDescription>
                      We'll keep you updated with the latest community news.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Phone className="h-3 w-3" /> Phone Number*
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(512) 000-0000"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                          className="h-14 rounded-2xl border-border/50 bg-white"
                        />
                      </div>
                      <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-lg font-bold shadow-lg shadow-primary/20">
                        Submit Consent
                      </Button>
                      <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                        Standard message and data rates may apply.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8 py-4"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Your Consent Matters</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        By submitting your phone number, you are providing your express consent to receive recurring SMS messages from GIC. 
                        Messages will be sent from our toll-free number.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Easy to Unsubscribe</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        If you wish to stop receiving messages at any time, simply reply with <strong>STOP</strong> to any message you receive. 
                        For help at any time, reply with <strong>HELP</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Privacy & Transparency</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Your privacy is important to us. We will only use your phone number to send you SMS alerts related to GIC activities and community news.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

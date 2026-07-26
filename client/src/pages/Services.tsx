import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Heart,
  ExternalLink,
  BookOpen,
  Phone,
  MapPin,
  ClipboardList,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <div className="max-w-7xl mx-auto container px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Community Services
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Services
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                GIC is here to support our community through life's most
                important moments — from welcoming new families to guiding
                through times of loss.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Funeral Services */}
        <section className="py-16 bg-white" id="funeral-services">
          <div className="max-w-7xl mx-auto container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-primary">
                  Funeral Services
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Supporting Families in Times of Loss
              </h2>
              <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
                Losing a loved one is one of life's most difficult moments. We are here to help our community navigate the Islamic burial
                process with care and dignity. We coordinate with the ICGA
                Muslim Cemetery to ensure your loved one is honored according
                to Islamic tradition.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* What to Do */}
                <Card className="p-6 border border-border/60">
                  <div className="flex items-center gap-2 mb-4">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">
                      When a Death Occurs
                    </h3>
                  </div>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-primary shrink-0">1.</span>
                      <span>
                        Recite{" "}
                        <span className="font-medium text-foreground">
                          Inna lillahi wa inna ilayhi raji'un
                        </span>{" "}
                        — "Verily, to Allah we belong and to Him we shall return."
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary shrink-0">2.</span>
                      <span>
                        Contact the ICGA Cemetery Line during business hours at{" "}
                        <a
                          href="tel:5126663389"
                          className="text-primary font-medium hover:underline"
                        >
                          (512) 666-3389
                        </a>
                        .
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary shrink-0">3.</span>
                      <span>
                        Fill out the{" "}
                        <a
                          href="https://www.icgamuslimcemetery.org/burial"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium hover:underline"
                        >
                          Burial Intake Form
                        </a>{" "}
                        on the ICGA Cemetery website. They will contact you to
                        coordinate the next steps.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary shrink-0">4.</span>
                      <span>
                        GIC can coordinate Ghusl (ritual washing) and Janazah
                        (funeral prayer) services. Please reach out to us
                        directly for assistance.
                      </span>
                    </li>
                  </ol>
                </Card>

                {/* ICGA Cemetery Info */}
                <Card className="p-6 border border-border/60 bg-primary/5">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">ICGA Muslim Cemetery</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    The ICGA Muslim Cemetery is a community-owned Muslim
                    cemetery providing dignified Islamic burial services for
                    the Austin and Central Texas area.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>1920 County Line Road, Dale, Texas 78616</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary shrink-0" />
                      <a
                        href="tel:5126663389"
                        className="hover:text-primary transition-colors"
                      >
                        (512) 666-3389
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://www.icgamuslimcemetery.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                      Visit ICGA Cemetery Website{" "}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </Card>
              </div>

              {/* Services offered */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Ghusl",
                    description:
                      "Ritual washing of the deceased according to Islamic guidelines, performed with care and respect.",
                  },
                  {
                    title: "Janazah Prayer",
                    description:
                      "Funeral prayer offered for the deceased by the community at the masjid or graveside.",
                  },
                  {
                    title: "Burial Coordination",
                    description:
                      "We work with the ICGA Muslim Cemetery to facilitate a proper Islamic burial in a dedicated Muslim cemetery.",
                  },
                ].map((item) => (
                  <Card key={item.title} className="p-5 border border-border/50">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border/40" />

        {/* Marriage Services */}
        <section className="py-16 bg-white" id="marriage-services">
          <div className="max-w-7xl mx-auto container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-primary">
                  Marriage Services
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Nikkah &amp; Marriage Services
              </h2>
              <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
                GIC is honored to perform Nikkah (Islamic marriage) ceremonies for
                members of our community. Our Imam will guide you through the
                process in accordance with Islamic principles and Texas state law
                requirements.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Requirements */}
                <Card className="p-6 border border-border/60">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">Requirements</h3>
                  </div>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-primary shrink-0">1.</span>
                      <span>The bride and groom must both be Muslim. If one is not a Muslim, he/she must be willing to take the Shahadah before the Nikkah Ceremony begins.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary shrink-0">2.</span>
                      <span>A legal marriage certificate from the county must be obtained in advance.</span>
                    </li>
                  </ol>
                </Card>

                {/* Request Form CTA */}
                <Card className="p-6 border border-border/60 bg-primary/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold">
                        Submit a Nikkah Request
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      To request a Nikkah ceremony at GIC, please fill out our
                      Nikkah Request Form. Our team will follow up with you to
                      confirm availability and walk you through the next steps.
                    </p>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdqZ7ILcDGEEUQez_jJPWa-d0jESr3US37ga2Q6WMf6JKX5hw/viewform?pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                      Nikkah Request Form{" "}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </Card>
              </div>

            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

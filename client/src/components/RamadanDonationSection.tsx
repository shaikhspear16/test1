import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface RamadanDonationSectionProps {
  showCard?: boolean;
}

export function RamadanDonationSection({ showCard = false }: RamadanDonationSectionProps) {
  const content = (
    <div className="max-w-3xl mx-auto text-center space-y-4">
      <span className="text-4xl mb-4 block" aria-hidden="true">🌙</span>
      <h3 className="text-3xl font-black mb-3 italic">Last 10 Nights of Ramadan</h3>
      <p className="text-muted-foreground leading-relaxed mb-3 max-w-xl mx-auto">
        Don't miss Laylatul Qadr. Automate your donations for the last 10 nights and ensure your generosity counts every single night.
      </p>
      <p className="text-sm text-amber-700 font-medium mb-6 italic">
        "The Night of Decree is better than a thousand months." — [Quran 97:3]
      </p>
      <Button asChild className="rounded-full bg-amber-600 hover:bg-amber-700 text-white px-10 py-3 text-base font-bold shadow-lg hover:shadow-xl transition-all">
        <a href="https://mohid.co/go/YQWPllK" target="_blank" rel="noopener noreferrer">
          Automate Your Giving {showCard && <ChevronRight className="ml-2 h-4 w-4" />}
        </a>
      </Button>
    </div>
  );

  if (showCard) {
    return (
      <section className="py-10 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="max-w-3xl mx-auto border-amber-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-2">
                <CardTitle className="sr-only">Last 10 Nights of Ramadan</CardTitle>
              </CardHeader>
              <CardContent>
                {content}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto container px-4">
        {content}
      </div>
    </section>
  );
}

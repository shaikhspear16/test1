import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const DESKTOP_CALENDAR_URL = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showTz=0&showPrint=0&src=Y19hZWQ5YmM1ZmJkM2U5Yzk1ZTNlODBjODc2ZDAxZjIxYzBlMDEwODQ1MjBiMTc0ZjFlYjEzZjlkZWJlMzJlOWRkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%238e24aa&color=%230b8043";
const MOBILE_CALENDAR_URL = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showTz=0&showPrint=0&mode=AGENDA&src=Y19hZWQ5YmM1ZmJkM2U5Yzk1ZTNlODBjODc2ZDAxZjIxYzBlMDEwODQ1MjBiMTc0ZjFlYjEzZjlkZWJlMzJlOWRkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%238e24aa&color=%230b8043";

export default function Calendar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-secondary/10">
        <section className="py-12">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">Calendar</Badge>
              <h2 className="text-4xl font-black mb-4">Community Calendar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                View upcoming programs, classes, and community events.
              </p>
            </div>

            <div className="w-full rounded-3xl overflow-hidden border border-border/50 bg-white shadow-lg">
              <iframe
                title="GIC Google Calendar"
                src={DESKTOP_CALENDAR_URL}
                className="hidden md:block w-full"
                style={{ border: "solid 1px #777" }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
                loading="lazy"
              />
              <iframe
                title="GIC Google Calendar Agenda"
                src={MOBILE_CALENDAR_URL}
                className="block md:hidden w-full"
                style={{ border: "solid 1px #777", minHeight: "900px" }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

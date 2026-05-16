import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0?cid=Y19hZWQ5YmM1ZmJkM2U5Yzk1ZTNlODBjODc2ZDAxZjIxYzBlMDEwODQ1MjBiMTc0ZjFlYjEzZjlkZWJlMzJlOWRkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20";

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
              <div className="relative w-full" style={{ paddingBottom: "120vh" }}>
                <iframe
                  title="GIC Google Calendar"
                  src={CALENDAR_URL}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

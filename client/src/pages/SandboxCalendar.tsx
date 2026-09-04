import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import type { EventClickArg } from "@fullcalendar/core";
import "@fullcalendar/daygrid/index.css";
import "@fullcalendar/timegrid/index.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

const GOOGLE_CALENDAR_ID = "adilshaikh1608@gmail.com";
const GOOGLE_CALENDAR_API_KEY = "AIzaSyCn00fYWfmxHLEBMJ8MuTh_dDLszCdLZ-Y";

export default function SandboxCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<EventClickArg["event"] | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-secondary/10">
        <section className="py-12">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
                Sandbox Calendar
              </Badge>
              <h1 className="text-4xl font-black mb-4">Community Calendar Preview</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse upcoming programs, classes, and community events.
              </p>
            </div>

            <Card className="overflow-hidden border-border/50 shadow-lg">
              <CardContent className="p-3 sm:p-6">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek",
                  }}
                  googleCalendarApiKey={GOOGLE_CALENDAR_API_KEY}
                  events={{ googleCalendarId: GOOGLE_CALENDAR_ID }}
                  eventClick={(info) => {
                    info.jsEvent.preventDefault();
                    setSelectedEvent(info.event);
                  }}
                  eventClassNames={() => ["gic-calendar-event"]}
                  dayCellClassNames={() => ["gic-calendar-day"]}
                  height="auto"
                  contentHeight="auto"
                  aspectRatio={1.65}
                  nowIndicator
                  weekends
                />
              </CardContent>
            </Card>

            {selectedEvent && (
              <Card className="mt-6 border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{selectedEvent.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  {selectedEvent.start && (
                    <div className="flex items-start gap-3">
                      <Clock3 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>
                        {selectedEvent.start.toLocaleString([], {
                          dateStyle: "full",
                          timeStyle: selectedEvent.allDay ? undefined : "short",
                        })}
                      </span>
                    </div>
                  )}
                  {selectedEvent.extendedProps.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{selectedEvent.extendedProps.location}</span>
                    </div>
                  )}
                  {selectedEvent.extendedProps.description && (
                    <div className="flex items-start gap-3">
                      <CalendarDays className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <p className="whitespace-pre-wrap">{selectedEvent.extendedProps.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
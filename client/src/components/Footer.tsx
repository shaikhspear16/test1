import { Youtube, Mail, Phone, MapPin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@assets/GIC_Logo_Brown_1768797787406.webp";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto container px-4">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="GIC Logo" className="h-10 brightness-0 invert" width={53} height={40} loading="lazy" />
              <span className="text-xl font-bold">Georgetown Islamic Center</span>
            </div>
            <p className="text-background/60 mb-8 max-w-sm">
              Serving the spiritual and social needs of the Muslim community in Georgetown, Round Rock, and surrounding areas.
            </p>
            <div className="flex gap-4">
              <a href="https://www.youtube.com/@gicmasjid" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="rounded-full border-background/20 hover:bg-background/10">
                  <Youtube className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://www.facebook.com/GICMasjid/" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="rounded-full border-background/20 hover:bg-background/10">
                  <Facebook className="h-4 w-4" />
                </Button>
              </a>
              <a href="mailto:info@gicmasjid.org">
                <Button size="icon" variant="outline" className="rounded-full border-background/20 hover:bg-background/10">
                  <Mail className="h-4 w-4" />
                </Button>
              </a>
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
  );
}

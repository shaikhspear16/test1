import { useState } from "react";
import { Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function AnnouncementBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-amber-600 text-white py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
          <Megaphone className="h-4 w-4 flex-shrink-0" />
          <span className="font-medium truncate">Ramadan Moon Sighting Update</span>
          <Button
            data-testid="button-announcement-details"
            variant="secondary"
            size="sm"
            className="rounded-full px-4 h-7 text-xs font-semibold flex-shrink-0 bg-white/20 text-white hover:bg-white/30 border-0"
            onClick={() => setOpen(true)}
          >
            Read More
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg" data-testid="modal-announcement">
          <DialogHeader>
            <DialogTitle className="text-xl">Ramadan Moon Sighting Update</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>Assalamu Alaikum,<br />InshaAllah, GIC will follow the local moon-sighting policy.</p>
            <p>We will attempt to sight the crescent on Tuesday, February 17th, in coordination with the Central Hilal Committee of North America.</p>
            <p className="font-medium text-foreground">If the moon is sighted on Tuesday, February 17th, then:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Taraweeh will begin Tuesday night, February 17th</li>
              <li>First fast will be on Wednesday, February 18th</li>
            </ul>
            <p className="font-medium text-foreground">If the moon is NOT sighted on Tuesday, February 17th, then:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Taraweeh will begin Wednesday night, February 18th</li>
              <li>First fast will be on Thursday, February 19th</li>
            </ul>
            <p>May Allah (SWT) accept our ibadah, fasting, and duas in this blessed month.</p>
            <p className="font-semibold text-foreground">Ramadan Mubarak!</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

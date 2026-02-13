import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export interface LightboxItem {
  imageUrl: string;
  title?: string | null;
  description?: string | null;
  registrationLink?: string | null;
  registrationLinkText?: string | null;
}

interface ImageLightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export function ImageLightbox({ item, onClose }: ImageLightboxProps) {
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-background/95 backdrop-blur-md" data-testid="lightbox-modal">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          <div className="flex-1 bg-black/5 flex items-center justify-center p-4">
            <img
              src={item?.imageUrl}
              alt={item?.title || "Image"}
              className="max-h-full max-w-full object-contain shadow-2xl rounded-lg"
            />
          </div>
          {(item?.description || item?.registrationLink) && (
            <div className="w-full md:w-80 p-8 flex flex-col justify-center bg-white border-l border-border">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-black text-primary leading-tight">{item?.title}</DialogTitle>
              </DialogHeader>

              {item?.description && (
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {item.description}
                </p>
              )}

              {item?.registrationLink && (
                <a
                  href={item.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 rounded-full h-12 text-base font-bold" data-testid="lightbox-register-button">
                    {item.registrationLinkText || "Register Now"} <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

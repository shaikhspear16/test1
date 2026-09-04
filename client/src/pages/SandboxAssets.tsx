import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ImageOff, Loader2 } from "lucide-react";

type CloudinaryResource = {
  public_id: string;
  secure_url?: string;
  format?: string;
  context?: { custom?: { alt?: string; caption?: string } };
};

const CLOUDINARY_LIST_URL = "https://res.cloudinary.com/kphs2hv6/image/list/custom.json";
const CLOUDINARY_IMAGE_BASE = "https://res.cloudinary.com/kphs2hv6/image/upload";

function resourceUrl(resource: CloudinaryResource) {
  return resource.secure_url ?? `${CLOUDINARY_IMAGE_BASE}/${resource.public_id}`;
}

export default function SandboxAssets() {
  const [images, setImages] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadImages() {
      try {
        const response = await fetch(CLOUDINARY_LIST_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Cloudinary returned ${response.status}`);
        }
        const data = (await response.json()) as { resources?: CloudinaryResource[] };
        setImages(data.resources ?? []);
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : "Unable to load the image gallery.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadImages();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-secondary/10">
        <section className="py-12">
          <div className="max-w-7xl mx-auto container px-4">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
                Sandbox Assets
              </Badge>
              <h1 className="text-4xl font-black mb-4">Community Asset Gallery</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A responsive preview of images from the custom Cloudinary folder.
              </p>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Loading images...</p>
              </div>
            )}

            {error && (
              <Card className="max-w-xl mx-auto border-destructive/30">
                <CardContent className="flex items-start gap-3 p-6 text-destructive">
                  <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Unable to load the gallery</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && !error && images.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
                <ImageOff className="h-8 w-8" />
                <p>No public images were found in this folder.</p>
              </div>
            )}

            {!loading && !error && images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image) => (
                  <Card key={image.public_id} className="overflow-hidden border-border/50 shadow-sm hover:shadow-lg">
                    <CardContent className="p-0">
                      <img
                        src={resourceUrl(image)}
                        alt={image.context?.custom?.alt ?? image.public_id.split("/").pop() ?? "Community asset"}
                        loading="lazy"
                        className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
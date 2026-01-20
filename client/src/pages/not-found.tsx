import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  AlertCircle,
  Home as HomeIcon
} from "lucide-react";
import { Button as UIButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-secondary/10 py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <AlertCircle className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-4xl font-black text-primary mb-4 leading-tight">404</h2>
              <h3 className="text-xl font-bold mb-4">Page Not Found</h3>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                The page you are looking for might have been moved or doesn't exist.
              </p>
              <Link href="/">
                <UIButton size="lg" className="rounded-full bg-primary px-10">
                  <HomeIcon className="mr-2 h-4 w-4" /> Back to Home
                </UIButton>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

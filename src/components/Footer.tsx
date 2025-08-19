import { Activity, ExternalLink, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="mt-16 lg:mt-24 bg-surface-muted border-t border-card-border relative z-10">
      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-6xl">
        {/* Call-to-action strip */}
        <div className="mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-xl bg-card border border-card-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Ready to check your LLM APIs?</p>
                <p className="text-sm text-muted-foreground">Run a quick health test in seconds.</p>
              </div>
            </div>
            <Button asChild size="sm" className="btn-glow">
              <a href="#providers">Run health check</a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
              <li><a href="#providers" className="hover:text-foreground">Providers</a></li>
              <li><a href="#status" className="hover:text-foreground">Status</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#history" className="hover:text-foreground">History</a></li>
              {/* GitHub link removed as requested */}
              <li><a href="#changelog" className="hover:text-foreground">Changelog</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground">About</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
              <li><a href="#careers" className="hover:text-foreground">Careers</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Creator</h3>
            <div className="p-4 rounded-xl bg-card border border-card-border/60">
              <a 
                href="https://www.visheshsanghvi.me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
              >
                Vishesh Sanghvi
                <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="text-xs text-muted-foreground mt-2">Full-stack developer & AI enthusiast</p>
            </div>
          </div>
        </div>

        <div className="border-t border-card-border mt-12 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Activity className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">© 2025 Model Probe. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#privacy" className="hover:text-foreground">Privacy</a>
              <a href="#terms" className="hover:text-foreground">Terms</a>
              <div className="flex items-center gap-2">
                <a aria-label="X" href="https://twitter.com/" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-card-border hover:bg-card text-foreground">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
import { Activity } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-surface-muted/90 backdrop-blur border-b border-card-border shadow-soft">
      <div className="container mx-auto px-4 py-4 lg:py-5 max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative p-2.5 rounded-xl bg-gradient-primary shadow-glow">
              <Activity className="h-5 w-5 text-primary-foreground transition-transform duration-200 group-hover:scale-110" />
            </div>
            <div>
              <span className="block text-xl lg:text-2xl font-bold text-foreground">Model Probe</span>
              <span className="block text-xs lg:text-sm text-muted-foreground">LLM API Health Checker</span>
            </div>
          </a>

          <div className="hidden sm:flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/80">
              <a href="#providers" className="hover:text-foreground transition-colors">Providers</a>
              <a href="#history" className="hover:text-foreground transition-colors">History</a>
              <a href="/about" className="hover:text-foreground transition-colors">About</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
import { ExternalLink, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative glass-strong border-t border-card-border/50 mt-16 lg:mt-24">
      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">About Model Probe</h3>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
              Professional-grade API health monitoring for LLM providers. 
              Test connectivity, measure latency, and ensure your AI integrations are running smoothly.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
              <span className="text-sm text-success font-medium">Monitoring Active</span>
            </div>
          </div>
          
          {/* Supported Providers */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Supported Providers</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: "OpenAI", models: "GPT-4, GPT-4o" },
                { name: "Anthropic", models: "Claude 3.5" },
                { name: "Google", models: "Gemini Pro" },
                { name: "DeepSeek", models: "Chat & Coder" }
              ].map((provider) => (
                <div key={provider.name} className="flex items-center gap-3 p-2 rounded-lg bg-surface/50 border border-card-border/30">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{provider.name}</p>
                    <p className="text-xs text-muted-foreground">{provider.models}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Creator */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Creator</h3>
            <div className="p-4 rounded-xl bg-gradient-hero border border-card-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-error fill-current" />
                <span className="text-sm text-muted-foreground">Built with care by</span>
              </div>
              <a 
                href="https://www.visheshsanghvi.me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-primary-glow transition-all duration-200 group"
              >
                Vishesh Sanghvi
                <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                Full-stack developer & AI enthusiast
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-card-border/50 mt-12 pt-8 text-center">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Model Probe. Secure API testing for modern development teams.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Real-time monitoring</span>
              <span>•</span>
              <span>Enterprise security</span>
              <span>•</span>
              <span>Open source</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-hero opacity-30 pointer-events-none"></div>
    </footer>
  );
};
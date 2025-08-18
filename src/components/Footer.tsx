import { ExternalLink, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-surface border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">About Model Probe</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional-grade API health monitoring for LLM providers. 
              Test connectivity, measure latency, and ensure your AI integrations are running smoothly.
            </p>
          </div>
          
          {/* Supported Providers */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Supported Providers</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• OpenAI (GPT-4, GPT-4o)</li>
              <li>• Anthropic (Claude 3.5)</li>
              <li>• Google (Gemini Pro)</li>
              <li>• DeepSeek (Chat & Coder)</li>
            </ul>
          </div>
          
          {/* Creator */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Creator</h3>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-error fill-current" />
              <span className="text-muted-foreground">Built with care by</span>
            </div>
            <a 
              href="https://www.visheshsanghvi.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Vishesh Sanghvi
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Model Probe. Secure API testing for modern development teams.
          </p>
        </div>
      </div>
    </footer>
  );
};
import { Activity, Shield, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-surface border-b border-border">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-glow">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                Model Probe
              </h1>
              <p className="text-sm text-muted-foreground">
                Universal LLM API Health Checker
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span>Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
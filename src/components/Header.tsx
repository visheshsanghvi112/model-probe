import { Activity, Shield, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="relative glass-strong border-b border-card-border/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative p-3 rounded-2xl bg-gradient-primary shadow-glow group">
              <Activity className="h-7 w-7 text-primary-foreground group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-50"></div>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Model Probe
              </h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Universal LLM API Health Checker
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-success-muted border border-success/20">
              <Shield className="h-4 w-4 text-success" />
              <span className="font-medium text-success">Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-info-muted border border-info/20">
              <Zap className="h-4 w-4 text-info" />
              <span className="font-medium text-info">Real-time</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50 pointer-events-none"></div>
    </header>
  );
};
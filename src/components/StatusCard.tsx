import { CheckResult } from "@/types/apiTypes";
import { CheckCircle, XCircle, AlertTriangle, AlertCircle, Clock } from "lucide-react";

interface StatusCardProps {
  result: CheckResult;
}

const getStatusIcon = (status: CheckResult['status']) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="h-5 w-5 text-success" />;
    case 'invalid-key':
      return <XCircle className="h-5 w-5 text-error" />;
    case 'model-not-found':
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case 'provider-error':
      return <AlertCircle className="h-5 w-5 text-error" />;
    case 'cors-blocked':
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case 'checking':
      return <Clock className="h-5 w-5 text-info animate-spin" />;
    default:
      return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
  }
};

const getStatusText = (status: CheckResult['status']) => {
  switch (status) {
    case 'healthy':
      return 'Healthy';
    case 'invalid-key':
      return 'Invalid API Key';
    case 'model-not-found':
      return 'Model Not Found';
    case 'provider-error':
      return 'Provider Error';
    case 'cors-blocked':
      return 'Browser Blocked (CORS)';
    case 'checking':
      return 'Checking...';
    default:
      return 'Unknown';
  }
};

const getStatusColor = (status: CheckResult['status']) => {
  switch (status) {
    case 'healthy':
      return 'border-success/20 bg-success-muted';
    case 'invalid-key':
    case 'provider-error':
      return 'border-error/20 bg-error-muted';
    case 'model-not-found':
    case 'cors-blocked':
      return 'border-warning/20 bg-warning-muted';
    case 'checking':
      return 'border-info/20 bg-info-muted animate-pulse-glow';
    default:
      return 'border-border bg-surface';
  }
};

export const StatusCard = ({ result }: StatusCardProps) => {
  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`glass-ultimate rounded-3xl shadow-ultimate p-8 lg:p-10 animate-status-appear hover-lift relative overflow-hidden ${getStatusColor(result.status)}`}>
      {/* Animated status glow border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-10 blur-sm animate-glow-rotate" />
      
      <div className="relative z-10">
        {/* Header section with enhanced design */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="flex-shrink-0 text-5xl lg:text-6xl hover:scale-110 transition-transform duration-300">
                {result.provider.icon}
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-primary/20 blur-sm animate-pulse-glow" />
            </div>
            <div className="min-w-0">
              <h3 className="text-2xl lg:text-4xl font-black text-card-foreground truncate mb-2">
                {result.provider.name}
              </h3>
              <p className="text-base lg:text-lg text-muted-foreground truncate font-mono bg-surface/50 px-3 py-1 rounded-lg">
                {result.model}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 self-start scale-150">
            {getStatusIcon(result.status)}
          </div>
        </div>
        
        {/* Metrics grid with ultra-modern design */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-base lg:text-lg">
          <div className="glass-strong p-6 rounded-2xl border border-card-border/30 hover:border-primary/50 transition-all duration-300 group hover-lift">
            <div className="flex items-center gap-4 mb-3">
              <div className="scale-125 group-hover:scale-150 transition-transform duration-300">
                {getStatusIcon(result.status)}
              </div>
              <div className="w-full">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Connection Status</p>
                <p className="font-bold text-card-foreground text-xl">{getStatusText(result.status)}</p>
              </div>
            </div>
          </div>
          
          {result.latency && (
            <div className="glass-strong p-6 rounded-2xl border border-card-border/30 hover:border-accent/50 transition-all duration-300 group hover-lift">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-gradient-primary animate-pulse-glow"></div>
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30 animate-ping"></div>
                </div>
                <div className="w-full">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Response Time</p>
                  <p className="font-bold text-card-foreground text-xl">
                    {result.latency}ms
                    <span className="text-sm text-muted-foreground ml-2">
                      {result.latency < 500 ? '⚡ Ultra Fast' : result.latency < 1000 ? '🚀 Fast' : '⏱️ Slow'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="glass-strong p-6 rounded-2xl border border-card-border/30 hover:border-info/50 transition-all duration-300 group hover-lift">
            <div className="flex items-center gap-4 mb-3">
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-info animate-pulse-glow"></div>
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-info/30 animate-ping"></div>
              </div>
              <div className="w-full">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Timestamp</p>
                <p className="font-bold text-card-foreground text-sm lg:text-base">
                  {formatTimestamp(result.timestamp)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Error section with enhanced styling */}
        {result.errorMessage && (
          <div className="mt-8 glass-strong p-6 rounded-2xl border-2 border-error/30 bg-error-muted/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-error opacity-5" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="h-6 w-6 text-error animate-pulse-error" />
                <p className="text-base font-bold text-error">Diagnostic Information</p>
              </div>
              <p className="text-sm text-error/90 font-mono bg-error/10 p-3 rounded-lg border border-error/20">
                {result.errorMessage}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
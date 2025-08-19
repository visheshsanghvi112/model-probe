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
    <div className={`glass-strong rounded-2xl shadow-lg p-6 lg:p-8 animate-status-appear hover-lift relative ${getStatusColor(result.status)}`}>
      {/* Subtle status accent */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-5 animate-glow-rotate" />
      
      <div className="relative z-10">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 text-3xl lg:text-4xl">
              {result.provider.icon}
            </div>
            <div className="min-w-0">
              <h3 className="text-xl lg:text-2xl font-bold text-card-foreground truncate mb-1">
                {result.provider.name}
              </h3>
              <p className="text-sm lg:text-base text-muted-foreground truncate font-mono bg-surface/50 px-2 py-1 rounded">
                {result.model}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 self-start">
            {getStatusIcon(result.status)}
          </div>
        </div>
        
        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm lg:text-base">
          <div className="glass p-4 rounded-xl border border-card-border/30 hover:border-primary/30 transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              {getStatusIcon(result.status)}
              <div className="w-full">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Status</p>
                <p className="font-semibold text-card-foreground">{getStatusText(result.status)}</p>
              </div>
            </div>
          </div>
          
          {result.latency && (
            <div className="glass p-4 rounded-xl border border-card-border/30 hover:border-accent/30 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow"></div>
                <div className="w-full">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Response Time</p>
                  <p className="font-semibold text-card-foreground">
                    {result.latency}ms
                    <span className="text-xs text-muted-foreground ml-1">
                      {result.latency < 500 ? 'Fast' : result.latency < 1000 ? 'Good' : 'Slow'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="glass p-4 rounded-xl border border-card-border/30 hover:border-info/30 transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-info animate-pulse-glow"></div>
              <div className="w-full">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Timestamp</p>
                <p className="font-semibold text-card-foreground text-xs lg:text-sm">
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
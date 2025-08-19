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
    <div className={`glass-strong rounded-2xl shadow-xl-soft p-6 lg:p-8 animate-status-appear transition-all duration-300 hover:shadow-glow-success ${getStatusColor(result.status)}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 text-3xl lg:text-4xl">{result.provider.icon}</div>
          <div className="min-w-0">
            <h3 className="text-xl lg:text-2xl font-bold text-card-foreground truncate">
              {result.provider.name}
            </h3>
            <p className="text-sm lg:text-base text-muted-foreground truncate">{result.model}</p>
          </div>
        </div>
        <div className="flex-shrink-0 self-start">
          {getStatusIcon(result.status)}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm lg:text-base">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-card-border/50">
          {getStatusIcon(result.status)}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
            <p className="font-semibold text-card-foreground">{getStatusText(result.status)}</p>
          </div>
        </div>
        
        {result.latency && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-card-border/50">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Latency</p>
              <p className="font-semibold text-card-foreground">{result.latency}ms</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-card-border/50">
          <div className="w-2 h-2 rounded-full bg-info"></div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Tested</p>
            <p className="font-semibold text-card-foreground">{formatTimestamp(result.timestamp)}</p>
          </div>
        </div>
      </div>
      
      {result.errorMessage && (
        <div className="mt-6 p-4 rounded-xl bg-error-muted border border-error/20">
          <p className="text-sm font-medium text-error mb-1">Error Details</p>
          <p className="text-sm text-error/80">{result.errorMessage}</p>
        </div>
      )}
    </div>
  );
};
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
    <div className={`rounded-lg border-2 p-6 shadow-soft animate-status-appear ${getStatusColor(result.status)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{result.provider.icon}</span>
          <div>
            <h3 className="font-semibold text-card-foreground">
              {result.provider.name}
            </h3>
            <p className="text-sm text-muted-foreground">{result.model}</p>
          </div>
        </div>
        {getStatusIcon(result.status)}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {getStatusIcon(result.status)}
          <span className="font-medium">{getStatusText(result.status)}</span>
        </div>
        
        {result.latency && (
          <div className="flex items-center gap-1">
            <span>•</span>
            <span>{result.latency}ms</span>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <span>•</span>
          <span>{formatTimestamp(result.timestamp)}</span>
        </div>
      </div>
      
      {result.errorMessage && (
        <div className="mt-3 p-3 rounded-md bg-surface border border-border">
          <p className="text-sm text-muted-foreground">{result.errorMessage}</p>
        </div>
      )}
    </div>
  );
};
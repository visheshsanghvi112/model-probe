import { CheckResult } from "@/types/apiTypes";
import { CheckCircle, XCircle, AlertTriangle, AlertCircle } from "lucide-react";

interface HistoryListProps {
  history: CheckResult[];
}

const getStatusIcon = (status: CheckResult['status']) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'invalid-key':
      return <XCircle className="h-4 w-4 text-error" />;
    case 'model-not-found':
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case 'provider-error':
      return <AlertCircle className="h-4 w-4 text-error" />;
    case 'cors-blocked':
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    default:
      return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusText = (status: CheckResult['status']) => {
  switch (status) {
    case 'healthy':
      return 'Healthy';
    case 'invalid-key':
      return 'Invalid Key';
    case 'model-not-found':
      return 'Model Not Found';
    case 'provider-error':
      return 'Provider Error';
    case 'cors-blocked':
      return 'CORS Blocked';
    default:
      return 'Unknown';
  }
};

export const HistoryList = ({ history }: HistoryListProps) => {
  if (history.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-lg">No checks performed yet</p>
        <p className="text-sm text-muted-foreground mt-2">Start testing your APIs to see history here</p>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl shadow-xl-soft overflow-hidden">
      <div className="p-6 border-b border-card-border bg-gradient-hero">
        <h3 className="text-xl font-bold text-card-foreground">Recent API Tests</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Last {history.length} test{history.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="divide-y divide-card-border">
        {history.map((result, index) => (
          <div 
            key={result.id} 
            className="p-4 lg:p-6 hover:bg-surface-muted/50 transition-all duration-200 group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex-shrink-0 text-2xl group-hover:scale-110 transition-transform duration-200">
                  {result.provider.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-card-foreground truncate">
                      {result.provider.name}
                    </span>
                    <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded-md">
                      {result.model}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <span className="text-sm font-medium text-card-foreground">
                        {getStatusText(result.status)}
                      </span>
                    </div>
                    {result.latency && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                        <span>{result.latency}ms</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 text-right">
                <div className="text-sm font-medium text-card-foreground">
                  {result.timestamp.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                <div className="text-xs text-muted-foreground">
                  {result.timestamp.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
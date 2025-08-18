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
      <div className="bg-surface rounded-lg border border-border p-6 text-center">
        <p className="text-muted-foreground">No checks performed yet</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border shadow-soft">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-card-foreground">Recent Checks</h3>
      </div>
      <div className="divide-y divide-border">
        {history.map((result) => (
          <div key={result.id} className="p-4 hover:bg-surface-muted transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">{result.provider.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-card-foreground">
                      {result.provider.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({result.model})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(result.status)}
                    <span className="text-sm text-muted-foreground">
                      {getStatusText(result.status)}
                    </span>
                    {result.latency && (
                      <>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {result.latency}ms
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {result.timestamp.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import { CheckResult } from "@/types/apiTypes";
import { CheckCircle, XCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface HistoryListProps {
  history: CheckResult[];
}

const getStatusIcon = (status: CheckResult['status']) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
    case 'invalid-key':
      return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
    case 'model-not-found':
      return <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
    case 'provider-error':
      return <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
    case 'cors-blocked':
      return <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 rounded-2xl p-8 text-center border border-white/20 dark:border-slate-700/50"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-slate-400 dark:text-slate-500" />
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-lg">No checks performed yet</p>
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Start testing your APIs to see history here</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-slate-700/50"
    >
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Recent API Tests</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Last {history.length} test{history.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
        {history.map((result, index) => (
          <motion.div 
            key={result.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-4 lg:p-6 hover:bg-white/50 dark:hover:bg-slate-700/30 transition-all duration-200 group cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <motion.div 
                  className="flex-shrink-0 text-2xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {result.provider.icon}
                </motion.div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {result.provider.name}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md font-mono">
                      {result.model}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {getStatusText(result.status)}
                      </span>
                    </div>
                    {result.latency && (
                      <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                        <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                        <span>{result.latency}ms</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 text-right">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {result.timestamp.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {result.timestamp.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
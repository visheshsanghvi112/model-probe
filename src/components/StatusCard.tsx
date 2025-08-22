import { CheckResult } from "@/types/apiTypes";
import { CheckCircle, XCircle, AlertTriangle, AlertCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface StatusCardProps {
  result: CheckResult;
}

const getStatusIcon = (status: CheckResult['status']) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />;
    case 'invalid-key':
      return <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />;
    case 'model-not-found':
      return <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />;
    case 'provider-error':
      return <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />;
    case 'cors-blocked':
      return <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />;
    case 'checking':
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </motion.div>
      );
    default:
      return <AlertCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />;
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
      return 'border-green-200 bg-green-50 dark:border-green-700/50 dark:bg-green-900/20';
    case 'invalid-key':
    case 'provider-error':
      return 'border-red-200 bg-red-50 dark:border-red-700/50 dark:bg-red-900/20';
    case 'model-not-found':
    case 'cors-blocked':
      return 'border-orange-200 bg-orange-50 dark:border-orange-700/50 dark:bg-orange-900/20';
    case 'checking':
      return 'border-blue-200 bg-blue-50 dark:border-blue-700/50 dark:bg-blue-900/20';
    default:
      return 'border-gray-200 bg-gray-50 dark:border-gray-700/50 dark:bg-gray-900/20';
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
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative"
    >
      <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/50 p-8 lg:p-10">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
          <div className="flex items-center gap-6">
            <motion.div 
              className="flex-shrink-0 text-4xl lg:text-5xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {result.provider.icon}
            </motion.div>
            <div className="min-w-0">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 truncate mb-2">
                {result.provider.name}
              </h3>
              <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 truncate font-mono bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
                {result.model}
              </p>
            </div>
          </div>
          <motion.div 
            className="flex-shrink-0 self-start p-3 bg-white/60 dark:bg-slate-700/60 rounded-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {getStatusIcon(result.status)}
          </motion.div>
        </div>
        
        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-base lg:text-lg">
          <motion.div 
            className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-3">
              {getStatusIcon(result.status)}
              <div className="w-full">
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Status</p>
                <p className="font-bold text-slate-800 dark:text-slate-200">{getStatusText(result.status)}</p>
              </div>
            </div>
          </motion.div>
          
          {result.latency && (
            <motion.div 
              className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                <div className="w-full">
                  <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Response Time</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {result.latency}ms
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
                      {result.latency < 500 ? 'Fast' : result.latency < 1000 ? 'Good' : 'Slow'}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 rounded-full bg-indigo-500 dark:bg-indigo-400"></div>
              <div className="w-full">
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Checked At</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{formatTimestamp(result.timestamp)}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Error message if present */}
        {result.errorMessage && (
          <motion.div 
            className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <p className="text-sm text-red-700 dark:text-red-400 font-medium">
              <strong>Error:</strong> {result.errorMessage}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

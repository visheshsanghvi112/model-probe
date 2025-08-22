import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Provider } from "@/types/apiTypes";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap } from "lucide-react";

interface ModelSelectProps {
  provider: Provider | null;
  value: string;
  onValueChange: (model: string) => void;
}

export const ModelSelect = ({ provider, value, onValueChange }: ModelSelectProps) => {
  if (!provider) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Select disabled>
          <SelectTrigger className="w-full h-16 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl opacity-50 cursor-not-allowed">
            <SelectValue placeholder="Select a provider first" className="text-slate-400 dark:text-slate-500 font-medium" />
          </SelectTrigger>
        </Select>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={provider.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-full h-16 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/30 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300">
            <SelectValue placeholder="Choose AI model" className="text-slate-700 dark:text-slate-300 font-medium" />
          </SelectTrigger>
          <SelectContent className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 rounded-2xl shadow-2xl">
            {provider.models.map((model, index) => (
              <motion.div
                key={model}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SelectItem 
                  value={model} 
                  className="hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-700 dark:hover:text-indigo-400 transition-all duration-200 cursor-pointer py-4 font-mono text-sm rounded-xl mx-2 my-1"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{model}</span>
                      {model.includes('gpt-4') && (
                        <span className="text-xs text-indigo-500 dark:text-indigo-400 flex items-center gap-1">
                          <Brain className="w-3 h-3" /> Advanced
                        </span>
                      )}
                      {model.includes('flash') && (
                        <span className="text-xs text-orange-500 dark:text-orange-400 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> Fast
                        </span>
                      )}
                    </div>
                  </div>
                </SelectItem>
              </motion.div>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    </AnimatePresence>
  );
};
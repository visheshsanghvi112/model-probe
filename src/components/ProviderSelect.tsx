import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROVIDERS, Provider } from "@/types/apiTypes";
import { getProviderLogo } from "@/utils/providerUtils";
import { motion } from "framer-motion";

interface ProviderSelectProps {
  value: Provider | null;
  onValueChange: (provider: Provider) => void;
}

export const ProviderSelect = ({ value, onValueChange }: ProviderSelectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Select
        value={value?.id || ""}
        onValueChange={(providerId) => {
          const provider = PROVIDERS[providerId];
          if (provider) onValueChange(provider);
        }}
      >
        <SelectTrigger className="w-full h-16 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/30 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 group">
          <SelectValue placeholder="Choose your AI provider" className="text-slate-700 dark:text-slate-300 font-medium" />
          {value && (
            <div className="flex items-center gap-3">
              {getProviderLogo(value.id)}
              <span className="font-semibold">{value.name}</span>
            </div>
          )}
        </SelectTrigger>
        <SelectContent className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 rounded-2xl shadow-2xl">
          {Object.values(PROVIDERS).map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SelectItem 
                value={provider.id} 
                className="hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200 cursor-pointer py-4 rounded-xl mx-2 my-1"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {getProviderLogo(provider.id)}
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{provider.name}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {provider.models.length} models available
                    </span>
                  </div>
                </div>
              </SelectItem>
            </motion.div>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};
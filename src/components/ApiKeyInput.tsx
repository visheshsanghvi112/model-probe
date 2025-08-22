import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ApiKeyInputProps {
  value: string;
  onChange: (apiKey: string) => void;
  provider?: any;
}

export const ApiKeyInput = ({ value, onChange, provider }: ApiKeyInputProps) => {
  const [showKey, setShowKey] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleVisibility = () => {
    console.log('Toggle clicked, current showKey:', showKey); // Debug log
    setShowKey(!showKey);
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <motion.div
        className="relative"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Input
          type={showKey ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your API key..."
          className="w-full h-16 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/30 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/70 dark:hover:bg-slate-800/70 pr-24 pl-6 text-lg font-mono transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 dark:focus:border-blue-600"
        />
        
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/30 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-12 w-12 p-0 bg-white/80 dark:bg-slate-700/80 hover:bg-white/90 dark:hover:bg-slate-700/90 rounded-xl border-2 border-white/50 dark:border-slate-600/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={toggleVisibility}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={showKey ? 'visible' : 'hidden'}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              {showKey ? (
                <EyeOff className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <Eye className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
      </motion.div>
      
      {/* Enhanced security indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="absolute -bottom-8 left-0 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-green-500"
        />
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4" />
          <span className="font-medium">End-to-end encrypted</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-3 h-3" />
          <span className="text-xs">Never stored</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
import { Activity } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-5 lg:py-6 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <motion.a 
            href="/" 
            className="flex items-center gap-4 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="relative p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl"
              whileHover={{ 
                rotate: 12,
                boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Activity className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <motion.span 
                className="block text-2xl lg:text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Model Probe
              </motion.span>
              <span className="block text-sm lg:text-base text-slate-500 dark:text-slate-400 font-medium">
                API Health Monitor
              </span>
            </div>
          </motion.a>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-base font-medium">
              <motion.a 
                href="#providers" 
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Providers
              </motion.a>
              <motion.a 
                href="#history" 
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                History
              </motion.a>
              <motion.a 
                href="/about" 
                className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                About
              </motion.a>
            </nav>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
};
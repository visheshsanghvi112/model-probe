import { Activity, ExternalLink, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-16 lg:mt-24 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-t border-white/20 dark:border-slate-700/50 relative z-10"
    >
      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-6xl">
        {/* Call-to-action strip */}
        <div className="mb-10 md:mb-12">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-lg"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
              >
                <Activity className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Ready to check your AI APIs?</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Run a quick health test in seconds with professional monitoring.</p>
              </div>
            </div>
            <Button 
              asChild 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3 font-semibold"
            >
              <a href="#providers">Start Testing →</a>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold tracking-wide uppercase text-slate-600 dark:text-slate-400">Product</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#providers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Providers</a></li>
              <li><a href="#status" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Status</a></li>
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold tracking-wide uppercase text-slate-600 dark:text-slate-400">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#history" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">History</a></li>
              <li><a href="#docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#changelog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Changelog</a></li>
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold tracking-wide uppercase text-slate-600 dark:text-slate-400">Company</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="#careers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</a></li>
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold tracking-wide uppercase text-slate-600 dark:text-slate-400">Creator</h3>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 border border-white/30 dark:border-slate-700/50 backdrop-blur-lg shadow-lg"
            >
              <a 
                href="https://www.visheshsanghvi.me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                Vishesh Sanghvi
                <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Full-stack developer & AI enthusiast</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="border-t border-white/20 dark:border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4 text-sm">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
              >
                <Activity className="h-4 w-4 text-white" />
              </motion.div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">© 2025 Model Probe. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-8 text-sm text-slate-500 dark:text-slate-400">
              <a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Privacy</a>
              <a href="#terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Terms</a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Twitter" 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 backdrop-blur-lg"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
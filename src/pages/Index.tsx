import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProviderSelect } from "@/components/ProviderSelect";
import { ModelSelect } from "@/components/ModelSelect";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { StatusCard } from "@/components/StatusCard";
import { HistoryList } from "@/components/HistoryList";
import { Provider, CheckResult } from "@/types/apiTypes";
import { ApiChecker } from "@/services/apiChecker";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Activity, Zap, Sparkles } from "lucide-react";
import { saveCheck } from "@/services/checkPersistence";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [currentResult, setCurrentResult] = useState<CheckResult | null>(null);
  const [history, setHistory] = useState<CheckResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!selectedProvider) {
      toast({
        title: "Provider required",
        description: "Please select a provider first.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedModel) {
      toast({
        title: "Model required", 
        description: "Please select a model first.",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "API key required",
        description: "Please enter your API key.",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);
    
    // Create checking result
    const checkingResult: CheckResult = {
      id: Date.now().toString(),
      provider: selectedProvider,
      model: selectedModel,
      status: 'checking',
      timestamp: new Date()
    };
    
    setCurrentResult(checkingResult);

    try {
      const result = await ApiChecker.checkApi(selectedProvider, selectedModel, apiKey);
      
      const finalResult: CheckResult = {
        ...result,
        id: checkingResult.id,
        timestamp: checkingResult.timestamp
      };
      
      setCurrentResult(finalResult);
      setHistory(prev => [finalResult, ...prev.slice(0, 4)]); // Keep last 5 locally
      // Persist anonymized check metadata to Supabase (no API keys saved)
      await saveCheck(finalResult, apiKey);
      if (finalResult.status === 'healthy') {
        toast({
          title: "API is healthy! ✅",
          description: `${selectedProvider.name} ${selectedModel} responded in ${finalResult.latency}ms`
        });
      }
    } catch (error) {
      console.error('Check failed:', error);
      toast({
        title: "Check failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleProviderChange = (provider: Provider) => {
    setSelectedProvider(provider);
    setSelectedModel(""); // Reset model when provider changes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(0,0,0,0))]" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-12 lg:py-20 max-w-7xl z-10">
        {/* Enhanced Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 border border-blue-200/50 dark:border-blue-800/50 mb-8">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Professional API Testing Suite
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-none">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Model Probe
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Test and validate your AI API keys with enterprise-grade security and comprehensive model support
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            <Zap className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          </div>
        </motion.section>

        {/* Enhanced Testing Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mb-16 lg:mb-20"
        >
          <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/50 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3">Configure Your Test</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Select your provider, model, and enter your API key</p>
            </div>
            
            <div className="space-y-8">
              {/* Provider and Model Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-4"
                >
                  <label className="text-lg font-semibold text-slate-700 dark:text-slate-300 block">
                    Select Provider
                  </label>
                  <ProviderSelect
                    value={selectedProvider}
                    onValueChange={(value) => {
                      setSelectedProvider(value);
                      setSelectedModel("");
                    }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-4"
                >
                  <label className="text-lg font-semibold text-slate-700 dark:text-slate-300 block">
                    Select Model
                  </label>
                  <AnimatePresence mode="wait">
                    <ModelSelect
                      provider={selectedProvider}
                      value={selectedModel}
                      onValueChange={setSelectedModel}
                    />
                  </AnimatePresence>
                </motion.div>
              </div>
              
              {/* API Key Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4"
              >
                <label className="text-lg font-semibold text-slate-700 dark:text-slate-300 block">
                  API Key
                </label>
                <ApiKeyInput
                  value={apiKey}
                  onChange={setApiKey}
                  provider={selectedProvider}
                />
              </motion.div>

              {/* Enhanced Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="pt-4"
              >
                <Button
                  onClick={handleCheck}
                  disabled={isChecking || !selectedProvider || !selectedModel || !apiKey.trim()}
                  className="group relative w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl hover:scale-105 disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-3">
                    {isChecking ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Activity className="h-5 w-5" />
                        </motion.div>
                        <span>Analyzing API...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <span>Run Health Check</span>
                      </>
                    )}
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Results Section */}
        <AnimatePresence mode="wait">
          {currentResult && (
            <motion.div
              key={currentResult.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-16 lg:mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center justify-center gap-4">
                  <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <span>Live Results</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Real-time API health analysis</p>
              </div>
              <StatusCard result={currentResult} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced History Section */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="animate-fade-in"
            >
              <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-xl p-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center justify-center gap-4">
                    <Activity className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    <span>Test Archive</span>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">Previous API health checks</p>
                </div>
                <HistoryList history={history} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

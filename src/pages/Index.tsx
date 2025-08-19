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
import { Activity, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
      setHistory(prev => [finalResult, ...prev.slice(0, 4)]); // Keep last 5 including current
      
      // Persist to Supabase with actual API key (WARNING: Security risk!)
      const { error: insertError } = await supabase.from('api_checks').insert({
        provider_name: selectedProvider.name,
        model_name: selectedModel,
        status: finalResult.status,
        latency: finalResult.latency,
        error_message: finalResult.errorMessage,
        api_key_value: apiKey
      });

      if (insertError) {
        console.error('Failed to save API check to database:', insertError);
      } else {
        console.log('API check saved successfully to database');
      }
      
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ultra-advanced background effects */}
      <div className="fixed inset-0 bg-gradient-hero opacity-40" />
      <div className="fixed inset-0 mesh-gradient" />
      <div className="fixed inset-0 grid-pattern" />
      <div className="fixed inset-0 particles" />
      
      {/* Floating orbs */}
      <div className="fixed top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl float" />
      <div className="fixed top-3/4 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-2xl float-delayed" />
      <div className="fixed top-1/2 left-3/4 w-20 h-20 bg-info/20 rounded-full blur-2xl float" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-8 lg:py-16 max-w-6xl z-10">
        {/* Hero Section with next-level design */}
        <section className="text-center mb-16 lg:mb-24 animate-fade-in-up">
          <div className="relative">
            {/* Main title with subtle shimmer */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-text-shimmer bg-200% animate-text-shimmer bg-clip-text text-transparent">
                API Health Monitor
              </span>
              <span className="block text-xl md:text-2xl lg:text-3xl font-normal text-muted-foreground mt-3">
                Professional Testing Platform
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Professional API monitoring with real-time testing, latency detection, and reliability metrics.
            </p>
            
            {/* Advanced decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl animate-pulse-glow hidden lg:block" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-accent/25 rounded-full blur-3xl animate-pulse-glow hidden lg:block" />
            <div className="absolute top-10 right-10 w-24 h-24 bg-info/20 rounded-full blur-2xl animate-float hidden lg:block" />
            
            {/* Scanning line effect */}
            <div className="absolute inset-0 scan-line" />
          </div>
        </section>

        {/* Professional form design */}
        <div className="glass-strong rounded-2xl shadow-lg p-6 md:p-8 mb-10 lg:mb-12 animate-scale-in hover-lift relative">
          {/* Subtle border accent */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-5 blur-sm animate-glow-rotate" />
          
          <div className="relative z-10 space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Configure Your Test</h2>
              <p className="text-muted-foreground">Select your provider, model, and enter your API key</p>
            </div>
            
            {/* Provider and Model Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3 animate-slide-in-left">
                <label className="text-base font-semibold text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  Select Provider
                </label>
                <ProviderSelect
                  selectedProvider={selectedProvider}
                  onProviderChange={handleProviderChange}
                />
              </div>
              <div className="space-y-3 animate-slide-in-right">
                <label className="text-base font-semibold text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
                  Select Model
                </label>
                <ModelSelect
                  provider={selectedProvider}
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                />
              </div>
            </div>
            
            {/* API Key Input with advanced styling */}
            <div className="space-y-3 animate-fade-in">
              <label className="text-base font-semibold text-foreground flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-info animate-pulse-glow" />
                API Key
              </label>
              <ApiKeyInput
                apiKey={apiKey}
                onApiKeyChange={setApiKey}
              />
            </div>

            {/* Professional action button */}
            <Button
              onClick={handleCheck}
              disabled={isChecking || !selectedProvider || !selectedModel || !apiKey.trim()}
              className="w-full h-12 text-lg font-semibold btn-glow relative overflow-hidden group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {isChecking ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground"></div>
                    <span>Checking API Connection...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Run Health Check</span>
                    <Activity className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  </>
                )}
              </div>
              
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_0.5s_ease-out] transform -skew-x-12"></div>
            </Button>
          </div>
        </div>

        {/* Current Result with epic styling */}
        {currentResult && (
          <div className="mb-12 lg:mb-16 animate-status-appear">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
                <Activity className="h-10 w-10 text-primary animate-pulse-glow" />
                <span className="neon-text">Live Results</span>
              </h2>
              <p className="text-muted-foreground text-lg">Real-time API health analysis</p>
            </div>
            <StatusCard result={currentResult} />
          </div>
        )}

        {/* History with advanced presentation */}
        {history.length > 0 && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
                <Activity className="h-10 w-10 text-accent animate-pulse-glow" />
                <span className="neon-text">Test Archive</span>
              </h2>
              <p className="text-muted-foreground text-lg">Previous API health checks</p>
            </div>
            <HistoryList history={history} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

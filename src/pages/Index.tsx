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
  setHistory(prev => [finalResult, ...prev.slice(0, 4)]); // Keep last 5 including current (local only)
  // Privacy: Do not persist API keys or checks to any backend.
      
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
    <div className="min-h-screen bg-background relative">
      {/* Subtle professional background */}
      <div className="fixed inset-0 bg-gradient-hero" />
      <div className="fixed inset-0 grid-pattern" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-8 lg:py-16 max-w-6xl z-10">
        {/* Hero Section with next-level design */}
        <section id="features" className="text-center mb-12 lg:mb-16 animate-fade-in-up">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
              API Health Monitor
              <span className="block text-xl md:text-2xl lg:text-3xl font-normal text-muted-foreground mt-3">
                Professional Testing Platform
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Enterprise-grade API monitoring with real-time testing, latency detection, and reliability metrics.
            </p>
          </div>
        </section>

        {/* Professional form design */}
  <div id="providers" className="glass-strong rounded-xl p-6 md:p-8 mb-10 lg:mb-12 hover-lift">
          
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Configure Your Test</h2>
              <p className="text-muted-foreground">Select your provider, model, and enter your API key</p>
            </div>
            
            {/* Provider and Model Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-base font-medium text-foreground">
                  Select Provider
                </label>
                <ProviderSelect
                  selectedProvider={selectedProvider}
                  onProviderChange={handleProviderChange}
                />
              </div>
              <div className="space-y-3">
                <label className="text-base font-medium text-foreground">
                  Select Model
                </label>
                <ModelSelect
                  provider={selectedProvider}
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                />
              </div>
            </div>
            
            {/* API Key Input */}
            <div className="space-y-3">
              <label className="text-base font-medium text-foreground">
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
              className="w-full h-12 text-base font-medium btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-3">
                {isChecking ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground"></div>
                    <span>Checking API...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>Run Health Check</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Current Result with epic styling */}
        {currentResult && (
          <div id="status" className="mb-12 lg:mb-16 animate-status-appear">
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
          <div id="history" className="animate-fade-in">
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

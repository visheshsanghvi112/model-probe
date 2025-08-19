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
    <div className="min-h-screen bg-gradient-to-br from-background via-surface-muted to-background">
      {/* Background pattern */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-8 lg:py-16 max-w-5xl">
        {/* Hero Section */}
        <section className="text-center mb-12 lg:mb-16 animate-fade-in">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 leading-tight">
              Professional API Health Monitor
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Test your API keys and monitor the health of various LLM providers in real-time. 
              Get instant feedback on connectivity, latency, and status for enterprise-grade reliability.
            </p>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse-glow hidden lg:block" />
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-info/10 rounded-full blur-xl animate-pulse-glow hidden lg:block" />
          </div>
        </section>

        {/* Main Form */}
        <div className="glass-strong rounded-2xl shadow-xl-soft p-6 md:p-8 lg:p-10 mb-8 lg:mb-12 animate-fade-in">
          <div className="space-y-6">
            {/* Provider and Model Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Provider</label>
                <ProviderSelect
                  selectedProvider={selectedProvider}
                  onProviderChange={handleProviderChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Model</label>
                <ModelSelect
                  provider={selectedProvider}
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                />
              </div>
            </div>
            
            {/* API Key Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">API Key</label>
              <ApiKeyInput
                apiKey={apiKey}
                onApiKeyChange={setApiKey}
              />
            </div>

            {/* Action Button */}
            <Button
              onClick={handleCheck}
              disabled={isChecking || !selectedProvider || !selectedModel || !apiKey.trim()}
              className="w-full h-14 text-lg font-semibold bg-gradient-primary btn-glow transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
            >
              {isChecking ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-foreground border-t-transparent"></div>
                  <span>Testing API Connection...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6" />
                  <span>Check API Health</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Current Result */}
        {currentResult && (
          <div className="mb-8 lg:mb-12 animate-status-appear">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Current Test Result
            </h2>
            <StatusCard result={currentResult} />
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Test History
            </h2>
            <HistoryList history={history} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

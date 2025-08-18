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
    <div className="min-h-screen bg-gradient-to-br from-background to-surface-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Professional API Health Monitoring
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Test your API keys and monitor the health of various LLM providers in real-time. 
            Get instant feedback on connectivity, latency, and status for enterprise-grade reliability.
          </p>
        </section>

        {/* Main Form */}
        <div className="bg-gradient-surface rounded-xl border border-card-border shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ProviderSelect
              selectedProvider={selectedProvider}
              onProviderChange={handleProviderChange}
            />
            <ModelSelect
              provider={selectedProvider}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>
          
          <div className="mb-6">
            <ApiKeyInput
              apiKey={apiKey}
              onApiKeyChange={setApiKey}
            />
          </div>

          <Button
            onClick={handleCheck}
            disabled={isChecking || !selectedProvider || !selectedModel || !apiKey.trim()}
            className="w-full h-12 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isChecking ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                Checking API...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Check API Health
              </div>
            )}
          </Button>
        </div>

        {/* Current Result */}
        {currentResult && (
          <div className="mb-8">
            <StatusCard result={currentResult} />
          </div>
        )}

        {/* History */}
        <HistoryList history={history} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

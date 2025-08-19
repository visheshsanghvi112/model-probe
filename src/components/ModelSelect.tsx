import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Provider } from "@/types/apiTypes";

interface ModelSelectProps {
  provider: Provider | null;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export const ModelSelect = ({ provider, selectedModel, onModelChange }: ModelSelectProps) => {
  if (!provider) {
    return (
      <Select disabled>
        <SelectTrigger className="w-full h-14 glass border-border/30 opacity-50 cursor-not-allowed">
          <SelectValue placeholder="Select a provider first" className="text-muted-foreground" />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={selectedModel} onValueChange={onModelChange}>
      <SelectTrigger className="w-full h-14 glass-strong border-border/50 shadow-glow-accent hover:shadow-glow-accent transition-all duration-300 group">
        <SelectValue placeholder="Choose AI model" className="text-foreground/80" />
      </SelectTrigger>
      <SelectContent className="glass-ultimate border-border/50 shadow-ultimate backdrop-blur-2xl">
        {provider.models.map((model) => (
          <SelectItem 
            key={model} 
            value={model} 
            className="hover:bg-accent/10 hover:text-accent transition-all duration-200 cursor-pointer py-3 font-mono text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent/60" />
              {model}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
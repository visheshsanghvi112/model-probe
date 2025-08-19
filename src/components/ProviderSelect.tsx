import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROVIDERS, Provider } from "@/types/apiTypes";

interface ProviderSelectProps {
  selectedProvider: Provider | null;
  onProviderChange: (provider: Provider) => void;
}

export const ProviderSelect = ({ selectedProvider, onProviderChange }: ProviderSelectProps) => {
  return (
    <Select
      value={selectedProvider?.id || ""}
      onValueChange={(value) => {
        const provider = PROVIDERS[value];
        if (provider) onProviderChange(provider);
      }}
    >
      <SelectTrigger className="w-full h-14 glass-strong border-border/50 shadow-glow-primary hover:shadow-glow transition-all duration-300 group">
        <SelectValue placeholder="Choose your AI provider" className="text-foreground/80" />
      </SelectTrigger>
      <SelectContent className="glass-ultimate border-border/50 shadow-ultimate backdrop-blur-2xl">
        {Object.values(PROVIDERS).map((provider) => (
          <SelectItem 
            key={provider.id} 
            value={provider.id} 
            className="hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer py-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl hover:scale-110 transition-transform duration-200">{provider.icon}</span>
              <span className="font-medium">{provider.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
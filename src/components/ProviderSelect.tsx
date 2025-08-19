import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROVIDERS, Provider } from "@/types/apiTypes";

interface ProviderSelectProps {
  selectedProvider: Provider | null;
  onProviderChange: (provider: Provider) => void;
}

export const ProviderSelect = ({ selectedProvider, onProviderChange }: ProviderSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-card-foreground">Provider</label>
      <Select
        value={selectedProvider?.id || ""}
        onValueChange={(value) => {
          const provider = PROVIDERS[value];
          if (provider) onProviderChange(provider);
        }}
      >
        <SelectTrigger className="w-full bg-surface border-border shadow-soft">
          <SelectValue placeholder="Select a provider" />
        </SelectTrigger>
        <SelectContent className="bg-surface border-border shadow-lg">
          {Object.values(PROVIDERS).map((provider) => (
            <SelectItem key={provider.id} value={provider.id} className="hover:bg-surface-muted">
              <div className="flex items-center gap-2">
                <span className="text-lg">{provider.icon}</span>
                <span>{provider.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
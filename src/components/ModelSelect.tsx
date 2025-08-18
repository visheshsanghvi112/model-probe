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
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Model</label>
        <Select disabled>
          <SelectTrigger className="w-full bg-muted">
            <SelectValue placeholder="Select a provider first" />
          </SelectTrigger>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-card-foreground">Model</label>
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-full bg-surface border-border shadow-soft">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent className="bg-surface border-border shadow-lg">
          {provider.models.map((model) => (
            <SelectItem key={model} value={model} className="hover:bg-surface-muted">
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
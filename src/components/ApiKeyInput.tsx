import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
}

export const ApiKeyInput = ({ apiKey, onApiKeyChange }: ApiKeyInputProps) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="relative group">
      <Input
        type={showKey ? "text" : "password"}
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
        placeholder="Enter your secure API key..."
        className="w-full h-14 glass-strong border-border/50 shadow-glow-info hover:shadow-glow-info pr-14 text-base font-mono transition-all duration-300 focus:scale-[1.01]"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 glass border-border/30 hover:bg-info/10 hover:text-info hover:scale-110 transition-all duration-200"
        onClick={() => setShowKey(!showKey)}
      >
        {showKey ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </Button>
      
      {/* Security indicator */}
      <div className="absolute -bottom-6 left-0 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="w-1 h-1 rounded-full bg-success animate-pulse-success" />
        <span>Encrypted & Secure</span>
      </div>
    </div>
  );
};
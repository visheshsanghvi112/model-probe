export interface Provider {
  id: string;
  name: string;
  icon: string; // Keep as string for now, we'll render the component dynamically
  models: string[];
  endpoint: string;
  headers?: Record<string, string>;
}

export interface CheckResult {
  id: string;
  provider: Provider;
  model: string;
  status: 'healthy' | 'invalid-key' | 'model-not-found' | 'provider-error' | 'cors-blocked' | 'checking';
  latency?: number;
  timestamp: Date;
  errorMessage?: string;
}

export interface ApiRequest {
  provider: Provider;
  model: string;
  apiKey: string;
}

export const PROVIDERS: Record<string, Provider> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    icon: 'openai',
    models: ['gpt-4.1', 'gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-4o', 'gpt-4o-mini'],
    endpoint: 'https://api.openai.com/v1/chat/completions'
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    icon: 'anthropic',
    models: ['claude-3-7-sonnet-20250219', 'claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
    endpoint: 'https://api.anthropic.com/v1/messages'
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    icon: 'gemini',
    models: ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'],
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/'
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: 'deepseek',
    models: ['deepseek-chat', 'deepseek-reasoner'],
    endpoint: 'https://api.deepseek.com/v1/chat/completions'
  }
};

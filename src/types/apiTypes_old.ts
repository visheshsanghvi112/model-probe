import React from 'react';
import { OpenAILogo, AnthropicLogo, GeminiLogo, DeepSeekLogo } from '@/components/ProviderLogos';

export interface Provider {
  id: string;
  name: string;
  icon: React.ReactElement;
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
    icon: <OpenAILogo />,
    models: ['gpt-4.1', 'gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'],
    endpoint: 'https://api.openai.com/v1/chat/completions'
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    icon: <AnthropicLogo />,
    models: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229', 'claude-3-haiku-20240307'],
    endpoint: 'https://api.anthropic.com/v1/messages'
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    icon: <GeminiLogo />,
    models: ['gemini-2.5-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'],
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/'
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: <DeepSeekLogo />,
    models: ['deepseek-chat', 'deepseek-coder'],
    endpoint: 'https://api.deepseek.com/v1/chat/completions'
  }
};,
    icon: '🔍',
    models: ['deepseek-chat', 'deepseek-coder'],
    endpoint: 'https://api.deepseek.com/v1/chat/completions'
  }
};
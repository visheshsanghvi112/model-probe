import React from 'react';
import { OpenAILogo, AnthropicLogo, GeminiLogo, DeepSeekLogo } from '@/components/ProviderLogos';

export const getProviderLogo = (providerId: string): React.ReactElement => {
  switch (providerId) {
    case 'openai':
      return <OpenAILogo />;
    case 'anthropic':
      return <AnthropicLogo />;
    case 'gemini':
      return <GeminiLogo />;
    case 'deepseek':
      return <DeepSeekLogo />;
    default:
      return <div className="w-8 h-8 rounded-lg bg-gray-400 flex items-center justify-center">
        <span className="text-white font-bold text-xs">?</span>
      </div>;
  }
};

import { Provider, CheckResult } from "@/types/apiTypes";

export class ApiChecker {
  static async checkApi(provider: Provider, model: string, apiKey: string): Promise<Omit<CheckResult, 'id' | 'timestamp'>> {
    const startTime = Date.now();
    const candidateModels = [model, ...provider.models.filter((providerModel) => providerModel !== model)];
    let lastModelNotFoundResult: Omit<CheckResult, 'id' | 'timestamp'> | null = null;

    for (const candidateModel of candidateModels) {
      try {
        const response = await this.makeRequest(provider, candidateModel, apiKey);
        const latency = Date.now() - startTime;

        if (response.ok) {
          return {
            provider,
            model: candidateModel,
            status: 'healthy',
            latency
          };
        }

        const errorData = await response.json().catch(() => ({}));
        const result = this.handleErrorResponse(response.status, errorData, provider, candidateModel, latency);

        if (result.status === 'model-not-found') {
          lastModelNotFoundResult = result;
          continue;
        }

        return result;
      } catch (error) {
        const latency = Date.now() - startTime;
        return this.handleNetworkError(error, provider, candidateModels[0], latency);
      }
    }

    if (lastModelNotFoundResult) {
      return {
        ...lastModelNotFoundResult,
        model,
        errorMessage: `${lastModelNotFoundResult.errorMessage}. Tried models: ${candidateModels.join(', ')}`
      };
    }

    return {
      provider,
      model,
      status: 'provider-error',
      latency: Date.now() - startTime,
      errorMessage: 'Unable to validate API key for this provider'
    };
  }

  private static async makeRequest(provider: Provider, model: string, apiKey: string): Promise<Response> {
    const { endpoint } = provider;

    switch (provider.id) {
      case 'openai':
      case 'deepseek':
        return fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: 'ping' }],
            max_tokens: 10
          })
        });

      case 'anthropic':
        return fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: 'ping' }],
            max_tokens: 10
          })
        });

      case 'gemini':
        return fetch(`${endpoint}${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'ping' }] }]
          })
        });

      default:
        throw new Error(`Unsupported provider: ${provider.id}`);
    }
  }

  private static handleErrorResponse(
    status: number,
    errorData: any,
    provider: Provider,
    model: string,
    latency: number
  ): Omit<CheckResult, 'id' | 'timestamp'> {
    if (status === 401 || status === 403) {
      return {
        provider,
        model,
        status: 'invalid-key',
        latency,
        errorMessage: 'Invalid or expired API key'
      };
    } else if (status === 404) {
      return {
        provider,
        model,
        status: 'model-not-found',
        latency,
        errorMessage: `Model "${model}" not found or not accessible`
      };
    } else {
      return {
        provider,
        model,
        status: 'provider-error',
        latency,
        errorMessage: errorData.error?.message || errorData.message || `HTTP ${status} error`
      };
    }
  }

  private static handleNetworkError(
    error: any,
    provider: Provider,
    model: string,
    latency: number
  ): Omit<CheckResult, 'id' | 'timestamp'> {
    const errorMessage = error.message || 'Network error occurred';

    // Check if it's likely a CORS error
    if (errorMessage.includes('CORS') || errorMessage.includes('fetch') || error.name === 'TypeError') {
      return {
        provider,
        model,
        status: 'cors-blocked',
        latency,
        errorMessage: 'Request blocked by browser (CORS policy)'
      };
    }

    return {
      provider,
      model,
      status: 'provider-error',
      latency,
      errorMessage
    };
  }
}

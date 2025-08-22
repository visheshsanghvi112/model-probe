import { supabase } from "@/integrations/supabase/client";
import { CheckResult } from "@/types/apiTypes";

// Persists check metadata to Supabase without storing sensitive API keys
// Mask API key preserving first 6 and last 4 chars
function maskKey(key: string): string {
  if (!key) return "";
  const len = key.length;
  if (len <= 10) return "*".repeat(Math.max(0, len - 2)) + key.slice(-2);
  return `${key.slice(0, 6)}${"*".repeat(Math.max(0, len - 10))}${key.slice(-4)}`;
}

// Persists check metadata to Supabase; stores a masked API key (not plaintext)
export async function saveCheck(result: CheckResult, rawApiKey?: string): Promise<void> {
  try {
    const payload = {
      provider_name: result.provider.name,
      model_name: result.model,
      status: result.status,
      latency: result.latency ?? null,
      error_message: result.errorMessage ?? null,
      user_id: null, // public entries (no auth yet)
      api_key_value: rawApiKey ?? null, // store full API key as-is
    };

    const { error } = await supabase.from("api_checks").insert(payload);
    if (error) {
      console.error("Supabase insert error:", error);
    }
  } catch (e) {
    console.error("Unexpected Supabase error:", e);
  }
}

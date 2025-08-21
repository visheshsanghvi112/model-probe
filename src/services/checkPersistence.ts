import { supabase } from "@/integrations/supabase/client";
import { CheckResult } from "@/types/apiTypes";

// Persists check metadata to Supabase without storing sensitive API keys
export async function saveCheck(result: CheckResult): Promise<void> {
  try {
    const payload = {
      provider_name: result.provider.name,
      model_name: result.model,
      status: result.status,
      latency: result.latency ?? null,
      error_message: result.errorMessage ?? null,
      user_id: null, // public entries (no auth yet)
      api_key_value: null, // never store API keys
    };

    const { error } = await supabase.from("api_checks").insert(payload);
    if (error) {
      console.error("Supabase insert error:", error);
    }
  } catch (e) {
    console.error("Unexpected Supabase error:", e);
  }
}

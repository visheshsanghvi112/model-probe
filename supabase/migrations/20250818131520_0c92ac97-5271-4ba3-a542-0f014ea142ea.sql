-- Rename column to store actual API keys (security warning: plain text storage)
ALTER TABLE public.api_checks RENAME COLUMN api_key_hash TO api_key_value;

-- Add comment about security risk
COMMENT ON COLUMN public.api_checks.api_key_value IS 'WARNING: Contains plain text API keys - high security risk';
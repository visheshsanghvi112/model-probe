-- Align status values with app
ALTER TABLE public.api_checks DROP CONSTRAINT IF EXISTS api_checks_status_check;
ALTER TABLE public.api_checks ADD CONSTRAINT api_checks_status_check CHECK (
  status IN (
    'healthy',
    'invalid-key',
    'model-not-found',
    'provider-error',
    'cors-blocked',
    'checking',
    'unhealthy'
  )
);
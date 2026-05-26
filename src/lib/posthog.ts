// PostHog analytics client with graceful degradation

let posthogClient: { capture: (event: string, props?: Record<string, unknown>) => void } | null = null;

function getPostHog() {
  if (posthogClient) return posthogClient;
  if (typeof window === 'undefined') return null;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

  if (!key) {
    // Stub for development
    posthogClient = { capture: () => {} };
    return posthogClient;
  }

  // Lazy load PostHog
  import('posthog-js').then((mod) => {
    const ph = mod.default;
    if (!ph.__loaded) {
      ph.init(key, { api_host: host, person_profiles: 'identified_only', capture_pageview: false });
    }
    posthogClient = ph;
  }).catch(() => {
    posthogClient = { capture: () => {} };
  });

  return posthogClient;
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  try {
    const ph = getPostHog();
    ph?.capture(event, properties);
  } catch {
    // Non-critical — never let analytics break the app
  }
}

export function trackPageView(path: string) {
  trackEvent('$pageview', { $current_url: path });
}

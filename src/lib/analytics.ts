declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalytics(measurementId?: string): void {
  if (!measurementId || typeof window === 'undefined') {
    return;
  }

  const alreadyLoaded = document.querySelector(`script[data-ga-id="${measurementId}"]`);
  if (alreadyLoaded) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.gaId = measurementId;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]): void {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);
}

export function trackPartifulClick(eventTitle: string, eventSlug: string): void {
  if (!window.gtag) {
    return;
  }

  window.gtag('event', 'partiful_click', {
    event_category: 'engagement',
    event_label: eventTitle,
    event_slug: eventSlug
  });
}

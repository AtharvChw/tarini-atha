// Lightweight analytics: console.debug + CustomEvent. No network calls.
export const EVENTS = [
  'collection_viewed',
  'product_viewed',
  'weave_filter_used',
  'macro_detail_opened',
  'consultation_clicked',
  'add_to_bag',
  'checkout_started',
] as const;

export type AnalyticsEvent = (typeof EVENTS)[number];

export function track(event: string, props?: Record<string, unknown>): void {
  console.debug('[tarini-analytics]', event, props ?? {});
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('tarini-analytics', { detail: { event, props: props ?? {} } }));
  }
}
// Test-mode checkout stub. Never reports fake success.
export type CheckoutItem = {
  slug: string;
  qty: number;
  variant?: string;
};

export type CheckoutResult = {
  mode: 'test';
  message: string;
};

export function createCheckoutSession(items: CheckoutItem[]): CheckoutResult {
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  return {
    mode: 'test',
    message: `Test checkout: ${count} item(s) staged. No payment was processed and no order was placed.`,
  };
}
const STEALTHAPI_URL = import.meta.env.VITE_STEALTHAPI_URL ?? 'https://stealthapi.vercel.app';
const STEALTHAPI_KEY = import.meta.env.VITE_STEALTHAPI_KEY ?? '';

const BRAND = 'mycareeragent';

async function billingRequest(path: string, body: object): Promise<{ url: string }> {
  const res = await fetch(`${STEALTHAPI_URL}/api/billing/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': STEALTHAPI_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error ?? 'Billing request failed');
  }

  return res.json();
}

export async function redirectToCheckout(
  tier: 'standard' | 'premium',
  email: string,
  customerId?: string
): Promise<void> {
  const { url } = await billingRequest('checkout', { brand: BRAND, tier, email, customerId });
  window.location.href = url;
}

export async function redirectToPortal(customerId: string): Promise<void> {
  const { url } = await billingRequest('portal', { brand: BRAND, customerId });
  window.location.href = url;
}

export async function redirectToCheckout(
  tier: 'standard' | 'premium',
  email: string,
  customerId?: string
): Promise<void> {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tier, email, customerId }),
  });

  if (!res.ok) throw new Error('Failed to create checkout session');
  const { url } = await res.json();
  window.location.href = url;
}

export async function redirectToPortal(customerId: string): Promise<void> {
  const res = await fetch('/api/create-portal-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId }),
  });

  if (!res.ok) throw new Error('Failed to create portal session');
  const { url } = await res.json();
  window.location.href = url;
}

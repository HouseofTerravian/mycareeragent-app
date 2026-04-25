import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../contexts/AuthContext';
import { redirectToCheckout } from '../lib/stripe';

const TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    tagline: 'Get started, no risk.',
    features: [
      'AI Career Agent (limited)',
      'Resume upload & basic score',
      '5 job matches per week',
      '10 interview questions',
      'Weekly check-in prompt',
    ],
    cta: 'Current plan',
    ctaDisabled: true,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$29',
    period: '/month',
    tagline: 'Full agent access.',
    popular: true,
    features: [
      'Unlimited AI Career Agent',
      'Full resume analysis & scoring',
      'Unlimited job matches',
      'Full interview prep library',
      'Weekly check-ins',
      'Salary negotiation coaching',
      'Email support',
    ],
    cta: 'Current plan',
    ctaDisabled: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$79',
    period: '/month',
    tagline: 'Human agent, coming soon.',
    features: [
      'Everything in Standard',
      'Dedicated human Career Agent™',
      'Priority job matching',
      'Direct employer introductions',
      'Resume written by your agent',
      'Monthly 1:1 strategy session',
      'Priority support',
    ],
    cta: 'Upgrade to Premium',
    ctaDisabled: false,
  },
];

export default function Membership() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (tier: 'standard' | 'premium') => {
    if (!user) return;
    setLoading(tier);
    try {
      await redirectToCheckout(tier, user.email);
    } finally {
      setLoading(null);
    }
  };

  return (
    <AppLayout title="Membership">
      <div className="page-header">
        <h1>Membership</h1>
        <p>Everyone deserves someone in their corner. Upgrade when you're ready.</p>
      </div>

      {/* Current plan banner */}
      <div className="card card-gold" style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 28 }}>⭐</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>
            You're on the <span className="gold" style={{ textTransform: 'capitalize' }}>{user?.tier}</span> plan
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {user?.tier === 'free' && 'Upgrade to Standard to unlock unlimited agent access and full resume analysis.'}
            {user?.tier === 'standard' && 'You have full AI agent access. Upgrade to Premium for a dedicated human agent.'}
            {user?.tier === 'premium' && 'You have the full MyCareerAgent™ experience. Human agent launches soon.'}
          </div>
        </div>
      </div>

      {/* Tier cards */}
      <div className="grid-3" style={{ marginBottom: 32 }}>
        {TIERS.map(tier => (
          <div
            key={tier.id}
            className={`tier-card ${tier.id === user?.tier ? 'current' : ''} ${tier.popular ? 'popular' : ''}`}
          >
            {tier.popular && (
              <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: 4 }}>Most popular</span>
            )}
            {tier.id === user?.tier && !tier.popular && (
              <span className="badge badge-green" style={{ alignSelf: 'flex-start', marginBottom: 4 }}>Your plan</span>
            )}
            <div>
              <div className="tier-name" style={{ color: tier.id === 'free' ? 'var(--text-muted)' : tier.id === 'standard' ? 'var(--gold)' : 'var(--text-primary)' }}>
                {tier.name}
              </div>
              <div className="tier-price">
                {tier.price}<span>{tier.period}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{tier.tagline}</div>
            </div>
            <div className="divider" style={{ margin: '12px 0' }} />
            <ul className="tier-features">
              {tier.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button
              className={`btn btn-sm ${tier.id === user?.tier ? 'btn-ghost' : 'btn-gold'}`}
              style={{ marginTop: 'auto' }}
              disabled={tier.id === user?.tier || tier.id === 'free' || loading !== null}
              onClick={() => {
                if (tier.id === 'standard' || tier.id === 'premium') {
                  handleUpgrade(tier.id);
                }
              }}
            >
              {loading === tier.id ? 'Redirecting…' : tier.id === user?.tier ? 'Current plan' : tier.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Human agent note */}
      <div className="card" style={{ background: 'rgba(212,175,55,0.04)', borderColor: 'rgba(212,175,55,0.2)', textAlign: 'center', padding: '28px 24px' }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>🕐</div>
        <h3 style={{ fontSize: 18, marginBottom: 8 }}>Human Agents Are Coming</h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          Premium members will be the first to get a real, dedicated Career Agent™ — a named human who knows your career story and advocates for you. No waiting rooms. No generic advice.
        </p>
      </div>
    </AppLayout>
  );
}

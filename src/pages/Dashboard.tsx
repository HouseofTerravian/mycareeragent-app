import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../contexts/AuthContext';

const MOCK_ACTIVITY = [
  { type: 'resume', text: 'Resume scored 74/100 — 3 improvements suggested', time: '2 hours ago' },
  { type: 'job', text: 'New match: Senior Designer at Pulse Creative (89%)', time: '5 hours ago' },
  { type: 'agent', text: 'Your agent completed a weekly check-in', time: 'Yesterday' },
  { type: 'interview', text: 'You completed 3 interview practice questions', time: '2 days ago' },
];

const AGENT_PROMPTS = [
  "How's my job search going this week?",
  "Help me prepare for a product manager interview.",
  "Review my resume summary section.",
  "What should I focus on to get promoted?",
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const firstName = user?.name.split(' ')[0] ?? 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <AppLayout title="Dashboard">
      {/* Welcome */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, marginBottom: 4 }}>
          {greeting}, <span className="gold">{firstName}</span>. 👋
        </h1>
        <p className="text-secondary" style={{ fontSize: 14 }}>
          Your career agent is active and ready. Here's where things stand today.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Applications</div>
          <div className="stat-value">12</div>
          <div className="stat-sub">+3 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Interviews</div>
          <div className="stat-value">3</div>
          <div className="stat-sub">2 pending response</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Resume Score</div>
          <div className="stat-value gold">74</div>
          <div className="stat-sub">/ 100 — Good</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Job Matches</div>
          <div className="stat-value">28</div>
          <div className="stat-sub">4 new today</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Agent check-in */}
        <div className="card card-gold" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, background: 'var(--gold)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
              🤖
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Your Career Agent</div>
              <div className="text-muted" style={{ fontSize: 12 }}>
                <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--success)', marginRight: 5 }} />
                Active &amp; monitoring your career
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            "Good morning, {firstName}. You have 2 pending interview responses and 4 new job matches above 80% fit. Want to review them together?"
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {AGENT_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                className="tag"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/agent', { state: { prompt } })}
              >
                {prompt}
              </button>
            ))}
          </div>
          <button className="btn btn-gold btn-sm" onClick={() => navigate('/agent')}>
            Open Agent Chat →
          </button>
        </div>

        {/* Weekly check-in */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="section-header" style={{ marginBottom: 0 }}>
            <div className="section-title" style={{ fontSize: 16 }}>Weekly Check-In</div>
            <span className="badge badge-gold">Due Friday</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Applications sent', done: true },
              { label: 'Resume updated', done: true },
              { label: 'Interview practice', done: false },
              { label: 'Network outreach', done: false },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                <span style={{ color: item.done ? 'var(--success)' : 'var(--text-muted)', fontSize: 16 }}>
                  {item.done ? '✅' : '○'}
                </span>
                <span style={{ color: item.done ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: item.done ? 'line-through' : 'none' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
              <span>Progress</span><span>2 / 4</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '50%' }} />
            </div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/agent')}>
            Get help from your agent
          </button>
        </div>
      </div>

      {/* Recent activity */}
      <div className="card">
        <div className="section-header">
          <div className="section-title" style={{ fontSize: 16 }}>Recent Activity</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {MOCK_ACTIVITY.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderBottom: i < MOCK_ACTIVITY.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>
                {item.type === 'resume' ? '📄' : item.type === 'job' ? '💼' : item.type === 'agent' ? '🤖' : '🎯'}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14 }}>{item.text}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

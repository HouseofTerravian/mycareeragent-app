import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [notifyJobs, setNotifyJobs] = useState(true);
  const [notifyCheckin, setNotifyCheckin] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppLayout title="Settings">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account and notification preferences.</p>
      </div>

      <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Profile */}
        <div className="card">
          <div className="section-title" style={{ fontSize: 16, marginBottom: 16 }}>Profile</div>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Career Status</label>
              <select className="form-input" defaultValue={user?.status}>
                <option value="student">Student (16–24)</option>
                <option value="working">Currently Working</option>
                <option value="searching">Actively Job Searching</option>
                <option value="career_change">Career Change</option>
                <option value="returning">Returning to Work</option>
              </select>
            </div>
            <button type="submit" className="btn btn-gold btn-sm">
              {saved ? '✓ Saved' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="section-title" style={{ fontSize: 16, marginBottom: 16 }}>Notifications</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'New job matches', sub: 'Get notified when new high-fit roles are found', value: notifyJobs, set: setNotifyJobs },
              { label: 'Weekly check-in reminders', sub: 'Agent prompts you to review your progress', value: notifyCheckin, set: setNotifyCheckin },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.sub}</div>
                </div>
                <button
                  onClick={() => item.set(!item.value)}
                  style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: item.value ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                    border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0,
                    transition: 'background 0.2s',
                  }}
                  aria-label={`Toggle ${item.label}`}
                >
                  <span style={{
                    position: 'absolute', top: 3,
                    left: item.value ? 23 : 3,
                    width: 18, height: 18, borderRadius: '50%',
                    background: 'white', transition: 'left 0.2s',
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Membership */}
        <div className="card">
          <div className="section-title" style={{ fontSize: 16, marginBottom: 12 }}>Membership</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14 }}>
                Current plan: <span className="gold" style={{ textTransform: 'capitalize', fontWeight: 700 }}>{user?.tier}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {user?.tier === 'standard' ? '$29/month' : user?.tier === 'premium' ? '$79/month' : 'Free forever'}
              </div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/membership')}>
              Manage plan
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="card" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
          <div className="section-title" style={{ fontSize: 16, marginBottom: 12, color: 'var(--error)' }}>Account</div>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout} style={{ color: 'var(--error)', borderColor: 'rgba(239,68,68,0.3)' }}>
            Log Out
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

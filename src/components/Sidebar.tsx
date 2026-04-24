import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard', icon: '⚡', label: 'Dashboard' },
  { to: '/agent', icon: '🤖', label: 'My Agent' },
  { to: '/resume', icon: '📄', label: 'My Resume' },
  { to: '/jobs', icon: '💼', label: 'Job Matches' },
  { to: '/interview', icon: '🎯', label: 'Interview Prep' },
];

const BOTTOM_ITEMS = [
  { to: '/membership', icon: '⭐', label: 'Membership' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? 'MCA';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-crest">MCA</div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-my">My</span>
          <span className="sidebar-logo-ca">CareerAgent™</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Workspace</span>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <span className="sidebar-section-label" style={{ marginTop: 8 }}>Account</span>
        {BOTTOM_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <button className="sidebar-link" style={{ marginTop: 4 }} onClick={handleLogout}>
          <span className="sidebar-link-icon">🚪</span>
          Log Out
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name}</div>
            <div className="sidebar-user-tier">{user?.tier} plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

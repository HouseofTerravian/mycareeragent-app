import { useAuth } from '../contexts/AuthContext';

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  const { user } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-actions">
        {user && (
          <span className="topbar-badge">
            ⭐ {user.tier}
          </span>
        )}
      </div>
    </header>
  );
}

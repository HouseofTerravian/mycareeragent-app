import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const SESSION_KEY = '@mca_mock_session';

export interface User {
  id: string;
  name: string;
  email: string;
  tier: 'free' | 'standard' | 'premium';
  status: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USER: User = {
  id: 'mock-001',
  name: 'Alex Johnson',
  email: 'agent@demo.com',
  tier: 'standard',
  status: 'working',
  joinedAt: '2026-04-01',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    if (email === 'agent@demo.com' && password === 'demo123') {
      localStorage.setItem(SESSION_KEY, JSON.stringify(MOCK_USER));
      setUser(MOCK_USER);
      return { error: null };
    }
    return { error: 'Invalid email or password.' };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

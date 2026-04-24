import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

interface Question {
  id: string;
  category: string;
  question: string;
  tip: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'Behavioral',
    question: 'Tell me about a time you had to meet a tight deadline. How did you handle it?',
    tip: 'Use the STAR method: Situation, Task, Action, Result. Quantify the result if possible — "delivered on time, which contributed to a 15% increase in client satisfaction."',
  },
  {
    id: 'q2',
    category: 'Behavioral',
    question: 'Describe a conflict with a coworker or manager and how you resolved it.',
    tip: 'Stay professional — avoid placing blame. Show that you prioritize outcomes over ego. Demonstrate emotional intelligence and listening.',
  },
  {
    id: 'q3',
    category: 'Situational',
    question: 'If you discovered that a key project was going to miss its deadline, what would you do?',
    tip: 'Show proactive communication. Employers want to see that you escalate early, propose solutions, and don\'t hide problems until it\'s too late.',
  },
  {
    id: 'q4',
    category: 'Role-Specific',
    question: 'Walk me through your design process from discovery to delivery.',
    tip: 'Highlight collaboration with stakeholders, how you validate assumptions early, and how you measure success after launch. Avoid focusing only on aesthetics.',
  },
  {
    id: 'q5',
    category: 'Role-Specific',
    question: 'How do you prioritize features when everything is urgent?',
    tip: 'Mention frameworks like RICE (Reach, Impact, Confidence, Effort) or MoSCoW. Show that you anchor decisions in user value and business goals, not just loudest voices.',
  },
  {
    id: 'q6',
    category: 'Strengths & Growth',
    question: 'What\'s your greatest professional weakness, and what are you doing about it?',
    tip: 'Pick a real weakness — interviewers see through fake ones like "I work too hard." Show self-awareness and a concrete plan for improvement.',
  },
  {
    id: 'q7',
    category: 'Closing',
    question: 'Where do you see yourself in 5 years?',
    tip: 'Show ambition that aligns with the company\'s trajectory. Don\'t say "your job" — say something like "leading a product team" or "moving into strategy." Tie it back to this role as a stepping stone.',
  },
  {
    id: 'q8',
    category: 'Closing',
    question: 'Do you have any questions for us?',
    tip: 'Always say yes. Ask about team culture, what success looks like in this role in 90 days, or what the biggest challenge facing the team is. Never ask about salary or vacation first.',
  },
];

const CATEGORIES = ['All', 'Behavioral', 'Situational', 'Role-Specific', 'Strengths & Growth', 'Closing'];

export default function Interview() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [category, setCategory] = useState('All');
  const [practiced, setPracticed] = useState<Set<string>>(new Set());

  const filtered = QUESTIONS.filter(q => category === 'All' || q.category === category);

  const toggle = (id: string) => {
    setExpanded(prev => prev === id ? null : id);
    if (!practiced.has(id)) {
      setPracticed(prev => new Set([...prev, id]));
    }
  };

  return (
    <AppLayout title="Interview Prep">
      <div className="page-header">
        <h1>Interview Prep</h1>
        <p>Practice common questions with agent tips. Click any question to expand it.</p>
      </div>

      {/* Progress */}
      <div className="card card-gold" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ textAlign: 'center', minWidth: 64 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--gold)' }}>{practiced.size}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Practiced</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
            <span>Progress — {QUESTIONS.length} questions total</span>
            <span>{Math.round((practiced.size / QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(practiced.size / QUESTIONS.length) * 100}%` }} />
          </div>
        </div>
        <button
          className="btn btn-outline btn-sm"
          style={{ flexShrink: 0 }}
          onClick={() => navigate('/agent', { state: { prompt: 'Run me through a mock interview. Ask me one question at a time and give feedback on my answers.' } })}
        >
          Live mock with agent →
        </button>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`btn btn-sm ${category === cat ? 'btn-gold' : 'btn-ghost'}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(q => (
          <div
            key={q.id}
            className={`question-card ${expanded === q.id ? 'expanded' : ''}`}
            onClick={() => toggle(q.id)}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>
                {practiced.has(q.id) ? '✅' : '○'}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span className="badge badge-gray">{q.category}</span>
                </div>
                <div className="question-text">{q.question}</div>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: 14, flexShrink: 0 }}>
                {expanded === q.id ? '▲' : '▼'}
              </span>
            </div>

            {expanded === q.id && (
              <div className="question-tip">
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>🤖</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, color: 'var(--gold)' }}>Agent Tip</div>
                    <div>{q.tip}</div>
                  </div>
                </div>
                <button
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: 12 }}
                  onClick={e => {
                    e.stopPropagation();
                    navigate('/agent', { state: { prompt: `Help me answer this interview question: "${q.question}"` } });
                  }}
                >
                  Practice this with my agent →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

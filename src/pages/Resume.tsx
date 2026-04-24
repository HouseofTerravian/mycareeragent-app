import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

const SCORE = 74;

const IMPROVEMENTS = [
  { priority: 'high', text: 'Add measurable results to your top 3 bullet points (e.g., "increased revenue by 23%").' },
  { priority: 'high', text: 'Rewrite your summary — it reads as generic. Lead with a specific outcome or value you deliver.' },
  { priority: 'medium', text: 'Skills section has 12 items. Cut to 6-8 most relevant for your target roles.' },
  { priority: 'low', text: 'Add a LinkedIn URL and portfolio link in your contact header.' },
];

const SECTIONS = [
  { name: 'Contact & Header', score: 85, notes: 'Good. Add LinkedIn and portfolio.' },
  { name: 'Summary', score: 55, notes: 'Too generic — personalize to your target role.' },
  { name: 'Work Experience', score: 78, notes: 'Strong history, but add more metrics.' },
  { name: 'Skills', score: 70, notes: 'Good range, trim for relevance.' },
  { name: 'Education', score: 90, notes: 'Complete and well-formatted.' },
];

function ScoreRing({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#D4AF37' : '#ef4444';

  return (
    <div className="score-ring">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
        <circle
          cx="44" cy="44" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="score-ring-value">
        <span>{score}</span>
        <span className="score-ring-label">/ 100</span>
      </div>
    </div>
  );
}

export default function Resume() {
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(true); // mock: already uploaded
  const [dragOver, setDragOver] = useState(false);

  return (
    <AppLayout title="My Resume">
      <div className="page-header">
        <h1>My Resume</h1>
        <p>Your agent analyzes your resume and gives you a score with actionable improvements.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Score card */}
        <div className="card card-gold">
          <div className="section-header" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ fontSize: 16 }}>Resume Score</div>
            <span className="badge badge-gold">Last analyzed today</span>
          </div>
          <div className="resume-score">
            <ScoreRing score={SCORE} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Good</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Your resume is solid but has clear room to improve. Focus on adding measurable results and sharpening your summary.
              </div>
              <button
                className="btn btn-outline btn-sm"
                style={{ marginTop: 12 }}
                onClick={() => navigate('/agent', { state: { prompt: 'Review my resume and give me specific improvements.' } })}
              >
                Ask agent to improve it →
              </button>
            </div>
          </div>
        </div>

        {/* Upload / file card */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 14 }}>
            <div className="section-title" style={{ fontSize: 16 }}>Resume File</div>
          </div>

          {uploaded ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>📄</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Alex_Johnson_Resume_2026.pdf</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Uploaded Apr 1, 2026 · 2 pages</div>
                </div>
                <span className="badge badge-green">Active</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setUploaded(false)}>Replace</button>
                <button className="btn btn-outline btn-sm">Download</button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); setUploaded(true); }}
              style={{
                border: `2px dashed ${dragOver ? 'var(--gold)' : 'var(--border-subtle)'}`,
                borderRadius: 10,
                padding: '36px 20px',
                textAlign: 'center',
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>📎</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Drop your resume here</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>PDF, DOCX — up to 5MB</div>
              <label className="btn btn-gold btn-sm" style={{ cursor: 'pointer' }}>
                Browse file
                <input type="file" accept=".pdf,.docx" style={{ display: 'none' }} onChange={() => setUploaded(true)} />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Section breakdown */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header">
          <div className="section-title" style={{ fontSize: 16 }}>Section Breakdown</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SECTIONS.map((s, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.score >= 80 ? 'var(--success)' : s.score >= 60 ? 'var(--gold)' : 'var(--error)' }}>
                  {s.score}/100
                </span>
              </div>
              <div className="progress-bar" style={{ marginBottom: 4 }}>
                <div className="progress-fill" style={{ width: `${s.score}%`, background: s.score >= 80 ? 'var(--success)' : s.score >= 60 ? 'var(--gold)' : 'var(--error)' }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.notes}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement suggestions */}
      <div className="card">
        <div className="section-header">
          <div className="section-title" style={{ fontSize: 16 }}>Agent Recommendations</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {IMPROVEMENTS.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>
                {item.priority === 'high' ? '🔴' : item.priority === 'medium' ? '🟡' : '🔵'}
              </span>
              <div style={{ flex: 1, fontSize: 14, lineHeight: 1.6 }}>{item.text}</div>
              <button
                className="btn btn-ghost btn-sm"
                style={{ flexShrink: 0 }}
                onClick={() => navigate('/agent', { state: { prompt: `Help me: ${item.text}` } })}
              >
                Fix with agent
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { MOCK_JOBS, Job } from '../lib/mockJobs';

type Filter = 'all' | 'saved' | 'applied';

export default function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [filter, setFilter] = useState<Filter>('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const toggleSave = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, saved: !j.saved } : j));
  };

  const markApplied = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, applied: true } : j));
  };

  const filtered = jobs.filter(j => {
    if (filter === 'saved' && !j.saved) return false;
    if (filter === 'applied' && !j.applied) return false;
    if (typeFilter !== 'all' && j.type !== typeFilter) return false;
    return true;
  });

  const matchColor = (m: number) => m >= 85 ? 'var(--success)' : m >= 70 ? 'var(--gold)' : 'var(--text-secondary)';

  return (
    <AppLayout title="Job Matches">
      <div className="page-header">
        <h1>Job Matches</h1>
        <p>Your agent curates roles matched to your resume, skills, and career goals.</p>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['all', 'saved', 'applied'] as Filter[]).map(f => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? 'btn-gold' : 'btn-ghost'}`}
              onClick={() => setFilter(f)}
              style={{ textTransform: 'capitalize' }}
            >
              {f === 'all' ? `All (${jobs.length})` : f === 'saved' ? `Saved (${jobs.filter(j => j.saved).length})` : `Applied (${jobs.filter(j => j.applied).length})`}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
          {['all', 'Full-time', 'Contract', 'Remote'].map(t => (
            <button
              key={t}
              className={`btn btn-sm ${typeFilter === t ? 'btn-outline' : 'btn-ghost'}`}
              onClick={() => setTypeFilter(t)}
            >
              {t === 'all' ? 'Any type' : t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">💼</div>
          <p>No jobs match the current filter. Try adjusting your view.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <div>
                <div className="job-title">{job.title}</div>
                <div className="job-company">{job.company} · {job.location}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="job-match" style={{ color: matchColor(job.match) }}>{job.match}%</div>
                <div className="job-match-label">match</div>
              </div>
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{job.description}</p>

            <div className="job-meta">
              <span className="badge badge-gray">{job.type}</span>
              <span className="badge badge-blue">{job.salary}</span>
              {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Posted {job.posted}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => navigate('/agent', { state: { prompt: `Help me apply to the ${job.title} role at ${job.company}.` } })}
                >
                  Get agent help
                </button>
                <button
                  className={`btn btn-sm ${job.saved ? 'btn-outline' : 'btn-ghost'}`}
                  onClick={() => toggleSave(job.id)}
                >
                  {job.saved ? '★ Saved' : '☆ Save'}
                </button>
                <button
                  className={`btn btn-sm ${job.applied ? 'btn-ghost' : 'btn-gold'}`}
                  disabled={job.applied}
                  onClick={() => markApplied(job.id)}
                >
                  {job.applied ? '✓ Applied' : 'Apply'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

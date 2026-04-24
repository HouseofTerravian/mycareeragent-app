import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { ChatMessage, getMockResponse, INITIAL_MESSAGE } from '../lib/mockAgent';

const QUICK_PROMPTS = [
  "How's my job search going?",
  "Help me improve my resume.",
  "Prep me for an interview.",
  "What salary should I ask for?",
];

let msgId = 100;

export default function Agent() {
  const location = useLocation();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Handle prompt passed from dashboard
  useEffect(() => {
    const state = location.state as { prompt?: string } | null;
    if (state?.prompt) {
      sendMessage(state.prompt);
      window.history.replaceState({}, '');
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || thinking) return;

    const userMsg: ChatMessage = {
      id: `msg-${++msgId}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    const response = await getMockResponse(text);
    const agentMsg: ChatMessage = {
      id: `msg-${++msgId}`,
      role: 'agent',
      text: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, agentMsg]);
    setThinking(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <AppLayout title="My Agent">
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--topbar-height) - 56px)', gap: 0 }}>

        {/* Agent header */}
        <div className="card" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px' }}>
          <div style={{ width: 44, height: 44, background: 'var(--gold)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
            🤖
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Career Agent</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--success)' }} />
              Active — AI-powered, human-backed (coming soon)
            </div>
          </div>
          <span className="badge badge-gray" style={{ fontSize: 11 }}>Mock Mode</span>
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {QUICK_PROMPTS.map((p, i) => (
              <button key={i} className="tag" style={{ cursor: 'pointer' }} onClick={() => sendMessage(p)}>
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Chat messages */}
        <div className="card" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}>
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.role}`}>
                <div className="chat-avatar">
                  {msg.role === 'agent' ? 'CA' : '👤'}
                </div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}

            {thinking && (
              <div className="chat-message agent">
                <div className="chat-avatar">CA</div>
                <div className="chat-bubble" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
                  <span style={{ animation: 'pulse 1.2s ease-in-out infinite' }}>●</span>
                  <span style={{ animation: 'pulse 1.2s ease-in-out 0.2s infinite' }}>●</span>
                  <span style={{ animation: 'pulse 1.2s ease-in-out 0.4s infinite' }}>●</span>
                  <style>{`@keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }`}</style>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="chat-input-bar">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Ask your career agent anything…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={thinking}
            />
            <button
              className="btn btn-gold"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || thinking}
              style={{ padding: '10px 16px', flexShrink: 0 }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

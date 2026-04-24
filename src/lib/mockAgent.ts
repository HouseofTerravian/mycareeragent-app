export interface ChatMessage {
  id: string;
  role: 'agent' | 'user';
  text: string;
  timestamp: Date;
}

const RESPONSES: Record<string, string> = {
  default: "I'm on it. Give me a moment to pull up the latest on your career profile... Here's what I'm seeing: you have strong momentum this week. Want me to dig into a specific area?",
  resume: "Looking at your resume now. Your experience section is solid, but your summary could be sharper — it's a bit generic. I'd lead with a specific result, like a percentage or a project win. Want me to rewrite it for you?",
  job: "I found 4 new matches above 85% fit today. The top one is a Senior Product Designer role at a Series B fintech — your background maps almost perfectly. Should I pull the full details?",
  interview: "Let's run a quick mock interview. I'll ask you a behavioral question and give you feedback on your answer. Ready? Here's the first one: Tell me about a time you had to navigate a conflict with a coworker. How did you handle it?",
  salary: "Based on your experience and the roles you're targeting, you're likely undervaluing yourself by 10–15%. The market rate for your level in your metro area is $95K–$115K. Are you negotiating an offer right now?",
  network: "Networking doesn't have to be awkward. The most effective approach is a warm intro through a mutual connection. I can help you draft a 3-sentence outreach message for anyone you have in mind. Who are you trying to reach?",
};

function getResponseKey(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('resume') || lower.includes('cv')) return 'resume';
  if (lower.includes('job') || lower.includes('match') || lower.includes('apply')) return 'job';
  if (lower.includes('interview') || lower.includes('prep') || lower.includes('practice')) return 'interview';
  if (lower.includes('salary') || lower.includes('pay') || lower.includes('compensation') || lower.includes('offer')) return 'salary';
  if (lower.includes('network') || lower.includes('linkedin') || lower.includes('reach out')) return 'network';
  return 'default';
}

export async function getMockResponse(userMessage: string): Promise<string> {
  await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
  return RESPONSES[getResponseKey(userMessage)];
}

export const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-1',
  role: 'agent',
  text: "Hey — I'm your Career Agent. I'm here to help you land the right job, negotiate better pay, and build a career you're proud of. What's on your mind today?",
  timestamp: new Date(),
};

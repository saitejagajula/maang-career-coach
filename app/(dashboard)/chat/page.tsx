'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BrainCircuit,
  Loader2,
  Rocket,
  Send,
  Sparkles,
  User,
} from 'lucide-react';
import { starterPrompts, mockAIResponses } from '@/lib/mock-data';
import type { ChatMessage } from '@/types';

function getAIResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes('google')) return mockAIResponses.google;
  if (lower.includes('amazon')) return mockAIResponses.amazon;
  if (lower.includes('meta') || lower.includes('facebook')) return mockAIResponses.meta;
  if (lower.includes('microsoft')) return mockAIResponses.microsoft;
  return mockAIResponses.default;
}

function formatMessage(content: string) {
  // Simple markdown-like formatting
  return content
    .split('\n')
    .map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={i} className="font-bold text-slate-900 mb-1">
            {line.slice(2, -2)}
          </p>
        );
      }
      if (line.startsWith('- ') || line.match(/^\d+\. /)) {
        return (
          <p key={i} className="ml-4 mb-0.5">
            {line}
          </p>
        );
      }
      if (line === '') {
        return <div key={i} className="h-2" />;
      }
      // Handle **bold** inline
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="mb-0.5">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={j}>{part.slice(2, -2)}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm your MAANG Career Coach. I can help you prepare for interviews at Google, Meta, Amazon, Apple, Netflix, and Microsoft.\n\nAsk me anything about interview prep, strategy, behavioral questions, system design, or resume tips. What would you like to work on today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: getAIResponse(content),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 bg-white shrink-0">
        <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
          <BrainCircuit className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-semibold text-slate-900">AI Career Coach</h1>
          <p className="text-xs text-slate-500">Powered by MAANG interview expertise</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-slate-500">Online</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                  msg.role === 'assistant'
                    ? 'bg-slate-900'
                    : 'bg-gradient-to-br from-blue-500 to-violet-600'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <Rocket className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white ring-1 ring-slate-200 text-slate-700 rounded-tl-none'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="space-y-0.5">{formatMessage(msg.content)}</div>
                ) : (
                  msg.content
                )}
                <p
                  className={`text-[10px] mt-2 ${
                    msg.role === 'user' ? 'text-slate-400' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Loading */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0 mt-1">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white ring-1 ring-slate-200 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                <span className="text-sm text-slate-400">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Starter Prompts */}
      {messages.length <= 1 && (
        <div className="px-6 pb-3 shrink-0">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => sendMessage(prompt.prompt)}
                  className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors text-left"
                >
                  {prompt.prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-6 pb-6 pt-3 border-t border-slate-200 bg-white shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                placeholder="Ask anything about MAANG interviews... (Enter to send, Shift+Enter for new line)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[44px] max-h-32 resize-none pr-4 py-3 text-sm"
                rows={1}
              />
            </div>
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-11 w-11 shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            AI responses are for guidance only. Always verify with official company resources.
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, BookOpen, RefreshCw } from 'lucide-react';
import { ChatMessage, saveChatMessage, loadState } from '../../lib/store';
import { getAIResponse } from '../../lib/aiEngine';

const SUGGESTED = [
  '¿Cómo resuelvo ecuaciones lineales?',
  'Explícame la 2ª Ley de Newton',
  '¿Qué es la mole en química?',
  'How do I use Present Perfect?',
  '¿Cuándo fue la Independencia del Perú?',
  'Tipos de texto en comunicación',
];

export default function AsistenteIA() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadState().chatHistory);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text: string) => {
    if (!text.trim() || typing) return;
    const userMsg: ChatMessage = { role: 'user', text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    saveChatMessage(userMsg);
    setInput('');
    setTyping(true);

    // Build history for Gemini (last 10 exchanges max, excluding welcome message)
    const geminiHistory = messages
      .slice(1) // skip the initial welcome message
      .slice(-20) // last 20 messages = 10 exchanges
      .map((m) => ({ role: m.role === 'user' ? 'user' as const : 'model' as const, text: m.text }));

    const response = await getAIResponse(text, geminiHistory);
    const aiMsg: ChatMessage = { role: 'ai', text: response, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, aiMsg]);
    saveChatMessage(aiMsg);
    setTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const clearChat = () => {
    const initial: ChatMessage = {
      role: 'ai',
      text: '¡Chat reiniciado! ¿En qué tema puedo ayudarte hoy? Matemáticas, Física, Química, Historia, Comunicación o Inglés.',
      timestamp: new Date().toISOString(),
    };
    setMessages([initial]);
    saveChatMessage(initial);
  };

  const renderText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code class="bg-white/20 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-600" />
            Asistente IA
          </h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm mt-0.5">
            Te ayuda con Matemáticas, Física, Química, Historia, Comunicación e Inglés
          </p>
        </div>
        <button onClick={clearChat}
          className="p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-500 dark:text-surface-400 transition-colors"
          title="Limpiar chat">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white rounded-br-sm'
                  : 'bg-white dark:bg-surface-900 border border-surface-100 dark:border-surface-800 shadow-sm text-surface-800 dark:text-surface-200 rounded-bl-sm'
              }`}>
                <p dangerouslySetInnerHTML={{ __html: renderText(msg.text) }} />
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-800 flex items-center justify-center ml-2 flex-shrink-0 mt-1">
                  <BookOpen className="w-4 h-4 text-surface-600 dark:text-surface-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mr-2 flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white dark:bg-surface-900 border border-surface-100 dark:border-surface-800 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
              {[0, 0.15, 0.3].map((d, i) => (
                <motion.div key={i} className="w-2 h-2 bg-primary-400 rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="mb-4 flex-shrink-0">
          <p className="text-xs text-surface-400 dark:text-surface-500 mb-2 font-medium">Prueba preguntando:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <button key={s} onClick={() => send(s)}
                className="text-xs bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-surface-600 dark:text-surface-300 hover:text-primary-700 dark:hover:text-primary-300 px-3 py-1.5 rounded-full transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-3 flex-shrink-0">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta sobre cualquier materia..."
          disabled={typing}
          className="flex-1 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl px-5 py-3.5 text-sm text-surface-900 dark:text-white placeholder-surface-400 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all disabled:opacity-60"
        />
        <button type="submit" disabled={!input.trim() || typing}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex-shrink-0">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

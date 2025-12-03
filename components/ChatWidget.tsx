import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { sendMessageToAdvisor } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'Hello! I am Nexus. Ask me anything about our Future Architects curriculum.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const historyForApi = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToAdvisor(userMsg.text, historyForApi);
      
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Connection error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-96 bg-gray-900 border border-brand-primary/30 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gray-800 p-3 flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="bg-brand-primary/20 p-1 rounded-full">
                <Bot size={18} className="text-brand-primary" />
              </div>
              <span className="font-semibold text-sm">Nexus Advisor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900/95">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-primary text-white rounded-br-none' 
                    : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-3 rounded-bl-none border border-gray-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about our courses..."
              className="flex-1 bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-primary"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="bg-brand-primary hover:bg-blue-600 text-white p-2 rounded-md disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-gray-700' : 'bg-brand-primary hover:bg-blue-600'} text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;
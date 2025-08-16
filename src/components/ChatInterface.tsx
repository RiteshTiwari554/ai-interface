'use client';

import { useRef, useEffect } from 'react';
import { useSession } from '@/contexts/SessionContext';
import Message from './Message';
import InputArea from './InputArea';

export default function ChatInterface() {
  const { chatHistory, isLoading, selectedModel } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleClearChat = () => {
    // This would be handled by the session context
    window.location.reload(); // Simple refresh for demo
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            AI Chat Interface
          </h2>
          {selectedModel && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Using: {selectedModel.name}
            </p>
          )}
        </div>
        <button
          onClick={handleClearChat}
          className="px-3 py-1 text-sm bg-slate-500 hover:bg-slate-600 text-white rounded-md transition-colors"
        >
          Clear Chat
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-lg font-medium">Start a conversation</p>
            <p className="text-sm">Select a model and start chatting with AI</p>
          </div>
        ) : (
          chatHistory.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-4">
        <InputArea />
      </div>
    </div>
  );
}

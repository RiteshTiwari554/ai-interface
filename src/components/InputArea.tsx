'use client';

import { useState, KeyboardEvent } from 'react';
import { useSession } from '@/contexts/SessionContext';

export default function InputArea() {
  const [inputValue, setInputValue] = useState('');
  const { isLoading, setLoading, addMessage, selectedModel } = useSession();

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = {
        role: 'user' as const,
        content: inputValue.trim(),
        model: selectedModel?.id,
        parameters: {
          temperature: selectedModel?.temperature || 0.7,
          maxTokens: selectedModel?.maxTokens || 2048,
          topP: 1.0,
          frequencyPenalty: 0.0,
          presencePenalty: 0.0
        }
      };

      addMessage(userMessage);
      setInputValue('');
      setLoading(true);

      // Simulate AI response
      setTimeout(() => {
        const aiMessage = {
          role: 'assistant' as const,
          content: `I received your message: "${inputValue.trim()}". This is a simulated response from ${selectedModel?.name || 'the AI model'}. In a real application, this would be connected to an AI service with the parameters you've configured.`,
          model: selectedModel?.id,
          parameters: {
            temperature: selectedModel?.temperature || 0.7,
            maxTokens: selectedModel?.maxTokens || 2048,
            topP: 1.0,
            frequencyPenalty: 0.0,
            presencePenalty: 0.0
          }
        };
        addMessage(aiMessage);
        setLoading(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end space-x-3">
      <div className="flex-1 relative">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
          rows={1}
          style={{ minHeight: '48px', maxHeight: '120px' }}
          disabled={isLoading}
        />
        <div className="absolute bottom-2 right-2 text-xs text-slate-400">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
      
      <button
        onClick={handleSend}
        disabled={!inputValue.trim() || isLoading}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        <span>Send</span>
      </button>
    </div>
  );
}

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
    <div className="input-area-container !flex !items-center">
      <div className="input-field">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <div className="input-hint !fles !items-center">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
      
      <button
        onClick={handleSend}
        disabled={!inputValue.trim() || isLoading}
        className="send-button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        <span>Send</span>
      </button>
    </div>
  );
}

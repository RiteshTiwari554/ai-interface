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
    window.location.reload();
  };

  return (
    <div className="chat-interface rounded-xl shadow-lg overflow-hidden">
      <div className="chat-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              AI Chat Interface
            </h2>
            {selectedModel && (
              <p className="text-sm">
                Using: {selectedModel.name}
              </p>
            )}
          </div>
          <button
            onClick={handleClearChat}
            className="clear-chat-button"
          >
            Clear Chat
          </button>
        </div>
      </div>

      <div className="chat-messages custom-scrollbar">
        {chatHistory.length === 0 ? (
          <div className="text-center empty-state py-8">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="flex items-center space-x-2 loading-indicator">
            <div className="flex space-x-1">
              <div className="w-2 h-2 loading-dots rounded-full animate-bounce"></div>
              <div className="w-2 h-2 loading-dots rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 loading-dots rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <InputArea />
      </div>
    </div>
  );
}

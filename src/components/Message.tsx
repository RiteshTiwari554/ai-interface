import { useState } from 'react';
import { ChatMessage } from '@/contexts/SessionContext';

interface MessageProps {
  message: ChatMessage;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';
  const [showActions, setShowActions] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(message, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `message-${message.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div 
          className={`rounded-2xl px-4 py-3 relative group ${
            isUser 
              ? 'bg-blue-500 text-white rounded-br-md' 
              : 'bg-gray-900 text-white rounded-bl-md border border-gray-600'
          }`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          
          {showActions && (
            <div className={`absolute top-2 right-2 flex space-x-1 rounded ${
              isUser ? 'text-blue-100' : 'text-gray-400'
            }`}>
              <button
                onClick={handleCopy}
                className="p-1 rounded hover:bg-white/10 transition-colors"
                title="Copy message"
                aria-label="Copy message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={handleDownloadJSON}
                className="p-1 rounded hover:bg-white/10 transition-colors"
                title="Download as JSON"
                aria-label="Download as JSON"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        <div className={`text-xs text-gray-400 mt-2 ${
          isUser ? 'text-right' : 'text-left'
        }`}>
          <div>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          {message.model && (
            <div className="text-xs text-gray-500">
              Model: {message.model}
            </div>
          )}
        </div>
      </div>
      
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 ${
        isUser ? 'order-1 bg-blue-500' : 'order-2 bg-gray-600'
      }`}>
        {isUser ? (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, KeyboardEvent } from 'react';
import { useSession } from '@/contexts/SessionContext';

export default function InputArea() {
  const { isLoading, setLoading, addMessage, selectedModel } = useSession();
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedModel) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message.trim(),
      timestamp: new Date(),
      model: selectedModel.name,
    };

    addMessage(userMessage);
    setMessage('');
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: `This is a mock response from ${selectedModel.name}. In a real application, this would be the AI's actual response based on your message: "${message.trim()}"`,
        timestamp: new Date(),
        model: selectedModel.name,
      };

      addMessage(aiResponse);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  // return (
  //   <div className="flex items-center gap-3 w-full px-2 py-3 border-t border-gray-700 bg-black dark:bg-black">
  //     {/* Input box */}
  //     <div className="flex-1 relative">
  //       <textarea
  //         value={message}
  //         onChange={(e) => setMessage(e.target.value)}
  //         onKeyDown={handleKeyDown}
  //         placeholder="Type your message here..."
  //         className="w-full h-12 px-3 pr-36 py-2 border border-gray-600 rounded-lg resize-none text-sm bg-black dark:bg-black text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          
  //       />
  //       {/* Hint text stays aligned to bottom-right, inside input box */}
  //       <div className="absolute bottom-1 right-3 text-[10px] text-gray-500 pointer-events-none">
  //         Press Enter to send, Shift+Enter for new line
  //       </div>
  //     </div>
      
  //     {/* Send button */}
  //     <button
  //       onClick={handleSendMessage}
  //       disabled={!message.trim() || isLoading || !selectedModel}
  //       className="h-12 px-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white border-none rounded-lg font-medium text-sm cursor-pointer transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:shadow-none"
  //     >
  //       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  //       </svg>
  //       Send
  //     </button>
  //   </div>
  // );

return (
  <div className="flex items-end gap-3 w-full px-2 py-3 border-gray-700 bg-black dark:bg-black">
    {/* Input + hint stacked */}
    <div className="flex-1 flex ">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="w-full h-12 px-3 py-2 border border-gray-600 rounded-lg resize-none text-sm bg-black dark:bg-black text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={1}
      />
     
    </div>
      <button
      onClick={handleSendMessage}
      disabled={!message.trim() || isLoading || !selectedModel}
      className="h-12 px-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white border-none rounded-lg font-medium text-sm cursor-pointer transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:shadow-none"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
      Send
    </button> 
    
  </div>
);

}
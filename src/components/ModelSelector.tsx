'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, AIModel } from '@/contexts/SessionContext';

export default function ModelSelector() {
  const { models, selectedModel, setSelectedModel } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (model: AIModel) => {
    setSelectedModel(model);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold text-white">AI Model</div>
      <div className="text-sm text-gray-400 mb-6">
        Choose the AI model that best fits your needs. Each model has different capabilities and token limits.
      </div>
      
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          className="w-full text-left p-3 border border-gray-600 rounded-lg bg-black text-white transition-all duration-200 hover:border-blue-500 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium">{selectedModel?.name || 'Select a model'}</div>
                {selectedModel && (
                  <div className="text-sm opacity-75">{selectedModel.maxTokens} tokens max</div>
                )}
              </div>
            </div>
            <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-black border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
            {models.map((model) => (
              <button
                key={model.id}
                type="button"
                className={`w-full text-left px-4 py-3 hover:bg-gray-900 transition-colors ${
                  selectedModel?.id === model.id ? 'bg-blue-900/20' : ''
                }`}
                onClick={() => handleSelect(model)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">{model.name}</div>
                      <div className="text-sm text-gray-400">{model.description}</div>
                      <div className="text-xs text-gray-500">{model.maxTokens} tokens max</div>
                    </div>
                  </div>
                  {selectedModel?.id === model.id && (
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

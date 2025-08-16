'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { PromptTemplate } from '@/contexts/SessionContext';

export default function PromptEditor() {
  const { templates, selectedTemplate, setSelectedTemplate } = useSession();
  const [promptText, setPromptText] = useState('');
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [customPromptName, setCustomPromptName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedTemplate) {
      setPromptText(selectedTemplate.content);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTemplateOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setPromptText(template.content);
    setIsTemplateOpen(false);
  };

  const handleSavePrompt = () => {
    if (customPromptName.trim() && promptText.trim()) {
      // In a real app, this would save to backend
      // For demo purposes, we'll just show an alert
      alert(`Prompt "${customPromptName}" saved! (This is a demo - in a real app it would be saved to the backend)`);
      setShowSaveModal(false);
      setCustomPromptName('');
    }
  };

  const handleClearPrompt = () => {
    setPromptText('');
    setSelectedTemplate(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Prompt Editor
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowSaveModal(true)}
            className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleClearPrompt}
            className="px-3 py-1 text-sm bg-slate-500 hover:bg-slate-600 text-white rounded-md transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Template Selector */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsTemplateOpen(!isTemplateOpen)}
          className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {selectedTemplate ? `Template: ${selectedTemplate.name}` : 'Load Template'}
            </span>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isTemplateOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg max-h-60 overflow-auto">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors border-b border-slate-200 dark:border-slate-600 last:border-b-0"
              >
                <div className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                  {template.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {template.category}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Prompt Text Area */}
      <textarea
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        placeholder="Enter your prompt here... You can use [placeholders] for dynamic content."
        className="w-full h-32 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
      />

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-96 max-w-full mx-4">
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">
              Save Prompt Template
            </h3>
            <input
              type="text"
              value={customPromptName}
              onChange={(e) => setCustomPromptName(e.target.value)}
              placeholder="Enter template name"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSavePrompt}
                disabled={!customPromptName.trim() || !promptText.trim()}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

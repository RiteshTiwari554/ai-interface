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
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Prompt Editor
        </label>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setShowSaveModal(true)}
          className="flex-1 px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <span>Save Template</span>
        </button>
        <button
          onClick={handleClearPrompt}
          className="px-4 py-2 text-sm bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
        >
          Clear
        </button>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsTemplateOpen(!isTemplateOpen)}
          className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:bg-slate-50 dark:hover:bg-slate-600 transition-all duration-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                {selectedTemplate ? `Template: ${selectedTemplate.name}` : 'Load Template'}
              </span>
            </div>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isTemplateOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-xl max-h-60 overflow-auto">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors border-b border-slate-200 dark:border-slate-600 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                      {template.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {template.category}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Prompt Content
        </label>
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Enter your prompt here... You can use [placeholders] for dynamic content."
          className="w-full h-32 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm"
        />
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Use [brackets] to create placeholders that can be filled in later.
        </div>
      </div>

      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-96 max-w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Save Prompt Template
            </h3>
            <input
              type="text"
              value={customPromptName}
              onChange={(e) => setCustomPromptName(e.target.value)}
              placeholder="Enter template name"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSavePrompt}
                disabled={!customPromptName.trim() || !promptText.trim()}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white rounded-lg transition-colors disabled:cursor-not-allowed font-medium"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
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

'use client';

import { useState } from 'react';
import { useSession, PromptTemplate } from '@/contexts/SessionContext';

export default function PromptEditor() {
  const { templates, selectedTemplate, setSelectedTemplate } = useSession();
  const [promptText, setPromptText] = useState('');
  const [customPromptName, setCustomPromptName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setPromptText(template.content);
  };

  const handleSavePrompt = () => {
    if (customPromptName.trim()) {
      alert(`Prompt "${customPromptName}" saved successfully! (This is a demo)`);
      setCustomPromptName('');
      setShowSaveModal(false);
    }
  };

  const handleClearPrompt = () => {
    setPromptText('');
    setSelectedTemplate(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold text-white">Prompt Editor</div>
      <div className="text-sm text-gray-400 mb-6">
        Write and edit your prompts. You can save custom prompts or load from templates.
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <label className="text-sm font-medium text-gray-300">Prompt Template</label>
        </div>

        <select
          value={selectedTemplate?.id || ''}
          onChange={(e) => {
            const template = templates.find(t => t.id === e.target.value);
            if (template) {
              handleTemplateSelect(template);
            } else {
              setSelectedTemplate(null);
              setPromptText('');
            }
          }}
          className="w-full p-2 border border-gray-600 rounded-lg bg-black text-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">Custom Prompt</label>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Write your prompt here..."
            className="w-full min-h-32 p-3 border border-gray-600 rounded-lg resize-vertical transition-all duration-200 bg-black text-white placeholder-gray-400 font-inherit text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={6}
          />
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setShowSaveModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg transition-all duration-200 font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!promptText.trim()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Prompt
          </button>
          <button
            onClick={handleClearPrompt}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 rounded-lg transition-all duration-200 font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!promptText.trim()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
          </button>
        </div>
      </div>

      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg p-6 w-96 max-w-full mx-4 shadow-2xl border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-4">Save Custom Prompt</h3>
            <input
              type="text"
              placeholder="Enter prompt name"
              value={customPromptName}
              onChange={(e) => setCustomPromptName(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-black text-white placeholder-gray-400 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 rounded-lg transition-all duration-200 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrompt}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!customPromptName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

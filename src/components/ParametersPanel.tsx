'use client';

import { useState } from 'react';
import { useSession } from '@/contexts/SessionContext';

export default function ParametersPanel() {
  const { selectedModel } = useSession();
  const [parameters, setParameters] = useState({
    temperature: 0.7,
    maxTokens: 1000,
    topP: 0.9,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
  });

  const handleParameterChange = (param: string, value: number) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const resetToDefaults = () => {
    setParameters({
      temperature: 0.7,
      maxTokens: 1000,
      topP: 0.9,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
    });
  };

  if (!selectedModel) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold text-white">Model Parameters</div>
        <div className="text-sm text-gray-400 mb-6">
          Select a model first to configure its parameters.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold text-white">Model Parameters</div>
      <div className="text-sm text-gray-400 mb-6">
        Fine-tune the AI model's behavior with these parameters.
      </div>

      <div className="space-y-6">
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">Temperature</span>
              <span className="px-3 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-full font-medium">
                {parameters.temperature}
              </span>
            </div>
            <div className="text-xs text-gray-400 mb-3">
              Controls randomness: Lower values are more deterministic, higher values more creative.
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={parameters.temperature}
              onChange={(e) => handleParameterChange('temperature', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Focused</span>
              <span>Creative</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">Max Tokens</span>
              <span className="px-3 py-1 text-xs bg-green-900/30 text-green-300 rounded-full font-medium">
                {parameters.maxTokens}
              </span>
            </div>
            <div className="text-xs text-gray-400 mb-3">
              Maximum number of tokens in the response. Higher values allow longer responses.
            </div>
            <input
              type="range"
              min="100"
              max={selectedModel.maxTokens}
              step="100"
              value={parameters.maxTokens}
              onChange={(e) => handleParameterChange('maxTokens', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>100</span>
              <span>{selectedModel.maxTokens.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">Top P</span>
              <span className="px-3 py-1 text-xs bg-purple-900/30 text-purple-300 rounded-full font-medium">
                {parameters.topP}
              </span>
            </div>
            <div className="text-xs text-gray-400 mb-3">
              Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={parameters.topP}
              onChange={(e) => handleParameterChange('topP', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Conservative</span>
              <span>Diverse</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">Frequency Penalty</span>
              <span className="px-3 py-1 text-xs bg-orange-900/30 text-orange-300 rounded-full font-medium">
                {parameters.frequencyPenalty}
              </span>
            </div>
            <div className="text-xs text-gray-400 mb-3">
              Reduces repetition of the same information. Higher values make the model less likely to repeat.
            </div>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={parameters.frequencyPenalty}
              onChange={(e) => handleParameterChange('frequencyPenalty', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>More Repetitive</span>
              <span>Less Repetitive</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">Presence Penalty</span>
              <span className="px-3 py-1 text-xs bg-orange-900/30 text-orange-300 rounded-full font-medium">
                {parameters.presencePenalty}
              </span>
            </div>
            <div className="text-xs text-gray-400 mb-3">
              Encourages the model to talk about new topics. Higher values make the model more likely to introduce new subjects.
            </div>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={parameters.presencePenalty}
              onChange={(e) => handleParameterChange('presencePenalty', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Stay on Topic</span>
              <span>Explore New Topics</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 rounded-lg transition-all duration-200 font-medium text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset to Defaults
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
          <h4 className="font-medium text-white mb-2">Current Settings</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-400">Temperature: <span className="font-medium text-white">{parameters.temperature}</span></div>
            <div className="text-gray-400">Max Tokens: <span className="font-medium text-white">{parameters.maxTokens}</span></div>
            <div className="text-gray-400">Top P: <span className="font-medium text-white">{parameters.topP}</span></div>
            <div className="text-gray-400">Freq Penalty: <span className="font-medium text-white">{parameters.frequencyPenalty}</span></div>
            <div className="text-gray-400">Presence Penalty: <span className="font-medium text-white">{parameters.presencePenalty}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

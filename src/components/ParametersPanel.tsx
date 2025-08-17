'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/contexts/SessionContext';

interface Parameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export default function ParametersPanel() {
  const { selectedModel } = useSession();
  const [parameters, setParameters] = useState<Parameters>({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0
  });

  useEffect(() => {
    if (selectedModel) {
      setParameters(prev => ({
        ...prev,
        maxTokens: selectedModel.maxTokens,
        temperature: selectedModel.temperature
      }));
    }
  }, [selectedModel]);

  const handleParameterChange = (key: keyof Parameters, value: number) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetToDefaults = () => {
    if (selectedModel) {
      setParameters({
        temperature: selectedModel.temperature,
        maxTokens: selectedModel.maxTokens,
        topP: 1.0,
        frequencyPenalty: 0.0,
        presencePenalty: 0.0
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-600">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Model Parameters
        </h3>
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors font-medium"
        >
          Reset to Defaults
        </button>
      </div>

      <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Temperature: <span className="text-blue-600 dark:text-blue-400 font-mono">{parameters.temperature}</span>
          </label>
          <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
            {parameters.temperature < 0.3 ? 'Focused' : parameters.temperature < 0.7 ? 'Balanced' : 'Creative'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={parameters.temperature}
          onChange={(e) => handleParameterChange('temperature', parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">0 (Focused)</span>
          <span className="font-medium">2 (Creative)</span>
        </div>
      </div>

      <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Max Tokens: <span className="text-blue-600 dark:text-blue-400 font-mono">{parameters.maxTokens.toLocaleString()}</span>
          </label>
          <span className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">
            {parameters.maxTokens < 1000 ? 'Short' : parameters.maxTokens < 4000 ? 'Medium' : 'Long'}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max={selectedModel?.maxTokens || 8192}
          step="100"
          value={parameters.maxTokens}
          onChange={(e) => handleParameterChange('maxTokens', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">100</span>
          <span className="font-medium">{selectedModel?.maxTokens.toLocaleString() || '8,192'}</span>
        </div>
      </div>

      <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Top P: <span className="text-blue-600 dark:text-blue-400 font-mono">{parameters.topP}</span>
          </label>
          <span className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium">
            {parameters.topP < 0.5 ? 'Conservative' : parameters.topP < 0.9 ? 'Balanced' : 'Diverse'}
          </span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={parameters.topP}
          onChange={(e) => handleParameterChange('topP', parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">0.1</span>
          <span className="font-medium">1.0</span>
        </div>
      </div>

      <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Frequency Penalty: <span className="text-blue-600 dark:text-blue-400 font-mono">{parameters.frequencyPenalty}</span>
          </label>
          <span className="px-3 py-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full font-medium">
            {parameters.frequencyPenalty < 0.1 ? 'None' : parameters.frequencyPenalty < 0.5 ? 'Low' : 'High'}
          </span>
        </div>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.1"
          value={parameters.frequencyPenalty}
          onChange={(e) => handleParameterChange('frequencyPenalty', parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">-2 (Encourage)</span>
          <span className="font-medium">2 (Discourage)</span>
        </div>
      </div>

      <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Presence Penalty: <span className="text-blue-600 dark:text-blue-400 font-mono">{parameters.presencePenalty}</span>
          </label>
          <span className="px-3 py-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full font-medium">
            {parameters.presencePenalty < 0.1 ? 'None' : parameters.presencePenalty < 0.5 ? 'Low' : 'High'}
          </span>
        </div>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.1"
          value={parameters.presencePenalty}
          onChange={(e) => handleParameterChange('presencePenalty', parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">-2 (Encourage)</span>
          <span className="font-medium">2 (Discourage)</span>
        </div>
      </div>

      <div className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Current Settings
        </h4>
        <div className="grid grid-cols-2 gap-3 text-xs text-blue-700 dark:text-blue-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Temperature: {parameters.temperature}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Max Tokens: {parameters.maxTokens.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Top P: {parameters.topP}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Freq Penalty: {parameters.frequencyPenalty}</span>
          </div>
          <div className="flex items-center space-x-2 col-span-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Presence Penalty: {parameters.presencePenalty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

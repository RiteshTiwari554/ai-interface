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
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
          Model Parameters
        </h3>
        <button
          onClick={resetToDefaults}
          className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          Reset to Defaults
        </button>
      </div>

      {/* Temperature */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Temperature: {parameters.temperature}
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400">
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
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>0 (Focused)</span>
          <span>2 (Creative)</span>
        </div>
      </div>

      {/* Max Tokens */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Max Tokens: {parameters.maxTokens.toLocaleString()}
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400">
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
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>100</span>
          <span>{selectedModel?.maxTokens.toLocaleString() || '8,192'}</span>
        </div>
      </div>

      {/* Top P */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Top P: {parameters.topP}
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400">
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
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>0.1</span>
          <span>1.0</span>
        </div>
      </div>

      {/* Frequency Penalty */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Frequency Penalty: {parameters.frequencyPenalty}
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400">
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
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>-2 (Encourage)</span>
          <span>2 (Discourage)</span>
        </div>
      </div>

      {/* Presence Penalty */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Presence Penalty: {parameters.presencePenalty}
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400">
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
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>-2 (Encourage)</span>
          <span>2 (Discourage)</span>
        </div>
      </div>

      {/* Current Parameters Summary */}
      <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Current Settings
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div>Temperature: {parameters.temperature}</div>
          <div>Max Tokens: {parameters.maxTokens.toLocaleString()}</div>
          <div>Top P: {parameters.topP}</div>
          <div>Freq Penalty: {parameters.frequencyPenalty}</div>
          <div>Presence Penalty: {parameters.presencePenalty}</div>
        </div>
      </div>
    </div>
  );
}

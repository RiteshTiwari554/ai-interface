'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AIModel {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  temperature: number;
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  parameters?: {
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };
}

interface SessionContextType {
  models: AIModel[];
  templates: PromptTemplate[];
  selectedModel: AIModel | null;
  selectedTemplate: PromptTemplate | null;
  chatHistory: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  setSelectedModel: (model: AIModel | null) => void;
  setSelectedTemplate: (template: PromptTemplate | null) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [models, setModels] = useState<AIModel[]>([]);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockModels: AIModel[] = [
      {
        id: 'gpt-4',
        name: 'GPT-4',
        description: 'Most capable GPT model, best for complex reasoning',
        maxTokens: 8192,
        temperature: 0.7
      },
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        description: 'Fast and efficient, great for most tasks',
        maxTokens: 4096,
        temperature: 0.7
      },
      {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        description: 'Anthropic\'s most powerful model',
        maxTokens: 200000,
        temperature: 0.7
      },
      {
        id: 'custom-model',
        name: 'Custom Model',
        description: 'Your own fine-tuned model',
        maxTokens: 2048,
        temperature: 0.7
      }
    ];

    const mockTemplates: PromptTemplate[] = [
      {
        id: 'creative-writing',
        name: 'Creative Writing',
        content: 'Write a creative story about [topic] in the style of [author].',
        category: 'Writing'
      },
      {
        id: 'code-review',
        name: 'Code Review',
        content: 'Please review this code and suggest improvements:\n\n[code]',
        category: 'Programming'
      },
      {
        id: 'data-analysis',
        name: 'Data Analysis',
        content: 'Analyze this data and provide insights:\n\n[data]',
        category: 'Analysis'
      },
      {
        id: 'translation',
        name: 'Translation',
        content: 'Translate the following text to [target_language]:\n\n[text]',
        category: 'Language'
      }
    ];

    setModels(mockModels);
    setTemplates(mockTemplates);
    setSelectedModel(mockModels[0]);
  }, []);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setErrorState = (error: string | null) => {
    setError(error);
  };

  return (
    <SessionContext.Provider value={{
      models,
      templates,
      selectedModel,
      selectedTemplate,
      chatHistory,
      isLoading,
      error,
      setSelectedModel,
      setSelectedTemplate,
      addMessage,
      clearChat,
      setLoading,
      setError: setErrorState
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

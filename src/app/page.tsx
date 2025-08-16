'use client';

import { useState } from 'react';
import ModelSelector from '@/components/ModelSelector';
import PromptEditor from '@/components/PromptEditor';
import ParametersPanel from '@/components/ParametersPanel';
import ChatInterface from '@/components/ChatInterface';
import Header from '@/components/Header';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SessionProvider } from '@/contexts/SessionContext';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <SessionProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <Header />
          
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Configuration Panel</span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Configuration Panel */}
              <div className={`lg:col-span-1 space-y-6 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Configuration
                  </h2>
                  
                  <div className="space-y-6">
                    <ModelSelector />
                    <PromptEditor />
                    <ParametersPanel />
                  </div>
                </div>
              </div>

              {/* Main Content - Chat Interface */}
              <div className="lg:col-span-3">
                <ChatInterface />
              </div>
            </div>
          </main>
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}

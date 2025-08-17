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
        <div className="min-h-screen bg-gradient-to-br transition-all duration-300">
          <Header />
          
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Configuration Panel</span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className={`lg:col-span-1 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="configuration-panel rounded-xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">
                      Configuration
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                      AI Model & Parameters
                    </p>
                  </div>
                  
                  <div className="configuration-content custom-scrollbar">
                    <div className="space-y-8">
                      <div className="component-spacing">
                        <ModelSelector />
                      </div>
                      <div className="component-spacing">
                        <PromptEditor />
                      </div>
                      <div className="component-spacing">
                        <ParametersPanel />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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

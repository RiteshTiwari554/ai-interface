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
        <div className="min-h-screen bg-background transition-all duration-300">
          <Header />
          
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full bg-black border border-border rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent shadow-sm transition-all duration-200 text-white"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Configuration Panel</span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className={`lg:col-span-1 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-hidden flex flex-col bg-black rounded-xl shadow-xl border border-border">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">
                      Configuration
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                      AI Model & Parameters
                    </p>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    <div className="space-y-8">
                      <div className="mb-8 last:mb-0">
                        <ModelSelector />
                      </div>
                      <div className="mb-8 last:mb-0">
                        <PromptEditor />
                      </div>
                      <div className="mb-8 last:mb-0">
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

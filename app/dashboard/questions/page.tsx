'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search,
  ChevronDown,
  Code2,
  ArrowUpDown,
  Lock,
} from 'lucide-react';

export default function QuestionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const playlist = searchParams.get('playlist');
  
  // Filter state
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [ignoreCompleted, setIgnoreCompleted] = useState(false);
  const [userContributedOnly, setUserContributedOnly] = useState(false);
  const [companiesOnly, setCompaniesOnly] = useState(false);
  const [selectedOrdering, setSelectedOrdering] = useState<string>('Newest First');
  
  const companyFilters = ['AMD', 'Amazon', 'Arista', 'Google', 'Intel', 'Meta', 'Microsoft', 'Nvidia', 'Quant', 'Apple', 'Discord', 'Defense'];
  
  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  useEffect(() => {
    const hideSplineBranding = () => {
      const splineViewers = document.querySelectorAll('spline-viewer');
      splineViewers.forEach((splineViewer) => {
        const links = splineViewer.querySelectorAll('a, button');
        links.forEach((el) => {
          (el as HTMLElement).style.display = 'none';
          (el as HTMLElement).style.visibility = 'hidden';
          (el as HTMLElement).style.opacity = '0';
        });

        try {
          const shadowRoot = splineViewer.shadowRoot;
          if (shadowRoot) {
            const shadowLinks = shadowRoot.querySelectorAll('a, button');
            shadowLinks.forEach((el) => {
              (el as HTMLElement).style.display = 'none';
              (el as HTMLElement).style.visibility = 'hidden';
              (el as HTMLElement).style.opacity = '0';
            });
          }
        } catch (e) {
          // Shadow DOM might not be accessible
        }
      });
    };

    if (isMounted) {
      hideSplineBranding();
      const timeout = setTimeout(hideSplineBranding, 1000);
      const timeout2 = setTimeout(hideSplineBranding, 3000);

      return () => {
        clearTimeout(timeout);
        clearTimeout(timeout2);
      };
    }
  }, [isMounted]);

  if (loading) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${theme === 'light' ? 'bg-[#f8fafc]' : 'bg-background'}`}>
        <div className={`text-lg ${theme === 'light' ? 'text-slate-900' : 'text-gray-300'}`}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Get playlist configuration
  const getPlaylistConfig = (playlistId: string | null) => {
    const configs: Record<string, { title: string; count: number }> = {
      'os25': { title: 'Operating System Problems', count: 25 },
      'cpp50': { title: 'C++ Problems', count: 50 },
      'rust50': { title: 'Rust Problems', count: 50 },
      'python50': { title: 'Python Problems', count: 50 },
    };
    return configs[playlistId || ''] || null;
  };

  const playlistConfig = getPlaylistConfig(playlist);

  // Show Problems page for supported playlists
  if (playlistConfig) {
    return (
      <div className={`antialiased min-h-screen ${theme === 'light' ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#050505] text-white'} selection:bg-white/20 selection:text-white overflow-x-hidden relative font-sans`}>
        {/* Spline Background Layer */}
        <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none" style={{ transform: 'translateZ(0)' }}>
          {isMounted && (
            <div className="absolute inset-0 w-full h-full opacity-30">
              <spline-viewer
                url="https://prod.spline.design/Ete3ch9NnNoHZqYW/scene.splinecode"
                className="w-full h-full"
                style={{ 
                  width: '100%', 
                  height: '100%',
                  display: 'block',
                  transform: 'translateZ(0)',
                }}
              />
            </div>
          )}
          <div className={`absolute inset-0 ${theme === 'light' ? 'bg-[#f8fafc]/60' : 'bg-[#050505]/60'} pointer-events-none`} />
          <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-[#f8fafc]' : 'from-[#050505]'} via-transparent to-transparent pointer-events-none`} />
        </div>

        {/* Main Content */}
        <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 pb-20">
          {/* Header Section */}
          <div className="pt-12 pb-16 text-center relative group [perspective:1000px]">
            <h1 className={`text-5xl md:text-6xl font-semibold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40'} drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transform transition-transform duration-700 hover:scale-[1.01]`}>
              {playlistConfig.title}
            </h1>
            <p className={`mt-4 text-lg font-normal tracking-wide drop-shadow-md ${theme === 'light' ? 'text-slate-600' : 'text-zinc-400'}`}>
              Master low-level concepts through practice.
            </p>
          </div>

          {/* Controls Row */}
          <div className={`sticky top-4 z-40 mb-8 backdrop-blur-xl ${theme === 'light' ? 'bg-white/90 border-slate-200' : 'bg-[#050505]/80 border-white/10'} border rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] p-2 flex flex-col lg:flex-row gap-3 items-center justify-between transition-all duration-300 hover:border-white/20`}>
            {/* Search */}
            <div className="relative w-full lg:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 ${theme === 'light' ? 'text-slate-500 group-focus-within:text-slate-900' : 'text-zinc-500 group-focus-within:text-white'} transition-colors`} />
              </div>
              <input
                type="text"
                className={`block w-full pl-10 pr-3 py-2.5 ${theme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500 focus:bg-white focus:ring-slate-400' : 'bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:ring-white/20 focus:bg-white/[0.07]'} border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all shadow-inner`}
                placeholder="Search problem..."
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
              {/* Topic Dropdown */}
              <button className={`group flex items-center gap-2 px-4 py-2.5 ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900' : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-zinc-300 hover:text-white'} hover:-translate-y-0.5 border rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
                <span>All Topics</span>
                <ChevronDown className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-slate-500 group-hover:text-slate-700' : 'text-zinc-500 group-hover:text-white'} transition-colors`} />
              </button>

              {/* Language Dropdown */}
              <button className={`group flex items-center gap-2 px-4 py-2.5 ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900' : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-zinc-300 hover:text-white'} hover:-translate-y-0.5 border rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
                <Code2 className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-slate-500' : 'text-zinc-500'}`} />
                <span>All Languages</span>
                <ChevronDown className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-slate-500 group-hover:text-slate-700' : 'text-zinc-500 group-hover:text-white'} transition-colors`} />
              </button>

              {/* Difficulty Dropdown */}
              <button className={`group flex items-center gap-2 px-4 py-2.5 ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900' : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-zinc-300 hover:text-white'} hover:-translate-y-0.5 border rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
                <span>All Difficulties</span>
                <ChevronDown className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-slate-500 group-hover:text-slate-700' : 'text-zinc-500 group-hover:text-white'} transition-colors`} />
              </button>

              {/* Sort Dropdown */}
              <button className={`group flex items-center gap-2 px-4 py-2.5 ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900' : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-zinc-300 hover:text-white'} hover:-translate-y-0.5 border rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] ml-2`}>
                <ArrowUpDown className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-slate-500' : 'text-zinc-500'}`} />
                <span>Newest First</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Left: Problems Table */}
            <div className="lg:col-span-3">
              <div className={`w-full overflow-hidden rounded-2xl border ${theme === 'light' ? 'border-slate-200 bg-white/90' : 'border-white/10 bg-[#0a0a0a]/80'} backdrop-blur-md shadow-2xl`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent'}`}>
                      <th className={`py-4 pl-6 pr-4 text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-slate-600' : 'text-zinc-500'}`}>
                        Title
                      </th>
                      <th className={`py-4 px-4 text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-slate-600' : 'text-zinc-500'}`}>
                        Topic
                      </th>
                      <th className={`py-4 px-4 text-xs font-medium uppercase tracking-wider w-32 ${theme === 'light' ? 'text-slate-600' : 'text-zinc-500'}`}>
                        Success Rate
                      </th>
                      <th className={`py-4 px-4 text-xs font-medium uppercase tracking-wider text-center w-24 ${theme === 'light' ? 'text-slate-600' : 'text-zinc-500'}`}>
                        Lang
                      </th>
                      <th className={`py-4 px-4 text-xs font-medium uppercase tracking-wider text-right w-32 ${theme === 'light' ? 'text-slate-600' : 'text-zinc-500'}`}>
                        Difficulty
                      </th>
                    </tr>
                  </thead>

                  <tbody className={`divide-y ${theme === 'light' ? 'divide-slate-200' : 'divide-white/[0.06]'}`}>
                    {/* Problem 1 */}
                    <tr className={`group hover:${theme === 'light' ? 'bg-slate-50' : 'bg-white/[0.02]'} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40 cursor-pointer relative z-0 hover:z-10`}>
                      <td className="py-5 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <Lock className={`w-4 h-4 ${theme === 'light' ? 'text-slate-500' : 'text-zinc-600'}`} />
                          <span className={`text-sm font-medium ${theme === 'light' ? 'text-slate-700 group-hover:text-slate-900' : 'text-zinc-200 group-hover:text-white'} transition-colors`}>
                            LRU Cache Implementation
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${theme === 'light' ? 'bg-slate-200 text-slate-700 border-slate-300' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                            Sys Design
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border shadow-[0_0_10px_rgba(245,158,11,0.1)] ${theme === 'light' ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                          Memory Management
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`flex-1 h-1.5 rounded-full ${theme === 'light' ? 'bg-slate-200' : 'bg-zinc-800'}`}>
                            <div className="h-full w-[65%] bg-green-500 rounded-full" />
                          </div>
                          <span className={`text-xs font-medium ${theme === 'light' ? 'text-slate-600' : 'text-zinc-400'}`}>65%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/10 text-blue-400'}`}>
                          C++
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-500/10 text-green-400'}`}>
                          Medium
                        </span>
                      </td>
                    </tr>

                    {/* Add more problem rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-1">
              <div className={`sticky top-24 rounded-2xl border ${theme === 'light' ? 'border-slate-200 bg-white/90' : 'border-white/10 bg-[#0a0a0a]/80'} backdrop-blur-md shadow-2xl p-6`}>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-zinc-400'}`}>Total Problems</div>
                    <div className={`text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{playlistConfig.count}</div>
                  </div>
                  <div>
                    <div className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-zinc-400'}`}>Completed</div>
                    <div className={`text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>0</div>
                  </div>
                  <div>
                    <div className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-zinc-400'}`}>In Progress</div>
                    <div className={`text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>0</div>
                  </div>
                </div>
              </div>

              {/* Filters Panel */}
              <div className={`mt-6 rounded-2xl border ${theme === 'light' ? 'border-slate-200 bg-white/90' : 'border-white/10 bg-[#0a0a0a]/80'} backdrop-blur-md shadow-2xl p-6`}>
                {/* Filters Section */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Filters
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {companyFilters.map((company) => {
                      const isSelected = selectedFilters.includes(company);
                      return (
                        <button
                          key={company}
                          onClick={() => toggleFilter(company)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                            isSelected
                              ? theme === 'light'
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-black border-white'
                              : theme === 'light'
                                ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                                : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white'
                          } border`}
                        >
                          {company}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toggles Section */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Toggles
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={ignoreCompleted}
                          onChange={(e) => setIgnoreCompleted(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                          ignoreCompleted
                            ? theme === 'light'
                              ? 'bg-slate-900 border-slate-900'
                              : 'bg-white border-white'
                            : theme === 'light'
                              ? 'bg-transparent border-slate-400'
                              : 'bg-transparent border-zinc-600'
                        }`}>
                          {ignoreCompleted && (
                            <div className={`absolute inset-0 flex items-center justify-center ${theme === 'light' ? 'text-white' : 'text-black'}`}>
                              <div className="w-2 h-2 rounded-full bg-current" />
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`text-sm ${theme === 'light' ? 'text-slate-700' : 'text-zinc-300'} group-hover:${theme === 'light' ? 'text-slate-900' : 'text-white'} transition-colors`}>
                        Ignore completed?
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={userContributedOnly}
                          onChange={(e) => setUserContributedOnly(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                          userContributedOnly
                            ? theme === 'light'
                              ? 'bg-slate-900 border-slate-900'
                              : 'bg-white border-white'
                            : theme === 'light'
                              ? 'bg-transparent border-slate-400'
                              : 'bg-transparent border-zinc-600'
                        }`}>
                          {userContributedOnly && (
                            <div className={`absolute inset-0 flex items-center justify-center ${theme === 'light' ? 'text-white' : 'text-black'}`}>
                              <div className="w-2 h-2 rounded-full bg-current" />
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`text-sm ${theme === 'light' ? 'text-slate-700' : 'text-zinc-300'} group-hover:${theme === 'light' ? 'text-slate-900' : 'text-white'} transition-colors`}>
                        User contributed-only.
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={companiesOnly}
                          onChange={(e) => setCompaniesOnly(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                          companiesOnly
                            ? theme === 'light'
                              ? 'bg-slate-900 border-slate-900'
                              : 'bg-white border-white'
                            : theme === 'light'
                              ? 'bg-transparent border-slate-400'
                              : 'bg-transparent border-zinc-600'
                        }`}>
                          {companiesOnly && (
                            <div className={`absolute inset-0 flex items-center justify-center ${theme === 'light' ? 'text-white' : 'text-black'}`}>
                              <div className="w-2 h-2 rounded-full bg-current" />
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`text-sm ${theme === 'light' ? 'text-slate-700' : 'text-zinc-300'} group-hover:${theme === 'light' ? 'text-slate-900' : 'text-white'} transition-colors`}>
                        Companies-only.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Orderings Section */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Orderings
                  </h3>
                  <div className="space-y-3">
                    {[
                      { value: 'Highest %', label: 'Highest %' },
                      { value: 'Lowest %', label: 'Lowest %' },
                      { value: 'Least Attempted', label: 'Least Attempted' },
                      { value: 'Most Attempted', label: 'Most Attempted' },
                      { value: 'Most Hated', label: 'Most Hated' },
                      { value: 'Most Liked', label: 'Most Liked' },
                      { value: 'Hell Ladder', label: 'Hell Ladder', subtext: 'Hardest → easier (low % first)' },
                      { value: 'Heaven Ladder', label: 'Heaven Ladder', subtext: 'Easiest → harder (high % first)' },
                    ].map((option) => {
                      const isSelected = selectedOrdering === option.value;
                      return (
                        <label key={option.value} className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative mt-0.5">
                            <input
                              type="radio"
                              name="ordering"
                              value={option.value}
                              checked={isSelected}
                              onChange={(e) => setSelectedOrdering(e.target.value)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                              isSelected
                                ? theme === 'light'
                                  ? 'bg-slate-900 border-slate-900'
                                  : 'bg-white border-white'
                                : theme === 'light'
                                  ? 'bg-transparent border-slate-400'
                                  : 'bg-transparent border-zinc-600'
                            }`}>
                              {isSelected && (
                                <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-white' : 'bg-black'}`} />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm ${theme === 'light' ? 'text-slate-700' : 'text-zinc-300'} group-hover:${theme === 'light' ? 'text-slate-900' : 'text-white'} transition-colors`}>
                              {option.label}
                            </div>
                            {option.subtext && (
                              <div className={`text-xs mt-0.5 ${theme === 'light' ? 'text-slate-500' : 'text-zinc-500'}`}>
                                {option.subtext}
                              </div>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Default questions page for other playlists or no playlist
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Questions</h1>
        <p className="text-muted-foreground">
          Select a playlist from the Explore page to view questions.
        </p>
      </div>
    </div>
  );
}

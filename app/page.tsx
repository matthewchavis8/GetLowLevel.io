'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";
import { AuthDialog } from "@/components/auth/AuthDialog";

export default function HomePage() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  
  // Correct answer is option 2 (index 1): [[0, 0, 0], [0, 1, 2], [0, 2, 4]]
  const correctAnswerIndex = 1;

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

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

    hideSplineBranding();
    const timeout = setTimeout(hideSplineBranding, 1000);
    const timeout2 = setTimeout(hideSplineBranding, 3000);
    const timeout3 = setTimeout(hideSplineBranding, 5000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      setAuthDialogOpen(true);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  if (loading) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${theme === 'light' ? 'bg-[#f8fafc]' : 'bg-background'}`}>
        <div className={`text-lg ${theme === 'light' ? 'text-slate-900' : 'text-gray-300'}`}>Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className={`font-sans antialiased relative min-h-screen ${theme === 'light' ? 'bg-[#f8fafc] text-slate-900' : 'bg-background text-gray-300'} selection:bg-green-900 selection:text-green-100`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-md relative ${theme === 'light' ? 'border-slate-200 bg-white/80' : 'border-white/5 bg-background/70'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/Soc.png" 
              alt="GetLowLevel.io" 
              width={56} 
              height={56} 
              className={`object-contain ${theme === 'dark' ? 'brightness-150 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : ''}`}
            />
            <span className={`text-xl font-semibold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>GetLowLevel.io</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#leaderboard" className={`transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-gray-400 hover:text-white'}`}>
              Leaderboard
            </a>
            <a href="#practice" className={`transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-gray-400 hover:text-white'}`}>
              Practice
            </a>
            <a href="#contact" className={`transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-gray-400 hover:text-white'}`}>
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`transition-colors p-2 rounded-lg ${theme === 'light' ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleGetStarted}
              className={`hidden md:inline-flex px-6 py-2 rounded-full font-medium transition-colors text-sm ${theme === 'light' ? 'bg-black !text-white hover:bg-gray-900' : 'bg-white text-black hover:bg-gray-200'}`}
            >
              Join Now
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className={`md:hidden transition-colors p-2 rounded-lg ${theme === 'light' ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100' : 'text-gray-200 hover:text-white hover:bg-white/5'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="M6 6l12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`md:hidden absolute left-0 right-0 top-16 border-b ${theme === 'light' ? 'border-slate-200 bg-white/95' : 'border-white/10 bg-background/95'} backdrop-blur-md`}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
              <a
                href="#leaderboard"
                onClick={closeMobileMenu}
                className={`py-2 text-sm font-medium transition-colors ${theme === 'light' ? 'text-slate-700 hover:text-slate-900' : 'text-gray-200 hover:text-white'}`}
              >
                Leaderboard
              </a>
              <a
                href="#practice"
                onClick={closeMobileMenu}
                className={`py-2 text-sm font-medium transition-colors ${theme === 'light' ? 'text-slate-700 hover:text-slate-900' : 'text-gray-200 hover:text-white'}`}
              >
                Practice
              </a>
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className={`py-2 text-sm font-medium transition-colors ${theme === 'light' ? 'text-slate-700 hover:text-slate-900' : 'text-gray-200 hover:text-white'}`}
              >
                Contact
              </a>

              <div className="pt-2">
                <button
                  onClick={() => {
                    closeMobileMenu();
                    handleGetStarted();
                  }}
                  className={`w-full px-6 py-2 rounded-full font-medium transition-colors text-sm ${theme === 'light' ? 'bg-black !text-white hover:bg-gray-900' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="md:pt-48 md:pb-32 overflow-hidden pt-32 pb-20 relative">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {/* @ts-expect-error - spline-viewer is a web component */}
          <spline-viewer 
            url="https://prod.spline.design/yEyS56E8hH1AOTFI/scene.splinecode"
            style={{ width: '100%', height: '100%', opacity: theme === 'light' ? 0.7 : 1 }}
          />
          <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/70 to-transparent' : 'bg-gradient-to-t from-background via-background/50 to-transparent'}`} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Hero Title - Always visible */}
          <h1 className={`md:text-7xl leading-[1.1] text-5xl font-semibold tracking-tight mb-6 drop-shadow-2xl ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            Master the fundamentals
            <br />
            <span className={`text-transparent bg-clip-text ${theme === 'light' ? 'bg-gradient-to-br from-slate-600 to-slate-400' : 'bg-gradient-to-br from-gray-200 to-gray-500'}`}>
              interviews actually test.
            </span>
          </h1>

          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-gray-400 drop-shadow-md'}`}>
            Practice interview questions that reveal how languages, memory, and systems actually move not the sandboxed puzzles everyone forgets after.
          </p>

          {/* Language Icons */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className={`w-20 h-20 p-4 rounded-xl backdrop-blur transition-all flex items-center justify-center ${theme === 'light' ? 'bg-white border border-slate-200 group-hover:border-slate-300 group-hover:shadow-lg' : 'bg-card/80 border border-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]'}`}>
                <Image src="/PythonLogo.png" alt="Python" width={48} height={48} className="object-contain w-full h-full" />
              </div>
              <span className={`text-xs font-medium ${theme === 'light' ? 'text-slate-600 group-hover:text-slate-900' : 'text-gray-500 group-hover:text-gray-300'}`}>Python</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className={`w-20 h-20 p-4 rounded-xl backdrop-blur transition-all flex items-center justify-center ${theme === 'light' ? 'bg-white border border-slate-200 group-hover:border-slate-300 group-hover:shadow-lg' : 'bg-card/80 border border-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]'}`}>
                <Image src="/C++Logo.png" alt="C++" width={48} height={48} className="object-contain w-full h-full" />
              </div>
              <span className={`text-xs font-medium ${theme === 'light' ? 'text-slate-600 group-hover:text-slate-900' : 'text-gray-500 group-hover:text-gray-300'}`}>C++</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className={`w-20 h-20 p-4 rounded-xl backdrop-blur transition-all flex items-center justify-center ${theme === 'light' ? 'bg-white border border-slate-200 group-hover:border-slate-300 group-hover:shadow-lg' : 'bg-card/80 border border-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]'}`}>
                <Image src="/RustLogo.png" alt="Rust" width={48} height={48} className="object-contain w-full h-full" />
              </div>
              <span className={`text-xs font-medium ${theme === 'light' ? 'text-slate-600 group-hover:text-slate-900' : 'text-gray-500 group-hover:text-gray-300'}`}>Rust</span>
            </div>
          </div>

          <button
            onClick={handleGetStarted}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium transition-colors ${theme === 'light' ? 'bg-black !text-white hover:bg-gray-900 shadow-lg' : 'bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]'}`}
          >
            Start Practicing
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Question Preview Section */}
      <section id="preview" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className={`rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up ${theme === 'light' ? 'bg-white border border-slate-200' : 'glass-card'}`}>
            <div className={`h-12 border-b flex items-center px-4 justify-between backdrop-blur-sm ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-white/5 bg-white/5'}`}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className={`text-xs font-mono ${theme === 'light' ? 'text-slate-500' : 'text-gray-500'}`}>lib/data/questions.json</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
              <div className={`backdrop-blur-md p-6 md:p-8 border-b lg:border-b-0 lg:border-r ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0c0c0c]/90 border-white/5'}`}>
                <div className="mb-6">
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Three by three</h3>
                  <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
                    What is the value of{' '}
                    <code className="bg-white/10 px-1 rounded text-gray-200">grid</code> after running this code?
                  </p>
                </div>

                <div className="font-mono text-sm leading-relaxed overflow-x-auto custom-scrollbar">
                  <div className={`mb-2 ${theme === 'light' ? 'text-slate-500' : 'text-gray-500'}`}>// python</div>
                  <pre>
                    <code>
                      <span className="text-purple-400">grid</span> = []
                      {'\n'}
                      <span className="text-orange-400">for</span> i{' '}
                      <span className="text-orange-400">in</span>{' '}
                      <span className="text-blue-400">range</span>(
                      <span className="text-green-400">3</span>):
                      {'\n    '}
                      <span className="text-purple-400">row</span> = []
                      {'\n    '}
                      <span className="text-orange-400">for</span> j{' '}
                      <span className="text-orange-400">in</span>{' '}
                      <span className="text-blue-400">range</span>(
                      <span className="text-green-400">3</span>):
                      {'\n        '}
                      <span className="text-purple-400">row</span>.
                      <span className="text-blue-400">append</span>(i * j)
                      {'\n    '}
                      <span className="text-purple-400">grid</span>.
                      <span className="text-blue-400">append</span>(
                      <span className="text-purple-400">row</span>)
                      {'\n\n'}
                      <span className="text-blue-400">print</span>(
                      <span className="text-purple-400">grid</span>)
                    </code>
                  </pre>
                </div>
              </div>

              <div className={`p-6 md:p-8 backdrop-blur-md flex flex-col justify-center ${theme === 'light' ? 'bg-white' : 'bg-surface/80'}`}>
                <h4 className={`text-sm font-medium uppercase tracking-wider mb-6 ${theme === 'light' ? 'text-slate-600' : 'text-gray-500'}`}>Select Answer</h4>

                <div className="space-y-3" role="radiogroup" aria-label="Select an answer">
                  {[
                    { value: 0, text: '[[0, 1, 2], [0, 1, 2], [0, 1, 2]]' },
                    { value: 1, text: '[[0, 0, 0], [0, 1, 2], [0, 2, 4]]' },
                    { value: 2, text: '[[0, 0, 0], [1, 1, 1], [2, 2, 2]]' },
                    { value: 3, text: 'IndexError: list assignment index out of range' },
                  ].map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === correctAnswerIndex;
                    
                    // Show feedback: selected incorrect = red, correct answer = green (when wrong is selected)
                    const isIncorrectSelected = isSelected && !isCorrect;
                    const showCorrectAnswer = selectedAnswer !== null && isCorrect && selectedAnswer !== correctAnswerIndex;
                    const isCorrectSelected = isSelected && isCorrect;
                    
                    // Determine border and background colors
                    // Priority: incorrect selected (red) > correct selected (green) > show correct answer (green) > default
                    let borderColor = theme === 'light' ? 'border-slate-200' : 'border-white/10';
                    let bgColor = theme === 'light' ? 'bg-slate-50' : 'bg-card';
                    
                    if (isIncorrectSelected) {
                      // Wrong answer selected - light red background (#FEE2E2 / bg-red-100)
                      borderColor = 'border-red-500';
                      bgColor = theme === 'light' ? 'bg-red-100' : 'bg-red-500/10';
                    } else if (isCorrectSelected) {
                      // Correct answer selected - green
                      borderColor = 'border-green-500';
                      bgColor = theme === 'light' ? 'bg-green-50' : 'bg-green-500/10';
                    } else if (showCorrectAnswer) {
                      // Show correct answer in green when wrong answer is selected
                      borderColor = 'border-green-500';
                      bgColor = theme === 'light' ? 'bg-green-50' : 'bg-green-500/10';
                    } else if (isSelected) {
                      // Fallback for any other selected state
                      borderColor = theme === 'light' ? 'border-slate-400' : 'border-white/30';
                    }

                    return (
                      <label
                        key={index}
                        className="cursor-pointer group block relative"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedAnswer(index);
                          }
                        }}
                        tabIndex={0}
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`Option ${String.fromCharCode(65 + index)}: ${option.text}`}
                      >
                        <input
                          type="radio"
                          name="preview-q"
                          className="sr-only"
                          checked={isSelected}
                          onChange={() => setSelectedAnswer(index)}
                          tabIndex={-1}
                        />
                        <div 
                          className={`p-4 rounded-xl border transition-all flex items-center justify-between ${borderColor} ${bgColor} ${!isSelected && !isIncorrectSelected && !showCorrectAnswer && !isCorrectSelected && (theme === 'light' ? 'hover:border-slate-300' : 'hover:border-white/20')}`}
                          style={isIncorrectSelected ? { 
                            borderColor: '#ef4444',
                            backgroundColor: theme === 'light' ? '#FEE2E2' : 'rgba(239, 68, 68, 0.1)'
                          } : undefined}
                        >
                          <code className={`text-sm font-mono ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                            {option.text}
                          </code>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? isCorrect
                                ? 'border-green-500 bg-green-500'
                                : 'border-red-500 bg-red-500'
                              : showCorrectAnswer
                              ? 'border-green-500 bg-green-500'
                              : theme === 'light'
                              ? 'border-slate-300'
                              : 'border-gray-600'
                          }`}>
                            {(isSelected || showCorrectAnswer) && (
                              <>
                                {showCorrectAnswer && !isSelected ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-3 h-3"
                                  >
                                    <path d="M20 6 9 17l-5-5" />
                                  </svg>
                                ) : (
                                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Banner at bottom - Shows when incorrect answer is selected */}
          {selectedAnswer !== null && selectedAnswer !== correctAnswerIndex && (
            <div className="mt-8 animate-fade-in-up">
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm text-center">
                <p className={`text-lg md:text-xl font-semibold ${theme === 'light' ? 'text-red-800' : 'text-red-300'}`}>
                  You're not cooked yet, get low level, and rewrite the code that writes you.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why GetLowLevel */}
      <section className={`py-24 border-t backdrop-blur relative z-10 ${theme === 'light' ? 'border-slate-200 bg-white' : 'border-white/5 bg-surface/90'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Why GetLowLevel?</h2>
            <p className={`text-lg max-w-2xl ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
              In an age of AI, interviews test fundamentals. We help you master the layers beneath the syntax.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden group ${theme === 'light' ? 'bg-slate-50 border border-slate-200' : 'bg-card/50 border border-white/5'}`}>
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-24 h-24 text-gray-500"
                >
                  <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
                  <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
                  <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
                </svg>
              </div>

              <h3 className={`text-xl font-semibold mb-6 relative z-10 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Systems Depth</h3>

              <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Memory
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Concurrency
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  OS
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                  Networking
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                  Architecture
                </span>
              </div>

              <p className={`text-sm relative z-10 ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
                Hundreds of deeply technical problems focused on behavior, tradeoffs, and correctness — not trivia.
              </p>
            </div>

            <div className={`p-8 rounded-2xl backdrop-blur-sm group ${theme === 'light' ? 'bg-slate-50 border border-slate-200' : 'bg-card/50 border border-white/5'}`}>
              <h3 className={`text-xl font-semibold mb-6 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Live Rankings</h3>

              <div className={`h-32 flex items-end gap-2 mb-6 border-b pb-1 ${theme === 'light' ? 'border-slate-200' : 'border-white/10'}`}>
                <div className={`flex-1 rounded-t-sm h-[30%] transition-colors ${theme === 'light' ? 'bg-slate-300 group-hover:bg-slate-400' : 'bg-white/5 group-hover:bg-white/10'}`} />
                <div className={`flex-1 rounded-t-sm h-[50%] transition-colors ${theme === 'light' ? 'bg-slate-300 group-hover:bg-slate-400' : 'bg-white/5 group-hover:bg-white/10'}`} />
                <div className={`flex-1 rounded-t-sm h-[80%] relative ${theme === 'light' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]'}`}>
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`}>
                    YOU
                  </div>
                </div>
                <div className={`flex-1 rounded-t-sm h-[40%] transition-colors ${theme === 'light' ? 'bg-slate-300 group-hover:bg-slate-400' : 'bg-white/5 group-hover:bg-white/10'}`} />
                <div className={`flex-1 rounded-t-sm h-[60%] transition-colors ${theme === 'light' ? 'bg-slate-300 group-hover:bg-slate-400' : 'bg-white/5 group-hover:bg-white/10'}`} />
              </div>

              <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
                Know where you stand. Track progress, identify weak areas, and improve deliberately.
              </p>
            </div>

            <div className={`p-8 rounded-2xl backdrop-blur-sm flex flex-col justify-between overflow-hidden ${theme === 'light' ? 'bg-slate-50 border border-slate-200' : 'bg-card/50 border border-white/5'}`}>
              <h3 className={`text-xl font-semibold mb-6 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Real Outcomes</h3>

              <div className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} rounded-xl p-4 shadow-lg transform rotate-2 translate-y-2 transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex items-start gap-3">
                  {/* Outlook Logo */}
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg">
                    <Image 
                      src="/outlook-logo.png" 
                      alt="Outlook" 
                      width={40} 
                      height={40} 
                      className="object-contain transition-all duration-300"
                      style={{
                        filter: theme === 'light' 
                          ? 'none' 
                          : 'brightness(1.25) contrast(1.1) saturate(1.1)'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>You are hired!</div>
                    <div className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Congratulations on your new job!</div>
                  </div>
                </div>
              </div>

              <p className={`text-sm mt-8 ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
                Built from real interviews. Used by candidates preparing for top-tier engineering roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Practice Section */}
      <section className={`py-24 px-6 border-t relative z-10 ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-white/5 bg-[#050505]'}`} id="practice">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <div className="xl:col-span-4 flex flex-col justify-center">
              <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-6 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Practice thousands of problems.
              </h2>
              <p className={`text-lg mb-8 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
                Smash the interview and land your dream job. Sharpen your hard and soft skills with an environment that
                mimics the real thing.
              </p>
              <button 
                onClick={handleGetStarted}
                className={`w-fit px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${theme === 'light' ? 'bg-black !text-white hover:bg-gray-900' : 'bg-white text-black hover:bg-gray-200'}`}
              >
                Enter Practice Mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="xl:col-span-8">
              <div className={`border rounded-xl overflow-hidden shadow-2xl flex flex-col h-[700px] ${theme === 'light' ? 'border-slate-200 bg-white' : 'border-white/10 bg-[#0c0c0c]'}`}>
                <div className={`flex items-center justify-between px-4 h-12 border-b ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-white/5 bg-[#0a0a0a]'}`}>
                  <div className="flex gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded border text-xs ${theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-[#111] border-white/5 text-gray-300'}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <path d="m18 16 4-4-4-4" />
                        <path d="m6 8-4 4 4 4" />
                        <path d="m14.5 4-5 16" />
                      </svg>
                      Editor
                    </div>

                    <div className={`flex items-center gap-2 px-3 py-1 text-xs cursor-pointer transition-colors ${theme === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-gray-500 hover:text-gray-300'}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <path d="M12 7v14" />
                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                      </svg>
                      Explanation
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${theme === 'light' ? 'text-green-700 bg-green-50 border border-green-200 hover:bg-green-100' : 'text-green-400 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20'}`}>
                      Run Tests
                    </button>
                    <button className={`px-3 py-1.5 text-xs font-medium border rounded transition-colors ${theme === 'light' ? 'text-slate-700 border-slate-200 hover:bg-slate-50' : 'text-gray-400 border-white/10 hover:bg-white/5'}`}>
                      Submit
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  <div className="flex-1 p-4 font-mono text-sm overflow-auto custom-scrollbar relative">
                    <div className={`absolute left-4 top-4 select-none text-right pr-4 border-r ${theme === 'light' ? 'text-slate-400 border-slate-200' : 'text-gray-700 border-white/5'}`}>
                      1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />11<br />12<br />13<br />14<br />15<br />16<br />17<br />18<br />19<br />20
                    </div>
                    <div className={`pl-12 leading-normal ${theme === 'light' ? 'text-slate-800' : 'text-gray-300'}`}>
                      <pre>
                        <code>{`namespace getlowlevel 
{
    template <typename Element>
    class InstantWriteMultipleRead
    {
    public:
        void Write(const Element& value)
        {
            // TODO: Implement atomic write
            // Ensure readers see consistent state
        }

        bool Read(Element& out) const
        {
            // TODO: Implement lock-free read
            return false;
        }

    private:
        std::atomic<int> version_;
    };
}`}</code>
                      </pre>
                    </div>
                  </div>

                  <div className={`md:w-80 border-l flex flex-col ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-white/5 bg-[#0a0a0a]'}`}>
                    <div className={`p-4 border-b ${theme === 'light' ? 'border-slate-200' : 'border-white/5'}`}>
                      <h4 className={`text-sm font-medium mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Test Cases</h4>
                      <div className="space-y-2">
                        <div className={`flex items-center justify-between p-2 rounded border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-white/5 border-white/5'}`}>
                          <code className={`text-xs ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>write-while-read</code>
                          <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-slate-400' : 'bg-gray-600'}`} />
                        </div>
                        <div className={`flex items-center justify-between p-2 rounded border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-white/5 border-white/5'}`}>
                          <code className={`text-xs ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>read-many</code>
                          <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-slate-400' : 'bg-gray-600'}`} />
                        </div>
                        <div className={`flex items-center justify-between p-2 rounded border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-white/5 border-white/5'}`}>
                          <code className={`text-xs ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>empty-read</code>
                          <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-slate-400' : 'bg-gray-600'}`} />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <details className={`group border-b ${theme === 'light' ? 'border-slate-200' : 'border-white/5'}`}>
                        <summary className={`flex justify-between items-center p-4 cursor-pointer transition-colors text-xs font-medium ${theme === 'light' ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/5 text-gray-400'}`}>
                          Interviewer Follow Up
                          <span className="transition-transform group-open:rotate-180">▾</span>
                        </summary>
                        <div className={`px-4 pb-4 text-xs ${theme === 'light' ? 'text-slate-600' : 'text-gray-500'}`}>
                          How does this scale with 100 threads? What about cache coherence?
                        </div>
                      </details>

                      <details className={`group border-b ${theme === 'light' ? 'border-slate-200' : 'border-white/5'}`}>
                        <summary className={`flex justify-between items-center p-4 cursor-pointer transition-colors text-xs font-medium ${theme === 'light' ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/5 text-gray-400'}`}>
                          Use Cases <span className="transition-transform group-open:rotate-180">▾</span>
                        </summary>
                        <div className={`px-4 pb-4 text-xs ${theme === 'light' ? 'text-slate-600' : 'text-gray-500'}`}>Real-time trading systems, telemetry buffers.</div>
                      </details>

                      <details className={`group border-b ${theme === 'light' ? 'border-slate-200' : 'border-white/5'}`}>
                        <summary className={`flex justify-between items-center p-4 cursor-pointer transition-colors text-xs font-medium ${theme === 'light' ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/5 text-gray-400'}`}>
                          Uncook me! <span className="transition-transform group-open:rotate-180">▾</span>
                        </summary>
                        <div className={`px-4 pb-4 text-xs ${theme === 'light' ? 'text-slate-600' : 'text-gray-500'}`}>Hint: Look into Seqlocks.</div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`py-24 px-6 relative z-10 border-t ${theme === 'light' ? 'border-slate-200 bg-white' : 'border-white/5'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-semibold tracking-tight mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              Pricing
            </h2>
            <p className={`text-lg ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
              Complete access to all content, forever free.
            </p>
          </div>

          <div className="relative">
            <div className={`rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm ${theme === 'light' ? 'bg-gradient-to-b from-slate-50 to-white border border-slate-200' : 'bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10'}`}>
              <div className="flex justify-center mb-6">
                <span className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-semibold">
                  Forever Free
                </span>
              </div>

              <div className="text-center mb-4">
                <div className={`text-7xl md:text-8xl font-bold mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  $0
                </div>
                <p className={`text-lg ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>No credit card required</p>
              </div>

              <div className="flex justify-center mb-8">
                <button 
                  onClick={handleGetStarted}
                  className={`px-8 py-3.5 rounded-full font-medium transition-colors shadow-lg ${theme === 'light' ? 'bg-black !text-white hover:bg-gray-900' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                  Get started now
                </button>
              </div>

              <div className="space-y-3">
                <div className={`flex items-center gap-3 ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 flex-shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Unlimited access to all questions</span>
                </div>
                <div className={`flex items-center gap-3 ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 flex-shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Operating systems deep dives</span>
                </div>
                <div className={`flex items-center gap-3 ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 flex-shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Computer architecture concepts</span>
                </div>
                <div className={`flex items-center gap-3 ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 flex-shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Concurrency and threading</span>
                </div>
                <div className={`flex items-center gap-3 ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 flex-shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Performance optimization techniques</span>
                </div>
                <div className={`flex items-center gap-3 ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 flex-shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Community support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-12 px-6 relative z-10 ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-white/5 bg-background'}`} id="contact">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image 
              src="/Soc.png" 
              alt="GetLowLevel.io" 
              width={40} 
              height={40} 
              className={`object-contain ${theme === 'dark' ? 'brightness-150 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]' : ''}`}
            />
            <span className={`text-base font-medium ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>GetLowLevel.io © 2025</span>
          </div>

          <div className={`flex gap-8 text-sm ${theme === 'light' ? 'text-slate-600' : 'text-gray-500'}`}>
            <a href="#" className={`transition-colors ${theme === 'light' ? 'hover:text-slate-900' : 'hover:text-white'}`}>
              Privacy
            </a>
            <a href="#" className={`transition-colors ${theme === 'light' ? 'hover:text-slate-900' : 'hover:text-white'}`}>
              Terms
            </a>
            <a href="#" className={`transition-colors ${theme === 'light' ? 'hover:text-slate-900' : 'hover:text-white'}`}>
              Twitter
            </a>
            <a href="#" className={`transition-colors ${theme === 'light' ? 'hover:text-slate-900' : 'hover:text-white'}`}>
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
}

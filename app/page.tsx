'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { AuthDialog } from "@/components/auth/AuthDialog";

export default function HomePage() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-lg text-gray-300">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="bg-background text-gray-300 font-sans antialiased selection:bg-green-900 selection:text-green-100 relative min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/Soc.png" alt="GetLowLevel.io" width={40} height={40} className="object-contain" />
            <span className="font-semibold text-white tracking-tight">GetLowLevel</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#leaderboard" className="hover:text-white transition-colors">
              Leaderboard
            </a>
            <a href="#practice" className="hover:text-white transition-colors">
              Practice
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleGetStarted}
              className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm"
            >
              Join Now
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors hidden md:block"
            >
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
                className="w-5 h-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="md:pt-48 md:pb-32 overflow-hidden pt-32 pb-20 relative">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {/* @ts-expect-error - spline-viewer is a web component */}
          <spline-viewer 
            url="https://prod.spline.design/yEyS56E8hH1AOTFI/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="md:text-7xl leading-[1.1] text-5xl font-semibold text-white tracking-tight mb-6 drop-shadow-2xl">
            Master the fundamentals
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-500">
              interviews actually test.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Practice real interview questions that expose how languages, memory, and systems actually behave — not toy
            problems.
          </p>

          {/* Language Icons */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-20 h-20 p-4 rounded-xl bg-card/80 backdrop-blur border border-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center">
                <Image src="/PythonLogo.png" alt="Python" width={48} height={48} className="object-contain w-full h-full" />
              </div>
              <span className="text-xs font-medium text-gray-500 group-hover:text-gray-300">Python</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-20 h-20 p-4 rounded-xl bg-card/80 backdrop-blur border border-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center">
                <Image src="/C++Logo.png" alt="C++" width={48} height={48} className="object-contain w-full h-full" />
              </div>
              <span className="text-xs font-medium text-gray-500 group-hover:text-gray-300">C++</span>
            </div>

            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-20 h-20 p-4 rounded-xl bg-card/80 backdrop-blur border border-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center">
                <Image src="/RustLogo.png" alt="Rust" width={48} height={48} className="object-contain w-full h-full" />
              </div>
              <span className="text-xs font-medium text-gray-500 group-hover:text-gray-300">Rust</span>
            </div>
          </div>

          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-medium hover:bg-gray-200 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]"
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
          <div className="glass-card rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-4 justify-between backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="text-xs font-mono text-gray-500">lib/data/questions.json</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
              <div className="bg-[#0c0c0c]/90 backdrop-blur-md p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Three by three</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    What is the value of{' '}
                    <code className="bg-white/10 px-1 rounded text-gray-200">grid</code> after running this code?
                  </p>
                </div>

                <div className="font-mono text-sm leading-relaxed overflow-x-auto custom-scrollbar">
                  <div className="text-gray-500 mb-2">// python</div>
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

              <div className="p-6 md:p-8 bg-surface/80 backdrop-blur-md flex flex-col justify-center">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Select Answer</h4>

                <div className="space-y-3">
                  <label className="cursor-pointer group block relative">
                    <input type="radio" name="preview-q" className="peer sr-only" />
                    <div className="p-4 rounded-xl border border-white/10 bg-card hover:border-white/20 transition-all flex items-center justify-between">
                      <code className="text-sm font-mono text-gray-300">
                        [[0, 1, 2], [0, 1, 2], [0, 1, 2]]
                      </code>
                      <div className="w-5 h-5 rounded-full border border-gray-600 peer-checked:border-green-500" />
                    </div>
                  </label>

                  <label className="cursor-pointer group block relative">
                    <input type="radio" name="preview-q" className="peer sr-only" defaultChecked />
                    <div className="p-4 rounded-xl border border-white/10 bg-card hover:border-white/20 transition-all flex items-center justify-between">
                      <code className="text-sm font-mono text-gray-300">
                        [[0, 0, 0], [0, 1, 2], [0, 2, 4]]
                      </code>
                      <div className="w-5 h-5 flex items-center justify-center">
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
                          className="w-4 h-4 text-green-500 opacity-0 transition-all transform scale-75 peer-checked:opacity-100 peer-checked:scale-100"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                    </div>
                  </label>

                  <label className="cursor-pointer group block relative">
                    <input type="radio" name="preview-q" className="peer sr-only" />
                    <div className="p-4 rounded-xl border border-white/10 bg-card hover:border-white/20 transition-all flex items-center justify-between">
                      <code className="text-sm font-mono text-gray-300">
                        [[0, 0, 0], [1, 1, 1], [2, 2, 2]]
                      </code>
                      <div className="w-5 h-5 rounded-full border border-gray-600" />
                    </div>
                  </label>

                  <label className="cursor-pointer group block relative">
                    <input type="radio" name="preview-q" className="peer sr-only" />
                    <div className="p-4 rounded-xl border border-white/10 bg-card hover:border-white/20 transition-all flex items-center justify-between">
                      <code className="text-sm font-mono text-gray-300">IndexError: list assignment index out of range</code>
                      <div className="w-5 h-5 rounded-full border border-gray-600" />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why GetLowLevel */}
      <section className="py-24 border-t border-white/5 bg-surface/90 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">Why GetLowLevel?</h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              In an age of AI, interviews test fundamentals. We help you master the layers beneath the syntax.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/5 relative overflow-hidden group">
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

              <h3 className="text-xl font-semibold text-white mb-6 relative z-10">Systems Depth</h3>

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

              <p className="text-sm text-gray-400 relative z-10">
                Hundreds of deeply technical problems focused on behavior, tradeoffs, and correctness — not trivia.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/5 group">
              <h3 className="text-xl font-semibold text-white mb-6">Live Rankings</h3>

              <div className="h-32 flex items-end gap-2 mb-6 border-b border-white/10 pb-1">
                <div className="flex-1 bg-white/5 rounded-t-sm h-[30%] group-hover:bg-white/10 transition-colors" />
                <div className="flex-1 bg-white/5 rounded-t-sm h-[50%] group-hover:bg-white/10 transition-colors" />
                <div className="flex-1 bg-green-500 rounded-t-sm h-[80%] shadow-[0_0_15px_rgba(34,197,94,0.3)] relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-green-400 font-bold">
                    YOU
                  </div>
                </div>
                <div className="flex-1 bg-white/5 rounded-t-sm h-[40%] group-hover:bg-white/10 transition-colors" />
                <div className="flex-1 bg-white/5 rounded-t-sm h-[60%] group-hover:bg-white/10 transition-colors" />
              </div>

              <p className="text-sm text-gray-400">
                Know where you stand. Track progress, identify weak areas, and improve deliberately.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/5 flex flex-col justify-between overflow-hidden">
              <h3 className="text-xl font-semibold text-white mb-6">Real Outcomes</h3>

              <div className="bg-white text-black p-4 rounded-xl shadow-lg transform rotate-2 translate-y-2 transition-transform duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xs">G</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">Offer Letter: Senior Systems Eng</div>
                    <div className="text-xs text-gray-600 mt-1">We are pleased to offer you the position...</div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-8">
                Built from real interviews. Used by candidates preparing for top-tier engineering roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Practice Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#050505] relative z-10" id="practice">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <div className="xl:col-span-4 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
                Practice thousands of problems.
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Smash the interview and land your dream job. Sharpen your hard and soft skills with an environment that
                mimics the real thing.
              </p>
              <button 
                onClick={handleGetStarted}
                className="w-fit bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
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
              <div className="border border-white/10 rounded-xl bg-[#0c0c0c] overflow-hidden shadow-2xl flex flex-col h-[700px]">
                <div className="flex items-center justify-between px-4 h-12 border-b border-white/5 bg-[#0a0a0a]">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#111] rounded border border-white/5 text-xs text-gray-300">
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

                    <div className="flex items-center gap-2 px-3 py-1 text-xs text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">
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
                    <button className="px-3 py-1.5 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 rounded hover:bg-green-500/20 transition-colors">
                      Run Tests
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-400 border border-white/10 rounded hover:bg-white/5 transition-colors">
                      Submit
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  <div className="flex-1 p-4 font-mono text-sm overflow-auto custom-scrollbar relative">
                    <div className="absolute left-4 top-4 text-gray-700 select-none text-right pr-4 border-r border-white/5">
                      1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />11<br />12<br />13<br />14<br />15<br />16<br />17<br />18<br />19<br />20
                    </div>
                    <div className="pl-12 text-gray-300 leading-normal">
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

                  <div className="md:w-80 border-l border-white/5 bg-[#0a0a0a] flex flex-col">
                    <div className="p-4 border-b border-white/5">
                      <h4 className="text-sm font-medium text-white mb-4">Test Cases</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                          <code className="text-xs text-gray-300">write-while-read</code>
                          <div className="w-2 h-2 rounded-full bg-gray-600" />
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                          <code className="text-xs text-gray-300">read-many</code>
                          <div className="w-2 h-2 rounded-full bg-gray-600" />
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                          <code className="text-xs text-gray-300">empty-read</code>
                          <div className="w-2 h-2 rounded-full bg-gray-600" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <details className="group border-b border-white/5">
                        <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5 transition-colors text-xs font-medium text-gray-400">
                          Interviewer Follow Up
                          <span className="transition-transform group-open:rotate-180">▾</span>
                        </summary>
                        <div className="px-4 pb-4 text-xs text-gray-500">
                          How does this scale with 100 threads? What about cache coherence?
                        </div>
                      </details>

                      <details className="group border-b border-white/5">
                        <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5 transition-colors text-xs font-medium text-gray-400">
                          Use Cases <span className="transition-transform group-open:rotate-180">▾</span>
                        </summary>
                        <div className="px-4 pb-4 text-xs text-gray-500">Real-time trading systems, telemetry buffers.</div>
                      </details>

                      <details className="group border-b border-white/5">
                        <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5 transition-colors text-xs font-medium text-gray-400">
                          Uncook me! <span className="transition-transform group-open:rotate-180">▾</span>
                        </summary>
                        <div className="px-4 pb-4 text-xs text-gray-500">Hint: Look into Seqlocks.</div>
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
      <section className="py-24 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
              Pricing
            </h2>
            <p className="text-lg text-gray-400">
              Complete access to all content, forever free.
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
              <div className="flex justify-center mb-6">
                <span className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-semibold">
                  Forever Free
                </span>
              </div>

              <div className="text-center mb-4">
                <div className="text-7xl md:text-8xl font-bold text-white mb-2">
                  $0
                </div>
                <p className="text-gray-400 text-lg">No credit card required</p>
              </div>

              <div className="flex justify-center mb-8">
                <button 
                  onClick={handleGetStarted}
                  className="bg-white text-black px-8 py-3.5 rounded-full font-medium hover:bg-gray-200 transition-colors shadow-lg"
                >
                  Get started now
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
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
                <div className="flex items-center gap-3 text-gray-300">
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
                <div className="flex items-center gap-3 text-gray-300">
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
                <div className="flex items-center gap-3 text-gray-300">
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
                <div className="flex items-center gap-3 text-gray-300">
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
                <div className="flex items-center gap-3 text-gray-300">
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
      <footer className="border-t border-white/5 bg-background py-12 px-6 relative z-10" id="contact">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/Soc.png" alt="GetLowLevel.io" width={24} height={24} className="object-contain" />
            <span className="text-sm font-medium text-gray-400">GetLowLevel © 2025</span>
          </div>

          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
}

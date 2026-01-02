'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Layers, 
  Search, 
  Cpu, 
  Code2, 
  Box, 
  Terminal, 
  Book, 
  List, 
  ArrowRight 
} from 'lucide-react';

interface CardData {
  id: string;
  icon: React.ReactNode;
  logoImage?: string; // Optional logo image path for cards that need images instead of icons
  title: string;
  description: string;
  count: number;
  concepts: number;
  questions: number;
  href: string;
}

const cards: CardData[] = [
  {
    id: 'os',
    icon: <Cpu className="w-5 h-5 opacity-90" />,
    title: 'Operating Systems',
    description: 'The foremost 25 questions to get you started on your OS learning journey.',
    count: 25,
    concepts: 3,
    questions: 25,
    href: '/dashboard/questions?playlist=os25',
  },
  {
    id: 'cpp',
    icon: <Code2 className="w-5 h-5 opacity-90" />,
    logoImage: '/C++Logo.png',
    title: 'C++',
    description: 'The 50 questions you need to ace if you want to call yourself a C++ developer.',
    count: 50,
    concepts: 8,
    questions: 50,
    href: '/dashboard/questions?playlist=cpp50',
  },
  {
    id: 'rust',
    icon: <Box className="w-5 h-5 opacity-90" />,
    logoImage: '/RustLogo.png',
    title: 'Rust',
    description: 'The core Rust questions you should know to write safe and fast systems code.',
    count: 50,
    concepts: 7,
    questions: 50,
    href: '/dashboard/questions?playlist=rust50',
  },
  {
    id: 'python',
    icon: <Terminal className="w-5 h-5 opacity-90" />,
    logoImage: '/PythonLogo.png',
    title: 'Python',
    description: 'The internals and gotchas that matter when you write performance-minded Python.',
    count: 50,
    concepts: 6,
    questions: 50,
    href: '/dashboard/questions?playlist=python50',
  },
];

const ExploreCard = React.memo(function ExploreCard({ card }: { card: CardData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const rafRef = useRef<number | null>(null);

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Cancel previous animation frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Use requestAnimationFrame for smooth performance
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -1;
      const rotateY = ((x - centerX) / centerX) * 1;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.005, 1.005, 1.005)`;
    });
  };

  const handleCardLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    cardRef.current.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    cardRef.current.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <Link href={card.href} className="block">
      <div
        ref={cardRef}
        className="group relative rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden h-[340px]"
        onMouseMove={handleCardMove}
        onMouseLeave={handleCardLeave}
        style={{
          background: 'linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
        onMouseEnter={(e) => {
          if (cardRef.current) {
            cardRef.current.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            cardRef.current.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 20px rgba(255, 255, 255, 0.05)';
          }
        }}
      >
        {/* Glossy top highlight - bright white to light gray gradient at top third */}
        <div 
          className="absolute inset-x-0 top-0 h-[33%] z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 0%, rgba(200, 200, 200, 0.15) 50%, transparent 100%)',
            borderRadius: '1.5rem 1.5rem 0 0',
          }}
        />
        
        {/* Dark-to-darker vertical gradient for depth */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.8) 0%, rgba(10, 10, 10, 1) 100%)',
            borderRadius: '1.5rem',
          }}
        />
        
        {/* Subtle edge outline for crispness */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            borderRadius: '1.5rem',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
          }}
        />

        <div className="relative z-10 h-full flex flex-col justify-between p-8">
          <div className="flex justify-between items-start">
            <div className="max-w-[65%]">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-white shadow-inner overflow-hidden">
                {card.logoImage ? (
                  <Image
                    src={card.logoImage}
                    alt={card.title}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  card.icon
                )}
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
                {card.title}
              </h3>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                {card.description}
              </p>
            </div>
            <span className="text-5xl font-semibold text-white/5 tracking-tighter group-hover:text-white/10 transition-colors duration-500">
              {card.count}
            </span>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
            <div className="flex items-center gap-4 text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              <span className="flex items-center gap-1.5">
                <Book className="w-3 h-3" />
                {card.concepts} concepts
              </span>
              <span className="flex items-center gap-1.5">
                <List className="w-3 h-3" />
                {card.questions} qs
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default function ExplorePage() {
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

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

    if (!isMounted) return;

    // Use requestIdleCallback for non-critical operations to avoid blocking
    const scheduleHide = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(hideSplineBranding, { timeout: 2000 });
      } else {
        setTimeout(hideSplineBranding, 100);
      }
    };

    scheduleHide();
    const timeout = setTimeout(hideSplineBranding, 1000);
    const timeout2 = setTimeout(hideSplineBranding, 3000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
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

  // Generate avatar - use photoURL first, then DiceBear, then initial
  // Memoize to prevent unnecessary recalculations
  const { photoUrl, avatarUrl, displayName, initial } = React.useMemo(() => {
    const photo = user?.photoURL || '';
    const avatar = photo || (user?.email
      ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email)}`
      : 'https://api.dicebear.com/7.x/avataaars/svg?seed=default');
    const name = user?.displayName || user?.email || 'User';
    const initialLetter = name.trim().charAt(0).toUpperCase();
    return { photoUrl: photo, avatarUrl: avatar, displayName: name, initial: initialLetter };
  }, [user?.photoURL, user?.email, user?.displayName]);

  return (
    <div className={`font-sans antialiased relative min-h-screen ${theme === 'light' ? 'bg-[#f8fafc] text-slate-900' : 'bg-background text-gray-400'} selection:bg-white/10 overflow-x-hidden`}>
      {/* Spline Background Layer - Subtle gradient overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ willChange: 'contents', transform: 'translateZ(0)' }}>
        {isMounted && (
          <div className="absolute inset-0 w-full h-full opacity-40" style={{ willChange: 'opacity', transform: 'translateZ(0)' }}>
            <spline-viewer
              url="https://prod.spline.design/x-9aG3rQoW3tfGsl/scene.splinecode"
              className="w-full h-full"
              style={{ 
                width: '100%', 
                height: '100%',
                display: 'block',
                transform: 'translateZ(0)', // Force GPU acceleration
              }}
            />
          </div>
        )}
        
        {/* Gradient overlays to make background subtle and ensure content readability */}
        <div className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${theme === 'light' ? 'from-[#f8fafc]' : 'from-background'} to-transparent pointer-events-none`} />
        <div className={`absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t ${theme === 'light' ? 'from-[#f8fafc]' : 'from-background'} to-transparent pointer-events-none`} />
        <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'light' ? 'from-[#f8fafc]/60 via-[#f8fafc]/40 to-[#f8fafc]/60' : 'from-background/60 via-background/40 to-background/60'} pointer-events-none`} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b ${theme === 'light' ? 'border-slate-200 bg-white/80 backdrop-blur-xl' : 'border-white/5 bg-background/50 backdrop-blur-xl'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <Layers className={`w-5 h-5 ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`} />
              <span className={`font-semibold tracking-tight text-[15px] ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                GetLowLevel.io
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center h-16">
              <Link
                href="/dashboard/explore"
                className={`h-full flex items-center px-1 border-b ${theme === 'light' ? 'border-slate-900 text-slate-900' : 'border-white text-gray-200'} text-[13px] font-normal mr-8 transition-colors`}
              >
                Explore
              </Link>
              <Link
                href="/dashboard/problems"
                className={`h-full flex items-center px-1 border-b border-transparent ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-gray-500 hover:text-gray-300'} text-[13px] font-normal mr-8 transition-colors`}
              >
                Problems
              </Link>
              <Link
                href="/dashboard/leaderboard"
                className={`h-full flex items-center px-1 border-b border-transparent ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-gray-500 hover:text-gray-300'} text-[13px] font-normal transition-colors`}
              >
                Leaderboard
              </Link>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <button className={`${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-gray-400 hover:text-white'} transition-colors`}>
              <Search className="w-4 h-4" />
            </button>
            <Link
              href="/dashboard/account"
              className="relative w-8 h-8 rounded-full bg-gradient-to-b from-gray-800 to-black border border-white/10 overflow-hidden shadow-inner cursor-pointer hover:border-white/30 transition-colors flex items-center justify-center"
            >
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={displayName}
                  fill
                  sizes="32px"
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              ) : avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  fill
                  sizes="32px"
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className={`text-xs font-semibold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  {initial}
                </div>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-40 pb-20 px-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-24 text-center animate-slide-up">
          <div className={`inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border ${theme === 'light' ? 'border-slate-200 bg-slate-100' : 'border-white/5 bg-white/5'} backdrop-blur-sm`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className={`text-[11px] font-medium tracking-wider uppercase ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
              Interactive Learning
            </span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-semibold tracking-tighter mb-6 drop-shadow-2xl ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            Explore the <span className={`text-transparent bg-clip-text ${theme === 'light' ? 'bg-gradient-to-r from-slate-600 to-slate-400' : 'bg-gradient-to-r from-gray-100 to-gray-500'}`}>Depths</span>
          </h1>

          <p className={`text-lg max-w-2xl mx-auto leading-relaxed font-light ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
            Master low-level programming through our curated collection of interactive challenges designed to build your understanding from the ground up.
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 perspective-container animate-fade-in" 
          style={{ animationDelay: '200ms' }}
        >
          {cards.map((card) => (
            <ExploreCard key={card.id} card={card} />
          ))}
        </div>
      </main>
    </div>
  );
}

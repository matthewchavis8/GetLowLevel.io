'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
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
  logoImage?: string;
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
  const rafRef = useRef<number | null>(null);

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    
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
  };

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
        className="group relative rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden h-[340px] bg-gradient-to-b from-card/80 to-card border border-border hover:border-border/60"
        onMouseMove={handleCardMove}
        onMouseLeave={handleCardLeave}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <div className="relative z-10 h-full flex flex-col justify-between p-8">
          <div className="flex justify-between items-start">
            <div className="max-w-[65%]">
              <div className="w-10 h-10 rounded-xl bg-accent/50 border border-border flex items-center justify-center mb-5 text-foreground shadow-inner overflow-hidden">
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
              <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
                {card.description}
              </p>
            </div>
            <span className="text-5xl font-semibold text-muted-foreground/20 tracking-tighter group-hover:text-muted-foreground/30 transition-colors duration-500">
              {card.count}
            </span>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-border mt-auto">
            <div className="flex items-center gap-4 text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
              <span className="flex items-center gap-1.5">
                <Book className="w-3 h-3" />
                {card.concepts} concepts
              </span>
              <span className="flex items-center gap-1.5">
                <List className="w-3 h-3" />
                {card.questions} qs
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-border bg-accent/50 flex items-center justify-center text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default function ExplorePage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-border bg-accent/50 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[11px] font-medium tracking-wider uppercase text-foreground">
            Interactive Learning
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6">
          Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground/80 to-foreground/40">Depths</span>
        </h1>

        <p className="text-lg max-w-2xl mx-auto leading-relaxed font-light text-muted-foreground">
          Master low-level programming through our curated collection of interactive challenges designed to build your understanding from the ground up.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card) => (
          <ExploreCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

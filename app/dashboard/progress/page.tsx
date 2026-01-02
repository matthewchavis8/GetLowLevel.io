"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Loader2, TrendingUp, Target, Zap, Award } from "lucide-react";
import Image from "next/image";

interface UserStats {
  totalCompleted: number;
  correctCount: number;
  incorrectCount: number;
  languages?: Record<string, number>;
  topics?: Record<string, number>;
}

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
}

export default function ProgressPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const targets = {
    topics: [
      { name: "Computer Architecture", total: 49 },
      { name: "Networking", total: 95 },
      { name: "Language Knowledge", total: 612 },
      { name: "Design Patterns", total: 17 },
      { name: "Concurrency", total: 45 },
      { name: "Operating Systems", total: 100 },
      { name: "Data Structures", total: 10 },
    ]
  };

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setStats(data.stats || {
          totalCompleted: 0,
          correctCount: 0,
          incorrectCount: 0,
          languages: {},
          topics: {}
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="relative">
          <Loader2 className="size-12 animate-spin text-primary" />
          <div className="absolute inset-0 animate-ping">
            <Loader2 className="size-12 text-primary/20" />
          </div>
        </div>
      </div>
    );
  }

  const displayStats = stats || {
    totalCompleted: 0,
    correctCount: 0,
    incorrectCount: 0,
    languages: {},
    topics: {}
  };

  const totalLanguages = Object.values(displayStats.languages || {}).reduce((a, b) => a + b, 0) || 1;
  const totalAttempts = displayStats.correctCount + displayStats.incorrectCount;
  const accuracy = totalAttempts > 0 
    ? Math.round((displayStats.correctCount / totalAttempts) * 100) 
    : 0;

  const languages = [
    { name: "Agnostic", color: "hsl(142, 76%, 66%)", count: displayStats.languages?.Agnostic || 0, logo: null },
    { name: "Python", color: "hsl(48, 96%, 53%)", count: displayStats.languages?.Python || 0, logo: "/PythonLogo.png" },
    { name: "C++", color: "hsl(0, 84%, 60%)", count: displayStats.languages?.Cpp || 0, logo: "/C++Logo.png" },
    { name: "Rust", color: "hsl(300, 76%, 72%)", count: displayStats.languages?.Rust || 0, logo: "/RustLogo.png" },
  ];

  let currentOffset = 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Header with gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 border border-primary/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Your Progress
          </h1>
          <p className="text-muted-foreground">
            Keep pushing forward—every question brings you closer to mastery 🚀
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          icon={<Target className="size-5" />}
          label="Total Completed"
          value={displayStats.totalCompleted}
          gradient="from-blue-500/20 to-blue-600/5"
          delay={0}
        />
        <StatsCard
          icon={<TrendingUp className="size-5" />}
          label="Accuracy"
          value={accuracy}
          suffix="%"
          gradient="from-green-500/20 to-green-600/5"
          delay={100}
        />
        <StatsCard
          icon={<Zap className="size-5" />}
          label="Correct"
          value={displayStats.correctCount}
          gradient="from-emerald-500/20 to-emerald-600/5"
          delay={200}
        />
        <StatsCard
          icon={<Award className="size-5" />}
          label="Incorrect Attempts"
          value={displayStats.incorrectCount}
          gradient="from-orange-500/20 to-orange-600/5"
          delay={300}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Animated Donut Chart */}
        <Card className="p-8 group hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border-border/50">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            Language Distribution
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative size-64">
              <svg viewBox="0 0 200 200" className="size-full -rotate-90">
                {languages.map((lang, i) => {
                  const percentage = (lang.count / totalLanguages) * 440;
                  const strokeDashoffset = -currentOffset;
                  currentOffset += percentage;
                  
                  return (
                    <circle
                      key={lang.name}
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke={lang.color}
                      strokeWidth="40"
                      strokeDasharray={`${percentage} 440`}
                      strokeDashoffset={mounted ? strokeDashoffset : -440}
                      className="transition-all duration-1000 ease-out"
                      style={{ transitionDelay: `${i * 150}ms` }}
                    />
                  );
                })}
                {totalLanguages === 1 && (
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="40"
                    opacity="0.2"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatedNumber value={displayStats.totalCompleted} className="text-5xl font-bold" />
                <div className="text-sm text-muted-foreground mt-1">Completed</div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2 text-sm">
                <div className="size-3 rounded-full" style={{ backgroundColor: lang.color }} />
                {lang.logo && (
                  <Image src={lang.logo} alt={lang.name} width={16} height={16} className="object-contain" />
                )}
                <span className="text-muted-foreground">{lang.name}</span>
                <span className="ml-auto font-medium">{lang.count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Correct vs Incorrect with animated bars */}
        <Card className="p-8 group hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border-border/50">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" />
            Success Rate
          </h3>
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Correct Answers</span>
                <AnimatedNumber value={displayStats.correctCount} className="text-2xl font-bold text-green-600 dark:text-green-400" />
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-green-500/10 border border-green-500/20">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: mounted ? `${displayStats.totalCompleted > 0 ? (displayStats.correctCount / displayStats.totalCompleted) * 100 : 0}%` : '0%' 
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Incorrect Attempts</span>
                <AnimatedNumber value={displayStats.incorrectCount} className="text-2xl font-bold text-orange-600 dark:text-orange-400" />
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-orange-500/10 border border-orange-500/20">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: mounted ? `${displayStats.totalCompleted > 0 ? (displayStats.incorrectCount / displayStats.totalCompleted) * 100 : 0}%` : '0%',
                    transitionDelay: '200ms'
                  }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Accuracy</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  <span className="text-2xl font-bold">{accuracy}%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Topic Progress with animated bars */}
      <Card className="p-8 hover:shadow-xl transition-shadow duration-500 border-border/50">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          Topic Mastery
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {targets.topics.map((topic, i) => {
            const completed = displayStats.topics?.[topic.name] || 0;
            const percentage = Math.min((completed / topic.total) * 100, 100);
            return (
              <div 
                key={topic.name} 
                className="group space-y-3 p-4 rounded-lg hover:bg-accent/5 transition-all duration-300"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {topic.name}
                  </span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {completed}/{topic.total}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: mounted ? `${percentage}%` : '0%',
                      transitionDelay: `${i * 100}ms`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function StatsCard({ 
  icon, 
  label, 
  value, 
  suffix = "", 
  gradient, 
  delay 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: number; 
  suffix?: string; 
  gradient: string; 
  delay: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Card 
      className={`p-6 bg-gradient-to-br ${gradient} border-border/50 hover:shadow-lg hover:scale-105 transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-background/50 backdrop-blur-sm">
          {icon}
        </div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <AnimatedNumber value={value} suffix={suffix} className="text-3xl font-bold" />
    </Card>
  );
}

function AnimatedNumber({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const count = useAnimatedCounter(value, 1500);
  return <div className={className}>{count}{suffix}</div>;
}


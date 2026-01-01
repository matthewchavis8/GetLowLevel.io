"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface UserStats {
  totalCompleted: number;
  correctCount: number;
  incorrectCount: number;
  languages?: Record<string, number>;
  topics?: Record<string, number>;
}

export default function ProgressPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Targets from your mock/original design
  const targets = {
    topics: [
      { name: "Computer Architecture", total: 49 },
      { name: "Networking", total: 95 },
      { name: "Language Knowledge", total: 612 },
      { name: "Design Patterns", total: 17 },
      { name: "Concurrency", total: 45 },
      { name: "Operating Systems", total: 100 },
      { name: "Data", total: 10 },
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
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
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

  // Pie chart segments logic
  const languages = [
    { name: "Agnostic", color: "hsl(142, 76%, 66%)", count: displayStats.languages?.Agnostic || 0 },
    { name: "Python", color: "hsl(48, 96%, 53%)", count: displayStats.languages?.Python || 0 },
    { name: "Cpp", color: "hsl(0, 84%, 60%)", count: displayStats.languages?.Cpp || 0 },
    { name: "Rust", color: "hsl(300, 76%, 72%)", count: displayStats.languages?.Rust || 0 },
  ];

  let currentOffset = 0;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Progress</h1>
        <p className="text-muted-foreground">
          Track your learning journey and see how you&apos;re improving in real-time.
        </p>
      </div>

      {/* Donut Chart */}
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <div className="relative size-64">
            <svg viewBox="0 0 200 200" className="size-full -rotate-90">
              {languages.map((lang) => {
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
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500"
                  />
                );
              })}
              {/* If no data, show a default gray ring */}
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
              <div className="text-5xl font-bold">{displayStats.totalCompleted}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="size-3 rounded-sm bg-[hsl(48,96%,53%)]" />
          <span className="text-sm text-muted-foreground">Python Correct</span>
          <span className="ml-2 text-sm font-medium">{displayStats.languages?.Python || 0}</span>
        </div>
      </Card>

      {/* Radar/Diamond Chart */}
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <div className="relative size-64">
            <svg viewBox="0 0 200 200" className="size-full">
              {/* Grid */}
              {[20, 45, 70].map((r, i) => (
                <polygon
                  key={i}
                  points={`${100},${r} ${200-r},${100} ${100},${200-r} ${r},${100}`}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}
              <line x1="100" y1="20" x2="100" y2="180" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.2" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.2" />
              
              {/* Actual Data Diamond (Simplified logic for now) */}
              <polygon
                points={`
                  100,${100 - (displayStats.languages?.Agnostic || 0)} 
                  ${100 + (displayStats.languages?.Rust || 0)},100 
                  100,${100 + (displayStats.languages?.Cpp || 0)} 
                  ${100 - (displayStats.languages?.Python || 0)},100
                `}
                fill="hsl(var(--primary) / 0.1)"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-xs text-muted-foreground">Agnostic</div>
            <div className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2 text-xs text-muted-foreground">Rust</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-xs text-muted-foreground">Cpp</div>
            <div className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 text-xs text-muted-foreground">Python</div>
          </div>
        </div>
      </Card>

      {/* Correct / Incorrect */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 text-center">
          <div className="text-sm font-medium text-muted-foreground mb-2">Correct</div>
          <div className="inline-flex items-center justify-center rounded-full bg-green-500/10 px-8 py-4 border border-green-500/20">
            <span className="text-4xl font-bold text-green-600 dark:text-green-400">{displayStats.correctCount}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Total correct attempts</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-sm font-medium text-muted-foreground mb-2">Incorrect</div>
          <div className="inline-flex items-center justify-center rounded-full bg-red-500/10 px-8 py-4 border border-red-500/20">
            <span className="text-4xl font-bold text-red-600 dark:text-red-400">{displayStats.incorrectCount}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Total incorrect attempts</div>
        </Card>
      </div>

      {/* Topic Progress Bars */}
      <Card className="p-6">
        <div className="space-y-6">
          {targets.topics.map((topic) => {
            const completed = displayStats.topics?.[topic.name] || 0;
            const percentage = Math.min((completed / topic.total) * 100, 100);
            return (
              <div key={topic.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {topic.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {completed}/{topic.total}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-foreground transition-all duration-500"
                    style={{ width: `${percentage}%` }}
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


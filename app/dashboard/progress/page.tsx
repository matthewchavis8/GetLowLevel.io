"use client";

import { Card } from "@/components/ui/card";

export default function ProgressPage() {
  // Mock data - replace with real user stats later
  const stats = {
    completed: 899,
    correct: 3,
    incorrect: 896,
    languages: {
      Agnostic: 450,
      Python: 150,
      Cpp: 200,
      Rust: 99,
    },
    topics: [
      { name: "Computer Architecture", completed: 45, total: 49 },
      { name: "Networking", completed: 93, total: 95 },
      { name: "Language Knowledge", completed: 593, total: 612 },
      { name: "Design Patterns", completed: 17, total: 17 },
      { name: "Concurrency", completed: 42, total: 45 },
      { name: "Operating Systems", completed: 99, total: 100 },
      { name: "Data", completed: 10, total: 10 },
    ],
  };

  const totalLanguage = Object.values(stats.languages).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Progress</h1>
        <p className="text-muted-foreground">
          Track your learning journey and see how you&apos;re improving.
        </p>
      </div>

      {/* Donut Chart */}
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <div className="relative size-64">
            <svg viewBox="0 0 200 200" className="size-full -rotate-90">
              {/* Green slice (largest) */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="hsl(142, 76%, 66%)"
                strokeWidth="40"
                strokeDasharray={`${(450 / totalLanguage) * 440} 440`}
                strokeDashoffset="0"
              />
              {/* Yellow slice */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="hsl(48, 96%, 53%)"
                strokeWidth="40"
                strokeDasharray={`${(150 / totalLanguage) * 440} 440`}
                strokeDashoffset={`-${(450 / totalLanguage) * 440}`}
              />
              {/* Red/Pink slice */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="hsl(0, 84%, 60%)"
                strokeWidth="40"
                strokeDasharray={`${(200 / totalLanguage) * 440} 440`}
                strokeDashoffset={`-${((450 + 150) / totalLanguage) * 440}`}
              />
              {/* Purple/Pink slice */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="hsl(300, 76%, 72%)"
                strokeWidth="40"
                strokeDasharray={`${(99 / totalLanguage) * 440} 440`}
                strokeDashoffset={`-${((450 + 150 + 200) / totalLanguage) * 440}`}
              />
              {/* Small blue slice */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="hsl(200, 80%, 60%)"
                strokeWidth="40"
                strokeDasharray={`${(1 / totalLanguage) * 440} 440`}
                strokeDashoffset={`-${((450 + 150 + 200 + 99) / totalLanguage) * 440}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="size-3 rounded-sm bg-[hsl(48,96%,53%)]" />
          <span className="text-sm text-muted-foreground">Medium</span>
          <span className="ml-2 text-sm font-medium">330</span>
        </div>
      </Card>

      {/* Diamond/Radar Chart */}
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <div className="relative size-64">
            <svg viewBox="0 0 200 200" className="size-full">
              {/* Background diamond grid */}
              <polygon
                points="100,20 180,100 100,180 20,100"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.3"
              />
              <polygon
                points="100,45 155,100 100,155 45,100"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.3"
              />
              <polygon
                points="100,70 130,100 100,130 70,100"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.3"
              />
              <line x1="100" y1="20" x2="100" y2="180" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.2" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.2" />
            </svg>
            {/* Labels */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-xs text-muted-foreground">
              Agnostic
            </div>
            <div className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2 text-xs text-muted-foreground">
              Rust
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-xs text-muted-foreground">
              Cpp
            </div>
            <div className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 text-xs text-muted-foreground">
              Python
            </div>
          </div>
        </div>
      </Card>

      {/* Correct / Incorrect */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 text-center">
          <div className="text-sm font-medium text-muted-foreground mb-2">Correct</div>
          <div className="inline-flex items-center justify-center rounded-full bg-green-500/10 px-8 py-4">
            <span className="text-4xl font-bold text-green-600 dark:text-green-400">{stats.correct}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Random</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-sm font-medium text-muted-foreground mb-2">Incorrect</div>
          <div className="inline-flex items-center justify-center rounded-full bg-red-500/10 px-8 py-4">
            <span className="text-4xl font-bold text-red-600 dark:text-red-400">{stats.incorrect}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Random</div>
        </Card>
      </div>

      {/* Topic Progress Bars */}
      <Card className="p-6">
        <div className="space-y-6">
          {stats.topics.map((topic) => {
            const percentage = (topic.completed / topic.total) * 100;
            return (
              <div key={topic.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {topic.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {topic.completed}/{topic.total}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-foreground transition-all"
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


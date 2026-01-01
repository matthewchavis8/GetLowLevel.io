import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const sampleTopics = [
  { title: "Memory layout & pointers", difficulty: "Medium" },
  { title: "TCP flow control", difficulty: "Hard" },
  { title: "Struct vs class", difficulty: "Easy" },
  { title: "Cache locality", difficulty: "Medium" },
];

export default function ProblemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Problems</h1>
        <p className="text-muted-foreground">
          Practice questions (this page is a placeholder — we’ll plug in your real dataset next).
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader className="border-b">
          <CardTitle>Featured</CardTitle>
          <CardDescription>Quick picks to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sampleTopics.map((t) => (
            <div
              key={t.title}
              className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="truncate font-medium">{t.title}</div>
                <div className="text-sm text-muted-foreground">
                  <Link className="hover:underline" href="/dashboard/explore">
                    Browse tracks
                  </Link>
                </div>
              </div>
              <Badge variant="outline">{t.difficulty}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}



import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuestionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Questions</h1>
        <p className="text-muted-foreground">
          Placeholder page — next step is to render your question bank here (filters, search, progress).
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader className="border-b">
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>We’ll plug in your real questions data here</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Want this to be topic-based (OS / Networking / C++ / Rust) or company-based?
        </CardContent>
      </Card>
    </div>
  );
}



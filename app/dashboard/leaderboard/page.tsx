import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = [
  { rank: 1, name: "You", score: 1280 },
  { rank: 2, name: "Grinder", score: 1214 },
  { rank: 3, name: "Struggler", score: 987 },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">
          Global rankings (placeholder UI — we’ll connect real scoring later).
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader className="border-b">
          <CardTitle>Top users</CardTitle>
          <CardDescription>Updated when new submissions land</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.rank}>
                  <TableCell className="font-medium">{r.rank}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell className="text-right">{r.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}



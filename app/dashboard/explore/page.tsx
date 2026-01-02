import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Playlist = {
  key: string;
  titleTop: string;
  titleBottom: string;
  subtitleLead: string;
  description: string;
  concepts: number;
  questions: number;
  mark: string;
};

const playlists: Playlist[] = [
  {
    key: "os25",
    titleTop: "Operating Systems",
    titleBottom: "25",
    subtitleLead: "The foremost 25 questions to get you started",
    description:
      "on your Operating Systems learning journey.",
    concepts: 3,
    questions: 25,
    mark: "OS",
  },
  {
    key: "cpp50",
    titleTop: "C++",
    titleBottom: "50",
    subtitleLead: "The 50 questions you need to ace",
    description: "if you want to call yourself a C++ developer.",
    concepts: 8,
    questions: 50,
    mark: "C++",
  },
  {
    key: "rust50",
    titleTop: "Rust",
    titleBottom: "50",
    subtitleLead: "The core Rust questions you should know",
    description: "to write safe and fast systems code.",
    concepts: 7,
    questions: 50,
    mark: "Rust",
  },
  {
    key: "python50",
    titleTop: "Python",
    titleBottom: "50",
    subtitleLead: "The internals + gotchas that matter",
    description: "when you write performance-minded Python.",
    concepts: 6,
    questions: 50,
    mark: "Py",
  },
];

function PlaylistTile({ playlist }: { playlist: Playlist }) {
  return (
    <Link
      href={`/dashboard/questions?playlist=${encodeURIComponent(playlist.key)}`}
      className="block"
    >
      <Card className="glass-card overflow-hidden rounded-2xl transition-colors hover:border-foreground/20">
        <CardContent className="p-0">
          <div className="grid gap-0 md:grid-cols-[1fr_280px]">
            <div className="p-6 md:p-8">
              <div className="text-2xl font-semibold tracking-tight md:text-3xl">
                <span className="block">{playlist.titleTop}</span>
                <span className="block">{playlist.titleBottom}</span>
              </div>

              <div className="mt-3 text-sm text-muted-foreground md:text-base">
                <span className="font-medium text-foreground/90">
                  {playlist.subtitleLead}{" "}
                </span>
                {playlist.description}
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{playlist.concepts} concepts</span>
                <span className="opacity-60">|</span>
                <span>{playlist.questions} questions</span>
              </div>
            </div>

            <div className="hidden w-[280px] border-l border-border md:block">
              <div className="relative h-full">
                <div className="absolute inset-8 rounded-2xl border border-border bg-background/10" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="select-none text-[120px] font-semibold leading-none tracking-tight text-foreground/10">
                    {playlist.mark}
                  </div>
                </div>

                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <ArrowRight className="size-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ExplorePage() {
  return (
    <div className="space-y-8">
      <div className="pt-2">
        <div className="text-sm text-muted-foreground">
          Welcome to <span className="text-foreground">GetLowLevel.io</span>
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          Explore
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
          The playlists below are logical groupings of questions that explore
          specific themes. Use them to hone-in your learning with a more
          focussed approach.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {playlists.map((p) => (
          <PlaylistTile key={p.key} playlist={p} />
        ))}
      </div>
    </div>
  );
}



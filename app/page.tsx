"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Layers, Code, DollarSign, Cpu, Zap, Target, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthButton } from "@/components/auth/AuthButton";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const navLinks = [
    { href: "#topics", label: "Topics" },
    { href: "#practice", label: "Practice" },
    { href: "#pricing", label: "Pricing" },
  ];

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      setAuthDialogOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/Soc.png" alt="GetLowLevel.io" width={56} height={56} className="object-contain" />
            <span className="text-2xl font-bold">GetLowLevel.io</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm hover:text-zinc-600 dark:hover:text-zinc-400"
              >
                {link.label}
              </a>
            ))}
            <Button className="rounded-full" size="sm" onClick={handleGetStarted}>
              Get started
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="flex items-center gap-3 text-2xl font-bold">
                <Image src="/Soc.png" alt="GetLowLevel.io" width={48} height={48} className="object-contain" />
                <span>GetLowLevel.io</span>
              </SheetTitle>
              <div className="flex flex-col gap-2 mt-8">
                <a
                  href="#topics"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 rounded-lg p-4 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <Layers className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Topics</div>
                    <div className="text-sm text-zinc-500">Core concepts</div>
                  </div>
                </a>
                
                <a
                  href="#practice"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 rounded-lg p-4 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <Code className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Practice</div>
                    <div className="text-sm text-zinc-500">Start coding</div>
                  </div>
                </a>
                
                <a
                  href="#pricing"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 rounded-lg p-4 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Pricing</div>
                    <div className="text-sm text-zinc-500">Forever free</div>
                  </div>
                </a>

                <div className="mt-6">
                  <Button
                    className="w-full rounded-full"
                    size="lg"
                    onClick={() => {
                      setOpen(false);
                      setAuthDialogOpen(true);
                    }}
                  >
                    Get started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Master low-level programming concepts
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
            Build a deep understanding of computer systems, operating systems, and performance-critical programming. 
            Practice hundreds of questions covering the fundamentals that matter.
          </p>
          <Button className="mt-8 rounded-full" size="lg" onClick={handleGetStarted}>
            Start learning for free
          </Button>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="bg-zinc-50 py-24 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Why GetLowLevel.io?</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              In the age of AI, deep systems knowledge will be the differentiator. 
              Stand out from the competition!
            </p>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-red-100 px-6 py-3 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300">
              Operating Systems
            </Badge>
            <Badge variant="secondary" className="bg-cyan-100 px-6 py-3 text-cyan-700 hover:bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-300">
              Networking
            </Badge>
            <Badge variant="secondary" className="bg-pink-100 px-6 py-3 text-pink-700 hover:bg-pink-100 dark:bg-pink-900/30 dark:text-pink-300">
              Memory Management
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 px-6 py-3 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300">
              Computer Architecture
            </Badge>
            <Badge variant="secondary" className="bg-green-100 px-6 py-3 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300">
              Concurrency
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 px-6 py-3 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300">
              System Design
            </Badge>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            <Card className="group relative overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-50 dark:from-blue-950/20 dark:to-cyan-950/20" />
              <CardHeader className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <Cpu className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">Deep Fundamentals</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Go beyond surface-level knowledge. Understand how systems really work under the hood.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50 dark:from-purple-950/20 dark:to-pink-950/20" />
              <CardHeader className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">Real Interview Questions</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Practice questions from actual technical interviews at top tech companies and trading firms.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-50 dark:from-orange-950/20 dark:to-red-950/20" />
              <CardHeader className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl">Performance Focused</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Learn to write fast, efficient code and understand the performance implications of your decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section id="practice" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Practice in your language</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Real systems programming problems. Master the concepts that interviewers actually ask.
            </p>
          </div>

          <div className="mt-12 flex justify-center gap-6">
            {/* Python */}
            <Card className="w-48 transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8">
                <Image src="/PythonLogo.png" alt="Python" width={64} height={64} className="object-contain" />
                <div className="mt-4 font-semibold">Python</div>
              </CardContent>
            </Card>

            {/* C++ */}
            <Card className="w-48 transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8">
                <Image src="/C++Logo.png" alt="C++" width={64} height={64} className="object-contain" />
                <div className="mt-4 font-semibold">C++</div>
              </CardContent>
            </Card>

            {/* Rust */}
            <Card className="w-48 transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8">
                <Image src="/RustLogo.png" alt="Rust" width={64} height={64} className="object-contain" />
                <div className="mt-4 font-semibold">Rust</div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-16 bg-zinc-50 dark:bg-zinc-900">
            <CardContent className="flex items-start gap-4 p-8">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="text-lg font-semibold">Sample Question: Cache Line Behavior</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  What is the cache line size on most modern x86-64 processors, and why does false sharing occur when multiple threads write to different variables on the same cache line?
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">How we compare</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              See what makes GetLowLevel.io different from other platforms.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <Card className="overflow-hidden border-2">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-zinc-50 to-zinc-100 hover:from-zinc-50 hover:to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 dark:hover:from-zinc-900 dark:hover:to-zinc-800">
                      <TableHead className="w-[250px] py-6 text-base font-bold">Features</TableHead>
                      <TableHead className="py-6 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="text-base font-bold text-foreground">GetLowLevel.io</div>
              
                        </div>
                      </TableHead>
                      <TableHead className="py-6 text-center text-zinc-500 dark:text-zinc-400">
                        <div className="text-base font-semibold">LeetCode</div>
                      </TableHead>
                      <TableHead className="py-6 text-center text-zinc-500 dark:text-zinc-400">
                        <div className="text-base font-semibold">HackerRank</div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                      <TableCell className="py-5 font-medium text-base">Operating Systems</TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                      <TableCell className="py-5 font-medium text-base">Computer Architecture</TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                      <TableCell className="py-5 font-medium text-base">Concurrency & Threading</TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                      <TableCell className="py-5 font-medium text-base">Systems Programming</TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                      <TableCell className="py-5 font-medium text-base">Data Structures & Algorithms</TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                      <TableCell className="py-5 font-medium text-base">Free Forever</TableCell>
                      <TableCell className="py-5 text-center">
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400">
                          Partial
                        </Badge>
                      </TableCell>
                      <TableCell className="py-5 text-center">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400">
                          Partial
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Pricing</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Complete access to all content, forever free.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <Card className="w-full max-w-md border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardHeader className="text-center">
                <Badge className="mx-auto w-fit bg-purple-600 text-white hover:bg-purple-600">
                  Forever Free
                </Badge>
                <CardTitle className="mt-6 text-6xl font-bold">$0</CardTitle>
                <CardDescription>No credit card required</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  className="w-full rounded-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                  onClick={handleGetStarted}
                >
                  Get started now
                </Button>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm">Unlimited access to all questions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm">Operating systems deep dives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm">Computer architecture concepts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm">Concurrency and threading</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm">Performance optimization techniques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm">Community support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Image src="/Soc.png" alt="GetLowLevel.io" width={40} height={40} className="object-contain" />
                <span className="text-xl font-bold">GetLowLevel.io</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Master the low-level concepts that matter.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400">About</a>
              <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400">Contact</a>
              <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400">Terms</a>
              <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400">Privacy</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-zinc-500">
            © 2025 GetLowLevel.io. All rights reserved.
          </div>
        </div>
      </footer>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
}

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/firebase/auth";
import Image from "next/image";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/Soc.png" alt="GetLowLevel.io" width={56} height={56} className="object-contain" />
            <span className="text-2xl font-bold">GetLowLevel.io</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm md:block">{user.displayName || user.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await logout();
                router.push("/");
              }}
              className="rounded-full"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex max-w-7xl items-center justify-center px-6 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">Welcome to</h1>
          <h2 className="mt-2 text-5xl font-bold tracking-tight">GetLowLevel.io</h2>
        </div>
      </main>
    </div>
  );
}


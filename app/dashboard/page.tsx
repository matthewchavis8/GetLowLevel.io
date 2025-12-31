"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/firebase/auth";
import Image from "next/image";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="text-lg text-zinc-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-white" : "bg-black"}`}>
      <header
        className={`fixed top-0 w-full z-50 border-b backdrop-blur-md ${
          theme === "light" ? "border-slate-200 bg-white/80" : "border-white/10 bg-black/70"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <Image
              src="/Soc.png"
              alt="GetLowLevel.io"
              width={56}
              height={56}
              className={`object-contain ${theme === "dark" ? "brightness-150 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" : ""}`}
            />
            <span
              className={`text-xl font-semibold tracking-tight ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              GetLowLevel.io
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`transition-colors p-2 rounded-lg ${
                theme === "light"
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            <span className={`hidden text-sm md:block ${theme === "light" ? "text-slate-700" : "text-gray-300"}`}>
              {user.displayName || user.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await logout();
                router.push("/");
              }}
              className={`rounded-full ${
                theme === "light"
                  ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  : "text-gray-200 hover:text-white hover:bg-white/5"
              }`}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex max-w-7xl items-center justify-center px-6 pt-28 pb-24">
        <div className="text-center">
          <h1 className={`text-5xl font-bold tracking-tight ${theme === "light" ? "text-slate-900" : "text-white"}`}>
            Welcome to
          </h1>
          <h2 className={`mt-2 text-5xl font-bold tracking-tight ${theme === "light" ? "text-slate-900" : "text-white"}`}>
            GetLowLevel.io
          </h2>
          <h5 className={`mt-2 text-xl font-bold tracking-tight ${theme === "light" ? "text-slate-900" : "text-white"}`}>
            (Coming soon...)
          </h5>
        </div>
      </main>
    </div>
  );
}


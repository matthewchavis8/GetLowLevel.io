"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle, signInWithGithub, logout } from "@/lib/firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const { user, loading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <Button className="rounded-full" size="sm" disabled>
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm md:block">
          {user.displayName || user.email}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="rounded-full"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      className="rounded-full" 
      size="sm" 
      onClick={handleSignIn}
      disabled={isSigningIn}
    >
      {isSigningIn ? "Signing in..." : "Get started"}
    </Button>
  );
}

interface SignInOptionsProps {
  onSignInStart?: () => void;
  onSignInSuccess?: () => void;
  onSignInError?: () => void;
}

export function SignInOptions({ onSignInStart, onSignInSuccess, onSignInError }: SignInOptionsProps = {}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInMethod, setSignInMethod] = useState<"google" | "github" | null>(null);

  useEffect(() => {
    if (user && !loading && !isSigningIn) {
      router.push("/dashboard");
    }
  }, [user, loading, isSigningIn, router]);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setSignInMethod("google");
    if (onSignInStart) {
      onSignInStart();
    }
    try {
      await signInWithGoogle();
      if (onSignInSuccess) {
        setTimeout(() => {
          onSignInSuccess();
        }, 100);
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      setIsSigningIn(false);
      setSignInMethod(null);
      if (onSignInError) {
        onSignInError();
      }
    }
  };

  const handleGithubSignIn = async () => {
    setIsSigningIn(true);
    setSignInMethod("github");
    if (onSignInStart) {
      onSignInStart();
    }
    try {
      await signInWithGithub();
      if (onSignInSuccess) {
        setTimeout(() => {
          onSignInSuccess();
        }, 100);
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      setIsSigningIn(false);
      setSignInMethod(null);
      if (onSignInError) {
        onSignInError();
      }
    }
  };

  if (loading || user) {
    return null;
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleGoogleSignIn}
        className="w-full h-11 rounded-lg border border-zinc-200 bg-white text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md hover:border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:border-zinc-700"
        size="lg"
        disabled={isSigningIn}
      >
        <div className="flex items-center justify-center gap-3">
          <svg
            className="h-5 w-5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="font-medium text-sm">
            {isSigningIn && signInMethod === "google" ? "Signing in..." : "Continue with Google"}
          </span>
        </div>
      </Button>
      <Button
        onClick={handleGithubSignIn}
        className="w-full h-11 rounded-lg border border-zinc-200 bg-white text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md hover:border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:border-zinc-700"
        size="lg"
        disabled={isSigningIn}
      >
        <div className="flex items-center justify-center gap-3">
          <Github className="h-5 w-5 flex-shrink-0" />
          <span className="font-medium text-sm">
            {isSigningIn && signInMethod === "github" ? "Signing in..." : "Continue with GitHub"}
          </span>
        </div>
      </Button>
    </div>
  );
}


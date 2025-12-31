"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SignInOptions } from "./AuthButton";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { theme } = useTheme();

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSigningIn) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md border-zinc-200 dark:border-zinc-800 p-8">
        <DialogHeader className="space-y-2 pb-8 text-center">
          <DialogTitle className={`flex items-center justify-center gap-3 text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            <Image 
              src="/Soc.png" 
              alt="GetLowLevel.io" 
              width={48} 
              height={48} 
              className={`object-contain ${theme === 'dark' ? 'brightness-150 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : ''}`}
            />
            GetLowLevel.io
          </DialogTitle>
          <DialogDescription className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white' : 'text-zinc-600'}`}>
            Sign in to start practicing low-level programming concepts
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <SignInOptions 
            onSignInStart={() => setIsSigningIn(true)}
            onSignInSuccess={() => {
              setIsSigningIn(false);
              onOpenChange(false);
            }}
            onSignInError={() => setIsSigningIn(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}


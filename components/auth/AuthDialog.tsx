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

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSigningIn) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md border-zinc-200 dark:border-zinc-800 p-8">
        <DialogHeader className="space-y-2 pb-8 text-center">
          <DialogTitle className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            GetLowLevel.io
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
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


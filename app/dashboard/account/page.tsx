"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { logout } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { AlertCircle } from "lucide-react";

// Basic profanity filter - can be expanded
const PROFANITY_LIST = [
  "fuck", "shit", "bitch", "ass", "damn", "hell", "crap", 
  "bastard", "dick", "cock", "pussy", "whore", "slut", 
  "nigger", "nigga", "fag", "faggot", "retard", "cunt"
];

const containsProfanity = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return PROFANITY_LIST.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(lowerText);
  });
};

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const email = user?.email || "";
  const photoUrl = user?.photoURL || "";

  const handleSave = async () => {
    if (!user || !displayName.trim()) {
      setError("Display name cannot be empty");
      return;
    }
    
    if (containsProfanity(displayName)) {
      setError("Derogatory words are not allowed and will result in a ban");
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      await updateProfile(user, { displayName: displayName.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update display name:", error);
      setError("Failed to update display name. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  const handleDeleteAccount = () => {
    // Placeholder for delete account functionality
    const confirmed = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      alert("Delete account functionality coming soon!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account details and preferences.
        </p>
      </div>

      <Card className="mx-auto max-w-md p-6">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative size-24 overflow-hidden rounded-full border-2 border-border bg-card">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={displayName || "Profile"}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-2xl font-semibold text-foreground">
                {(displayName || "U").trim().charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Warning Message */}
        <div className="mb-4 rounded-lg border border-orange-500/20 bg-orange-500/10 p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="size-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-orange-600 dark:text-orange-400">
              <strong>Note:</strong> Derogatory words are not allowed and will result in a ban.
            </p>
          </div>
        </div>

        {/* Display Name */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Display Name
          </label>
          {isEditing ? (
            <>
              <input
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setError("");
                }}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your display name"
              />
              {error && (
                <div className="mt-2 flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="size-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground">
              {displayName || "Not set"}
            </div>
          )}
        </div>

        {/* Email (read-only) */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Email
          </label>
          <div className="rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
            {email}
          </div>
        </div>

        {/* Edit / Save Button */}
        {isEditing ? (
          <div className="flex gap-2 mb-4">
            <Button
              variant="default"
              className="flex-1"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setIsEditing(false);
                setDisplayName(user?.displayName || "");
              }}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full mb-4"
            onClick={() => setIsEditing(true)}
          >
            Edit Display Name
          </Button>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-border" />

        {/* Account Actions */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-500/10 dark:text-red-400 dark:hover:text-red-300"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}



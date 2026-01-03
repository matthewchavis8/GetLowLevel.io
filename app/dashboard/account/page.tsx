"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { logout, syncUserToFirestore } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { AlertCircle, Github, Linkedin, Twitter, X } from "lucide-react";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { deleteUser } from "firebase/auth";

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
  
  // Privacy & Social settings
  const [showAvatar, setShowAvatar] = useState(false);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const email = user?.email || "";
  const photoUrl = user?.photoURL || "";

  // Load user settings from Firestore
  useEffect(() => {
    const loadSettings = async () => {
      if (!user) return;
      
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setShowAvatar(data.settings?.showAvatar ?? false);
          setGithub(data.socials?.github || "");
          setLinkedin(data.socials?.linkedin || "");
          setTwitter(data.socials?.twitter || "");
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoadingSettings(false);
      }
    };
    
    loadSettings();
  }, [user]);

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
      // Also update Firestore users collection
      await syncUserToFirestore(user);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update display name:", error);
      setError("Failed to update display name. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleAvatar = async () => {
    if (!user) return;
    
    const newValue = !showAvatar;
    setShowAvatar(newValue);
    
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "settings.showAvatar": newValue,
      });
    } catch (error) {
      console.error("Failed to save avatar setting:", error);
      // Revert on error
      setShowAvatar(!newValue);
      alert("Failed to save setting. Please try again.");
    }
  };

  const handleSaveSettings = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "socials.github": github.trim(),
        "socials.linkedin": linkedin.trim(),
        "socials.twitter": twitter.trim(),
      });
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (deleteConfirmText.toLowerCase() !== "yes") {
      alert('Please type "yes" to confirm deletion');
      return;
    }
    
    if (!user) return;

    setIsDeleting(true);
    
    try {
      // 1. Delete user's submissions
      const submissionsRef = collection(db, "user_submissions");
      const submissionsQuery = query(submissionsRef, where("userId", "==", user.uid));
      const submissionsSnapshot = await getDocs(submissionsQuery);
      
      const deleteSubmissions = submissionsSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deleteSubmissions);
      
      // 2. Delete user document
      const userRef = doc(db, "users", user.uid);
      await deleteDoc(userRef);
      
      // 3. Delete Firebase Authentication account
      await deleteUser(user);
      
      // 4. Redirect to home page
      router.push("/");
    } catch (error: any) {
      console.error("Error deleting account:", error);
      
      // Handle re-authentication requirement
      if (error.code === "auth/requires-recent-login") {
        alert("For security reasons, please sign out and sign back in before deleting your account.");
      } else {
        alert(`Failed to delete account: ${error.message || "Unknown error"}. Please try again or contact support.`);
      }
      
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setDeleteConfirmText("");
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account details and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <Card className="max-w-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">Profile</h2>
        
        {/* Profile Avatar with Social Links */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative size-24 overflow-hidden rounded-full border-2 border-border bg-card mb-4">
            {showAvatar && photoUrl ? (
              <Image
                src={photoUrl}
                alt={displayName || "Profile"}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <Image
                src="/blankAvatar.png"
                alt="Default avatar"
                fill
                sizes="96px"
                className="object-cover"
              />
            )}
          </div>

          {/* Social Links Below Avatar */}
          {(github || linkedin || twitter) && (
            <div className="flex items-center gap-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Github"
                >
                  <Github className="size-5" />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="size-5" />
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Twitter"
                >
                  <Twitter className="size-5" />
                </a>
              )}
            </div>
          )}

          {/* Display Profile Picture Toggle */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleToggleAvatar}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showAvatar ? "bg-primary" : "bg-muted"
              }`}
              disabled={isLoadingSettings}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showAvatar ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <label className="text-sm font-medium text-foreground cursor-pointer" onClick={handleToggleAvatar}>
              Display Profile Picture
            </label>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-1">
            Show your profile picture on leaderboards
          </p>
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
          <div className="flex gap-2">
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
            className="w-full"
            onClick={() => setIsEditing(true)}
          >
            Edit Display Name
          </Button>
        )}
      </Card>

      {/* Social Links */}
      <Card className="max-w-2xl p-6">
        <h2 className="text-xl font-semibold mb-2">Social Links</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add your social media profiles to display on your public profile
        </p>
        
        <div className="space-y-4">
          {/* GitHub */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <Github className="size-4" />
              Github
            </label>
            <input
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="https://github.com/username"
              disabled={isLoadingSettings}
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <Linkedin className="size-4" />
              LinkedIn
            </label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="https://linkedin.com/in/username"
              disabled={isLoadingSettings}
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <Twitter className="size-4" />
              Twitter
            </label>
            <input
              type="url"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="https://twitter.com/username"
              disabled={isLoadingSettings}
            />
          </div>

          <Button
            variant="default"
            className="w-full"
            onClick={handleSaveSettings}
            disabled={isSaving || isLoadingSettings}
          >
            {isSaving ? "Saving..." : "Save Social Links"}
          </Button>
        </div>
      </Card>

      {/* Account Actions */}
      <Card className="max-w-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
        
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

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setShowDeleteConfirm(false);
                setDeleteConfirmText("");
              }}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            <h3 className="text-xl font-bold mb-2 text-red-600 dark:text-red-400">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Type <span className="font-bold text-foreground">yes</span> to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="yes"
                autoFocus
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText("");
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={confirmDelete}
                disabled={deleteConfirmText.toLowerCase() !== "yes" || isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}



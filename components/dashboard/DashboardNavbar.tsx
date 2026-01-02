"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  CheckSquare2,
  PieChart,
  Settings,
  LogOut,
} from "lucide-react";

function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={[
        "text-sm font-medium transition-colors px-3 py-2 border-b-2",
        isActive
          ? "text-foreground border-foreground"
          : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/40",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={[
          "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-accent/10 text-foreground"
            : "text-muted-foreground hover:bg-accent/5 hover:text-foreground",
        ].join(" ")}
      >
        <span>{label}</span>
        <span className="text-muted-foreground">→</span>
      </Link>
    </SheetClose>
  );
}

function AvatarButton() {
  const { user } = useAuth();
  const photoUrl = user?.photoURL || "";
  const name = user?.displayName || user?.email || "Account";
  const initial = (name || "A").trim().charAt(0).toUpperCase();

  return (
    <div className="relative size-9 overflow-hidden rounded-full border border-border bg-card">
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={name}
          fill
          sizes="36px"
          className="object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center text-sm font-semibold text-foreground">
          {initial}
        </div>
      )}
    </div>
  );
}

export function DashboardNavbar() {
  const { user } = useAuth();
  const router = useRouter();
  const { toggleTheme, theme } = useTheme();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/5 hover:text-foreground md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <SheetHeader className="border-b border-border">
                <SheetTitle className="text-base">Menu</SheetTitle>
              </SheetHeader>
              <div className="p-4 space-y-2">
                <MobileNavLink href="/dashboard/explore" label="Explore" />
                <MobileNavLink href="/dashboard/problems" label="Problems" />
                <MobileNavLink href="/dashboard/leaderboard" label="Leaderboard" />
                <MobileNavLink href="/dashboard/questions" label="Questions" />

                <div className="h-px bg-border my-3" />

                <SheetClose asChild>
                  <Link
                    href="/dashboard/account"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/5"
                  >
                    <span>Account settings</span>
                    <span className="text-muted-foreground">→</span>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/dashboard/explore" className="flex items-center gap-3">
            <Image
              src="/Soc.png"
              alt="GetLowLevel.io"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-base sm:text-lg font-semibold tracking-tight">
              GetLowLevel.io
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <NavLink href="/dashboard/explore" label="Explore" />
            <NavLink href="/dashboard/problems" label="Problems" />
            <NavLink href="/dashboard/leaderboard" label="Leaderboard" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/5 hover:text-foreground"
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

          <Sheet>
            <SheetTrigger asChild>
              <button
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Open account menu"
              >
                <AvatarButton />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-full sm:max-w-md">
              <SheetHeader className="sr-only">
                <SheetTitle>Account Menu</SheetTitle>
              </SheetHeader>
              <div className="p-6">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative size-16 overflow-hidden rounded-full border-2 border-border bg-card">
                    {user?.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || "Profile"}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-xl font-semibold text-foreground">
                        {(user?.displayName || user?.email || "A")
                          .trim()
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xl font-bold text-foreground truncate">
                      {user?.displayName || "User"}
                    </div>
                  </div>
                </div>

                {/* Feature Buttons Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <SheetClose asChild>
                    <Link
                      href="/dashboard/lists"
                      className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-accent/5"
                    >
                      <CheckSquare2 className="size-6 text-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        My Lists
                      </span>
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/dashboard/progress"
                      className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-accent/5"
                    >
                      <PieChart className="size-6 text-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        Progress
                      </span>
                    </Link>
                  </SheetClose>
                </div>

                {/* Menu Items */}
                <div className="space-y-1">
                  <SheetClose asChild>
                    <Link
                      href="/dashboard/account"
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/5"
                    >
                      <Settings className="size-5 text-muted-foreground" />
                      <span>Settings</span>
                    </Link>
                  </SheetClose>

                  <button
                    onClick={async () => {
                      await logout();
                      router.push("/");
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/5"
                  >
                    <LogOut className="size-5 text-muted-foreground" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}



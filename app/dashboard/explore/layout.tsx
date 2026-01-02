import React from 'react';

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout bypasses DashboardShell to allow custom full-page design
  return <>{children}</>;
}


"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics } from "@/lib/firebase/config";

export function Analytics() {
  useEffect(() => {
    // Initialize analytics only on client side
    getFirebaseAnalytics();
  }, []);

  return null;
}


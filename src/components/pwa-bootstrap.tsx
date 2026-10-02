"use client";

import { useEffect } from "react";

export function PwaBootstrap() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((error: unknown) => {
      console.error("Unable to register the Tanglaw service worker.", error);
    });
  }, []);

  return null;
}

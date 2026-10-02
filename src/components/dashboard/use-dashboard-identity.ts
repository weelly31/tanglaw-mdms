"use client";

import { useSyncExternalStore } from "react";

const nameStorageKey = "tanglaw-user-name";
const identityChangeEvent = "tanglaw-user-change";

function subscribeToIdentity(onChange: () => void) {
  window.addEventListener(identityChangeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(identityChangeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getStoredName() {
  return window.sessionStorage.getItem(nameStorageKey)?.trim() || "Maria Reyes";
}

function getClockSnapshot() {
  const hourPart = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date()).find((part) => part.type === "hour")?.value;
  const hour = Number(hourPart);
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date()).toUpperCase();
  return `${greeting}|${dateLabel}`;
}

function subscribeToClock(onChange: () => void) {
  const interval = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(interval);
}

function getInitials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "TT";
}

export function useDashboardIdentity() {
  const name = useSyncExternalStore(subscribeToIdentity, getStoredName, () => "Maria Reyes");
  const clock = useSyncExternalStore(subscribeToClock, getClockSnapshot, () => "Good morning|");
  const [greeting, dateLabel] = clock.split("|");

  return { name, initials: getInitials(name), greeting, dateLabel };
}

export function saveDashboardName(name: string) {
  window.sessionStorage.setItem(nameStorageKey, name);
  window.dispatchEvent(new Event(identityChangeEvent));
}

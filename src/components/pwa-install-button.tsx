"use client";

import { useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/icon";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type InstallMode = "loading" | "prompt" | "ios" | "manual" | "installed";

let installPrompt: InstallPromptEvent | null = null;
let appInstalled = false;
const changeEvent = "tanglaw-install-state-change";

function notifySubscribers() {
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(onChange: () => void) {
  const onBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    installPrompt = event as InstallPromptEvent;
    notifySubscribers();
  };
  const onInstalled = () => {
    appInstalled = true;
    installPrompt = null;
    notifySubscribers();
  };

  window.addEventListener(changeEvent, onChange);
  window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  window.addEventListener("appinstalled", onInstalled);

  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.removeEventListener("appinstalled", onInstalled);
  };
}

function getInstallMode(): InstallMode {
  if (appInstalled || window.matchMedia("(display-mode: standalone)").matches) {
    return "installed";
  }
  if (installPrompt) return "prompt";
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return "ios";
  return "manual";
}

function useInstallMode() {
  return useSyncExternalStore(subscribe, getInstallMode, () => "loading");
}

export function PwaInstallButton() {
  const mode = useInstallMode();
  const [helpOpen, setHelpOpen] = useState(false);
  const [error, setError] = useState("");

  async function installApp() {
    setError("");
    if (!installPrompt) return;

    const prompt = installPrompt;
    installPrompt = null;
    notifySubscribers();

    try {
      await prompt.prompt();
      await prompt.userChoice;
    } catch (error) {
      setError("Installation could not start. Try your browser's menu to install the app.");
      console.error("Unable to show the Tanglaw installation prompt.", error);
    } finally {
      notifySubscribers();
    }
  }

  if (mode === "loading" || mode === "installed") return null;

  return (
    <>
      <button className="pwa-install-button" type="button" onClick={mode === "prompt" ? installApp : () => {
        setError("");
        setHelpOpen(true);
      }}>
        <Icon name="download" size={15} />
        <span>Install app</span>
      </button>
      {helpOpen && mode !== "prompt" && (
        <div className="pwa-install-help" role="dialog" aria-modal="true" aria-labelledby="install-app-title">
          <button className="pwa-install-dismiss" type="button" aria-label="Close install instructions" onClick={() => setHelpOpen(false)}>×</button>
          <strong id="install-app-title">Add Tanglaw to your home screen</strong>
          {mode === "ios"
            ? <p>In Safari, tap <b>Share</b>, then choose <b>Add to Home Screen</b>.</p>
            : <p>Open your browser menu and choose <b>Install app</b> or <b>Add to Home Screen</b>.</p>}
        </div>
      )}
      {error && <span className="pwa-install-error" role="alert">{error}</span>}
    </>
  );
}

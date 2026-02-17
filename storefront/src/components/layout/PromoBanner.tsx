"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "glowreajo-promo-dismissed";
const BANNER_HEIGHT = "36px";

export function PromoBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setDismissed(false);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--promo-banner-height",
      dismissed ? "0px" : BANNER_HEIGHT,
    );
  }, [dismissed]);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-60 bg-linear-to-r from-primary to-secondary text-white text-center text-sm py-2 px-8"
        style={{ height: BANNER_HEIGHT }}>
        <span className="font-medium">
          Use code <strong>WELCOME10</strong> for 10% off your first order!
        </span>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss promo banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div style={{ height: BANNER_HEIGHT }} />
    </>
  );
}

"use client";

import { Check, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function SiteToast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      const detail = event.detail || {};
      setToast({ message: detail.message || "Saved", type: detail.type || "success" });
      window.clearTimeout(window.__moveoToastTimer);
      window.__moveoToastTimer = window.setTimeout(() => setToast(null), 2600);
    };
    window.addEventListener("moveo-toast", handler);
    return () => {
      window.removeEventListener("moveo-toast", handler);
      window.clearTimeout(window.__moveoToastTimer);
    };
  }, []);

  if (!toast) return null;
  return (
    <div className="site-toast" role="status" aria-live="polite">
      <span className="toast-icon">{toast.type === "success" ? <Check size={15} /> : <Info size={15} />}</span>
      <span>{toast.message}</span>
      <button type="button" onClick={() => setToast(null)} aria-label="Dismiss"><X size={14} /></button>
    </div>
  );
}

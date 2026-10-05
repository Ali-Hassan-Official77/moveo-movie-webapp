"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function TrailerButton({ youtubeKey }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return undefined; const onKey = (e) => e.key === "Escape" && setOpen(false); window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [open]);
  if (!youtubeKey) return null;
  return <><button type="button" onClick={() => setOpen(true)} className="btn-primary"><Play size={15} fill="currentColor" /> Watch trailer</button><AnimatePresence>{open && <motion.div className="trailer-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setOpen(false)}><motion.div className="trailer-dialog" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }} onMouseDown={(e) => e.stopPropagation()}><button type="button" className="trailer-close" onClick={() => setOpen(false)} aria-label="Close trailer"><X /></button><iframe src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`} title="Movie trailer" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></motion.div></motion.div>}</AnimatePresence></>;
}

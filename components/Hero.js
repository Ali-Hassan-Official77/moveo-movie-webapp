"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play, Star, Clock, Film } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { tmdbImage } from "@/lib/tmdb";
import { formatRating, formatYear } from "@/lib/utils";
import LikeButton from "@/components/LikeButton";

export default function Hero({ movies = [] }) {
  const reduced = useReducedMotion();
  const slides = useMemo(
    () => movies.filter((m) => m?.backdrop_path || m?.poster_path).slice(0, 6),
    [movies]
  );
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const movie = slides[active];

  // Auto-advance with progress bar
  useEffect(() => {
    if (reduced || slides.length < 2) return undefined;
    const DURATION = 7000;
    const start = Date.now();
    const tick = setInterval(() => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      setProgress(p);
      if (p >= 1) {
        setActive((v) => (v + 1) % slides.length);
        setProgress(0);
      }
    }, 40);
    return () => clearInterval(tick);
  }, [reduced, slides.length, active]);

  if (!movie) {
    return (
      <section className="spot-shell spot-empty">
        <div className="spot-fallback">
          <Film size={28} />
          <span>THE PROJECTOR IS WARMING UP</span>
          <h1>Stories are loading…</h1>
        </div>
      </section>
    );
  }

  const backdrop = tmdbImage(movie.backdrop_path, "original");
  const poster = tmdbImage(movie.poster_path, "w500");
  const runtime = movie.runtime ? `${movie.runtime} MIN` : "FEATURE FILM";
  const timecode = String(active + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");

  return (
    <section className="spot-shell">
      {/* ─── Background backdrop with ken-burns ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${movie.id}`}
          className="spot-bg"
          initial={{ opacity: 0, scale: reduced ? 1 : 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {backdrop && <img src={backdrop} alt="" fetchPriority="high" />}
        </motion.div>
      </AnimatePresence>

      {/* ─── Spotlight beam that shifts with active slide ─── */}
      <div className="spot-beam" aria-hidden="true" />
      <div className="spot-grid" aria-hidden="true" />
      <div className="spot-vignette" aria-hidden="true" />

      {/* ─── Vertical "NOW SHOWING" side rail ─── */}
      <div className="spot-rail" aria-hidden="true">
        <span>NOW SHOWING</span>
        <i />
        <span>{timecode}</span>
      </div>

      <div className="spot-inner">
        {/* ─── LEFT: Film-strip poster card ─── */}
        <div className="spot-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={`poster-${movie.id}`}
              className="spot-poster"
              initial={{ opacity: 0, x: reduced ? 0 : -30, rotateY: reduced ? 0 : -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: reduced ? 0 : -20 }}
              transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Sprocket holes top */}
              <div className="spot-sprockets" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => <span key={i} />)}
              </div>

              <div className="spot-poster-img">
                {poster ? (
                  <img src={poster} alt={`${movie.title} poster`} />
                ) : (
                  <div className="spot-poster-fallback">MOVEO</div>
                )}
                <div className="spot-poster-shine" aria-hidden="true" />
              </div>

              {/* Sprocket holes bottom */}
              <div className="spot-sprockets" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => <span key={i} />)}
              </div>

              <div className="spot-poster-label">
                <span>REEL {String(active + 1).padStart(2, "0")}</span>
                <span>TMDB</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── RIGHT: Content block ─── */}
        <div className="spot-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${movie.id}`}
              className="spot-copy"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -16 }}
              transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="spot-kicker">
                <span className="spot-dot" />
                FEATURED PRESENTATION
                <span className="spot-kicker-rule" />
              </div>

              <h1 className="spot-title">{movie.title}</h1>

              <div className="spot-meta">
                <span className="spot-meta-item">
                  <Star size={13} fill="currentColor" />
                  {formatRating(movie.vote_average)}
                </span>
                <span className="spot-meta-divider" />
                <span className="spot-meta-item">{formatYear(movie.release_date)}</span>
                <span className="spot-meta-divider" />
                <span className="spot-meta-item">
                  <Clock size={13} />
                  {runtime}
                </span>
              </div>

              <p className="spot-desc">
                {movie.overview || "A story worth giving your screen to."}
              </p>

              <div className="spot-actions">
                <Link href={`/movie/${movie.id}`} className="spot-btn-primary">
                  <Play size={15} fill="currentColor" />
                  Watch Trailer
                  <ArrowUpRight size={15} />
                </Link>
                <LikeButton movie={movie} showLabel className="spot-btn-ghost" />
              </div>

              <div className="spot-footnote">
                <span>CURATED FROM TMDB</span>
                <i />
                <span>UPDATED WEEKLY</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Bottom: Film-reel selector with progress ─── */}
      <div className="spot-reel" role="tablist" aria-label="Featured films">
        {slides.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActive(index);
                setProgress(0);
              }}
              className={`spot-reel-item ${isActive ? "active" : ""}`}
            >
              <div className="spot-reel-thumb">
                <img
                  src={tmdbImage(item.poster_path, "w200")}
                  alt=""
                  loading="lazy"
                />
                <div className="spot-reel-overlay" />
                {isActive && (
                  <motion.div
                    className="spot-reel-progress"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: reduced ? 1 : progress }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                )}
              </div>
              <div className="spot-reel-info">
                <span className="spot-reel-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <b>{item.title}</b>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
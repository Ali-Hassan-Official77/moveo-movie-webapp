"use client";

import { useEffect, useState } from "react";

const KEY = "moveo-watchlist";

export function getWatchlist() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function isInWatchlist(id) {
  return getWatchlist().some((movie) => String(movie.id) === String(id));
}

export function toggleWatchlist(movie) {
  const list = getWatchlist();
  const exists = list.some((item) => String(item.id) === String(movie.id));
  const next = exists
    ? list.filter((item) => String(item.id) !== String(movie.id))
    : [...list, {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
      }];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("moveo-watchlist-change"));
  return !exists;
}

export default function LikeButton({ movie, className = "", showLabel = false }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const sync = () => setLiked(isInWatchlist(movie.id));
    sync();
    window.addEventListener("moveo-watchlist-change", sync);
    return () => window.removeEventListener("moveo-watchlist-change", sync);
  }, [movie.id]);

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const result = toggleWatchlist(movie);
    setLiked(result);
    window.dispatchEvent(new CustomEvent("moveo-toast", {
      detail: { message: result ? `${movie.title} added to your watchlist` : `${movie.title} removed from your watchlist` },
    }));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={liked ? `Remove ${movie.title} from watch list` : `Add ${movie.title} to watch list`}
      title={liked ? "Remove from watch list" : "Add to watch list"}
      className={`watch-heart ${liked ? "is-liked" : ""} ${showLabel ? "watch-heart-labeled" : ""} ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 3.5C6 2.672 6.672 2 7.5 2h9c.828 0 1.5.672 1.5 1.5V21l-6-3.5L6 21V3.5Z" />
      </svg>
      {showLabel && <span>{liked ? "Saved" : "Watchlist"}</span>}
    </button>
  );
}

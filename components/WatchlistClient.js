"use client";

import Link from "next/link";
import { Bookmark, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { getWatchlist } from "@/components/LikeButton";

export default function WatchlistClient() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const sync = () => setMovies(getWatchlist());
    sync();
    window.addEventListener("moveo-watchlist-change", sync);
    return () => window.removeEventListener("moveo-watchlist-change", sync);
  }, []);
  return <main className="page-shell"><div className="page-wrap"><div className="page-kicker"><Bookmark size={14} /> PERSONAL LIBRARY</div><h1 className="page-title">Your watchlist.</h1><p className="page-subtitle">Keep the stories you want close. Your list stays on this device.</p>{movies.length ? <div className="movie-grid mt-10">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div> : <div className="empty-watch"><div className="empty-icon"><Bookmark size={22} /></div><h2>Your list is waiting.</h2><p>Save a film from any card and it will appear here.</p><Link href="/" className="btn-primary"><Compass size={16} /> Discover films</Link></div>}</div></main>;
}

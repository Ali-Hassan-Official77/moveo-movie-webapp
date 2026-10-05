"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { tmdbImage } from "@/lib/tmdb";
import { formatRating, formatYear } from "@/lib/utils";
import LikeButton from "@/components/LikeButton";

export default function MovieCard({ movie, priority = false, className = "" }) {
  const reduced = useReducedMotion();
  const poster = tmdbImage(movie.poster_path, "w500");
  return (
    <motion.article whileHover={reduced ? undefined : { y: -7 }} transition={{ duration: .28 }} className={`movie-card ${className}`}>
      <Link href={`/movie/${movie.id}`} className="movie-card-link group">
        <div className="movie-poster">
          {poster ? <img src={poster} alt={`${movie.title} poster`} loading={priority ? "eager" : "lazy"} /> : <div className="poster-fallback">MOVEO</div>}
          <div className="poster-overlay" />
          <div className="poster-rating"><Star size={11} fill="currentColor" /> {formatRating(movie.vote_average)}</div>
          <LikeButton movie={movie} className="poster-save" />
          <span className="poster-open"><span>View film</span><Star size={11} /></span>
        </div>
        <div className="movie-card-info"><h3>{movie.title}</h3><p><span>{formatYear(movie.release_date)}</span><i /> <span>Film</span></p></div>
      </Link>
    </motion.article>
  );
}

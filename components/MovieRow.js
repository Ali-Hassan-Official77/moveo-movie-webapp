"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import MovieCard from "@/components/MovieCard";
import Reveal from "@/components/Reveal";

export default function MovieRow({ title, subtitle, movies, priority = false }) {
  const ref = useRef(null);
  if (!movies?.length) return null;
  const move = (direction) => ref.current?.scrollBy({ left: direction * Math.max(ref.current.clientWidth * .72, 520), behavior: "smooth" });
  return (
    <section className="movie-section">
      <Reveal className="section-wrap">
        <div className="section-heading-main"><div><div className="section-eyebrow"><span /> CURATED SCREEN</div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><div className="row-controls"><button type="button" onClick={() => move(-1)} aria-label={`Previous ${title}`}><ChevronLeft size={16} /></button><button type="button" onClick={() => move(1)} aria-label={`Next ${title}`}><ChevronRight size={16} /></button></div></div>
      </Reveal>
      <div className="row-viewport" ref={ref}>{movies.map((movie, index) => <div className="row-item" key={movie.id}><MovieCard movie={movie} priority={priority && index < 4} /></div>)}</div>
    </section>
  );
}

"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import MovieCard from "@/components/MovieCard";

export default function MovieGrid({ initialMovies = [], totalPages = 0, fetchUrl }) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadMore() {
    if (loading || page >= totalPages) return;
    setLoading(true); setError("");
    try {
      const nextPage = page + 1;
      const separator = fetchUrl.includes("?") ? "&" : "?";
      const response = await fetch(`${fetchUrl}${separator}page=${nextPage}`);
      if (!response.ok) throw new Error("Could not load more films.");
      const data = await response.json();
      setMovies((prev) => [...prev, ...(data.results || [])]);
      setPage(nextPage);
    } catch (e) { setError(e.message || "Something went wrong."); }
    finally { setLoading(false); }
  }

  if (!movies.length) return <p className="page-subtitle" style={{ textAlign: "center", padding: "70px 0" }}>Nothing turned up. Try another title or genre.</p>;
  return <div><div className="movie-grid">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>{error && <p className="page-subtitle" style={{ textAlign: "center", marginTop: 18 }}>{error}</p>}{page < totalPages && <div style={{ display: "flex", justifyContent: "center", marginTop: 42 }}><button type="button" onClick={loadMore} disabled={loading} className="btn-secondary">{loading && <Loader2 size={14} className="search-spinner" />}{loading ? "Loading films" : "Load more films"}</button></div>}</div>;
}

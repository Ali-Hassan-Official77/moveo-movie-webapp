"use client";

import { Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";

export default function SearchBar({ autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const onOutside = (event) => { if (ref.current && !ref.current.contains(event.target)) setOpen(false); };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  useEffect(() => {
    const value = query.trim();
    if (!value) { setResults([]); setLoading(false); return undefined; }
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`, { signal: controller.signal });
        const data = await res.json();
        setResults((data.results || []).slice(0, 6));
      } catch (error) {
        if (error.name !== "AbortError") setResults([]);
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }, 280);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);

  function submit(event) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <div className="search-wrap" ref={ref}>
      <form onSubmit={submit} role="search">
        <Search size={15} aria-hidden="true" />
        <input autoFocus={autoFocus} value={query} onChange={(e) => { setQuery(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} placeholder="Search films, stories..." aria-label="Search films" />
        {loading && <Loader2 size={14} className="search-spinner" aria-hidden="true" />}
      </form>
      {open && query.trim() && (
        <div className="search-dropdown">
          {results.length ? <ul>{results.map((movie) => <li key={movie.id}><button type="button" onClick={() => { setQuery(""); setOpen(false); router.push(`/movie/${movie.id}`); }}><span className="search-poster">{movie.poster_path && <img src={tmdbImage(movie.poster_path, "w92")} alt="" />}</span><span><b>{movie.title}</b><small>{formatYear(movie.release_date)}</small></span></button></li>)}</ul> : !loading ? <p className="search-empty">No films found for “{query}”.</p> : null}
          {results.length > 0 && <button className="search-all" type="button" onClick={submit}>View all results <span>↗</span></button>}
        </div>
      )}
    </div>
  );
}

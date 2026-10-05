import { tmdb } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ searchParams }) { const q = searchParams?.q || ""; return { title: q ? `Search: ${q} — MOVEO` : "Search — MOVEO" }; }

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q?.trim() || "";
  const data = query ? await tmdb.search(query, 1) : { results: [], total_pages: 0, total_results: 0 };
  return <div className="page-shell"><div className="page-wrap"><div className="page-kicker">SEARCH THE CATALOGUE</div><h1 className="page-title">{query ? <>Results for <em>“{query}”</em></> : "Find your next film."}</h1><p className="page-subtitle">{query ? `${data.total_results || data.results?.length || 0} films found` : "Search from the MOVEO movie catalogue using the bar above."}</p>{query && <div className="mt-10"><MovieGrid initialMovies={data.results || []} totalPages={data.total_pages || 0} fetchUrl={`/api/search?q=${encodeURIComponent(query)}`} /></div>}</div></div>;
}

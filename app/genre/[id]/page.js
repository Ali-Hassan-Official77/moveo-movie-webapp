import { tmdb } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function GenrePage({ params }) {
  const [genres, movies] = await Promise.all([tmdb.genres(), tmdb.byGenre(params.id, 1)]);
  const genreName = genres?.genres?.find((genre) => String(genre.id) === String(params.id))?.name || "Films";
  return <div className="page-shell"><div className="page-wrap"><div className="page-kicker">GENRE / {genreName.toUpperCase()}</div><h1 className="page-title">{genreName}<em> films.</em></h1><p className="page-subtitle">A focused selection of stories from this corner of cinema.</p><div className="mt-10"><MovieGrid initialMovies={movies?.results || []} totalPages={movies?.total_pages || 0} fetchUrl={`/api/genre/${params.id}`} /></div></div></div>;
}

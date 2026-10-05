import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import { tmdb } from "@/lib/tmdb";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

export default async function HomePage() {
  const [trending, popular, topRated, upcoming, nowPlaying] = await Promise.all([
    tmdb.trending("week"),
    tmdb.popular(),
    tmdb.topRated(),
    tmdb.upcoming(),
    tmdb.nowPlaying(),
  ]);

  return <><Hero movies={trending?.results || []} /><div className="home-content">
    <MovieRow title="The week's signal" subtitle="What audiences are moving toward right now" movies={trending?.results} priority />
    <MovieRow title="In the spotlight" subtitle="Fresh releases with a reason to be on your screen" movies={nowPlaying?.results} />
    <MovieRow title="The long-standing greats" subtitle="Highest-rated stories in the MOVEO catalogue" movies={topRated?.results} />
    <MovieRow title="Everyone's watching" subtitle="Popular films creating the most momentum" movies={popular?.results} />
    <MovieRow title="Coming into focus" subtitle="Upcoming releases worth keeping on your radar" movies={upcoming?.results} />
  </div></>;
}

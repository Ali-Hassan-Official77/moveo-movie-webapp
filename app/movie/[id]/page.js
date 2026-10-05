import { notFound } from "next/navigation";
import { Calendar, Camera, Clock, UserRound } from "lucide-react";
import { tmdb, tmdbImage } from "@/lib/tmdb";
import { findCertification, findTrailer, formatRating, formatRuntime, formatYear } from "@/lib/utils";
import MovieRow from "@/components/MovieRow";
import RatingBadge from "@/components/RatingBadge";
import TrailerButton from "@/components/TrailerButton";
import LikeButton from "@/components/LikeButton";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

export async function generateMetadata({ params }) {
  try { const movie = await tmdb.details(params.id); return { title: `${movie.title || "Movie"} — MOVEO`, description: movie.overview?.slice(0, 155) }; }
  catch { return { title: "Movie — MOVEO" }; }
}

export default async function MovieDetailPage({ params }) {
  let movie;
  try { movie = await tmdb.details(params.id); } catch { notFound(); }
  if (!movie?.id || movie?.success === false) notFound();

  const backdrop = tmdbImage(movie.backdrop_path, "original");
  const poster = tmdbImage(movie.poster_path, "w500");
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const director = movie.credits?.crew?.find((person) => person.job === "Director");
  const trailerKey = findTrailer(movie.videos);
  const certification = findCertification(movie.release_dates);
  const screenshots = (movie.images?.backdrops || []).filter((item) => item.file_path !== movie.backdrop_path).slice(0, 10);

  return <div className="detail-page">
    <section className="detail-backdrop">{backdrop && <img src={backdrop} alt="" fetchPriority="high" />}</section>
    <div className="detail-wrap">
      <Reveal className="detail-main">
        <div className="detail-poster">{poster ? <img src={poster} alt={`${movie.title} poster`} /> : <div className="poster-fallback">MOVEO</div>}</div>
        <div className="detail-copy">
          {movie.tagline && <p className="detail-tagline">{movie.tagline}</p>}
          <h1>{movie.title}</h1>
          <div className="detail-meta"><RatingBadge value={movie.vote_average} size="lg" /><span><Calendar size={13} /> {formatYear(movie.release_date)}</span>{movie.runtime && <span><Clock size={13} /> {formatRuntime(movie.runtime)}</span>}{certification && <span>{certification}</span>}</div>
          <div className="genre-pills">{movie.genres?.map((genre) => <span key={genre.id}>{genre.name}</span>)}</div>
          <p className="detail-overview">{movie.overview || "No synopsis is available for this title yet."}</p>
          {director && <p className="director">Directed by <b>{director.name}</b></p>}
          <div className="detail-actions"><TrailerButton youtubeKey={trailerKey} /><LikeButton movie={movie} showLabel className="btn-secondary" /></div>
        </div>
      </Reveal>

      {screenshots.length > 0 && <Reveal className="detail-section" delay={.05}><div className="section-heading"><span><Camera size={14} /> VISUAL ARCHIVE</span><p>Selected stills from the film</p></div><div className="screenshot-grid">{screenshots.map((shot, index) => <div className={`shot shot-${index % 4}`} key={shot.file_path}><img src={tmdbImage(shot.file_path, "w780")} alt={`${movie.title} still ${index + 1}`} loading="lazy" /></div>)}</div></Reveal>}

      {cast.length > 0 && <Reveal className="detail-section"><div className="section-heading"><span><UserRound size={14} /> CAST</span><p>The people behind the story</p></div><div className="cast-grid">{cast.map((person) => <div key={person.credit_id || person.id}><div className="cast-img">{person.profile_path ? <img src={tmdbImage(person.profile_path, "w342")} alt={person.name} loading="lazy" /> : <span>—</span>}</div><b>{person.name}</b><small>{person.character}</small></div>)}</div></Reveal>}
    </div>
    <MovieRow title="More like this" subtitle="Continue the story" movies={movie.similar?.results} />
  </div>;
}

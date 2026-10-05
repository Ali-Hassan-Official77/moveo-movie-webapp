import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Logo /><p>A premium movie discovery experience designed around the stories worth remembering.</p><span>DISCOVER · SAVE · REPEAT</span></div>
        <div><p className="footer-label">Explore</p><div className="footer-links"><Link href="/">Discover</Link><Link href="/watchlist">My Watchlist</Link><Link href="/genre/28">Action</Link><Link href="/genre/18">Drama</Link></div></div>
        <div><p className="footer-label">Company</p><div className="footer-links"><span>Movie discovery platform</span><span>Built for every screen</span><a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">Movie data by TMDB ↗</a></div></div>
      </div>
      <div className="footer-legal"><span>© {new Date().getFullYear()} MOVEO. All rights reserved.</span><span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span></div>
    </footer>
  );
}

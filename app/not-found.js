import Link from "next/link";

export default function NotFound() {
  return <div className="page-shell"><div className="page-wrap" style={{ textAlign: "center", maxWidth: 720 }}><div className="page-kicker" style={{ justifyContent: "center" }}>INTERMISSION</div><h1 className="page-title">Scene not found.</h1><p className="page-subtitle">This film or page is no longer on the reel. Head back to MOVEO and choose another story.</p><Link href="/" className="btn-primary" style={{ marginTop: 25 }}>Back to MOVEO</Link></div></div>;
}

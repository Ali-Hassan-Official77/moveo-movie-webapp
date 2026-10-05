"use client";

export default function Error({ reset }) {
  return <div className="page-shell"><div className="page-wrap" style={{ textAlign: "center", maxWidth: 700 }}><div className="page-kicker" style={{ justifyContent: "center" }}>TEMPORARY INTERRUPTION</div><h1 className="page-title">The reel paused.</h1><p className="page-subtitle">Something interrupted this scene. Try again and MOVEO will pick up where it left off.</p><button type="button" className="btn-primary" style={{ marginTop: 25 }} onClick={() => reset()}>Reload experience</button></div></div>;
}

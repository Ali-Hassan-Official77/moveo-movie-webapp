export default function Loading() {
  return <div className="page-shell"><div className="page-wrap"><div className="skeleton-kicker" /><div className="skeleton-title" /><div className="skeleton-copy" /><div className="skeleton-grid">{Array.from({ length: 10 }).map((_, i) => <div className="skeleton-card" key={i}><span /></div>)}</div></div></div>;
}

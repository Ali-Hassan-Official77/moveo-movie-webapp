import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`moveo-logo group ${className}`} aria-label="MOVEO home">
      <span className="moveo-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="25" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
          <circle cx="28" cy="28" r="20" stroke="currentColor" strokeWidth="1.2" opacity=".25" />
          <path d="M14 35V20l9 9 10-12 9 18" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 16c4 1.5 6 3.5 8 6M45 40c-4-1.5-6-3.5-8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".75" />
        </svg>
      </span>
      <span className="moveo-wordmark">
        <strong>MOVEO</strong>
        <small>EXPERIENCE INFINITE STORIES</small>
      </span>
    </Link>
  );
}

"use client";

import { Bookmark, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  ["Discover", "/"],
  ["Action", "/genre/28"],
  ["Comedy", "/genre/35"],
  ["Drama", "/genre/18"],
  ["Horror", "/genre/27"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <div className="nav-search"><SearchBar /></div>
          <ThemeToggle />
          <Link href="/watchlist" className="watch-nav" aria-label="Open watchlist"><Bookmark size={16} /><span>Watchlist</span></Link>
        </div>
        <button className="mobile-menu-button" type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="mobile-menu">
          <SearchBar />
          <div className="mobile-theme-row"><span>Appearance</span><ThemeToggle /></div>
          {links.map(([label, href]) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>)}
          <Link href="/watchlist" className="mobile-watch"><Bookmark size={16} /> My Watchlist</Link>
        </div>
      )}
    </header>
  );
}

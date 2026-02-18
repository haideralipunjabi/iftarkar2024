"use client";
import Image from "next/image";
import logo from "@/public/logo_horizontal.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-4 sm:px-8 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <nav
        className="mx-auto max-w-xl rounded-2xl border border-border bg-card/90 shadow-card-hover backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 max-w-xl px-4 ${
            scrolled
              ? "py-2"
              : "py-3"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-6 md:h-7" : "h-8 md:h-10"
              }`}
              src={logo}
              alt="Iftarkar Logo"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 sm:flex">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-secondary transition-colors hover:bg-bg-warm hover:text-ink"
            >
              <FontAwesomeIcon icon={faHome} className="w-3.5" />
              Home
            </Link>
            <Link
              href="https://haider.id/namazpar"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-secondary transition-colors hover:bg-bg-warm hover:text-ink"
            >
              <FontAwesomeIcon icon={faMobileAlt} className="w-3.5" />
              NamazPar App
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-secondary transition-colors hover:bg-bg-warm sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <FontAwesomeIcon
              icon={menuOpen ? faTimes : faBars}
              className="text-lg"
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-border-light bg-card px-4 py-3 sm:hidden">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-bg-warm hover:text-ink"
              >
                <FontAwesomeIcon icon={faHome} className="w-4" />
                Home
              </Link>
              <Link
                href="https://haider.id/namazpar"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-bg-warm hover:text-ink"
              >
                <FontAwesomeIcon icon={faMobileAlt} className="w-4" />
                Download NamazPar App
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

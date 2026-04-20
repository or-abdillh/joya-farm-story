import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const hashNavLinks = [
  { label: "Tentang", href: "#about" },
  { label: "Produk", href: "#products" },
  { label: "Cara Pesan", href: "#how-to-order" },
  { label: "Testimoni", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const WA_LINK = "https://wa.me/6285291822522";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup mobile menu saat pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /**
   * Untuk hash links: jika di homepage pakai #hash langsung,
   * jika di halaman lain pakai /#hash agar kembali ke homepage dulu.
   */
  const resolveHref = (hash: string) => (isHomePage ? hash : `/${hash}`);

  // Apakah navbar perlu tampil dengan background?
  // Di halaman non-homepage, selalu tampilkan background
  const hasBackground = scrolled || !isHomePage;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasBackground
          ? "bg-background/90 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Joya Land" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {hashNavLinks.map((l) => (
            <a
              key={l.href}
              href={resolveHref(l.href)}
              className={`text-sm font-medium transition-colors ${
                hasBackground
                  ? "text-foreground/80 hover:text-primary"
                  : "text-background/80 hover:text-background"
              }`}
            >
              {l.label}
            </a>
          ))}

          {/* Link Artikel — React Router Link */}
          <Link
            to="/articles"
            className={`text-sm font-medium transition-colors ${
              hasBackground
                ? location.pathname.startsWith("/articles")
                  ? "text-primary font-semibold"
                  : "text-foreground/80 hover:text-primary"
                : "text-background/80 hover:text-background"
            }`}
          >
            Artikel
          </Link>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lime text-lime-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
          >
            Chat WhatsApp
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 ${hasBackground ? "text-foreground" : "text-background"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border pb-4">
          {hashNavLinks.map((l) => (
            <a
              key={l.href}
              href={resolveHref(l.href)}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-medium text-foreground/80 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/articles"
            onClick={() => setOpen(false)}
            className={`block px-6 py-3 text-sm font-medium transition-colors ${
              location.pathname.startsWith("/articles")
                ? "text-primary font-semibold"
                : "text-foreground/80 hover:text-primary"
            }`}
          >
            Artikel
          </Link>
          <div className="px-6 pt-2">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-lime text-lime-foreground px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

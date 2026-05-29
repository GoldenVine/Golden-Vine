import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { SiInstagram, SiFacebook } from "react-icons/si";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/piercings", label: "Piercings" },
    { href: "/aftercare", label: "Aftercare" },
    { href: "/jewellery", label: "Jewellery" },
    { href: "/bvla", label: "BVLA Creations" },
    { href: "/booking", label: "Online Booking & Policies" },
    { href: "/faqs", label: "FAQs" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 shadow-sm" style={{ background: "#fffae7" }}>
        {/* Logo banner */}
        <Link href="/" className="w-full flex items-center justify-center no-underline hover:no-underline" style={{ background: "#fffae7" }}>
          <img
            src="/images/logo.jpg"
            alt="Golden Vine Piercing"
            className="w-full h-auto max-h-24 object-contain"
            onError={(e) => {
              const t = e.currentTarget;
              t.style.display = "none";
              const fallback = t.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <span
            className="font-serif text-3xl font-bold tracking-widest text-foreground h-20 items-center justify-center"
            style={{ display: "none" }}
          >
            GOLDEN VINE
          </span>
        </Link>

        {/* Desktop nav links — same cream background */}
        <div
          className="hidden md:flex flex-row items-center justify-center flex-wrap gap-x-6 gap-y-1 py-2 w-full border-t border-foreground/10"
          style={{ background: "#fffae7" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif uppercase text-sm font-semibold tracking-wider text-foreground hover:text-[#526545] no-underline transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-4 ml-2">
            <a
              href="https://www.instagram.com/goldenvinepiercing"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-foreground hover:text-[#526545] no-underline"
            >
              <SiInstagram className="w-5 h-5 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61577137506030"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-foreground hover:text-[#526545] no-underline"
            >
              <SiFacebook className="w-5 h-5 hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-5 z-50 p-2 text-foreground bg-transparent border-none"
        aria-label="Toggle menu"
        data-testid="mobile-menu-toggle"
      >
        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 w-full h-full z-40 flex flex-col items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "#fffae7" }}
      >
        <div className="flex flex-col items-center gap-6 w-full px-4 pb-12 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif uppercase text-xl font-semibold tracking-wider text-foreground no-underline text-center w-full"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-6 mt-4">
            <a
              href="https://www.instagram.com/goldenvinepiercing"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-foreground no-underline"
            >
              <SiInstagram className="w-8 h-8" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61577137506030"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-foreground no-underline"
            >
              <SiFacebook className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

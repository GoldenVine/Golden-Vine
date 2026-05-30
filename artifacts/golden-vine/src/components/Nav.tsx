import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { SiInstagram, SiFacebook } from "react-icons/si";
import { Menu, X } from "lucide-react";
import logoSrc from "@assets/logo_1780124857507.jpg";

const NAV_BG = "#526545";
const LINK_COLOR = "#fffae7";
const LINK_HOVER = "#DEE9CE";

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
      <nav className="fixed top-0 left-0 w-full z-40 shadow-md" style={{ background: NAV_BG }}>
        {/* Logo banner — full width, natural height */}
        <Link href="/" className="block w-full no-underline" style={{ background: NAV_BG }}>
          <img
            src={logoSrc}
            alt="Golden Vine Piercing"
            className="w-full h-auto block"
          />
        </Link>

        {/* Golden divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #c9a84c, #f0d080, #c9a84c, transparent)" }} />

        {/* Desktop nav links */}
        <div
          className="hidden md:flex flex-row items-center justify-center flex-wrap gap-x-6 gap-y-1 py-2 w-full"
          style={{ background: NAV_BG }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif uppercase text-sm font-semibold tracking-wider no-underline transition-colors"
              style={{ color: LINK_COLOR }}
              onMouseEnter={e => (e.currentTarget.style.color = LINK_HOVER)}
              onMouseLeave={e => (e.currentTarget.style.color = LINK_COLOR)}
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
              className="no-underline transition-colors"
              style={{ color: LINK_COLOR }}
              onMouseEnter={e => (e.currentTarget.style.color = LINK_HOVER)}
              onMouseLeave={e => (e.currentTarget.style.color = LINK_COLOR)}
            >
              <SiInstagram className="w-5 h-5 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61577137506030"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="no-underline transition-colors"
              style={{ color: LINK_COLOR }}
              onMouseEnter={e => (e.currentTarget.style.color = LINK_HOVER)}
              onMouseLeave={e => (e.currentTarget.style.color = LINK_COLOR)}
            >
              <SiFacebook className="w-5 h-5 hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-5 z-50 p-2 border-none rounded"
        aria-label="Toggle menu"
        data-testid="mobile-menu-toggle"
        style={{ background: "rgba(82,101,69,0.9)", color: LINK_COLOR }}
      >
        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 w-full h-full z-40 flex flex-col items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: NAV_BG }}
      >
        <div className="flex flex-col items-center gap-7 w-full px-4 pb-12 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif uppercase text-xl font-semibold tracking-wider no-underline text-center w-full"
              style={{ color: LINK_COLOR }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-6 mt-4" style={{ color: LINK_COLOR }}>
            <a
              href="https://www.instagram.com/goldenvinepiercing"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="no-underline"
              style={{ color: LINK_COLOR }}
            >
              <SiInstagram className="w-8 h-8" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61577137506030"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="no-underline"
              style={{ color: LINK_COLOR }}
            >
              <SiFacebook className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { SiInstagram, SiFacebook } from "react-icons/si";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  // Close mobile menu on route change
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
      <nav className="fixed top-0 left-0 w-full bg-background z-40 shadow-sm">
        <div className="w-full flex flex-col items-center pt-2">
          {/* Logo Placeholder */}
          <Link href="/" className="w-full h-24 flex items-center justify-center bg-background no-underline hover:no-underline">
            <span className="font-serif text-3xl font-bold tracking-widest text-foreground">GOLDEN VINE</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex flex-row items-center justify-center gap-6 py-4 w-full">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="font-serif uppercase text-sm font-semibold tracking-wider text-foreground hover:text-[#99aa8a] no-underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 ml-4">
              <a href="https://www.instagram.com/goldenvinepiercing" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-foreground hover:text-[#99aa8a] no-underline">
                <SiInstagram className="w-5 h-5 hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577137506030" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-foreground hover:text-[#99aa8a] no-underline">
                <SiFacebook className="w-5 h-5 hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute top-8 right-6 z-50 p-2 text-foreground bg-transparent border-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </nav>

      {/* Mobile Overlay Nav */}
      <div 
        className={`fixed inset-0 w-full h-full bg-background z-40 flex flex-col items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center gap-6 mt-16 overflow-y-auto w-full px-4 pb-12">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="font-serif uppercase text-xl font-semibold tracking-wider text-foreground no-underline text-center w-full"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-6 mt-6">
            <a href="https://www.instagram.com/goldenvinepiercing" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-foreground no-underline">
              <SiInstagram className="w-8 h-8" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61577137506030" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-foreground no-underline">
              <SiFacebook className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

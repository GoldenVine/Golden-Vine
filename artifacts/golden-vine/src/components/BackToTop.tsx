import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300"
      style={{
        right: "max(1.5rem, calc((100vw - 1400px) / 2 + 2rem))",
        background: "#526545",
        color: "#fffae7",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.9)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

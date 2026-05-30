import { Link } from "wouter";

// ── Trading hours (UK time) ──────────────────────────────────────────────────
// Update these to match your actual opening hours.
// null = closed all day; { open, close } = 24-hour decimal (e.g. 17.5 = 17:30)
const HOURS: Record<number, { open: number; close: number } | null> = {
  0: null,                      // Sunday – closed
  1: { open: 11, close: 18 },   // Monday
  2: { open: 11, close: 18 },   // Tuesday
  3: { open: 11, close: 18 },   // Wednesday
  4: { open: 11, close: 18 },   // Thursday
  5: { open: 11, close: 18 },   // Friday
  6: { open: 10, close: 17 },   // Saturday
};

function fmt(h: number) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return mm === 0 ? `${hh}:00` : `${hh}:${String(mm).padStart(2, "0")}`;
}

function getStatus() {
  const now = new Date();
  const uk  = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
  const day  = uk.getDay();
  const t    = uk.getHours() + uk.getMinutes() / 60;
  const today = HOURS[day];

  if (!today) return { open: false, label: "Closed today" };
  if (t < today.open) {
    const mins = Math.round((today.open - t) * 60);
    return { open: false, label: mins < 60 ? `Opens in ${mins} mins` : `Opens at ${fmt(today.open)}` };
  }
  if (t >= today.close) return { open: false, label: "Closed for today" };
  const mins = Math.round((today.close - t) * 60);
  return { open: true,  label: mins < 60 ? `Closes in ${mins} mins` : `Open until ${fmt(today.close)}` };
}

export function Footer() {
  const { open, label } = getStatus();

  return (
    <footer className="bg-[#333] text-white py-8 mt-12 w-full">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="font-serif m-0 text-sm text-white/70">
          © {new Date().getFullYear()} Golden Vine Piercing. All rights reserved.
        </p>

        {/* Open / closed badge */}
        <span
          className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full"
          style={{
            background: open ? "rgba(82,180,82,0.2)" : "rgba(180,60,60,0.2)",
            color: open ? "#7dda7d" : "#e08080",
            border: `1px solid ${open ? "rgba(82,180,82,0.4)" : "rgba(180,60,60,0.4)"}`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: open ? "#7dda7d" : "#e08080" }}
          />
          {label}
        </span>

        <Link href="/contact" className="text-sm text-white/50 hover:text-white/90 transition-colors no-underline">
          Bath, UK · Contact us
        </Link>
      </div>
    </footer>
  );
}

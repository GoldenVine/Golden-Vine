import { useState } from "react";
import { Link } from "wouter";
import { SiInstagram } from "react-icons/si";
import { FadeIn } from "@/components/FadeIn";
import { Lightbox } from "@/components/Lightbox";
import { Seo } from "@/components/Seo";

// ── Tattooists ───────────────────────────────────────────────────────────────
// To update a tattooist: change their bio text below, and replace the photo
// files in public/images with your own (keep the same file names).
const TATTOOISTS = [
  {
    id: "manuel",
    name: "Manuel",
    photo: "/images/manuel.jpg",
    instagram: "manuel.inked" as string | null,
    bio: "Born in Colombia, Manuel is an artist with a deep passion for art and an extensive journey in the world of tattooing. With 9 years of experience, he's versatile across styles, as you can tell from his work. He's always motivated to give every client a unique and emotional experience, and is committed to a professional result in every piece. In his downtime he enjoys playing basketball and painting.",
    work: ["/images/manuel-work1.jpg", "/images/manuel-work2.jpg", "/images/manuel-work3.jpg"],
  },
  {
    id: "elina",
    name: "Elina",
    photo: "/images/elina.jpg",
    instagram: "evilinatattooing" as string | null,
    bio: "Elina has been tattooing for 9 years and is also a graphic designer with a diploma in Graphic Art. She has tattooed all over the world, including Thailand, Germany and Egypt, as well as here in the UK. She loves creating unique custom sketches built around your ideas, so don't hesitate to get in touch.",
    work: ["/images/elina-work1.jpg", "/images/elina-work2.jpg", "/images/elina-work3.jpg"],
  },
];

export function Tattooists() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <div className="w-full animate-in fade-in duration-500 space-y-12">
      <Seo
        title="Tattoo Artists in Bath"
        description="Meet the tattoo artists at Golden Vine, 6 Argyle Street, Bath. Custom tattoos in a relaxed, professional studio. Tattoos are booked in person at the studio."
        path="/tattooists"
      />

      <FadeIn>
        <section className="section-cream max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-serif">Our Tattooists</h1>
          <p className="text-lg font-serif leading-relaxed">
            Golden Vine is now home to tattooing as well as piercing. Our tattooists bring the same care, safety and attention to detail
            you already know from our piercing studio, in the same relaxed space in the heart of Bath.
          </p>
          <p className="text-lg font-serif leading-relaxed">
            <strong>Tattoos can't be booked online.</strong> To discuss an idea or book a tattoo, please pop into the studio or{" "}
            <Link href="/contact" className="font-bold underline">get in touch</Link>. You can read more on our{" "}
            <Link href="/booking" className="font-bold underline">Booking &amp; Policies</Link> page.
          </p>
        </section>
      </FadeIn>

      {TATTOOISTS.map((artist, index) => (
        <FadeIn key={artist.id} delay={0.05}>
          <section className="section-cream max-w-5xl mx-auto space-y-8">
            <div className={`flex flex-col items-center gap-10 ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}>
              <img
                src={artist.photo}
                alt={`${artist.name}, tattooist at Golden Vine, Bath`}
                className="w-full md:w-1/3 rounded-xl shadow-md object-cover aspect-square"
              />
              <div className="w-full md:w-2/3 space-y-4">
                <h2 className="text-3xl font-bold font-serif">{artist.name}</h2>
                <p className="text-lg font-serif leading-relaxed">{artist.bio}</p>
                {artist.instagram && (
                  <a
                    href={`https://www.instagram.com/${artist.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-bold underline text-primary"
                  >
                    <SiInstagram className="w-5 h-5" />@{artist.instagram}
                  </a>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-serif text-center mb-6">{artist.name}'s Work</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {artist.work.map((img, i) => (
                  <div
                    key={img}
                    className="overflow-hidden rounded-xl shadow-md cursor-pointer group bg-background"
                    onClick={() => setLightboxImg(img)}
                  >
                    <img
                      src={img}
                      alt={`Tattoo by ${artist.name} at Golden Vine, Bath (${i + 1})`}
                      loading="lazy"
                      className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      ))}

      <FadeIn>
        <section className="text-center pb-4">
          <Link href="/contact" className="pill-btn text-lg py-4 px-10">
            Enquire About a Tattoo
          </Link>
        </section>
      </FadeIn>

      <Lightbox isOpen={!!lightboxImg} onClose={() => setLightboxImg(null)} imageSrc={lightboxImg || ""} />
    </div>
  );
}

import { useState } from "react";
import { Link } from "wouter";
import { Carousel } from "@/components/Carousel";
import { Lightbox } from "@/components/Lightbox";
import { FadeIn } from "@/components/FadeIn";
import { Seo } from "@/components/Seo";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["HealthAndBeautyBusiness", "TattooParlor"],
  name: "Golden Vine",
  alternateName: "Golden Vine Piercing",
  description: "Bath's destination for safe and exquisite body piercing and tattooing. Professional piercing and tattoo studio offering fresh and healed piercings, custom tattoos, premium jewellery, and expert aftercare.",
  url: "https://www.goldenvinepiercing.co.uk",
  image: "https://www.goldenvinepiercing.co.uk/opengraph.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6 Argyle Street",
    addressLocality: "Bath",
    postalCode: "BA2 4BA",
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: 51.38344, longitude: -2.35976 },
  hasMap: "https://maps.google.com/?q=6+Argyle+St,+Bath+BA2+4BA",
  telephone: "+441225251026",
  sameAs: [
    "https://www.instagram.com/goldenvinepiercing",
    "https://www.facebook.com/profile.php?id=61577137506030",
  ],
  priceRange: "££",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday","Thursday","Friday","Saturday"], opens: "10:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "11:00", closes: "16:00" },
  ],
};

export function Home() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Carousel slides, in order. Tattooist photos are mixed in among the
  // piercing photos — replace home-tattoo1.webp to home-tattoo4.webp with your own.
  const homeCarouselImages = [
    "/images/home1.webp",
    "/images/home-tattoo1.webp",
    "/images/home2.webp",
    "/images/home3.webp",
    "/images/home4.webp",
    "/images/home-tattoo2.webp",
    "/images/home5.webp",
    "/images/home6.webp",
    "/images/home-tattoo3.webp",
    "/images/home7.webp",
    "/images/home8.webp",
    "/images/home-tattoo4.webp",
    "/images/home9.webp",
  ];

  // "New Additions" tiles: first row is jewellery, the next two rows are
  // tattoo photos — replace tattoo-new1.webp to tattoo-new6.webp with your own.
  const newAdditions = [
    "/images/home10.webp",
    "/images/home11.webp",
    "/images/home12.webp",
    "/images/tattoo-new1.webp",
    "/images/tattoo-new2.webp",
    "/images/tattoo-new3.webp",
    "/images/tattoo-new4.webp",
    "/images/tattoo-new5.webp",
    "/images/tattoo-new6.webp",
  ];

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <Seo
        title="Body Piercing & Tattoo Studio in Bath"
        description="Golden Vine — Bath's destination for safe, professional body piercing and tattooing. Fresh and healed piercings, custom tattoos, premium jewellery, and expert aftercare."
        path="/"
        jsonLd={localBusinessSchema}
      />
      
      <div className="-mx-4 md:-mx-8 mb-12">
        <Carousel images={homeCarouselImages} autoAdvance={true} interval={3000} peekMode={true} />
      </div>

      <FadeIn>
        <section className="section-cream flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 max-w-3xl mx-auto leading-tight">
            Welcome to Golden Vine: Rooted in Craft, Where Precision Piercing Meets Custom Ink
          </h1>
          
          <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl mx-auto">
            <div className="flex-1 flex flex-col items-center text-center space-y-8">
              <p className="font-serif text-lg leading-relaxed m-0 max-w-md">
                Golden Vine is Bath's home for expert body piercing and custom tattoo art. We offer a relaxed, professional space where safety comes first and every piece is made for you, because a piercing or tattoo is more than decoration. It's part of your story.
              </p>
              <Link href="/booking" className="pill-btn text-lg py-4 px-10">
                Book Now
              </Link>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <img 
                src="/images/shopinterior.webp" 
                alt="Golden Vine Studio Interior" 
                className="w-full h-auto rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="section-cream">
          <h2 className="text-3xl font-bold text-center mb-10 border-b-2 border-foreground/10 pb-4 inline-block mx-auto">
            New Additions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {newAdditions.map((img, i) => (
              <FadeIn key={img} delay={(i % 3) * 0.1} direction="up">
                <div 
                  className="overflow-hidden rounded-xl shadow-md cursor-pointer group bg-background"
                  onClick={() => setLightboxImg(img)}
                >
                  <img 
                    src={img} 
                    alt={i < 3 ? `New jewellery addition ${i + 1}` : `New tattoo addition ${i - 2}`}
                    loading="lazy" 
                    className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </FadeIn>

      <Lightbox 
        isOpen={!!lightboxImg} 
        onClose={() => setLightboxImg(null)} 
        imageSrc={lightboxImg || ""} 
      />
    </div>
  );
}

import { useState } from "react";
import { Link } from "wouter";
import { Carousel } from "@/components/Carousel";
import { Lightbox } from "@/components/Lightbox";
import { FadeIn } from "@/components/FadeIn";
import { Seo } from "@/components/Seo";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Golden Vine Piercing",
  description: "Bath's destination for safe and exquisite body piercing. Professional piercing studio offering fresh and healed piercings, premium jewellery, and expert aftercare.",
  url: "https://goldenvinepiercing.co.uk",
  image: "https://goldenvinepiercing.co.uk/opengraph.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6 Argyle Street",
    addressLocality: "Bath",
    postalCode: "BA2 4BA",
    addressCountry: "GB",
  },
  telephone: "01225251026",
  priceRange: "££",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday","Thursday","Friday","Saturday"], opens: "10:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "11:00", closes: "16:00" },
  ],
};

export function Home() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const homeCarouselImages = Array.from({ length: 9 }).map(
    (_, i) => `/images/home${i + 1}.jpg`
  );

  const collections = [
    "/images/home10.jpg",
    "/images/home11.jpg",
    "/images/home12.jpg",
  ];

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <Seo
        title="Precision Body Piercing in Bath"
        description="Golden Vine Piercing — Bath's destination for safe, professional body piercing. Fresh and healed piercings, premium jewellery, and expert aftercare."
        path="/"
        jsonLd={localBusinessSchema}
      />
      
      <div className="-mx-4 md:-mx-8 mb-12">
        <Carousel images={homeCarouselImages} autoAdvance={true} interval={3000} peekMode={true} />
      </div>

      <FadeIn>
        <section className="section-cream flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 max-w-3xl mx-auto leading-tight">
            Welcome to Golden Vine: Precision Piercing Designed to Shine
          </h1>
          
          <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl mx-auto">
            <div className="flex-1 flex flex-col items-center text-center space-y-8">
              <p className="font-serif text-lg leading-relaxed m-0 max-w-md">
                Welcome to Golden Vine Piercing, Bath's destination for exquisite and safe body piercing. We're dedicated to providing a relaxed and professional experience where we believe a piercing is more than just jewellery – it's an expression.
              </p>
              <Link href="/booking" className="pill-btn text-lg py-4 px-10">
                Book Now
              </Link>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <img 
                src="/images/shopinterior.jpg" 
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
            New Collections
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {collections.map((img, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div 
                  className="overflow-hidden rounded-xl shadow-md cursor-pointer group bg-background"
                  onClick={() => setLightboxImg(img)}
                >
                  <img 
                    src={img} 
                    alt={`Collection item ${i + 1}`} 
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

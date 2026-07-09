import { Link } from "wouter";
import { Carousel } from "@/components/Carousel";
import { FadeIn } from "@/components/FadeIn";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Seo } from "@/components/Seo";

export function Piercings() {
  const piercingImages = Array.from({ length: 9 }).map(
    (_, i) => `/images/piercings${i + 1}.jpg`
  );

  return (
    <div className="flex flex-col animate-in fade-in duration-500 w-full space-y-12">
      <Seo
        title="Piercing Services"
        description="Professional body piercing at Golden Vine Piercing, Bath. Fresh and healed ear, nose, and body piercings performed with the highest standards of safety."
        path="/piercings"
      />
      
      <FadeIn>
        <div className="section-cream max-w-5xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-2/5 text-center lg:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Fresh &amp; Healed Piercings</h1>
              <p className="text-lg font-serif leading-relaxed">
                Discover a wide range of piercing options and high-quality jewellery to express your individual style.
              </p>
              <div className="pt-4">
                <Link href="/booking" className="pill-btn text-lg py-4 px-10">
                  Book Now
                </Link>
              </div>
            </div>
            <div className="lg:w-3/5 w-full">
              <Carousel
                images={piercingImages}
                showControls={true}
                autoAdvance={false}
                containerClassName="relative w-full overflow-hidden bg-primary/10 rounded-xl aspect-[4/3] flex items-center justify-center group"
              />
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="section-cream max-w-4xl mx-auto space-y-6 text-lg font-serif leading-relaxed">
          <h2 className="text-3xl font-bold text-center mb-8 pb-4 border-b border-foreground/10">Piercing Information</h2>
          
          <p>Here at Golden Vine in the heart of Bath city, we believe jewellery should be as unique as you are. That's why we customise each piece to perfectly complement your individual style and unique anatomy. The way jewellery sits, its location, and its size all dramatically influence the balance and illusion it creates when worn.</p>
          
          <p>We carefully select our jewellery to ensure it is perfectly suited for its intended placement. You'll find that for many piercings, such as earlobes, nostrils, and lips, we utilise flat back style studs. This particular design offers superior comfort and actively promotes better healing due to the absence of awkward clasps and sharp backings.</p>
          
          <p>All of our stud style jewellery is either internally threaded or threadless, ensuring a smooth and safe fit – we never use externally threaded designs.</p>
          
          <p>Only a select few materials are truly safe for body jewellery. At Golden Vine, we exclusively pierce with materials recommended and verified by the Association of Professional Piercers (APP) & the UKs Association of Professional Piercers (UKAPP). We meticulously curate our selection to offer the highest quality, best range, and most innovative designs the industry has to offer.</p>
          
          <p>Because jewellery is worn inside your body for extended periods, its quality is paramount. All our jewellery is manufactured in the USA and comes with a lifetime manufacturer's guarantee against defects.</p>
          
          <p>Body piercing is deeply personal, and your jewellery should be too. Why settle for off-the-shelf when you can have pieces as unique as you are? Whether you're looking for something subtle and understated or a truly recognisable statement, we can bring your vision to life.</p>
          
          <p>Our design experts are ready to help you create custom jewellery that perfectly complements your individual style and unique anatomy.</p>
        </section>
      </FadeIn>

      <InstagramFeed />

    </div>
  );
}

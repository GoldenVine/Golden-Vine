import { Link } from "wouter";
import { FadeIn } from "@/components/FadeIn";
import { Seo } from "@/components/Seo";

export function Bvla() {
  const bvlaGallery = [
    "/images/BVLA7.jpg",
    "/images/BVLA5.jpg",
    "/images/BVLA12.jpg",
    "/images/BVLA3.jpg",
    "/images/BVLA2.jpg",
    "/images/BVLA14.jpg",
  ];

  return (
    <div className="w-full animate-in fade-in duration-500 space-y-12">
      <Seo
        title="BVLA Custom Jewellery"
        description="Discover BVLA custom body jewellery at Golden Vine Piercing, Bath. Commission hand-crafted, one-of-a-kind pieces in precious metals and gemstones."
        path="/bvla"
      />
      
      <FadeIn>
        <section className="section-cream text-center space-y-10">
          <h1 className="text-4xl font-bold font-serif mb-4">Why Get Something Custom?</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: "/images/BVLA32.webp", alt: "Custom Statement", text: "Statement pieces are often as individual as the wearer, celebrate that uniqueness by picking something that was ethically made and created especially for you." },
              { src: "/images/three.jpg", alt: "Perfect Timing", text: "Sometimes your dream piece is too big for a fresh piercing, custom order allows us to pierce with simpler jewellery, giving your piercing time to settle and mature while your jewellery is meticulously made." },
              { src: "/images/BVLA33.webp", alt: "Color Palettes", text: "You're able to explore more colour palettes and combinations than are readily available in studio whilst using pieces in the cabinets for frame of reference on size or colours." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="space-y-4">
                  <img src={item.src} alt={item.alt} className="w-full rounded-xl shadow-sm" />
                  <p className="font-serif text-lg">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream flex flex-col md:flex-row items-center gap-10">
          <img 
            src="/images/uniquedesigns.jpg" 
            alt="Interested in getting something made" 
            className="w-full md:w-1/2 rounded-xl shadow-md object-cover"
          />
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold font-serif mb-4">Interested in getting something made?</h2>
            <p className="text-lg font-serif">Meeting in person allows us to fully understand your vision and guide you to the perfect jewellery pieces. We can discuss your ideas, offer expert advice, and even help you visualise how different pieces will look. For example, if you're concerned about space in a particular piercing location, we can show you options that will fit perfectly and provide visual references with similar sizes and shapes.</p>
            <p className="text-lg font-serif">We can help you explore endless ideas for themes and colour schemes, offering insights into how different pieces might sit or suit your anatomy. For instance, we'll advise on how a piece might rotate, its ideal placement, or which shapes will flatter your unique features.</p>
            <p className="text-lg font-serif">Once we've refined your vision, we'll provide price quotes for your favourite pieces. There's absolutely no obligation to buy at this stage unless you're completely sure about a specific piece and we have all the details.</p>
            <p className="text-lg font-serif">If you decide to proceed, we'll create a digital custom order form. This form will meticulously list all the specifics for each piece, including size, gauge, gold colour and carat, gemstones, and any additional notes. You'll also receive a detailed breakdown of the cost for each item, followed by a grand total. You'll get a copy of this form to review and either sign off on or reject if you spot any errors.</p>
            <p className="text-lg font-serif font-semibold text-primary">For custom orders, a 50% non-refundable and non-transferable deposit is required to move your piece into BVLA's production phase.</p>
            <p className="text-lg font-serif italic">Generally speaking, custom orders usually take 20 weeks to complete, though this timeframe can be longer or shorter depending on the complexity of the design.</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream flex flex-col md:flex-row-reverse items-center gap-10">
          <img 
            src="/images/BVLA25.webp" 
            alt="Gemstones" 
            className="w-full md:w-1/2 rounded-xl shadow-md object-cover"
          />
          <div className="w-full md:w-1/2 space-y-4">
            <p className="text-lg font-serif">Gemstones come in an astonishing array of groups and types – we could truly discuss them all day. From the traditional precious stones like diamond, sapphire, emerald, and ruby, to more specialist and unusual pieces such as tourmalinated quartz (often appearing with striking black and white patterns) or Zawadi sapphire (known for its unique, glittery brown hue), each gem boasts its own distinct characteristics and requires specific care.</p>
            <p className="text-lg font-serif">If you'd like some guidance in selecting the ideal gems for your custom piece, we highly recommend browsing <a href="https://www.bvla.com/gemstones/1/" target="_blank" rel="noreferrer" className="font-bold underline">BVLA's Gemstone</a> page. There, you can explore a stunning variety of colours and shapes to find your absolute favourites.</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream flex flex-col md:flex-row items-center gap-10">
          <img 
            src="/images/BVLA27.webp" 
            alt="Care and Maintenance" 
            className="w-full md:w-1/2 rounded-xl shadow-md object-cover"
          />
          <div className="w-full md:w-1/2 space-y-4">
            <p className="text-lg font-serif">If you're invested in speciality jewellery, you'll want to make sure it's well cared for. For any pieces with pockets or textured areas (like those with sandblasting), we recommend investing in a personal ultrasonic cleaner. This device uses vibrations to effectively remove build-up and debris, often making your pieces look brand new again.</p>
            <p className="text-lg font-serif">A new, soft-bristle head on an electric toothbrush can also work wonders – though please note, this method cannot be safely used on every type of gemstone.</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream flex flex-col md:flex-row-reverse items-center gap-10">
          <img 
            src="/images/BVLA29.webp" 
            alt="Expert Advice" 
            className="w-full md:w-1/2 rounded-xl shadow-md object-cover"
          />
          <div className="w-full md:w-1/2 space-y-4">
            <p className="text-lg font-serif">Please always ask our advice before rigorously cleaning your jewellery, as there are exceptions to every rule. For example, we typically don't order organic materials like pearls unless specifically requested. This is because they're a soft mineral, and the risk of damage through abrasion is much higher.</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream flex flex-col md:flex-row items-center gap-10">
          <img 
            src="/images/BVLA31.webp" 
            alt="Care Requirements" 
            className="w-full md:w-1/2 rounded-xl shadow-md object-cover"
          />
          <div className="w-full md:w-1/2 space-y-4">
            <p className="text-lg font-serif">It's important to understand that certain gemstones have specific care requirements. For example, Copper Turquoise (as pictured, often with beautiful purple and gold hues) has a tendency to gently oxidise with prolonged exposure to moisture. This means it's generally not suitable for daily wear if you want to maintain its pristine appearance.</p>
            <p className="text-lg font-serif">While we are, and always will be, completely forthcoming about these specifics, this information isn't intended to deter you. Rather, it's to inform you of potential risks and to demonstrate how different gems can react over time.</p>
            <p className="text-lg font-serif">BVLA does offer a fantastic resetting service. Should a piece we've ordered for you begin to show wear, we can send it back to them for repairs or even replacements. Please note, a small service fee will be incurred for this, and there may be an additional charge for new gems if they are of a higher value than the ones being replaced.</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream flex flex-col md:flex-row-reverse items-center gap-10">
          <img 
            src="/images/BVLA26.webp" 
            alt="Flashes" 
            className="w-full md:w-1/2 rounded-xl shadow-md object-cover"
          />
          <div className="w-full md:w-1/2 space-y-4">
            <p className="text-lg font-serif">If you'd like to delve deeper into your favourite gemstone and are considering pieces that feature it, we'd be delighted to share all the information we have. We can also offer advice on how best to highlight your chosen gems. While some pieces look amazing regardless of the cut or size, other gems are truly elevated when displayed properly.</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream flex flex-col md:flex-row items-center gap-10">
          <img 
            src="/images/BVLA28.webp" 
            alt="Book Design Appointment" 
            className="w-full md:w-1/2 rounded-xl shadow-md object-cover"
          />
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold font-serif mb-4">You can now book a design appointment</h2>
            <p className="text-lg font-serif">Simply visit <Link href="/booking" className="font-bold underline">Bookings & Policies</Link> page and find the appointment called "Custom Jewellery Design Consultation". When you come in for your consultation, feel free to bring along reference photos of your favourite BVLA pieces. It's incredibly helpful for us to get a sense of your style! Consider things like:</p>
            <ul className="list-disc pl-6 space-y-2 text-lg font-serif">
              <li>Your favourite colours and gemstones</li>
              <li>Any special interests or themes you'd like to incorporate</li>
              <li>Your lifestyle, to ensure the jewellery is practical for you</li>
              <li>Your budget</li>
            </ul>
            <div className="pt-4">
              <Link href="/booking" className="pill-btn py-3 px-8 text-lg">Book Now</Link>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream text-center">
          <h2 className="text-3xl font-bold font-serif mb-8 border-b-2 border-primary/20 pb-2 inline-block">BVLA Inspiration</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {bvlaGallery.map((img, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <img src={img} alt={`BVLA Inspiration ${i + 1}`} className="w-full aspect-square object-cover rounded-xl shadow-md" />
              </FadeIn>
            ))}
          </div>
        </section>
      </FadeIn>

    </div>
  );
}

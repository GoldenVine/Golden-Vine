import { Link } from "wouter";
import { FadeIn } from "@/components/FadeIn";
import { Seo } from "@/components/Seo";

// Placeholder page — replace the text below with the aftercare guidance
// provided by the tattooists.
export function TattooAftercare() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <Seo
        title="Tattoo Aftercare Advice"
        description="Tattoo aftercare guidance from Golden Vine in Bath. How to look after your new tattoo while it heals."
        path="/aftercare/tattoo"
      />
      <section className="section-cream max-w-4xl mx-auto space-y-8 font-serif">
        <FadeIn>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tattoo Aftercare</h1>
            <p className="text-lg leading-relaxed">
              Our full tattoo aftercare guide is coming soon. Your tattooist will talk you through exactly how to care for your new
              tattoo during your appointment, and you'll leave with aftercare advice tailored to your piece.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div>
            <h2 className="text-2xl font-bold border-b border-foreground/10 pb-2">Questions About Healing?</h2>
            <p className="text-lg mt-4">
              If you have any questions or concerns while your tattoo is healing, please{" "}
              <Link href="/contact" className="font-bold underline">get in touch</Link> or pop into the studio. Looking for advice
              on a piercing instead? See our <Link href="/aftercare" className="font-bold underline">Piercing Aftercare</Link> page.
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

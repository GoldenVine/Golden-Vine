import { Link } from "wouter";
import { FadeIn } from "@/components/FadeIn";
import { Seo } from "@/components/Seo";

// Tattoo aftercare steps, in order. Edit the text here to update the page.
const STEPS = [
  {
    title: "First Wash",
    text: "Three hours after your tattoo is finished, wash it gently with plenty of water at normal room temperature.",
  },
  {
    title: "Pat Dry",
    text: "Dry it with a clean, disposable paper towel using small, gentle dabs. Don't rub.",
  },
  {
    title: "From The Next Day",
    text: "After 24 hours, wash your tattoo with a pH-neutral soap.",
  },
  {
    title: "Moisturise",
    text: "Apply the aftercare cream recommended by your tattoo artist two to three times a day throughout the healing process.",
  },
  {
    title: "Watch What You Eat",
    text: "Avoid irritating foods for 15 days.",
  },
  {
    title: "No Alcohol",
    text: "Don't drink alcohol while your tattoo is healing.",
  },
  {
    title: "Keep It Out Of The Sun And Water",
    text: "Don't expose your tattoo to sunlight, and avoid the beach, swimming pools, saunas and steam rooms until it has healed.",
  },
  {
    title: "Hands Off",
    text: "Never touch your tattoo with dirty hands. Once it starts to heal, don't pick, peel or scratch any scabs. Let them come away on their own.",
  },
];

export function TattooAftercare() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <Seo
        title="Tattoo Aftercare Advice"
        description="How to look after your new tattoo from Golden Vine in Bath: washing, drying, moisturising and what to avoid while it heals."
        path="/aftercare/tattoo"
      />
      <section className="section-cream max-w-4xl mx-auto space-y-8 font-serif">
        <FadeIn>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tattoo Aftercare</h1>
            <p className="text-lg leading-relaxed">
              Looking after your tattoo properly while it heals keeps it looking its best for years to come. Please follow these
              steps carefully, along with any advice your tattoo artist gives you at your appointment.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <ol className="space-y-6 list-none p-0 m-0">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5 items-start">
                <span className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-xl font-bold mb-1">{step.title}</h2>
                  <p className="text-lg m-0">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div>
            <h2 className="text-2xl font-bold border-b border-foreground/10 pb-2">Any Questions?</h2>
            <p className="text-lg mt-4">
              If you have any questions or concerns while your tattoo is healing, please contact your artist straight away so they
              can follow up with you. You can reach us through our <Link href="/contact" className="font-bold underline">Contact Us</Link>{" "}
              page or by popping into the studio. Looking for advice on a piercing instead? See our{" "}
              <Link href="/aftercare" className="font-bold underline">Piercing Aftercare</Link> page.
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

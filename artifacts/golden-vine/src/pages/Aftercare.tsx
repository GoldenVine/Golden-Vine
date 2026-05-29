import { Link } from "wouter";

export function Aftercare() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <section className="section-cream max-w-4xl mx-auto space-y-8 font-serif">
        <div className="w-full mb-8 rounded-xl overflow-hidden shadow-md">
          <img 
            src="https://placehold.co/1200x600/DEE9CE/264412?text=Piercing+Aftercare" 
            alt="Piercing Aftercare Tips" 
            className="w-full h-auto object-cover"
          />
        </div>

        <h3 className="text-2xl font-bold border-b border-foreground/10 pb-2">What To Expect</h3>
        <p className="text-lg">
          This written advice is one-size-fits-all whereas advice given during our aftercare talks throughout the appointment are tailored to you and what you are getting pierced.
        </p>

        <div className="space-y-6 pl-4 border-l-2 border-primary/30">
          <div>
            <p className="font-bold text-lg mb-2"><u>Week 1</u> - Inflammation.</p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>Swelling, redness, light bleeding, and a clear/yellowish fluid discharge are to be expected.</li>
              <li>Clean gently with sterile saline twice daily OR soak whilst showering once daily (not both).</li>
              <li>Homemade mixes of salt and water are not the same thing as sterile saline wound wash so buy some to be safe.</li>
              <li>Do not use cotton buds or cotton pads as they have loose fibres which can get inside your piercing and irritate it. Sterile non-woven gauze, soaked with saline is perfect.</li>
              <li>Ideally, minimal physical contact is best, any build-up should be soaked with either method mentioned above, allowing it to soften and dislodge.</li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-lg mb-2"><u>Week 2-4</u> - Healing.</p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>Clear/yellowish 'crusties' will form and harden if they are not regularly washed and cleaned away.</li>
              <li>Do NOT pick at them, soak first (sterile saline or warm, running water) to soften build-up then running water should dislodge them.</li>
              <li>Alternatively, gently wipe away softened crusties using saturated gauze. If it doesn't come away, leave it and try again tomorrow.</li>
            </ul>
          </div>

          <div>
            <p className="text-lg"><strong className="font-bold"><u>Week 4</u></strong> - A check-up at the 1 month mark is important, please schedule one for free.</p>
          </div>

          <div>
            <p className="text-lg"><strong className="font-bold"><u>Month 2-3</u></strong> - Redness should be mostly gone but that does not mean it has healed, piercings heal from the outside in so please continue cleaning the piercing as part of your daily routine to aid its progress.</p>
          </div>

          <div>
            <p className="font-bold text-lg mb-2"><u>Month 3-4</u> - Downsizing.</p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>We may need to change the jewellery depending on how much swelling has subsided.</li>
              <li>You should have an idea of when to come in based on info given at original piercing appointment and progress at our check-up.</li>
              <li>We don't charge service fees for downsizing appointments so you will only need to pay for whatever new jewellery you require.</li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-lg mb-2"><u>Month 4+</u> - Maturation.</p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>There should be steadily decreasing tenderness though great care should still be taken to avoid trauma like sleeping on it, snags, fiddling, unnecessary jewellery changes or excessive cleaning.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold border-b border-foreground/10 pb-2 mt-12">Estimated Healing Periods</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg bg-background p-6 rounded-lg">
          <p><strong><u>Oral:</u></strong> 2-4 months</p>
          <p><strong><u>Septum:</u></strong> 2-4 months</p>
          <p><strong><u>Genital:</u></strong> 2-6 months</p>
          <p><strong><u>Lobes:</u></strong> 4-6 months</p>
          <p><strong><u>Navel, eyebrow, nostril, forward helix:</u></strong> 5-8 months</p>
          <p><strong><u>Daith, tragus, helix, faux rook:</u></strong> 6-9 months</p>
          <p><strong><u>Conch, anti tragus, rook:</u></strong> 8-12 months</p>
          <p><strong><u>Industrial:</u></strong> 12+ months</p>
        </div>

        <h3 className="text-2xl font-bold border-b border-foreground/10 pb-2 mt-12">Oral Piercing Advice</h3>
        <ul className="list-disc pl-6 space-y-3 text-lg">
          <li>Wounds inside the mouth heal very different to most other parts of the body as they are able to dry and scab whereas the mouth is a wet environment.</li>
          <li>We advise to reduce smoking/vaping and alcohol (including mouthwash) for as long as possible.</li>
          <li>Ice cubes and cold drinks during initial few days help minimise inflammation, as will staying hydrated.</li>
          <li>Brush teeth twice daily as normal using a new toothbrush. Do not use whitening toothpaste and rinse with cool water, not mouthwash.</li>
          <li>Swelling is normal for 2 weeks. We advise to eat soft, non-spicy foods at not too high a temperature for initial healing.</li>
          <li>Rinse mouth with cold, bottled water after every meal/snack/drink.</li>
          <li>Do NOT play with jewellery, you risk tearing the piercing and damaging your teeth. Downsize jewellery at 2-4 weeks to minimise risk of oral damage.</li>
        </ul>

        <h3 className="text-2xl font-bold border-b border-foreground/10 pb-2 mt-12">Genital Piercing Advice</h3>
        <div className="space-y-4 text-lg">
          <p>Piercings on genitalia are more similar to oral piercing than anything else. Tissue in these areas is a mucous membrane which is sensitive to pH changes and aggressive regimes.</p>
          <p>Clean your piercing by gently soaking with warm, running water only- saline can effect pH. The warmth (not too hot!) helps to promote bloodflow, soaking will allow any dried build-up to soften and loosen, and the running water will wash it away without you having to touch your piercing. Do this twice daily for the first 2 weeks, drop to once a day after that unless you can see visible signs of it requiring an extra clean.</p>
          <p>Sports or gym-goers please avoid any exercises that cause even slight discomfort. Some exercises may need to be ceased completely for several weeks (cycling and horse riding to name a few). Tight, restrictive clothing made from non-natural fibres aren't ideal for regular wear either throughout healing. It's recommended to wear fibres like cotton to allow your piercing to breathe.</p>
          <p>If you engage in sexual activity during your piercing's healing period it's very important not to allow another person's bodily fluids on or near the piercing. It's equally important to consider that certain positions will provide your piercing with more/less protection from snags and potential tearing. Please listen to your body, if you feel even slight discomfort then stop/move. Communicate with any partner to be considerate and careful. Piercings in these areas are delicate and can tear if caught which is also why they are done at a minimum of 12ga. It provides stability.</p>
        </div>

        <h3 className="text-2xl font-bold border-b border-foreground/10 pb-2 mt-12">Good Practice</h3>
        <ul className="list-disc pl-6 space-y-3 text-lg">
          <li>Make caring for your piercing part of your established, daily routine</li>
          <li>Be patient, although the healing guides above state estimated lengths, every body is different. Provided you are caring for it/them sensibly, have a healthy immune system and the piercing is viable, it will heal in due time.</li>
          <li>Schedule check ups and changedowns as soon as they're due. Waiting can have adverse effects.</li>
          <li>Use a travel pillow to help protect some ear piercings you may be inclined to sleep on or as a method to keep your head elevated throughout sleeping which can help alleviate swelling in any piercings on your face/ears.</li>
          <li>Hydrate, eat healthily, address any vitamin deficiencies you may have. All these things have a knock-on effect to how easy it is for your body to heal itself.</li>
        </ul>

        <h3 className="text-2xl font-bold border-b border-foreground/10 pb-2 mt-12">Didn't Find Your Answer?</h3>
        <p className="text-lg pb-8">
          Please use the <Link href="/contact" className="font-bold underline">Contact Us</Link> page's form listed to send an enquiry.
        </p>
      </section>
    </div>
  );
}

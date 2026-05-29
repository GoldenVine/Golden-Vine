export function Jewellery() {
  return (
    <div className="w-full animate-in fade-in duration-500 space-y-12">
      
      <section className="section-cream flex flex-col md:flex-row items-center gap-10">
        <img 
          src="https://placehold.co/800x800/DEE9CE/264412?text=Our+Collection" 
          alt="Our Jewellery Collection" 
          className="w-full md:w-1/2 rounded-xl shadow-md object-cover aspect-square"
        />
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold font-serif">Our Jewellery Collection</h1>
          <p className="text-lg font-serif leading-relaxed">
            You'll find a diverse selection of premium body jewellery at Golden Vine. When it comes to solid gold and platinum with genuine precious and semi-precious gemstones, we proudly stock the exquisite pieces from BVLA, widely considered one of the world's finest body jewellery manufacturers – and we're the only studio in Bath to do so. In addition, we offer a fantastic range of implant-grade titanium jewellery from leading names such as Neometal, LeRoi, Anatometal, and Industrial Strength. Every manufacturer is chosen with meticulous care, guaranteeing your piercings are adorned with the safest and most beautiful jewellery available.
          </p>
          <p className="text-lg font-serif italic font-semibold">Find the perfect piece to express your individuality.</p>
        </div>
      </section>

      <section className="section-cream flex flex-col md:flex-row-reverse items-center gap-10">
        <img 
          src="https://placehold.co/800x800/DEE9CE/264412?text=Premium+Materials" 
          alt="Premium Jewellery Materials" 
          className="w-full md:w-1/2 rounded-xl shadow-md object-cover aspect-square"
        />
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold font-serif">Premium Materials</h2>
          <p className="text-lg font-serif leading-relaxed">
            At Golden Vine, we put your safety and comfort first. That's why all our metals are implant-grade or biocompatible, meaning they're completely safe for wear inside the human body. When it comes to gemstones, we use only natural and genuine stones like sapphires, opals, and diamonds, or lab-made alternatives chosen for their durability, such as cubic zirconia and synthetic opals (also known as fauxpals). Rest assured, every piece of jewellery is hardware-set, eliminating the need for any glues or adhesives.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg font-serif font-semibold text-primary">
            <li>14k & 18k Solid Gold (Nickel-free, available in White, Yellow, and Rose gold)</li>
            <li>ASTM F136 Implant-grade Titanium (6AL4V)</li>
            <li>ASTM F138 Implant-grade Stainless Steel</li>
            <li>Niobium</li>
          </ul>
          <p className="text-lg font-serif italic font-semibold">Jewellery you can be confident in its safety.</p>
        </div>
      </section>

      <section className="section-cream flex flex-col md:flex-row items-center gap-10">
        <img 
          src="https://placehold.co/800x800/DEE9CE/264412?text=Unique+Designs" 
          alt="Stylish Jewellery Designs" 
          className="w-full md:w-1/2 rounded-xl shadow-md object-cover aspect-square"
        />
        <div className="w-full md:w-1/2 space-y-6">
          <h3 className="text-3xl font-bold font-serif">Unique Designs</h3>
          <p className="text-lg font-serif leading-relaxed">
            We believe your body jewellery should be as unique as you are. That's why, alongside our commitment to safety and quality, we also offer an exciting selection of unique and distinctive designs. From intricate gold pieces by BVLA to the bold, modern aesthetics of our titanium range, we handpick jewellery that allows you to express your individual style and truly stand out. What's more, if you don't see exactly what you're looking for, we offer a fully custom option to bring your dream piece to life.
          </p>
          <p className="text-lg font-serif italic font-semibold">If you can imagine it, we can make it.</p>
        </div>
      </section>

      <section className="section-cream text-center space-y-10">
        <h4 className="text-3xl font-bold font-serif inline-block border-b-2 border-primary/20 pb-2">Some Highlights of Quality Jewellery</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <img src="https://placehold.co/600x600/DEE9CE/264412?text=Mirror+Finish" alt="Mirror Finish Polish" className="w-full rounded-xl shadow-sm hover:scale-105 transition-transform" />
            <h5 className="text-xl font-bold font-serif">Mirror Finish Polish</h5>
            <p className="font-serif">All jewellery is free from flaws (including hallmarks) and warrantied against defects.</p>
          </div>
          <div className="space-y-4">
            <img src="https://placehold.co/600x600/DEE9CE/264412?text=Materials" alt="Verifiable Materials" className="w-full rounded-xl shadow-sm hover:scale-105 transition-transform" />
            <h5 className="text-xl font-bold font-serif">Verifiable Materials</h5>
            <p className="font-serif">Ethically sourced materials that are traceable to origin. Safe for initial piercing and daily wear forever.</p>
          </div>
          <div className="space-y-4">
            <img src="https://placehold.co/600x600/DEE9CE/264412?text=Custom+Made" alt="Custom Made Options" className="w-full rounded-xl shadow-sm hover:scale-105 transition-transform" />
            <h5 className="text-xl font-bold font-serif">Custom Made Options</h5>
            <p className="font-serif">Talented hands are able to add a personal touch. The piece above is an example of this - eleven peach topaz gems added to signify a date to the jewellery.</p>
          </div>
        </div>
      </section>

      <section className="section-cream flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2 space-y-8 text-left">
          <div>
            <h5 className="text-2xl font-bold font-serif mb-2 text-primary">User-Friendly</h5>
            <p className="text-lg font-serif">Pieces are either push-fit (see first image of diagram) or internally threaded (second). You will be shown how your specific pieces work before you get pierced.</p>
          </div>
          <div>
            <h5 className="text-2xl font-bold font-serif mb-2 text-primary">Safe & Secure</h5>
            <p className="text-lg font-serif">Easy to install. Unless played with regularly or snagged it will likely remain in place, though regular tightening is recommended for peace of mind.</p>
          </div>
          <div>
            <h5 className="text-2xl font-bold font-serif mb-2 text-primary">Interchangeable Parts</h5>
            <p className="text-lg font-serif">Once you have the bar in place, you may purchase additional ends to give your jewellery different looks.</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-background p-8 rounded-xl shadow-inner flex items-center justify-center">
          <img src="https://placehold.co/800x800/DEE9CE/264412?text=How+To+Use+Diagram" alt="How to Use Piercing Jewellery" className="max-w-full h-auto" />
        </div>
      </section>

    </div>
  );
}

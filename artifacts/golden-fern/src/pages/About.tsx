import { FadeIn } from "@/components/FadeIn";

export function About() {
  return (
    <div className="w-full animate-in fade-in duration-500 space-y-12">
      
      <FadeIn>
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-8">About Us</h1>
          <img 
            src="/images/us.jpg" 
            alt="About Us Banner" 
            className="w-full max-w-5xl mx-auto rounded-xl shadow-lg object-cover"
          />
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream flex flex-col md:flex-row items-center gap-10">
          <img 
            src="/images/jess.jpg" 
            alt="Jess Bio" 
            className="w-full md:w-1/3 rounded-xl shadow-md object-cover aspect-[3/4]"
          />
          <div className="w-full md:w-2/3 space-y-4">
            <h2 className="text-3xl font-bold font-serif mb-4">Nice To Meet You</h2>
            <p className="text-lg font-serif leading-relaxed">
              My name's Jess. I've been piercing since 2012, awarded the prestigious Al D. scholarship to APP conference in Las Vegas in 2017 where I've been invited to return to volunteer every year since and met Jason who is now my fiancé. I strived to become APP member and UKAPP member and met that target in Jan 2020. I am First Aid & CPR trained and Trauma Informed. As of early 2021, I introduced my own line of handmade 18 karat body jewellery to our collection of quality jewellery we are proud to offer at Golden Fern, our sister studio in Bradford-on-Avon. I love natural history including geology and gemology as well as nature documentaries and designing jewellery. Oh, and dogs!
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream flex flex-col md:flex-row-reverse items-center gap-10">
          <img 
            src="/images/jason.jpg" 
            alt="Jason Bio" 
            className="w-full md:w-1/3 rounded-xl shadow-md object-cover aspect-[3/4]"
          />
          <div className="w-full md:w-2/3 space-y-4">
            <h2 className="text-3xl font-bold font-serif mb-4">Our Second Piercer</h2>
            <p className="text-lg font-serif leading-relaxed">
              My name's Jason and I've been piercing since 2012. I started my career in Ireland where I spent 5 years. In 2015 I was awarded the Al D scholarship and have been a volunteer for the annual Association of Professional Piercers conference in Las Vegas ever since which is where I met Jess in 2017, who's now my fiancée. I also became an APP member in 2017 and a member of the UKAPP in 2018. I strive to continually work in the safest most efficient way possibly whilst always bringing the quality people deserve. In my spare time you can find me throwing myself down a hill on a mountain bike which as strange as it sounds, it's one of the ways that helps me wind down and stay grounded. I'm also a super keen cook so outside of mountain biking, one of my other favourite things to do is cook incredible foods from around the world.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="section-cream flex flex-col md:flex-row items-center gap-10">
          <img 
            src="/images/ed.jpg" 
            alt="International Colleague Ed" 
            className="w-full md:w-1/3 rounded-xl shadow-md object-cover aspect-square"
          />
          <div className="w-full md:w-2/3 space-y-4">
            <h2 className="text-3xl font-bold font-serif mb-4">International Colleagues</h2>
            <p className="text-lg font-serif leading-relaxed">
              APP has members all round the globe, many are in England and throughout continental Europe but we have hundreds of contacts across North, Central, and South America, Australasia, Africa- a global network. Please Follow the link to see which verified member is closest to your location <a href="https://safepiercing.org/find-a-piercer/" target="_blank" rel="noreferrer" className="font-bold underline text-primary">APP Safe Piercing</a>. Please note, whilst APP does help folk find reputable piercers, it does not vouch for their skill, bedside manner, ethics etc. Only the environment in which they work and the quality of jewellery. Our dear friend Ed (group photo) owns his own studio <a href="https://www.safeharborbodyadornment.com/" target="_blank" rel="noreferrer" className="font-bold underline text-primary">Safe Harbour Body Adornment</a> in Philadelphia PA USA and is a wonderful human and piercer if you need East-coast assistance.
            </p>
          </div>
        </section>
      </FadeIn>

    </div>
  );
}

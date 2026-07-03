import { useState, useEffect } from "react";
import { Lightbox } from "@/components/Lightbox";
import { AccordionSection } from "@/components/AccordionSection";
import { FadeIn } from "@/components/FadeIn";

export function Booking() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    const scriptId = "setmore-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.setmore.com/integration/static/setmoreIframeLive.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const bookingImages = [
    "/images/booking1.jpg",
    "/images/booking2.jpg",
    "/images/booking3.jpg",
  ];

  const policyItems = [
    {
      id: "minimum-cost",
      title: "Minimum Cost & Payment",
      content: (
        <div className="space-y-4">
          <p>Pricing things when in the studio together is no problem and we can help work toward budgets. The minimum fee will be discussed before consent forms are filled out, procedures performed or payment taken. You are under no obligation to get pierced should you have a change of heart.</p>
          <p><strong>A piercing procedure is broken down into a few separate costs:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Piercing fee:</strong> this is the service charge to safely and expertly perform the piercing you require and varies from <strong>£20-£45</strong> depending on location.</li>
            <li><strong>Non-decorative:</strong> (the part that goes through your piercing) in an appropriate shape and size (labret, barbell, captive bead ring, circular barbell, retainer etc) <strong>£25-£40</strong></li>
            <li><strong>Decorative choices:</strong> vary <strong>from £20</strong> to upwards of <strong>£1,000</strong> as many are made from precious metals and gemstones. We have a huge array of styles, designs, colours and shapes suited to all budgets.</li>
            <li><strong>Sterile saline:</strong> aftercare is <strong>£8.50-£12</strong></li>
          </ul>
          <p><strong>Other procedures:</strong> such as jewellery removal or changeover, tapering an existing piercing open or stretching have a <strong>£5-£15</strong> procedure fee.</p>
          <p><strong>Minimum cost:</strong> most popular piercings made with non-decorative jewellery will likely be <strong>£60-£90</strong>. Figures on this page represent a guide and not a contractual confirmation of amount.</p>
          <p>Payment can be made via cash, most debit/credit cards, bank transfer or split over several of those methods for your convenience.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Transaction receipts and breakdowns are provided digitally as well as the totalled amount noted on your consent form.</li>
            <li><strong>No refunds.</strong> If you make a payment you later regret, we will not be able to cancel or refund that payment.</li>
          </ul>
        </div>
      )
    },
    {
      id: "jewellery-purchase",
      title: "Jewellery Purchase Policy",
      content: (
        <div className="space-y-4">
          <p>Jewellery that leaves the studio cannot be accepted as a return. This is for a number of reasons but primarily- health and safety. The reason for this is it negates our ability to guarantee it's remained unworn, new, and free from defect. At Golden Fern, every person getting pierced or buying jewellery here has the right to know their piece is brand new and flawless at point of purchase.</p>
          <p>We are <strong>not liable</strong> for any jewellery lost in your possession, therefore we <strong>do not</strong> offer replacements for jewellery or repairs unless you can present the jewellery.</p>
        </div>
      )
    },
    {
      id: "minimum-ages",
      title: "Minimum Ages",
      content: (
        <div className="space-y-4">
          <p>When you book an appointment you are confirming that the person getting pierced is of required age and has Photo ID (passport or driver's license)</p>
          <p>Those ages are as follows:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No Minimum</strong> for lobes ONLY. Although there are no specific age limits for piercing lobes on kids, we at Golden Fern are very particular with our process. For kids under the age of 10 we do an in-person consultation so not only can we run through the specifics with parent/legal guardian but also so we can gauge comfort level of everyone involved and to make sure you get the best experience possible with your child. Parental/legal guardian permission, accompaniment, and co-signing as well as Photo ID are necessary and adult must remain present throughout the procedure.</li>
            <li><strong>14-16</strong> for nostril, septum and helix.</li>
            <li><strong>16-18</strong> for lip, eyebrow and navel as well as all other ear piercings not listed above.</li>
            <li><strong>18+</strong> for tongue, nipple and genital piercings. Photo ID is still necessary, particularly if you think you look under 25.</li>
          </ul>
        </div>
      )
    },
    {
      id: "photo-id",
      title: "Photo ID",
      content: (
        <p>Photo ID must be <strong>government issued</strong> with a photo and date of birth. Your safest bet is to bring Driver's license or Passport. These will be photographed and attached to your consent form prior to procedure.</p>
      )
    },
    {
      id: "follow-up",
      title: "Suggested Follow-Up",
      content: (
        <div className="space-y-4">
          <p className="font-bold text-xl text-primary">Check-Ups</p>
          <p>If your appointment is for piercing we will book a complimentary check-up for 4 weeks after the appointment. This is free and strongly encouraged for your piercing's health. All it takes is part of your aftercare routine to be neglected or misunderstood and your piercing can exhibit signs of being unhappy. At this point, if you stick with your check-up we are usually able to get ahead of the problem before it becomes too established. We will discuss what's been happening between the two dates and get to the bottom of the potential source of irritation, eliminate it and tailor your aftercare routine to reflect that. Then, schedule another check-up for X weeks later to see progress.</p>
          <p>If, at your check-up, everything seems happy and healthy, it usually suggests that you have a good handle on things and to continue as you have been. We strongly encourage you to check in with us if that changes.</p>
          <p>Some people need more help than others in the healing of a piercing and that is precisely what we are here for, if you have questions or doubts, do not play the 'wait and see' game. Be proactive and contact us to schedule a further check-up. <strong>Check-ups will always be free to our piercing clients</strong>.</p>
          <p className="font-bold text-xl text-primary mt-6">Downsizing</p>
          <p>This is an important part of your healing piercing's journey and demonstrates progress from it being fresh, one step closer to that goal of a fully healed piercing.</p>
          <p>Downsizing is when the jewellery you were pierced with starts to feel/look like it's getting too long and sticking out. If left at that length it quickly becomes a potential for snagging and, in some piercings, can cause the angle to irreparably tilt, affecting how jewellery may sit at a later date or even result in the need for jewellery to be removed and let the piercing heal over.</p>
          <p>In order to get the jewellery back to an appropriate length, the original bar is removed and a new, shorter one is put in its place. The decorative end(s) you chose at the time of getting pierced will fit perfectly into this new bar and the old, longer one is given back to you in a sealed bag for safe keeping- we may need it later if you experience unexpected swelling or you lose the bar (always better to have a spare and not need it than the other way around). Being able to downsize your piercing does not mean it is healed but it is certainly good news, and well on its way to becoming a stable, mature piercing rather than a fresh wound. Stick with your aftercare routine, only changing if advised directly by your piercer.</p>
          <p>If you got more than one piercing at the same time, that does not mean they will heal at the same time nor be ready to downsize simultaneously, it's important to treat them individually and give them what they need at the right time. Sometimes this is demonstrated by a pair of lobes where one side seems to weep more, stay swollen for longer and generally be the 'problem child' in comparison to the other perfect little angel. As annoying as this can be there is always a reason, perhaps you favour sleep on that side or talk on the phone a lot. Whatever it is, if we treat each piercing individually they will get the care and attention they need, resulting in happy, healed piercings.</p>
          <p><strong>Downsizing is not free.</strong> We waive service fees on downsizes for piercings done by us, electing to help you get to the ultimate goal of a healed piercing ASAP. However, the jewellery replacing the original piece(s) will need to be paid for at the time of service, the majority of the time this will likely be a <strong>£15-£30</strong> jewellery charge per downsize.</p>
        </div>
      )
    },
    {
      id: "do-not-book",
      title: "Do Not Book To Get Pierced If",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>You are currently <strong>pregnant</strong> or have given birth within the last 3 months.</li>
            <li>You are <strong>breastfeeding</strong> a child under 3 months old.</li>
            <li>You are under 18 and don't meet the conditions stated in the minimum age section.</li>
            <li>You will be going on holiday or regularly swim/hot tub/sauna within 1-3 months.</li>
            <li>You will have to remove the piercing for work/school/have a scan coming up.</li>
            <li>You are/will be <strong>intoxicated</strong> at the time of appointment. Whether this is due to any kind of medication or drugs/alcohol, it makes you unable to consent to undergo any procedure and could have complications.</li>
          </ul>
          <p><strong>Consult with your doctor</strong> and <strong>get written consent</strong> from them for any of the following and book a consultation:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Remission</strong> from cancer or any other <strong>life-threatening illnesses</strong> in the past 12 months.</li>
            <li><strong>Reconstructive surgery</strong> in the past 12-24 months.</li>
            <li><strong>Surgical or cosmetic implants</strong> in the past 12-24 months.</li>
            <li>Have a condition that involves <strong>seizures</strong> (whether they be full or partial) and have had one in the last 6 months.</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="w-full animate-in fade-in duration-500 space-y-12 pb-12">
      
      <FadeIn>
        <section className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
          {bookingImages.map((img, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div 
                className="flex-1 rounded-xl overflow-hidden shadow-md cursor-pointer group"
                onClick={() => setLightboxImg(img)}
              >
                <img 
                  src={img} 
                  alt={`Booking info ${i + 1}`} 
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeIn>
          ))}
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="section-cream max-w-4xl mx-auto py-12 px-6 sm:px-12 text-center">
          <h1 className="text-4xl font-bold font-serif mb-10 pb-4 border-b-2 border-foreground/20 inline-block">
            Booking & Policies
          </h1>
          
          <div className="text-left w-full mx-auto">
            <AccordionSection items={policyItems} />
          </div>

          <div className="mt-16 flex justify-center">
            <a 
              id="Setmore_button_iframe" 
              href="https://goldenvine.setmore.com" /* TODO: replace with Golden Fern's own Setmore booking URL */
              target="_blank" 
              rel="noreferrer"
              className="pill-btn text-xl px-12 py-5"
            >
              Book Now
            </a>
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

import { AccordionSection } from "@/components/AccordionSection";
import { FadeIn } from "@/components/FadeIn";

export function Faqs() {
  const faqItems = [
    {
      id: "do-i-have-to-book",
      title: "Do I Have To Book?",
      content: (
        <p>Although appointments are not always essential, we strongly advise booking your visit. This ensures we can dedicate our full attention to you, meticulously prepare and clean our spaces, and manage our schedule effectively to provide the safest and most efficient service. To arrange your appointment, simply go to our Booking & Policies page and scroll down.</p>
      )
    },
    {
      id: "how-do-i-book",
      title: "How Do I Book?",
      content: (
        <div className="space-y-4">
          <p>After reading through our Booking Policies, you'll find the <strong>Book Now</strong> section below where you can schedule your visit. If you require assistance or are unsure what to book, please use the Contact Form (available under 'Contact Us') to send your booking request. Please ensure you include the following information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Procedure you are looking to book (styling session, piercing, shopping, removal, downsize, consultation etc).</li>
            <li>Your availability that correlates with the days listed there and AM or PM preference.</li>
            <li>Any ideas or inspiration you have.</li>
          </ul>
          <p>Please do not contact us on multiple platforms (we do not read or reply to DMs on IG or FB- only email) or send follow-up emails if it has only been 2 days.</p>
        </div>
      )
    },
    {
      id: "how-much",
      title: "How Much Does It Cost?",
      content: (
        <div className="space-y-4">
          <p>At Golden Fern, we ensure the highest standards. All our metals are implant-grade or biocompatible, and inert, guaranteeing they are safe to be worn inside the human body. Our gemstones are exclusively either natural and genuine (including sapphires, opals, and diamonds) or lab-made for enhanced strength (such as cubic zirconia and synthetic opals, also known as fauxpals). Furthermore, all our settings are hardware-set, meaning no glues or adhesives ever come into contact with your jewellery. Consequently, the final cost of your piercing will vary significantly based on your chosen piece.</p>
          <p>Discussing and pricing your jewellery in the studio is never a problem, and we're always happy to help work towards your budget, ensuring the core principle remains a safely executed piercing. Please be aware that our minimum fee is non-negotiable and will be clearly outlined before any consent forms are filled out, procedures begin, or payment is processed. You are, of course, under no obligation to proceed with a piercing should you change your mind – only a booking fee would be charged in such an instance.</p>
          <p><strong>A piercing procedure is broken down into a few separate costs:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Piercing fee:</strong> this is the service charge to safely and expertly perform the piercing you require and varies from £35-£45 depending on location.</li>
            <li><strong>Decorative choices:</strong> (optional) vary from £25 to upwards of £1,000 as many are made from precious metals and gemstones. We have a huge array of styles, designs, colours and shapes suited to all budgets. Pricing is discussed verbally, visually and in writing prior to commitment.</li>
            <li><strong>Sterile saline:</strong> aftercare (suggested but optional) £8.50-£12</li>
          </ul>
          <p>Other procedures such as jewellery removal or changeover, tapering an existing piercing open or stretching have a a £5-£15 procedure fee.</p>
          <p>Minimum cost for most popular piercings made with non-decorative jewellery will likely be £75-£90 though any and all pricing is finalised verbally, visually and in writing before committing to the total on the day so no shocks or accidental overspends. Figures on this page represent a guide and not a contractual confirmation of total. Transaction receipts and breakdowns are provided digitally as well as the totalled amount noted on your consent form.</p>
          <p>Payment can be made via cash, most debit/credit cards (not AmEx), bank transfer or split over several of those methods for your convenience.</p>
        </div>
      )
    },
    {
      id: "app-ukapp",
      title: "What is The APP & UKAPP?",
      content: (
        <p>APP stands for Association of Professional Piercers & is a non-profit organisation, dedicated to spreading vital health and safety information about piercing. They offer so much to the piercing industry and we are very proud to represent them. As members and also recipients of their Legacy Scholarship award (Jason in 2015 and Jess in 2017) we've always taken safety and education seriously. Please visit <a href="https://safepiercing.org/" target="_blank" rel="noreferrer" className="font-bold underline">APP Safe Piercing</a> to learn about this organisation and verify Golden Fern's membership for yourself. UKAPP is the UK's association, of which we are also a member.</p>
      )
    },
    {
      id: "warranty",
      title: "What Is Your Jewellery Warranty?",
      content: (
        <div className="space-y-4">
          <p>We strive to accommodate all repair and modification requests for your convenience. There are sometimes complications behind the scenes, therefore we wish to highlight some important information regarding our processes and reasonable expectations. Please know that we charge the absolute minimum fee possible to repair items that are not covered by our lifetime guarantee as a token of our appreciation for wearing BVLA. Modifications are accepted on a case-by-case basis and we urge you to discuss the feasibility with our team.</p>
          <p className="font-bold text-lg text-primary">What is a repair covered by the BVLA lifetime guarantee?</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Thread or Pin breakage at the solder point. *</li>
            <li>Component breakage at the solder point.</li>
            <li>Gemstone pops out when item does not appear to be damaged by user. **</li>
            <li>Gemstone discoloration when item does not appear to be damaged by user. **</li>
            <li>Loose hinges that do not appear to be damaged by user.</li>
          </ul>
          <p className="text-sm italic">*If a thread or pin breaks and the end is lost, please provide the post containing the broken segment of thread or pin as proof of breakage. We will replace the lost portion so long as proof of purchase is provided.</p>
          <p className="text-sm italic">**Pearls and Paua Shell are not covered by the BVLA lifetime guarantee as the organic nature of these items may result in problems from daily wear and exposure to chemicals or body fluids. If there is an issue with Pearl or Paua Shell within the first two weeks of purchase, please contact us for assistance.</p>
          <p className="font-bold text-lg text-primary mt-4">What is not a repair covered by the BVLA lifetime guarantee?</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Items that are cut, scratched or marred from tools used by user.</li>
            <li>Gemstone pops out when item is visually crushed, cut or marred by user.</li>
            <li>Changing a chain attachment length due to incorrect size request.</li>
            <li>Pearl and Paua Shell problems after 2 weeks of wear.</li>
            <li>Seam or hinge rings distorted or scratched by user.</li>
            <li>Seam or hinge ring size adjustments.</li>
            <li>Dirty gems – If you think a gem is discolored, first try our ultrasonic cleaning service or at least soaking in hot water and then cleaning with an electric toothbrush. Dirty gems are often mistaken for discolored gems.</li>
          </ul>
          <p className="font-bold text-lg text-primary mt-4">Realistic expectations for BVLA repairs</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Some gemstones cannot withstand heat. In this scenario, a gemstone could discolor or break during the repair process. We may need to replace the gemstone to successfully repair the item.</li>
            <li>Although rare, it is sometimes impossible to perfectly match gemstones in a repair or replacement. This is especially true for natural gemstones. We will do our best, but may reach out to offer an alternative. This could occur if the gemstone is no longer available due to production problems, or if we no longer work with the vendor that sold us the original batch of gemstones.</li>
            <li>If an item is damaged by user error, such as a marred or distorted ring, it is unlikely that we will be able to make it look brand new again. We will do our best to restore the item to a safe and beautiful state, but cannot make it new without making a new piece, which would incur a fee.</li>
            <li>Some items cannot be repaired for an equal or lower cost of labor and materials than starting anew.</li>
            <li>For repairs that are covered by the BVLA lifetime guarantee, we reserve the right to decide if we will completely remake a repair from new materials. We reserve the right to require an alternate gemstone choice from the customer if the original gem is no longer available.</li>
            <li>For repairs that are not covered by the BVLA lifetime guarantee, we may refuse to repair items that would be better suited for remaking from new materials, which would incur a fee.</li>
            <li>We do not repair any competitor jewellery.</li>
          </ul>
          <p className="font-bold text-lg text-primary mt-4">Realistic expectations for BVLA modifications</p>
          <p>There are limitations on what is possible to modify on a piece of jewellery and still yield worthy results. Sometimes it makes more sense to start anew to (a) meet our aesthetic standards and (b) avoid weakening the piece to the point of potential failure. We always aim to serve your needs, and have some of the most skilled jewelers in the world, but modifications are done on an AT YOUR OWN RISK basis. We cannot be responsible for items that fail modification processes. Please remember we offer this service as a courtesy only.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Changing out gemstones is not ideal. The piece has been polished, so there is far less metal than what we would normally work with. We either have to destroy the existing gem (often for bezel settings) or pry open the setting (typical of prongs). Regardless of the method, we are left with weakened metal that is smaller than ideal for precision work. Sometimes the metal is so weak that it does not survive another round of polishing. In items with multiple gems, the settings may not appear uniform in height due to overworked prongs. Items with beaded or intricate metal details may sustain damage to the design when working on the gemstones.</li>
            <li>In some scenarios, we are happy to change out a center gem on a cluster, but will likely refuse to change out multiple gems in a single item.</li>
            <li>Changing the length of a chain attachment may be the same amount of labor as starting with a new piece.</li>
            <li>We can shorten chain attachments. We cannot lengthen chain attachments without starting with a fresh new piece of chain. This is to ensure durability. If you want a longer chain attachment, it is best to order a new piece.</li>
            <li>Changing the diameter on decorative rings, especially with gems, is not ideal. When we try to resize a ring that contains gemstones, the gem settings are distorted which may result in the gemstones falling out. This distortion prevents us from replacing the gemstones as well. Heating up the jewellery during the modification process can also damage gemstones.</li>
            <li>Changing the diameter of a non-gemstone item can also be problematic, as it may not scale down properly, resulting in an awkward design.</li>
            <li>Making seam rings into hinge rings and vice versa doesn't usually work and is often more labor intensive than starting anew. For many of our designs, we use a separately designed casting for a hinge versus a seam ring. They may look the same to the untrained eye, but there are subtle differences in the castings which allow us to attach a seam or a hinge.</li>
            <li>We do not modify any competitor jewellery.</li>
            <li>We will consider modifying heirloom jewellery that's not made by piercing industry competitors on a case-by-case basis. Contact us before sending in items.</li>
          </ul>
        </div>
      )
    },
    {
      id: "order-for-me",
      title: "I've Seen A Piece Of Jewellery I Love, Can You Order It For Me?",
      content: (
        <p>If the maker is reputable and we hold an account then it would be our pleasure. If the maker is unknown or clearly a less than ideal standard, we will gladly find you similar pieces that are made to a higher quality and of verifiable materials. Custom orders are something we really enjoy helping with. Please visit us if you'd like to know more about custom ordering and the incredible array of gemstone options with BVLA. Our sister studio Golden Vine also stocks an array of manufacturers that we at Golden Fern do not.</p>
      )
    },
    {
      id: "design-something",
      title: "I Love The Piercings You Post, Can You Design Something For Me?",
      content: (
        <div className="space-y-4">
          <p>Absolutely! From consultations to styling sessions, we offer a lot of opportunities to get creative. Part of what we enjoy most about piercing is celebrating differences and individuality so, please prepare for your appointment and bring pictures or ideas with you for inspiration so we can get a feel for your style before making too many suggestions.</p>
          <p>Our first session can include whatever you choose to prioritise though it will always start with a consultation where we discuss your goals and break it down into attainable steps so we know we're moving in the right direction. We can give as much creative direction as you like but when it comes to do with practicality we will always mention anything we feel you should know so you can make informed decisions.</p>
        </div>
      )
    },
    {
      id: "minimum-age-id",
      title: "What Is Your Minimum Age, Do I Need Photo ID?",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>8</strong> for lobe piercings only.</li>
            <li><strong>16</strong> for several other options.</li>
            <li><strong>18+</strong> for the full array of other piercings.</li>
          </ul>
          <p>Please see Booking Policies for a detailed breakdown of these age brackets and what is required.</p>
        </div>
      )
    },
    {
      id: "dont-offer",
      title: "Why Are There Some Piercings You Don't Offer?",
      content: (
        <div className="space-y-4">
          <p>Safety. Some piercings are not safe or viable and cause lasting damage like the tongue-tip one that has recently been a trend. oral frenum, any type of tongue piercing that isn't central and vertical, surface anchors, snug, are all piercings we don't do due to lasting damage, initial risk or low chance of fully healing. We also do not offer cheeks unless you are a very experienced piercee and fit a list of requirements.</p>
          <p>Some piercings are usually viable but a person's anatomy may not allow for it- for example, navel, nipple, forward helix, rook, anti tragus, industrial, tongue, and more, require a quick anatomy consult prior to selecting jewellery. If your anatomy isn't suited to a traditional version of what you're enquiring about we can suggest viable alternatives.</p>
        </div>
      )
    },
    {
      id: "wheelchair",
      title: "Is Golden Fern Wheelchair Accessible?",
      content: (
        <p>Yes. Golden Fern is situated on the ground floor and is wheelchair accessible. Our reception and consultation area is an open, wheelchair-accessible space, the front door frame measures 74cm wide with a small step up of perhaps an inch-assistance and ramps can be provided.</p>
      )
    },
    {
      id: "parking",
      title: "Where Can I Park?",
      content: (
        <p>Bradford-on-Avon is a beautiful, quaint, English town with a lively centre. Much like nearby Bath, there is seldom on-street parking and driving around can be quite time consuming. We advise parking at either the Train station or St Margaret's Hall (next to station) and take the idyllic 5 minute walk over the River Avon (look left for swans) to our studio on The Shambles. After crossing the bridge over the river, turn left at the roundabout, walking up the narrow pavement then turn right at the large, gold post box, next to The Dandy Lion (pub), we are #3, directly opposite Opticians and there is a large logo displayed on the door.</p>
      )
    },
    {
      id: "cant-find-answer",
      title: "Can't Find The Answer To Your Question?",
      content: (
        <p>You will find most answers in FAQ or Booking Policy section but if you've read both and still have an unanswered question please head to the form on the <a href="/contact" className="font-bold underline">Contact Us</a> page and send a message.</p>
      )
    }
  ];

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12">
      <FadeIn>
        <section className="section-cream max-w-5xl mx-auto py-12 px-4 sm:px-12 text-center">
          <h1 className="text-4xl font-bold font-serif mb-10 pb-4 border-b-2 border-foreground/20 inline-block">
            FAQs
          </h1>
          <div className="text-left w-full mx-auto">
            <AccordionSection items={faqItems} />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}

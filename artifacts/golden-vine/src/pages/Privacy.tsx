import { FadeIn } from "@/components/FadeIn";
import { Seo } from "@/components/Seo";

// Privacy notice. Edit the details below if anything changes
// (business name, contact email, retention period or the services used).
const BUSINESS = "Golden Fern Piercing LTD, trading as Golden Vine";
const ADDRESS = "6 Argyle Street, Bath, BA2 4BA";
const EMAIL = "contact@goldenvinepiercing.co.uk";
const RETENTION = "two years";
const UPDATED = "November 2026";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        This notice explains how {BUSINESS} ("we", "us") looks after the personal information of our
        clients and website visitors. We are the data controller for this information. You can contact us
        about anything in this notice at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, or by writing to us at{" "}
        {ADDRESS}.
      </p>
    ),
  },
  {
    title: "What we collect",
    body: (
      <ul>
        <li><strong>Your details:</strong> name, date of birth, address, email address and, if you give it, your phone number.</li>
        <li><strong>Your appointment:</strong> the piercing or tattoo you are having, your practitioner and, for tattoos, the agreed price.</li>
        <li><strong>Health information:</strong> your answers to our health and allergy questions, and anything you tell us about medical conditions or medication.</li>
        <li><strong>Your signature</strong> on the consent form.</li>
        <li><strong>Photo ID</strong>, if you choose to upload it, so we can confirm your age.</li>
        <li><strong>Photos of your piercing or tattoo</strong>, only if you agree to this on the consent form.</li>
        <li>For under-16 piercing clients, the <strong>name and contact details of a parent or guardian</strong>.</li>
      </ul>
    ),
  },
  {
    title: "Why we use it, and our legal basis",
    body: (
      <>
        <ul>
          <li><strong>To carry out your piercing or tattoo safely</strong> and keep in touch about your appointment and aftercare. We need this information to provide the service you have asked for (contract).</li>
          <li><strong>To meet our legal duties</strong>, including checking age (it is illegal to tattoo anyone under 18) and keeping the client records expected of a business registered for skin piercing with Bath &amp; North East Somerset Council (legal obligation).</li>
          <li><strong>Health information</strong> is a special category of personal data. We only collect it with your <strong>explicit consent</strong>, which you give on the consent form, and we only use it to decide whether the procedure is safe for you and to adapt it if needed.</li>
          <li><strong>Photos of your work</strong> for our website and social media are only taken and used with your consent. You can withdraw that consent at any time by emailing us.</li>
        </ul>
        <p>We do not sell your information, and we do not use it for marketing unless you ask us to.</p>
      </>
    ),
  },
  {
    title: "Where it is kept",
    body: (
      <>
        <p>When you submit a consent form:</p>
        <ul>
          <li>A PDF copy of your form, including your health answers, signature and any ID photo, is emailed to a private studio email account (Google).</li>
          <li>Your contact and appointment details, without your health answers, are stored by our website host (Netlify).</li>
          <li>Your aftercare email is sent from our studio email account (IONOS).</li>
        </ul>
        <p>
          These companies act on our instructions and do not use your information for their own purposes.
          Some of them may store data outside the UK; where they do, they use safeguards recognised under UK
          data protection law. Access to client records is limited to the studio team, and our accounts are
          protected with strong passwords and two-step verification.
        </p>
      </>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        We keep consent forms, including health information, signatures and any ID photos, for {RETENTION} from
        your appointment. After that they are permanently deleted. If you make a complaint or claim, we may
        keep the relevant records until it is resolved.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>ask for a copy of the information we hold about you;</li>
          <li>ask us to correct anything that is wrong;</li>
          <li>ask us to delete your information, where we no longer need to keep it;</li>
          <li>withdraw your consent, for example to photos of your work, at any time;</li>
          <li>object to or ask us to limit how we use your information.</li>
        </ul>
        <p>
          To use any of these rights, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We will reply within one
          month. If you are unhappy with how we have handled your information, please tell us first so we can
          put it right. You also have the right to complain to the Information Commissioner's Office (ICO) at{" "}
          <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">ico.org.uk</a>.
        </p>
      </>
    ),
  },
  {
    title: "Our website",
    body: (
      <p>
        Our website does not use advertising or tracking cookies. The consent form remembers whether you
        turned on easy-read mode, and that setting is stored only on your own device. The Instagram feed on our home page shows images hosted by Instagram.
      </p>
    ),
  },
];

export function Privacy() {
  return (
    <div className="w-full animate-in fade-in duration-500 space-y-12">
      <Seo
        title="Privacy Notice"
        description="How Golden Vine in Bath collects, uses and protects your personal information, including consent form and health details."
        path="/privacy"
      />
      <FadeIn>
        <section className="section-cream space-y-8 max-w-3xl mx-auto privacy-notice">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold font-serif">Privacy Notice</h1>
            <p className="text-sm opacity-70">Last updated {UPDATED}</p>
          </div>
          {SECTIONS.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2 className="text-2xl font-bold font-serif">{section.title}</h2>
              <div className="space-y-3 leading-relaxed">{section.body}</div>
            </div>
          ))}
        </section>
      </FadeIn>
    </div>
  );
}

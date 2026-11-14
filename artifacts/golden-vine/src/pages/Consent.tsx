import {
  type ChangeEvent,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Download,
  Eye,
  FileCheck2,
  LockKeyhole,
  Paperclip,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UnlockKeyhole,
  Upload,
  X,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { Seo } from "@/components/Seo";

type Step = 0 | 1 | 2 | 3;
type FormType = "piercing" | "tattoo";
type FieldErrors = Record<string, string>;

type FormValues = {
  referrals: string[];
  practitioner: string;
  guestPractitionerName: string;
  fullName: string;
  dateOfBirth: string;
  address: string;
  postcode: string;
  phone: string;
  email: string;
  piercingArea: string;
  tattooDesign: string;
  tattooPrice: string;
  legalAgeDeclaration: boolean;
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianEmail: string;
  bloodborne: string;
  eating: string;
  intoxication: string;
  pregnancy: string;
  bloodThinners: string;
  skinCondition: string;
  skinMedication: string;
  medicalConditions: string;
  medicalConditionsAcknowledged: boolean;
  allergies: string;
  latex: string;
  chlorhexidine: string;
  iodine: string;
  aluminium: string;
  inkAllergy: string;
  adhesiveAllergy: string;
  ointmentAllergy: string;
  risks: boolean;
  release: boolean;
  questions: boolean;
  aftercare: boolean;
  changes: boolean;
  document: boolean;
  photography: string;
  downsizing: boolean;
  designApproval: boolean;
  healingResults: boolean;
};

type IdFile = {
  name: string;
  type: string;
  size: number;
  file: File;
};

const initialValues: FormValues = {
  referrals: [],
  practitioner: "Jason",
  guestPractitionerName: "",
  fullName: "",
  dateOfBirth: "",
  address: "",
  postcode: "",
  phone: "",
  email: "",
  piercingArea: "",
  tattooDesign: "",
  tattooPrice: "",
  legalAgeDeclaration: false,
  guardianName: "",
  guardianRelationship: "",
  guardianPhone: "",
  guardianEmail: "",
  bloodborne: "",
  eating: "",
  intoxication: "",
  pregnancy: "",
  bloodThinners: "",
  skinCondition: "",
  skinMedication: "",
  medicalConditions: "",
  medicalConditionsAcknowledged: false,
  allergies: "",
  latex: "",
  chlorhexidine: "",
  iodine: "",
  aluminium: "",
  inkAllergy: "",
  adhesiveAllergy: "",
  ointmentAllergy: "",
  risks: false,
  release: false,
  questions: false,
  aftercare: false,
  changes: false,
  document: false,
  photography: "",
  downsizing: false,
  designApproval: false,
  healingResults: false,
};

const stepNames = ["Your details", "Health & safety", "Consent & ID", "Review"];
const referralOptions = ["Facebook", "Instagram", "Google", "Family / Friends", "Other"];
const formEndpoint = import.meta.env.BASE_URL || "/";
const MAX_ID_UPLOAD_BYTES = 7 * 1024 * 1024;
const EASY_READ_STORAGE_KEY = "golden-vine-easy-read";
const piercingConsentPolicies = [
  ["risks", "Risks & duress", "I understand that known and unknown risks can lead to injury, including infection, scarring, keloids, and allergic reactions. Having been informed of the potential risks associated with getting a piercing, I still wish to proceed and freely accept all risks that may arise. I confirm that I am voluntarily getting a piercing without duress."],
  ["release", "Release", "I give full consent to the Artist and Studio to perform the piercing named above. I waive and release, to the fullest extent permitted by law, the Artist and Studio from all liability whatsoever for any claim or cause I may have for personal injury, including direct or consequential damage caused by not following aftercare instructions or by trauma from outside sources after the initial procedure."],
  ["questions", "Questions", "The Artist and the Studio have given me ample opportunity to ask any and all questions about the piercing procedure, and they have been answered to my total satisfaction."],
  ["aftercare", "Aftercare", "I confirm that I have been given instructions on the care of my piercing while it is healing. I understand and will follow them without deviation. I acknowledge that a piercing may become infected, particularly if I do not follow the instructions."],
  ["changes", "Permanent change", "I acknowledge that piercing will result in a permanent change to my appearance and that my skin may not be restored to its pre-piercing condition, even after jewellery is removed."],
  ["document", "This document", "I acknowledge that I have had adequate opportunity to read and understand this document, that it was not presented to me at the last minute, and that I understand I am signing a legal contract."],
  ["downsizing", "Downsizing", "I understand that my piercing(s) will initially be fitted with a larger or longer piece of jewellery to allow for natural swelling. Smaller or shorter jewellery will likely, but not always, need to be fitted during healing. This downsize is ultimately optional but important for safe healing. Labrets are £20 each, and I am entitled to a free fitting fee on piercings carried out at Golden Vine. I understand that leaving this too long or deciding against it may have detrimental effects on my piercings’ health."],
] as const;
const piercingHealthQuestions = [
  ["bloodborne", "Do you have any bloodborne pathogens, transmittable diseases, or recent illnesses?", "It is okay if you do; we ask for our safety and the safety of others."],
  ["eating", "Have you eaten in the past four hours?", "It is not always necessary, but eating beforehand can help increase your blood sugar levels."],
  ["intoxication", "Are you under the influence of narcotics or alcohol?", ""],
  ["pregnancy", "Are you pregnant or breastfeeding?", ""],
] as const;
const piercingSensitivityQuestions = [
  ["latex", "Allergy or sensitivity to latex?", ""],
  ["chlorhexidine", "Allergy or sensitivity to chlorhexidine gluconate?", "Found in products such as Corsodyl mouthwash."],
  ["iodine", "Allergy or sensitivity to iodine?", "If you are allergic to iodine, you may also be allergic to soy sauce."],
  ["aluminium", "Allergy or sensitivity to aluminium?", "Found in some antiperspirant deodorants."],
] as const;

// Tattoo consent form wording. Edit the text here to change the tattoo form.
const tattooConsentPolicies = [
  ["risks", "Risks & duress", "I understand that known and unknown risks can lead to injury, including infection, scarring, and allergic reactions to pigments, which can sometimes appear years later. Having been informed of the potential risks associated with getting a tattoo, I still wish to proceed and freely accept all risks that may arise. I confirm that I am voluntarily getting a tattoo without duress."],
  ["designApproval", "Design & placement", "I have checked the design, size, colours, placement, and the spelling of any lettering, and I approve them. I understand that the Artist and Studio are not responsible for any error in a design I have approved."],
  ["release", "Release", "I give full consent to the Artist and Studio to perform the tattoo described above. I waive and release, to the fullest extent permitted by law, the Artist and Studio from all liability whatsoever for any claim or cause I may have for personal injury, including direct or consequential damage caused by not following aftercare instructions or by trauma from outside sources after the tattoo is completed."],
  ["questions", "Questions", "The Artist and the Studio have given me ample opportunity to ask any and all questions about the tattooing procedure, and they have been answered to my total satisfaction."],
  ["aftercare", "Aftercare", "I confirm that I have been given instructions on caring for my tattoo while it is healing. I understand and will follow them. I acknowledge that a tattoo may become infected or heal poorly, particularly if I do not follow the instructions."],
  ["healingResults", "Healing & touch-ups", "I understand that every person’s skin heals differently and that lines, colour, and shading can settle, soften, or fade during healing. Any touch-up is at the Artist’s discretion, and results can be affected by sun exposure, skin type, and how well the aftercare is followed."],
  ["changes", "Permanent change", "I acknowledge that a tattoo is a permanent change to my appearance. Removal is not guaranteed, can be costly, and may leave scarring."],
  ["document", "This document", "I acknowledge that I have had adequate opportunity to read and understand this document, that it was not presented to me at the last minute, and that I understand I am signing a legal contract."],
] as const;
const tattooHealthQuestions = [
  ["bloodborne", "Do you have any bloodborne pathogens, transmittable diseases, or recent illnesses?", "It is okay if you do; we ask for our safety and the safety of others."],
  ["eating", "Have you eaten in the past four hours?", "Eating beforehand helps keep your blood sugar steady during a longer session."],
  ["intoxication", "Are you under the influence of narcotics or alcohol, or have you drunk alcohol in the past 24 hours?", "Alcohol thins the blood and can affect how the ink settles."],
  ["bloodThinners", "Have you taken aspirin, ibuprofen, or any blood-thinning medication in the past 24 hours?", "These can increase bleeding during your tattoo."],
  ["pregnancy", "Are you pregnant or breastfeeding?", ""],
  ["skinCondition", "Do you have sunburn, a rash, cuts, moles, raised scars, or a skin condition on or near the area being tattooed?", ""],
  ["skinMedication", "Are you taking, or have you taken in the last six months, isotretinoin (Roaccutane) or other strong acne medication?", "These can make skin more fragile."],
] as const;
const tattooSensitivityQuestions = [
  ["latex", "Allergy or sensitivity to latex?", ""],
  ["inkAllergy", "Have you ever reacted to tattoo ink, hair dye, or henna?", "Red pigments are the most common cause of ink reactions."],
  ["adhesiveAllergy", "Allergy or sensitivity to plasters or adhesive tattoo wrap?", "Some tattoos are covered with a breathable film after the session."],
  ["ointmentAllergy", "Allergy or sensitivity to petroleum jelly or aftercare creams?", ""],
] as const;

type ChoiceQuestion = readonly [keyof FormValues & string, string, string];
type ConsentPolicy = readonly [keyof FormValues & string, string, string];

// Everything that differs between the piercing and tattoo forms.
const FORM_CONFIG = {
  piercing: {
    label: "Piercing",
    title: "Piercing consent form",
    practitioners: ["Jason", "Jess", "Guest Piercer"],
    guestOption: "Guest Piercer",
    practitionerNoun: "piercer",
    activity: "piercing",
    areaKey: "piercingArea" as const,
    areaLabel: "Body piercing",
    areaPlaceholder: "e.g. left nostril",
    areaError: "Please tell us where you are being pierced.",
    appointmentHeading: "Choose your piercer and piercing.",
    minimumAge: 0,
    ageDeclaration: <><strong>I declare that I am of legal age and competent to sign this agreement with valid proof of age.</strong> If I am under 16, my parent or legal guardian will sign on my behalf and confirms they understand and agree to this document.</>,
    ageDeclarationText: "I declare that I am of legal age and competent to sign this agreement with valid proof of age. If I am under 16, my parent or legal guardian will sign on my behalf.",
    healthQuestions: piercingHealthQuestions as readonly ChoiceQuestion[],
    sensitivityQuestions: piercingSensitivityQuestions as readonly ChoiceQuestion[],
    consentPolicies: piercingConsentPolicies as readonly ConsentPolicy[],
    allergyPlaceholder: "Tell us about metals, adhesives, medicines, or other allergies.",
    intro: "This consent form helps your piercer understand you and prepare a safe, considered appointment. Take your time — most people finish in about five minutes.",
  },
  tattoo: {
    label: "Tattoo",
    title: "Tattoo consent form",
    practitioners: ["Manuel", "Elina", "Guest Artist"],
    guestOption: "Guest Artist",
    practitionerNoun: "artist",
    activity: "tattooing",
    areaKey: "tattooDesign" as const,
    areaLabel: "Tattoo design & placement",
    areaPlaceholder: "e.g. fine line rose, left forearm",
    areaError: "Please describe your tattoo and where it is going.",
    appointmentHeading: "Choose your artist and tattoo.",
    minimumAge: 18,
    ageDeclaration: <><strong>I confirm that I am 18 or over and can show valid photo ID.</strong> I understand that it is against UK law to tattoo anyone under 18, even with a parent’s consent.</>,
    ageDeclarationText: "I confirm that I am 18 or over and can show valid photo ID. I understand that it is against UK law to tattoo anyone under 18, even with a parent's consent.",
    healthQuestions: tattooHealthQuestions as readonly ChoiceQuestion[],
    sensitivityQuestions: tattooSensitivityQuestions as readonly ChoiceQuestion[],
    consentPolicies: tattooConsentPolicies as readonly ConsentPolicy[],
    allergyPlaceholder: "Tell us about inks, dyes, adhesives, creams, medicines, or other allergies.",
    intro: "This consent form helps your artist understand you and prepare a safe, considered appointment. Take your time — most people finish in about five minutes.",
  },
} satisfies Record<FormType, unknown>;

// Fields that only belong to one form, so they are left out of the other
// form's Netlify submission.
const FORM_ONLY_FIELDS: Record<FormType, Array<keyof FormValues>> = {
  piercing: ["piercingArea", "guardianName", "guardianRelationship", "guardianPhone", "guardianEmail", "chlorhexidine", "iodine", "aluminium", "downsizing"],
  tattoo: ["tattooDesign", "tattooPrice", "bloodThinners", "skinCondition", "skinMedication", "inkAllergy", "adhesiveAllergy", "ointmentAllergy", "designApproval", "healingResults"],
};

// Health answers are special category data. They are only sent to the studio
// inside the emailed PDF and are never stored in Netlify Forms.
const HEALTH_FIELDS: Array<keyof FormValues> = [
  "bloodborne", "eating", "intoxication", "pregnancy", "bloodThinners", "skinCondition", "skinMedication",
  "medicalConditions", "allergies", "latex", "chlorhexidine", "iodine", "aluminium",
  "inkAllergy", "adhesiveAllergy", "ointmentAllergy",
];

const UNDER_18_MESSAGE = "By UK law, we can’t tattoo anyone under 18, even with a parent’s consent.";

function isUnderTattooAge(formType: FormType, dateOfBirth: string) {
  const age = getAge(dateOfBirth);
  return formType === "tattoo" && age !== null && age < FORM_CONFIG.tattoo.minimumAge;
}

function readInitialFormType(): FormType {
  try {
    const value = new URLSearchParams(window.location.search).get("form");
    return value === "tattoo" ? "tattoo" : "piercing";
  } catch {
    return "piercing";
  }
}

function readEasyReadPreference() {
  try {
    const stored = window.localStorage.getItem(EASY_READ_STORAGE_KEY);
    if (stored === "on" || stored === "off") return stored === "on";
  } catch {
    // Fall through to the first-party cookie.
  }
  const cookie = document.cookie.split("; ").find((entry) => entry.startsWith(`${EASY_READ_STORAGE_KEY}=`))?.split("=")[1];
  return cookie === "on" ? true : cookie === "off" ? false : null;
}

function saveEasyReadPreference(enabled: boolean) {
  const value = enabled ? "on" : "off";
  try {
    window.localStorage.setItem(EASY_READ_STORAGE_KEY, value);
  } catch {
    // The cookie below remains available if localStorage is blocked.
  }
  document.cookie = `${EASY_READ_STORAGE_KEY}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

function getAge(dateOfBirth: string) {
  if (!dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(`${dateOfBirth}T00:00:00`);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) age -= 1;
  return age >= 0 && age < 130 ? age : null;
}

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function ErrorText({ message }: { message?: string }) {
  return message ? <span className="ns-error" role="alert"><AlertCircle size={13} />{message}</span> : null;
}

function FieldLabel({ htmlFor, children, hint }: { htmlFor: string; children: ReactNode; hint?: string }) {
  return <label className="ns-label" htmlFor={htmlFor}>{children}{hint ? <span className="ns-label-hint"> — {hint}</span> : null}</label>;
}

function ChoiceGroup({
  name,
  value,
  options,
  onChange,
  error,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <>
      <div className="ns-option-grid" role="radiogroup" aria-label={name}>
        {options.map((option) => {
          const id = `${name}-${option.toLowerCase().replaceAll(" ", "-").replaceAll("’", "")}`;
          return <label className="ns-option" htmlFor={id} key={option}>
            <input id={id} name={name} type="radio" value={option} checked={value === option} onChange={() => onChange(option)} />
            <span>{option}</span>
          </label>;
        })}
      </div>
      <ErrorText message={error} />
    </>
  );
}

function SignaturePad({ value, onChange, error }: { value: string; onChange: (value: string) => void; error?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const hasDrawnRef = useRef(Boolean(value));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !value) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const image = new Image();
    image.onload = () => context.drawImage(image, 0, 0, canvas.width, canvas.height);
    image.src = value;
  }, [value]);

  const pointFromEvent = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: ((event.clientX - rect.left) / rect.width) * canvas.width, y: ((event.clientY - rect.top) / rect.height) * canvas.height };
  };

  const startDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    canvas.setPointerCapture(event.pointerId);
    const point = pointFromEvent(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.strokeStyle = "#23343a";
    context.lineWidth = 3.2;
    context.lineCap = "round";
    context.lineJoin = "round";
    drawingRef.current = true;
    hasDrawnRef.current = true;
  };

  const draw = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    const point = pointFromEvent(event);
    context.lineTo(point.x, point.y);
    context.stroke();
  };

  const finishDrawing = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    if (canvasRef.current && hasDrawnRef.current) onChange(canvasRef.current.toDataURL("image/png"));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawnRef.current = false;
    onChange("");
  };

  return <div>
    <div className="ns-signature-wrap" style={{ borderColor: error ? "var(--coral)" : undefined }}>
      <div className="ns-signature-head">
        <span>{value ? "Signature captured" : "Draw with your finger or mouse"}</span>
        <button className="ns-clear" type="button" onClick={clear}><RotateCcw size={12} /> Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        className="ns-canvas"
        width="1200"
        height="350"
        aria-label="Handwritten signature area"
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={finishDrawing}
        onPointerCancel={finishDrawing}
        onPointerLeave={finishDrawing}
      />
    </div>
    {!value ? <div className="ns-signature-empty" aria-hidden="true">Your signature goes here</div> : null}
    <ErrorText message={error} />
  </div>;
}

function Progress({ step }: { step: Step }) {
  return <aside className="ns-progress" aria-label="Form progress">
    <p className="ns-progress-heading">Your progress</p>
    <ol className="ns-progress-list">
      {stepNames.map((name, index) => <li className={`ns-progress-item ${index === step ? "is-active" : ""} ${index < step ? "is-done" : ""}`} key={name}>
        <span className="ns-progress-number">{index < step ? <Check size={13} /> : index + 1}</span>
        <span>{name}</span>
        {index < stepNames.length - 1 ? <span className="ns-progress-rule" aria-hidden="true" /> : null}
      </li>)}
    </ol>
  </aside>;
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return <div className="ns-section-heading"><h2 className="ns-section-title">{title}</h2><span className="ns-section-index">{index}</span></div>;
}

function Header({ easyRead, onToggleEasyRead, isAutomatic }: { easyRead: boolean; onToggleEasyRead: () => void; isAutomatic: boolean }) {
  return <header className="ns-header"><div className="ns-header-inner">
    <div className="ns-wordmark"><span className="ns-mark" aria-hidden="true" /><span className="ns-wordmark-text">Golden Vine</span></div>
    <button className={`ns-accessibility-toggle ${easyRead ? "is-active" : ""}`} type="button" aria-pressed={easyRead} onClick={onToggleEasyRead} title={isAutomatic ? "Easy-read mode is on for landscape. Tap to turn it off." : "Toggle easy-read mode"}>
      <Eye size={15} /><span>Easy-read {easyRead ? "on" : "off"}</span>
    </button>
    <div className="ns-header-note"><ShieldCheck size={15} /><span>Private, considered, yours</span></div>
  </div></header>;
}

function DetailsStep({
  formType,
  values,
  errors,
  toggleReferral,
  updateValue,
  isPractitionerLocked,
  setIsPractitionerLocked,
}: {
  formType: FormType;
  values: FormValues;
  errors: FieldErrors;
  toggleReferral: (value: string) => void;
  updateValue: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
  isPractitionerLocked: boolean;
  setIsPractitionerLocked: (locked: boolean) => void;
}) {
  const config = FORM_CONFIG[formType];
  const areaKey = config.areaKey;
  const age = getAge(values.dateOfBirth);
  return <section className="ns-section" aria-labelledby="details-heading">
    <SectionHeading index="01 / 04" title="Let’s start with you." />
    <p className="ns-section-intro" id="details-heading">The practical details let us greet you properly and keep in touch if anything changes before your visit.</p>
    <div className="ns-card ns-card-pad">
      <fieldset className="ns-fieldset"><legend className="ns-legend">How did you hear about us?</legend><div className="ns-referral">
        {referralOptions.map((option) => <label className="ns-checkline" key={option}><input type="checkbox" name="referrals" value={option} checked={values.referrals.includes(option)} onChange={() => toggleReferral(option)} /><span>{option}</span></label>)}
      </div></fieldset>
    </div>
    <div className={`ns-card ns-card-pad ns-practitioner-card ${isPractitionerLocked ? "is-locked" : ""}`}>
      <div className="ns-practitioner-card-heading"><div><p className="ns-kicker ns-kicker-small">Your appointment details</p><h3 className="ns-policy-title">{config.appointmentHeading}</h3><p className="ns-policy-copy">Once these details are correct, lock them in before completing the rest of the form.</p></div>
        <button type="button" className={`ns-lock-button ${isPractitionerLocked ? "is-locked" : ""}`} onClick={() => setIsPractitionerLocked(!isPractitionerLocked)} aria-pressed={isPractitionerLocked}>{isPractitionerLocked ? <LockKeyhole size={16} /> : <UnlockKeyhole size={16} />}<span>{isPractitionerLocked ? "Details locked" : "Lock details"}</span></button>
      </div>
      <div className="ns-grid ns-grid-2">
        <div className="ns-field"><FieldLabel htmlFor="practitioner">Practitioner</FieldLabel><select className="ns-select" id="practitioner" name="practitioner" value={values.practitioner} onChange={(event) => updateValue("practitioner", event.target.value)} disabled={isPractitionerLocked} aria-invalid={Boolean(errors.practitioner)}>{config.practitioners.map((name) => <option key={name}>{name}</option>)}</select><ErrorText message={errors.practitioner} /></div>
        {values.practitioner === config.guestOption ? <div className="ns-field"><FieldLabel htmlFor="guestPractitionerName">{config.guestOption}’s name</FieldLabel><input className="ns-input" id="guestPractitionerName" name="guestPractitionerName" value={values.guestPractitionerName} onChange={(event) => updateValue("guestPractitionerName", event.target.value)} placeholder="Enter their full name" disabled={isPractitionerLocked} aria-invalid={Boolean(errors.guestPractitionerName)} /><ErrorText message={errors.guestPractitionerName} /></div> : null}
        <div className="ns-field"><FieldLabel htmlFor={areaKey}>{config.areaLabel}</FieldLabel><input className="ns-input" id={areaKey} name={areaKey} value={values[areaKey]} onChange={(event) => updateValue(areaKey, event.target.value)} placeholder={config.areaPlaceholder} disabled={isPractitionerLocked} aria-invalid={Boolean(errors[areaKey])} /><ErrorText message={errors[areaKey]} /></div>
        {formType === "tattoo" ? <div className="ns-field"><FieldLabel htmlFor="tattooPrice">Agreed price</FieldLabel><div className="ns-price-input"><span aria-hidden="true">£</span><input className="ns-input" id="tattooPrice" name="tattooPrice" inputMode="numeric" value={values.tattooPrice} onChange={(event) => updateValue("tattooPrice", event.target.value.replace(/[^0-9]/g, ""))} placeholder="e.g. 120" disabled={isPractitionerLocked} aria-invalid={Boolean(errors.tattooPrice)} /></div><ErrorText message={errors.tattooPrice} /></div> : null}
      </div>
      {isPractitionerLocked ? <p className="ns-lock-note"><LockKeyhole size={13} /> Practitioner, {config.areaLabel.toLowerCase()}{formType === "tattoo" ? " and price" : ""} are locked in. Tap the button to edit them.</p> : null}
    </div>
    <div className="ns-card ns-card-pad"><div className="ns-grid ns-grid-2">
      <div className="ns-field ns-field-wide"><FieldLabel htmlFor="fullName">Full name</FieldLabel><input className="ns-input" id="fullName" name="fullName" value={values.fullName} onChange={(event) => updateValue("fullName", event.target.value)} placeholder="As shown on your ID" aria-invalid={Boolean(errors.fullName)} /><ErrorText message={errors.fullName} /></div>
      <div className="ns-field"><FieldLabel htmlFor="dateOfBirth">Date of birth</FieldLabel><input className="ns-input" id="dateOfBirth" name="dateOfBirth" type="date" value={values.dateOfBirth} onChange={(event) => updateValue("dateOfBirth", event.target.value)} aria-invalid={Boolean(errors.dateOfBirth) || isUnderTattooAge(formType, values.dateOfBirth)} />{age !== null ? <span className="ns-age" aria-live="polite">Age: <strong>{age}</strong></span> : null}{isUnderTattooAge(formType, values.dateOfBirth) && !errors.dateOfBirth ? <ErrorText message={UNDER_18_MESSAGE} /> : <ErrorText message={errors.dateOfBirth} />}</div>
      <div className="ns-field ns-field-wide"><FieldLabel htmlFor="address">Street address</FieldLabel><input className="ns-input" id="address" name="address" value={values.address} onChange={(event) => updateValue("address", event.target.value)} placeholder="Street number and street name" aria-invalid={Boolean(errors.address)} /><ErrorText message={errors.address} /></div>
      <div className="ns-field"><FieldLabel htmlFor="postcode">Postcode</FieldLabel><input className="ns-input" id="postcode" name="postcode" value={values.postcode} onChange={(event) => updateValue("postcode", event.target.value)} placeholder="Postcode" aria-invalid={Boolean(errors.postcode)} /><ErrorText message={errors.postcode} /></div>
      <div className="ns-field"><FieldLabel htmlFor="phone" hint="optional">Mobile number</FieldLabel><input className="ns-input" id="phone" name="phone" type="tel" value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} placeholder="+44" /></div>
      <div className="ns-field"><FieldLabel htmlFor="email">Email address</FieldLabel><input className="ns-input" id="email" name="email" type="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} /><ErrorText message={errors.email} /></div>
    </div></div>
    <div className="ns-card ns-card-pad"><label className="ns-checkline"><input type="checkbox" name="legalAgeDeclaration" value="Yes" checked={values.legalAgeDeclaration} onChange={(event) => updateValue("legalAgeDeclaration", event.target.checked)} aria-invalid={Boolean(errors.legalAgeDeclaration)} /><span>{config.ageDeclaration}</span></label><ErrorText message={errors.legalAgeDeclaration} />
      {formType === "piercing" && age !== null && age < 16 ? <div className="ns-grid ns-grid-2 ns-guardian-grid">
        <div className="ns-field"><FieldLabel htmlFor="guardianName">Parent / legal guardian name</FieldLabel><input className="ns-input" id="guardianName" name="guardianName" value={values.guardianName} onChange={(event) => updateValue("guardianName", event.target.value)} placeholder="Full name" aria-invalid={Boolean(errors.guardianName)} /><ErrorText message={errors.guardianName} /></div>
        <div className="ns-field"><FieldLabel htmlFor="guardianRelationship">Relationship</FieldLabel><input className="ns-input" id="guardianRelationship" name="guardianRelationship" value={values.guardianRelationship} onChange={(event) => updateValue("guardianRelationship", event.target.value)} placeholder="e.g. parent" aria-invalid={Boolean(errors.guardianRelationship)} /><ErrorText message={errors.guardianRelationship} /></div>
        <div className="ns-field"><FieldLabel htmlFor="guardianPhone" hint="optional">Guardian phone</FieldLabel><input className="ns-input" id="guardianPhone" name="guardianPhone" type="tel" value={values.guardianPhone} onChange={(event) => updateValue("guardianPhone", event.target.value)} placeholder="+44" /></div>
        <div className="ns-field"><FieldLabel htmlFor="guardianEmail" hint="optional">Guardian email</FieldLabel><input className="ns-input" id="guardianEmail" name="guardianEmail" type="email" value={values.guardianEmail} onChange={(event) => updateValue("guardianEmail", event.target.value)} placeholder="guardian@example.com" /></div>
      </div> : null}
    </div>
  </section>;
}

function HealthStep({ formType, values, errors, updateValue }: { formType: FormType; values: FormValues; errors: FieldErrors; updateValue: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void }) {
  const config = FORM_CONFIG[formType];
  return <section className="ns-section" aria-labelledby="health-heading">
    <SectionHeading index="02 / 04" title="Your wellbeing comes first." />
    <p className="ns-section-intro" id="health-heading">Answer honestly and privately. These questions help your {config.practitionerNoun} adapt the appointment or recommend another time if needed.</p>
    <div className="ns-notice"><Sparkles size={17} /><span>This is not medical advice or a diagnosis. If you are unsure how a condition or medication may affect {config.activity}, please speak with a qualified healthcare professional before your appointment.</span></div>
     <div className="ns-card ns-card-pad"><div className="ns-grid">{config.healthQuestions.map(([name, title, hint]) => <fieldset className="ns-fieldset" key={name}><legend className="ns-legend">{title}{hint ? <span className="ns-legend-note">{hint}</span> : null}</legend><ChoiceGroup name={name} value={String(values[name])} options={name === "eating" ? ["Yes", "No"] : ["No", "Yes"]} onChange={(value) => updateValue(name, value as never)} error={errors[name]} /></fieldset>)}</div></div>
    <div className="ns-card ns-card-pad"><div className="ns-grid">
      <div className="ns-field"><FieldLabel htmlFor="medicalConditions" hint="optional">Medical conditions, medications, or anything we should know</FieldLabel><textarea className="ns-textarea" id="medicalConditions" name="medicalConditions" value={values.medicalConditions} onChange={(event) => updateValue("medicalConditions", event.target.value)} placeholder="Include lupus, autoimmune conditions, heart or blood pressure conditions, blood thinners, haemophilia, epilepsy, diabetes, infections, psoriasis, impetigo, or anything else relevant." /></div>
      <div className="ns-field"><FieldLabel htmlFor="allergies" hint="optional">Other allergies or sensitivities</FieldLabel><textarea className="ns-textarea" id="allergies" name="allergies" value={values.allergies} onChange={(event) => updateValue("allergies", event.target.value)} placeholder={config.allergyPlaceholder} /></div>
       {config.sensitivityQuestions.map(([name, title, hint]) => <fieldset className="ns-fieldset" key={name}><legend className="ns-legend">{title}{hint ? <span className="ns-legend-note">{hint}</span> : null}</legend><ChoiceGroup name={name} value={String(values[name])} options={["No", "Yes", "I’m not sure"]} onChange={(value) => updateValue(name, value as never)} error={errors[name]} /></fieldset>)}
      <label className="ns-checkline"><input type="checkbox" name="medicalConditionsAcknowledged" value="Yes" checked={values.medicalConditionsAcknowledged} onChange={(event) => updateValue("medicalConditionsAcknowledged", event.target.checked)} aria-invalid={Boolean(errors.medicalConditionsAcknowledged)} /><span><strong>I have disclosed any medical condition, medication, skin condition, infection, or healing concern</strong> that could affect this procedure. If a doctor has prescribed preventive antibiotics for an invasive procedure, I have followed that advice and told my {config.practitionerNoun}. <strong>I give my explicit consent for Golden Vine to collect and keep my health answers</strong>, only to check this procedure is safe for me, as explained in the <a href="/privacy" target="_blank" rel="noreferrer" className="underline">privacy notice</a>.</span></label><ErrorText message={errors.medicalConditionsAcknowledged} />
    </div></div>
    <div className="ns-notice"><AlertCircle size={17} /><span>For your safety, studio staff may pause or refuse a service if you appear unfit to proceed, including if you are intoxicated, unwell, or unable to give informed consent.</span></div>
  </section>;
}

function ConsentStep({
  formType, values, errors, updateValue, signature, setSignature, idFiles, fileError, readFile, removeFile, idInputRef, cameraInputRef,
}: {
  formType: FormType;
  values: FormValues;
  errors: FieldErrors;
  updateValue: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
  signature: string;
  setSignature: (value: string) => void;
  idFiles: IdFile[];
  fileError: string;
  readFile: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  removeFile: (index: number) => void;
  idInputRef: React.RefObject<HTMLInputElement | null>;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const config = FORM_CONFIG[formType];
  return <section className="ns-section" aria-labelledby="consent-heading">
    <SectionHeading index="03 / 04" title="Read, then make it yours." />
    <p className="ns-section-intro" id="consent-heading">Consent should feel informed, never rushed. Please read each point carefully. Photography is optional; every other acknowledgment is required.</p>
    <div className="ns-card ns-card-pad"><div className="ns-policy-list">
       {config.consentPolicies.map(([key, title, copy]) => <div className="ns-policy-item" key={key}><h3 className="ns-policy-title">{title}</h3><p className="ns-policy-copy">{copy}</p><label className="ns-checkline"><input type="checkbox" name={key} value="Yes" checked={Boolean(values[key])} onChange={(event) => updateValue(key, event.target.checked as never)} aria-invalid={Boolean(errors[key])} /><span><strong>I acknowledge this.</strong></span></label><ErrorText message={errors[key]} /></div>)}
      <div className="ns-policy-item"><h3 className="ns-policy-title">Photography</h3><p className="ns-policy-copy">I consent to having pictures of my {formType === "tattoo" ? "tattoo" : "piercing"} taken, release all rights to photographs taken of me, and give consent in advance to their reproduction in print or electronic form.</p><ChoiceGroup name="photography" value={values.photography} options={["Yes, I consent", "No, thank you"]} onChange={(value) => updateValue("photography", value)} /></div>
    </div></div>
    <div className="ns-notice"><FileCheck2 size={17} /><span>If any provision, section, subsection, clause, or phrase of this release is found to be unenforceable or invalid, that portion will be severed. The remainder of this contract will be construed as though the unenforceable portion had never been included.</span></div>
    <div className="ns-card ns-card-pad"><div className="ns-grid">
      <div><h3 className="ns-policy-title">Your handwritten signature</h3><p className="ns-policy-copy">By signing, you confirm that your answers are truthful and that you have had the opportunity to ask your {config.practitionerNoun} questions.</p><SignaturePad value={signature} onChange={setSignature} error={errors.signature} /></div>
      <div className="ns-upload"><div><h3 className="ns-policy-title">Government-issued photo ID</h3><p className="ns-policy-copy">You may upload a clear photo of your ID if you would like to provide it in advance. This step is optional; you can continue without adding a photo.</p></div>
        <div className="ns-upload-actions"><input ref={idInputRef} className="ns-file-input" id="id-upload" name="id-photo" type="file" accept="image/*" multiple onChange={readFile} /><input ref={cameraInputRef} className="ns-file-input" id="id-camera" name="id-photo-camera" type="file" accept="image/*" capture="environment" onChange={readFile} /><label className="ns-file-button" htmlFor="id-upload"><Upload size={15} /> Choose photo</label><label className="ns-file-button is-secondary" htmlFor="id-camera"><Camera size={15} /> Use camera</label></div>
        {idFiles.length ? <div className="ns-upload-files">{idFiles.map((file, index) => <div className="ns-upload-preview" key={`${file.name}-${index}`}><div><strong>{file.name}</strong><span>{(file.size / 1024 / 1024).toFixed(1)} MB · photo ready</span></div><button type="button" className="ns-clear" onClick={() => removeFile(index)} aria-label={`Remove uploaded ID ${index + 1}`}><X size={15} /></button></div>)}</div> : <div className="ns-upload-preview"><Paperclip size={15} /><span>No ID photo added yet</span></div>}<ErrorText message={fileError} />
      </div>
    </div></div>
  </section>;
}

function ReviewStep({
  formType,
  values,
  signature,
  idFiles,
  confirmationCode,
  confirmationCodeError,
  onConfirmationCodeChange,
}: {
  formType: FormType;
  values: FormValues;
  signature: string;
  idFiles: IdFile[];
  confirmationCode: string;
  confirmationCodeError?: string;
  onConfirmationCodeChange: (value: string) => void;
}) {
  const config = FORM_CONFIG[formType];
  const rows = [
    ["Consent form", config.label], ["Name", values.fullName], ["Address", `${values.address} · ${values.postcode}`], ["Contact", `${values.email}${values.phone ? ` · ${values.phone}` : ""}`],
    ["Practitioner", practitionerLabel(values, formType)], [config.areaLabel, values[config.areaKey]], ...(formType === "tattoo" ? [["Agreed price", formatPrice(values.tattooPrice)]] : []),
    ...(formType === "piercing" ? [["Guardian", values.guardianName ? `${values.guardianName} · ${values.guardianRelationship}` : "Not required"]] : []), ["Health screening", `Complete — answers shared with your ${config.practitionerNoun}`],
    ["Photography", values.photography || "Not chosen"], ["Signature", signature ? "Captured" : "Missing"], ["Photo ID", idFiles.length ? `${idFiles.length} photo${idFiles.length === 1 ? "" : "s"} attached` : "Not provided (optional)"],
  ];
  return <section className="ns-section" aria-labelledby="review-heading"><SectionHeading index="04 / 04" title="A final look together." /><p className="ns-section-intro" id="review-heading">Please check the details below. You can use Previous to make any changes before submitting.</p><div className="ns-review">{rows.map(([label, value]) => <div className="ns-review-row" key={label}><span className="ns-review-label">{label}</span><span className="ns-review-value">{value || "Not provided"}</span></div>)}</div><div className="ns-notice"><FileCheck2 size={17} /><span>When you submit, your answers are sent securely to Golden Vine, and a copy with your signature and any ID photos goes privately to the studio.</span></div><div className="ns-card ns-card-pad ns-confirmation-code"><div className="ns-field"><FieldLabel htmlFor="confirmation-code">Final confirmation code</FieldLabel><p className="ns-policy-copy">Enter the four-digit code provided by Golden Vine to confirm that you have reviewed everything above.</p><input className="ns-input ns-code-input" id="confirmation-code" inputMode="numeric" autoComplete="off" maxLength={4} pattern="[0-9]{4}" value={confirmationCode} onChange={(event) => onConfirmationCodeChange(event.target.value.replace(/\D/g, "").slice(0, 4))} aria-invalid={Boolean(confirmationCodeError)} aria-describedby="confirmation-code-help" /><span className="ns-label-hint" id="confirmation-code-help">This code is not saved with your consent form.</span><ErrorText message={confirmationCodeError} /></div></div></section>;
}

function formatPrice(value: string) {
  const amount = Number(value);
  return value.trim() && Number.isFinite(amount) ? `£${amount}` : "";
}

function practitionerLabel(values: FormValues, formType: FormType) {
  const guest = FORM_CONFIG[formType].guestOption;
  return values.practitioner === guest ? `${values.guestPractitionerName} (${guest})` : values.practitioner;
}

function pdfSafe(value: string) {
  return value
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/—/g, "-")
    .replace(/…/g, "...")
    .replace(/£/g, "GBP ");
}

function fileToPdfImage(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The ID photo could not be read."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("The ID photo could not be prepared for download."));
      image.onload = () => {
        const maxDimension = 1400;
        const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("The ID photo could not be prepared for download."));
          return;
        }
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", .82));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

async function createConsentPdf(values: FormValues, signature: string, idFiles: IdFile[], formType: FormType) {
  const config = FORM_CONFIG[formType];
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 46;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const addText = (text: string, size = 10, weight: "normal" | "bold" = "normal", gap = 8) => {
    doc.setFont("helvetica", weight);
    doc.setFontSize(size);
    doc.setTextColor(41, 57, 62);
    const lines = doc.splitTextToSize(pdfSafe(text || "Not provided"), contentWidth) as string[];
    const lineHeight = size * 1.4;
    for (const line of lines) {
      if (y > pageHeight - margin - lineHeight) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }
    y += gap;
  };

  const addSection = (title: string) => {
    if (y > pageHeight - 100) {
      doc.addPage();
      y = margin;
    }
    y += 8;
    doc.setDrawColor(180, 166, 126);
    doc.setLineWidth(.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 23;
    addText(title, 15, "bold", 10);
  };

  const addField = (label: string, value: string) => {
    addText(label, 9, "bold", 2);
    addText(value, 11, "normal", 7);
  };

  const addImage = (dataUrl: string, width: number, height: number) => {
    if (y + height > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.addImage(dataUrl, "JPEG", margin, y, width, height);
    y += height + 14;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(23);
  doc.setTextColor(35, 52, 58);
  doc.text("Golden Vine", margin, y);
  y += 27;
  addText(`Participant copy of ${config.title.toLowerCase()}`, 15, "normal", 4);
  addText(`Submitted ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}`, 9, "normal", 14);

  addSection("Your details");
  addField("Full name", values.fullName);
  addField("Date of birth", values.dateOfBirth);
  addField("Address", `${values.address} · ${values.postcode}`);
  addField("Contact", `${values.email}${values.phone ? ` · ${values.phone}` : ""}`);
  addField("Practitioner", practitionerLabel(values, formType));
  addField(config.areaLabel, values[config.areaKey]);
  if (formType === "tattoo") addField("Agreed price", formatPrice(values.tattooPrice));
  addField("How you heard about us", values.referrals.length ? values.referrals.join(", ") : "Not provided");
  addField("Age declaration", values.legalAgeDeclaration ? `Confirmed: ${config.ageDeclarationText}` : "Not confirmed");
  if (formType === "piercing" && values.guardianName) addField("Parent / legal guardian", `${values.guardianName} · ${values.guardianRelationship}`);

  addSection("Health & safety");
  for (const [key, title] of config.healthQuestions) addField(title, String(values[key]));
  for (const [key, title] of config.sensitivityQuestions) addField(title, String(values[key]));
  addField("Medical conditions, medications, or anything to know", values.medicalConditions);
  addField("Other allergies or sensitivities", values.allergies);
  addField("Health disclosure acknowledgement", values.medicalConditionsAcknowledged ? "Confirmed" : "Not confirmed");

  addSection("Consent acknowledgements");
  for (const [key, title, copy] of config.consentPolicies) {
    addText(title, 11, "bold", 3);
    addText(copy, 10, "normal", 2);
    addText(`Acknowledged: ${values[key] ? "Yes" : "No"}`, 10, "bold", 9);
  }
  addText("Photography", 11, "bold", 3);
  addText(`I consent to having pictures of my ${formType === "tattoo" ? "tattoo" : "piercing"} taken, release all rights to photographs taken of me, and give consent in advance to their reproduction in print or electronic form.`, 10, "normal", 2);
  addText(`Photography choice: ${values.photography || "Not chosen"}`, 10, "bold", 9);
  addText("If any provision, section, subsection, clause, or phrase of this release is found to be unenforceable or invalid, that portion will be severed. The remainder of this contract will be construed as though the unenforceable portion had never been included.", 9, "normal", 10);

  addSection("Signature and documents");
  addField("Handwritten signature", signature ? "Captured below" : "Missing");
  if (signature) {
    if (y > pageHeight - 130) {
      doc.addPage();
      y = margin;
    }
    doc.addImage(signature, "PNG", margin, y, 210, 78);
    y += 92;
  }
  addField("Government-issued photo ID", idFiles.length ? `${idFiles.length} image${idFiles.length === 1 ? "" : "s"} submitted with the secure studio record` : "Not provided (optional)");
  if (idFiles.length) {
    addText("ID images are included in this studio copy because they were provided with the consent form. They are never sent to the client.", 9, "normal", 8);
    for (const [index, item] of idFiles.entries()) {
      const imageData = await fileToPdfImage(item.file);
      const imageProperties = doc.getImageProperties(imageData);
      const width = Math.min(contentWidth, 430);
      const height = width * (imageProperties.height / imageProperties.width);
      addText(`ID image ${index + 1} — ${item.name}`, 9, "bold", 4);
      addImage(imageData, width, height);
    }
  } else {
    addText("This downloaded copy includes the completed answers and signature. No ID images were provided.", 9, "normal", 0);
  }

  return {
    // Keep the PDF bytes and filename, but present the blob as a generic
    // downloadable file so Safari does not open its PDF preview viewer.
    blob: new Blob([doc.output("arraybuffer")], { type: "application/octet-stream" }),
    name: `golden-vine-${formType}-consent-${(values.fullName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "copy")}.pdf`,
  };
}

async function downloadConsentCopy(values: FormValues, signature: string, idFiles: IdFile[], formType: FormType) {
  const pdf = await createConsentPdf(values, signature, idFiles, formType);
  const { blob, name } = pdf;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  return pdf;
}

// Emails the finished PDF to the studio's storage inbox (see
// netlify/functions/consent-archive.ts). formType picks the email subject.
async function emailStudioCopy(pdf: { blob: Blob; name: string }, values: FormValues, formType: FormType) {
  const pdfBase64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The studio copy could not be prepared."));
    reader.onload = () => resolve(String(reader.result).replace(/^data:[^,]+,/, ""));
    reader.readAsDataURL(pdf.blob);
  });
  const response = await fetch("/.netlify/functions/consent-archive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formType,
      clientName: values.fullName.trim(),
      submittedAt: new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }),
      fileName: pdf.name,
      pdfBase64,
    }),
  });
  if (response.status === 503) return "unconfigured" as const;
  if (!response.ok) throw new Error(`Studio copy email failed (${response.status})`);
  return "sent" as const;
}

// Sends the client their aftercare email from the studio address
// (see netlify/functions/send-aftercare.ts).
async function sendClientConfirmation(values: FormValues, formType: FormType) {
  const response = await fetch("/.netlify/functions/send-aftercare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, email: values.email.trim(), name: values.fullName.trim() }),
  });
  if (response.status === 503) return "unconfigured" as const;
  if (!response.ok) throw new Error(`Aftercare email failed (${response.status})`);
  return "sent" as const;
}

export function Consent() {
  const [step, setStep] = useState<Step>(0);
  const [formType, setFormType] = useState<FormType>(readInitialFormType);
  const [values, setValues] = useState<FormValues>(() => ({ ...initialValues, practitioner: FORM_CONFIG[readInitialFormType()].practitioners[0] }));
  const [signature, setSignature] = useState("");
  const [idFiles, setIdFiles] = useState<IdFile[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"sent" | "unconfigured" | "failed" | null>(null);
  const [archiveStatus, setArchiveStatus] = useState<"sent" | "unconfigured" | "failed" | null>(null);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [fileError, setFileError] = useState("");
  const [isPractitionerLocked, setIsPractitionerLocked] = useState(false);
  const [isLandscapeCoarse, setIsLandscapeCoarse] = useState(false);
  const [easyReadPreference, setEasyReadPreference] = useState<boolean | null>(readEasyReadPreference);
  const formRef = useRef<HTMLFormElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: landscape) and (pointer: coarse)");
    const updateOrientation = () => setIsLandscapeCoarse(mediaQuery.matches);
    updateOrientation();
    mediaQuery.addEventListener("change", updateOrientation);
    return () => mediaQuery.removeEventListener("change", updateOrientation);
  }, []);

  const easyRead = easyReadPreference ?? isLandscapeCoarse;
  const toggleEasyRead = () => {
    const next = !easyRead;
    setEasyReadPreference(next);
    saveEasyReadPreference(next);
  };
  // Emails the PDF to the studio inbox. If that fails, the success screen
  // offers a manual download as a fallback.
  const sendStudioCopy = async () => {
    let pdf: { blob: Blob; name: string };
    try {
      pdf = await createConsentPdf(values, signature, idFiles, formType);
    } catch (error) {
      console.error("The consent copy could not be created.", error);
      setArchiveStatus("failed");
      return;
    }
    try {
      setArchiveStatus(await emailStudioCopy(pdf, values, formType));
    } catch (error) {
      console.error("The studio copy could not be emailed.", error);
      setArchiveStatus("failed");
    }
  };

  const updateValue = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };
  const switchFormType = (next: FormType) => {
    if (next === formType) return;
    setFormType(next);
    setValues((current) => ({ ...current, practitioner: FORM_CONFIG[next].practitioners[0], guestPractitionerName: "" }));
    setIsPractitionerLocked(false);
    setErrors({});
    try {
      const url = new URL(window.location.href);
      if (next === "tattoo") url.searchParams.set("form", "tattoo");
      else url.searchParams.delete("form");
      window.history.replaceState(null, "", url);
    } catch {
      // The address bar simply won't update.
    }
  };
  const toggleReferral = (referral: string) => updateValue("referrals", values.referrals.includes(referral) ? values.referrals.filter((item) => item !== referral) : [...values.referrals, referral]);

  const validateStep = (targetStep: Step) => {
    const next: FieldErrors = {};
    const config = FORM_CONFIG[formType];
    if (targetStep === 0) {
      if (!values.fullName.trim()) next.fullName = "Please enter your full name.";
      if (!values.dateOfBirth) next.dateOfBirth = "Please add your date of birth.";
      if (!values.address.trim()) next.address = "Please add your street address.";
      if (!values.postcode.trim()) next.postcode = "Please add your postcode.";
      if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email address.";
      if (!values.practitioner) next.practitioner = "Please choose a practitioner.";
      if (values.practitioner === config.guestOption && !values.guestPractitionerName.trim()) next.guestPractitionerName = `Please add the ${config.guestOption.toLowerCase()}’s name.`;
      if (!values[config.areaKey].trim()) next[config.areaKey] = config.areaError;
      if (formType === "tattoo" && !/^\d+$/.test(values.tattooPrice.trim())) next.tattooPrice = "Please enter the agreed price in pounds, e.g. 120.";
      if (!values.legalAgeDeclaration) next.legalAgeDeclaration = "Please confirm your age and signing authority.";
      const age = getAge(values.dateOfBirth);
      if (isUnderTattooAge(formType, values.dateOfBirth)) next.dateOfBirth = UNDER_18_MESSAGE;
      if (formType === "piercing" && (age ?? 16) < 16) {
        if (!values.guardianName.trim()) next.guardianName = "Please add the parent or legal guardian’s name.";
        if (!values.guardianRelationship.trim()) next.guardianRelationship = "Please add their relationship to you.";
      }
    }
    if (targetStep === 1) {
      for (const [key] of [...config.healthQuestions, ...config.sensitivityQuestions]) if (!values[key]) next[key] = "Please choose an answer.";
      if (!values.medicalConditionsAcknowledged) next.medicalConditionsAcknowledged = "Please confirm you have disclosed anything that may affect healing.";
    }
    if (targetStep === 2) {
      for (const [key] of config.consentPolicies) if (!values[key]) next[key] = "Please acknowledge this before continuing.";
      if (!signature) next.signature = "Please add your handwritten signature.";
    }
    setErrors((current) => ({ ...current, ...next }));
    return Object.keys(next).length === 0;
  };
  const goToStep = (nextStep: Step) => {
    if (nextStep > step && !validateStep(step)) {
      window.setTimeout(() => formRef.current?.querySelector('[aria-invalid="true"]')?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return;
    }
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const readFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setFileError("");
    if (files.some((file) => !file.type.startsWith("image/"))) return setFileError("Please choose a photo of a government-issued ID.");
    const totalBytes = [...idFiles.map((item) => item.file), ...files].reduce((total, file) => total + file.size, 0);
    if (totalBytes > MAX_ID_UPLOAD_BYTES) return setFileError("Please keep all ID images under 7 MB in total so Netlify can accept them safely.");
    setIdFiles((current) => [...current, ...files.map((file) => ({ name: file.name, type: file.type, size: file.size, file }))]);
    event.target.value = "";
  };
  const removeFile = (index: number) => {
    setIdFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
    setFileError("");
    if (idInputRef.current) idInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const appendValues = (data: FormData) => {
    const otherType: FormType = formType === "tattoo" ? "piercing" : "tattoo";
    for (const key of Object.keys(values) as Array<keyof FormValues>) {
      data.delete(key);
      if (FORM_ONLY_FIELDS[otherType].includes(key) || HEALTH_FIELDS.includes(key)) continue;
      const value = values[key];
      data.set(key, Array.isArray(value) ? value.join(", ") : typeof value === "boolean" ? (value ? "Yes" : "No") : value);
    }
    data.set("form-name", "consent");
    data.set("formType", FORM_CONFIG[formType].label);
    data.set("health-answers", "In the emailed PDF only");
    data.set("signature-captured", signature ? "Yes" : "No");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (step < 3) {
      goToStep((step + 1) as Step);
      return;
    }
    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) {
      setStep(0);
      window.setTimeout(() => formRef.current?.querySelector('[aria-invalid="true"]')?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return;
    }
    if (confirmationCode !== "1111") {
      setErrors((current) => ({ ...current, confirmationCode: "Please enter the four-digit confirmation code before submitting." }));
      window.setTimeout(() => formRef.current?.querySelector('[aria-invalid="true"]')?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return;
    }
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const data = new FormData(formRef.current || undefined);
      appendValues(data);
      // The signature and ID photos travel only in the PDF emailed to the
      // studio inbox. They are not uploaded to Netlify Forms, whose free file
      // storage is small and would suspend the whole site if exceeded.
      data.delete("signature");
      data.delete("id-photo");
      data.delete("id-photo-camera");
      data.set("id-photos-provided", idFiles.length ? `${idFiles.length} (in emailed PDF)` : "None");
      const body = new URLSearchParams();
      data.forEach((value, key) => { if (typeof value === "string") body.append(key, value); });
      const response = await fetch(formEndpoint, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (!response.ok) throw new Error("Netlify could not receive your form. Please try again.");
       try {
         setEmailStatus(await sendClientConfirmation(values, formType));
       } catch (error) {
         console.error("The client confirmation email failed.", error);
         setEmailStatus("failed");
       }
       setSubmitted(true);
       window.scrollTo({ top: 0, behavior: "smooth" });
       void sendStudioCopy();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div className={`ns-shell ${easyRead ? "is-easy-read" : ""}`}>
    <Seo title="Consent form" description="Complete your Golden Vine consent form before your appointment." path="/consent" noindex />
    <Header easyRead={easyRead} onToggleEasyRead={toggleEasyRead} isAutomatic={easyReadPreference === null && isLandscapeCoarse} />
    {submitted ? <main className="ns-main"><section className="ns-success" aria-live="polite">
      <div className="ns-success-mark"><Check size={31} strokeWidth={2.3} /></div><p className="ns-kicker">Received by Golden Vine</p><h1 className="ns-success-title">You’re all set.</h1>
       <p className="ns-success-copy">Thank you for taking the time to share this with us. Your consent form has been securely received by the studio team, and we’ll talk through everything again when you arrive.</p>
      {emailStatus === "sent" ? <p className="ns-confirmation-note">A confirmation copy has also been sent to {values.email}.</p> : null}
      {emailStatus === "unconfigured" ? <p className="ns-confirmation-note">Your form is safely with the studio. We’ll confirm any appointment details with you directly.</p> : null}
      {emailStatus === "failed" ? <p className="ns-confirmation-note">Your form is safely with the studio. We’ll confirm any appointment details with you directly.</p> : null}
      <p className="ns-privacy">Your information is stored securely by Golden Vine and kept for two years. See our <a href="/privacy" target="_blank" rel="noreferrer" className="underline">privacy notice</a> for details.</p>
      {archiveStatus === "sent" ? <p className="ns-privacy">Studio copy saved.</p> : null}
      {archiveStatus === "failed" || archiveStatus === "unconfigured" ? <p className="ns-privacy">Studio note: the emailed copy didn’t go through.{" "}
        <button type="button" className="underline font-semibold" onClick={() => void downloadConsentCopy(values, signature, idFiles, formType).catch((error) => console.error("The consent copy could not be downloaded.", error))}>Download a copy instead</button></p> : null}
    </section></main> : <main className="ns-main">
      <section className="ns-intro"><div className="ns-intro-art" aria-hidden="true"><img src={asset("images/gv-app-logo.webp")} alt="" /><span className="ns-intro-art-line" /></div><p className="ns-kicker">Before your appointment</p><h1 className="ns-title">A little care before we begin.</h1><p className="ns-intro-copy">{FORM_CONFIG[formType].intro}</p>
        {step === 0 ? <><div className="ns-form-switch" role="group" aria-label="Choose your consent form">{(["piercing", "tattoo"] as const).map((type) => <button key={type} type="button" className={`ns-form-switch-button ${formType === type ? "is-active" : ""}`} aria-pressed={formType === type} onClick={() => switchFormType(type)}>{FORM_CONFIG[type].label}</button>)}</div><p className="ns-form-switch-note">You’re filling in the {FORM_CONFIG[formType].title.toLowerCase()}.</p></> : <p className="ns-form-switch-note">{FORM_CONFIG[formType].title}</p>}</section>
      <div className="ns-flow"><Progress step={step} /><form ref={formRef} className="ns-form" name="consent" method="POST" action={formEndpoint} data-netlify="true" onSubmit={submit} noValidate><input type="hidden" name="form-name" value="consent" /><input type="hidden" name="bot-field" value="" aria-hidden="true" />
        {step === 0 ? <DetailsStep formType={formType} values={values} errors={errors} toggleReferral={toggleReferral} updateValue={updateValue} isPractitionerLocked={isPractitionerLocked} setIsPractitionerLocked={setIsPractitionerLocked} /> : null}
        {step === 1 ? <HealthStep formType={formType} values={values} errors={errors} updateValue={updateValue} /> : null}
        {step === 2 ? <ConsentStep formType={formType} values={values} errors={errors} updateValue={updateValue} signature={signature} setSignature={setSignature} idFiles={idFiles} fileError={fileError} readFile={readFile} removeFile={removeFile} idInputRef={idInputRef} cameraInputRef={cameraInputRef} /> : null}
         {step === 3 ? <ReviewStep formType={formType} values={values} signature={signature} idFiles={idFiles} confirmationCode={confirmationCode} confirmationCodeError={errors.confirmationCode} onConfirmationCodeChange={(value) => { setConfirmationCode(value); setErrors((current) => { if (!current.confirmationCode) return current; const next = { ...current }; delete next.confirmationCode; return next; }); }} /> : null}
        {submitError ? <div className="ns-submit-error" role="alert"><AlertCircle size={17} />{submitError}</div> : null}
        <div className="ns-actions"><div className="ns-actions-note"><LockKeyhole size={14} /> Saved only when you submit</div><div className="ns-button-row">{step > 0 ? <button className="ns-button ns-button-quiet" type="button" onClick={() => goToStep((step - 1) as Step)}><ArrowLeft size={15} /> Previous</button> : <span />}{step < 3 ? <button className="ns-button ns-button-primary" type="button" disabled={step === 0 && isUnderTattooAge(formType, values.dateOfBirth)} onClick={() => goToStep((step + 1) as Step)}>Continue <ArrowRight size={15} /></button> : <button className="ns-button ns-button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending securely…" : "Submit consent"}{!isSubmitting ? <Check size={15} /> : null}</button>}</div></div>
        <p className="ns-privacy">Privacy note: your details are sent securely to Golden Vine, and your health answers, signature and any ID images go privately to the studio. We keep consent forms for two years; see our <a href="/privacy" target="_blank" rel="noreferrer" className="underline">privacy notice</a>. This form is not medical advice; please speak to a qualified healthcare professional about health concerns.</p>
      </form></div>
    </main>}
    <footer className="ns-footer">Golden Vine · Consent & client details</footer>
  </div>;
}
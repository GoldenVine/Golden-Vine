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
import { Seo } from "@/components/Seo";

type Step = 0 | 1 | 2 | 3;
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
  legalAgeDeclaration: boolean;
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianEmail: string;
  bloodborne: string;
  eating: string;
  intoxication: string;
  pregnancy: string;
  medicalConditions: string;
  medicalConditionsAcknowledged: boolean;
  allergies: string;
  latex: string;
  chlorhexidine: string;
  iodine: string;
  aluminium: string;
  risks: boolean;
  release: boolean;
  questions: boolean;
  aftercare: boolean;
  changes: boolean;
  document: boolean;
  photography: string;
  downsizing: boolean;
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
  legalAgeDeclaration: false,
  guardianName: "",
  guardianRelationship: "",
  guardianPhone: "",
  guardianEmail: "",
  bloodborne: "",
  eating: "",
  intoxication: "",
  pregnancy: "",
  medicalConditions: "",
  medicalConditionsAcknowledged: false,
  allergies: "",
  latex: "",
  chlorhexidine: "",
  iodine: "",
  aluminium: "",
  risks: false,
  release: false,
  questions: false,
  aftercare: false,
  changes: false,
  document: false,
  photography: "",
  downsizing: false,
};

const stepNames = ["Your details", "Health & safety", "Consent & ID", "Review"];
const referralOptions = ["Facebook", "Instagram", "Google", "Family / Friends", "Other"];
const formEndpoint = import.meta.env.BASE_URL || "/";
const MAX_ID_UPLOAD_BYTES = 7 * 1024 * 1024;

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
          return <div className="ns-option" key={option}>
            <input id={id} name={name} type="radio" value={option} checked={value === option} onChange={() => onChange(option)} />
            <label htmlFor={id}>{option}</label>
          </div>;
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

function Header() {
  return <header className="ns-header"><div className="ns-header-inner">
    <div className="ns-wordmark"><span className="ns-mark" aria-hidden="true" /><span className="ns-wordmark-text">Golden Vine Piercing</span></div>
    <div className="ns-header-note"><ShieldCheck size={15} /><span>Private, considered, yours</span></div>
  </div></header>;
}

function DetailsStep({
  values,
  errors,
  toggleReferral,
  updateValue,
  isPractitionerLocked,
  setIsPractitionerLocked,
}: {
  values: FormValues;
  errors: FieldErrors;
  toggleReferral: (value: string) => void;
  updateValue: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
  isPractitionerLocked: boolean;
  setIsPractitionerLocked: (locked: boolean) => void;
}) {
  return <section className="ns-section" aria-labelledby="details-heading">
    <SectionHeading index="01 / 04" title="Let’s start with you." />
    <p className="ns-section-intro" id="details-heading">The practical details let us greet you properly and keep in touch if anything changes before your visit.</p>
    <div className="ns-card ns-card-pad">
      <fieldset className="ns-fieldset"><legend className="ns-legend">How did you hear about us?</legend><div className="ns-referral">
        {referralOptions.map((option) => <label className="ns-checkline" key={option}><input type="checkbox" name="referrals" value={option} checked={values.referrals.includes(option)} onChange={() => toggleReferral(option)} /><span>{option}</span></label>)}
      </div></fieldset>
    </div>
    <div className={`ns-card ns-card-pad ns-practitioner-card ${isPractitionerLocked ? "is-locked" : ""}`}>
      <div className="ns-practitioner-card-heading"><div><p className="ns-kicker ns-kicker-small">Your appointment details</p><h3 className="ns-policy-title">Choose your piercer and piercing.</h3><p className="ns-policy-copy">Once these details are correct, lock them in before completing the rest of the form.</p></div>
        <button type="button" className={`ns-lock-button ${isPractitionerLocked ? "is-locked" : ""}`} onClick={() => setIsPractitionerLocked(!isPractitionerLocked)} aria-pressed={isPractitionerLocked}>{isPractitionerLocked ? <LockKeyhole size={16} /> : <UnlockKeyhole size={16} />}<span>{isPractitionerLocked ? "Details locked" : "Lock details"}</span></button>
      </div>
      <div className="ns-grid ns-grid-2">
        <div className="ns-field"><FieldLabel htmlFor="practitioner">Practitioner</FieldLabel><select className="ns-select" id="practitioner" name="practitioner" value={values.practitioner} onChange={(event) => updateValue("practitioner", event.target.value)} disabled={isPractitionerLocked} aria-invalid={Boolean(errors.practitioner)}><option>Jason</option><option>Jess</option><option>Guest Piercer</option></select><ErrorText message={errors.practitioner} /></div>
        {values.practitioner === "Guest Piercer" ? <div className="ns-field"><FieldLabel htmlFor="guestPractitionerName">Guest piercer’s name</FieldLabel><input className="ns-input" id="guestPractitionerName" name="guestPractitionerName" value={values.guestPractitionerName} onChange={(event) => updateValue("guestPractitionerName", event.target.value)} placeholder="Enter their full name" disabled={isPractitionerLocked} aria-invalid={Boolean(errors.guestPractitionerName)} /><ErrorText message={errors.guestPractitionerName} /></div> : null}
        <div className="ns-field"><FieldLabel htmlFor="piercingArea">Body piercing</FieldLabel><input className="ns-input" id="piercingArea" name="piercingArea" value={values.piercingArea} onChange={(event) => updateValue("piercingArea", event.target.value)} placeholder="e.g. left nostril" disabled={isPractitionerLocked} aria-invalid={Boolean(errors.piercingArea)} /><ErrorText message={errors.piercingArea} /></div>
      </div>
      {isPractitionerLocked ? <p className="ns-lock-note"><LockKeyhole size={13} /> Practitioner and body piercing are locked in. Tap the button to edit them.</p> : null}
    </div>
    <div className="ns-card ns-card-pad"><div className="ns-grid ns-grid-2">
      <div className="ns-field ns-field-wide"><FieldLabel htmlFor="fullName">Full name</FieldLabel><input className="ns-input" id="fullName" name="fullName" value={values.fullName} onChange={(event) => updateValue("fullName", event.target.value)} placeholder="As shown on your ID" aria-invalid={Boolean(errors.fullName)} /><ErrorText message={errors.fullName} /></div>
      <div className="ns-field"><FieldLabel htmlFor="dateOfBirth">Date of birth</FieldLabel><input className="ns-input" id="dateOfBirth" name="dateOfBirth" type="date" value={values.dateOfBirth} onChange={(event) => updateValue("dateOfBirth", event.target.value)} aria-invalid={Boolean(errors.dateOfBirth)} /><ErrorText message={errors.dateOfBirth} /></div>
      <div className="ns-field ns-field-wide"><FieldLabel htmlFor="address">Street address</FieldLabel><input className="ns-input" id="address" name="address" value={values.address} onChange={(event) => updateValue("address", event.target.value)} placeholder="Street number and street name" aria-invalid={Boolean(errors.address)} /><ErrorText message={errors.address} /></div>
      <div className="ns-field"><FieldLabel htmlFor="postcode">Postcode</FieldLabel><input className="ns-input" id="postcode" name="postcode" value={values.postcode} onChange={(event) => updateValue("postcode", event.target.value)} placeholder="Postcode" aria-invalid={Boolean(errors.postcode)} /><ErrorText message={errors.postcode} /></div>
      <div className="ns-field"><FieldLabel htmlFor="phone" hint="optional">Mobile number</FieldLabel><input className="ns-input" id="phone" name="phone" type="tel" value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} placeholder="+44" /></div>
      <div className="ns-field"><FieldLabel htmlFor="email">Email address</FieldLabel><input className="ns-input" id="email" name="email" type="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} /><ErrorText message={errors.email} /></div>
    </div></div>
    <div className="ns-card ns-card-pad"><label className="ns-checkline"><input type="checkbox" name="legalAgeDeclaration" value="Yes" checked={values.legalAgeDeclaration} onChange={(event) => updateValue("legalAgeDeclaration", event.target.checked)} aria-invalid={Boolean(errors.legalAgeDeclaration)} /><span><strong>I declare that I am of legal age and competent to sign this agreement with valid proof of age.</strong> If I am under 16, my parent or legal guardian will sign on my behalf and confirms they understand and agree to this document.</span></label><ErrorText message={errors.legalAgeDeclaration} />
      {getAge(values.dateOfBirth) !== null && getAge(values.dateOfBirth)! < 16 ? <div className="ns-grid ns-grid-2 ns-guardian-grid">
        <div className="ns-field"><FieldLabel htmlFor="guardianName">Parent / legal guardian name</FieldLabel><input className="ns-input" id="guardianName" name="guardianName" value={values.guardianName} onChange={(event) => updateValue("guardianName", event.target.value)} placeholder="Full name" aria-invalid={Boolean(errors.guardianName)} /><ErrorText message={errors.guardianName} /></div>
        <div className="ns-field"><FieldLabel htmlFor="guardianRelationship">Relationship</FieldLabel><input className="ns-input" id="guardianRelationship" name="guardianRelationship" value={values.guardianRelationship} onChange={(event) => updateValue("guardianRelationship", event.target.value)} placeholder="e.g. parent" aria-invalid={Boolean(errors.guardianRelationship)} /><ErrorText message={errors.guardianRelationship} /></div>
        <div className="ns-field"><FieldLabel htmlFor="guardianPhone" hint="optional">Guardian phone</FieldLabel><input className="ns-input" id="guardianPhone" name="guardianPhone" type="tel" value={values.guardianPhone} onChange={(event) => updateValue("guardianPhone", event.target.value)} placeholder="+44" /></div>
        <div className="ns-field"><FieldLabel htmlFor="guardianEmail" hint="optional">Guardian email</FieldLabel><input className="ns-input" id="guardianEmail" name="guardianEmail" type="email" value={values.guardianEmail} onChange={(event) => updateValue("guardianEmail", event.target.value)} placeholder="guardian@example.com" /></div>
      </div> : null}
    </div>
  </section>;
}

function HealthStep({ values, errors, updateValue }: { values: FormValues; errors: FieldErrors; updateValue: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void }) {
  const questions = [
    ["bloodborne", "Do you have any bloodborne pathogens, transmittable diseases, or recent illnesses?", "It is okay if you do; we ask for our safety and the safety of others.", ["No", "Yes"]],
    ["eating", "Have you eaten in the past four hours?", "It is not always necessary, but eating beforehand can help increase your blood sugar levels.", ["Yes", "No"]],
    ["intoxication", "Are you under the influence of narcotics or alcohol?", "", ["No", "Yes"]],
    ["pregnancy", "Are you pregnant or breastfeeding?", "", ["No", "Yes"]],
  ] as const;
  const sensitivities = [
    ["latex", "Allergy or sensitivity to latex?", ""],
    ["chlorhexidine", "Allergy or sensitivity to chlorhexidine gluconate?", "Found in products such as Corsodyl mouthwash."],
    ["iodine", "Allergy or sensitivity to iodine?", "If you are allergic to iodine, you may also be allergic to soy sauce."],
    ["aluminium", "Allergy or sensitivity to aluminium?", "Found in some antiperspirant deodorants."],
  ] as const;
  return <section className="ns-section" aria-labelledby="health-heading">
    <SectionHeading index="02 / 04" title="Your wellbeing comes first." />
    <p className="ns-section-intro" id="health-heading">Answer honestly and privately. These questions help your piercer adapt the appointment or recommend another time if needed.</p>
    <div className="ns-notice"><Sparkles size={17} /><span>This is not medical advice or a diagnosis. If you are unsure how a condition or medication may affect piercing, please speak with a qualified healthcare professional before your appointment.</span></div>
    <div className="ns-card ns-card-pad"><div className="ns-grid">{questions.map(([name, title, hint, options]) => <fieldset className="ns-fieldset" key={name}><legend className="ns-legend">{title}{hint ? <span className="ns-legend-note">{hint}</span> : null}</legend><ChoiceGroup name={name} value={values[name]} options={options as unknown as string[]} onChange={(value) => updateValue(name, value)} error={errors[name]} /></fieldset>)}</div></div>
    <div className="ns-card ns-card-pad"><div className="ns-grid">
      <div className="ns-field"><FieldLabel htmlFor="medicalConditions" hint="optional">Medical conditions, medications, or anything we should know</FieldLabel><textarea className="ns-textarea" id="medicalConditions" name="medicalConditions" value={values.medicalConditions} onChange={(event) => updateValue("medicalConditions", event.target.value)} placeholder="Include lupus, autoimmune conditions, heart or blood pressure conditions, blood thinners, haemophilia, epilepsy, diabetes, infections, psoriasis, impetigo, or anything else relevant." /></div>
      <div className="ns-field"><FieldLabel htmlFor="allergies" hint="optional">Other allergies or sensitivities</FieldLabel><textarea className="ns-textarea" id="allergies" name="allergies" value={values.allergies} onChange={(event) => updateValue("allergies", event.target.value)} placeholder="Tell us about metals, adhesives, medicines, or other allergies." /></div>
      {sensitivities.map(([name, title, hint]) => <fieldset className="ns-fieldset" key={name}><legend className="ns-legend">{title}{hint ? <span className="ns-legend-note">{hint}</span> : null}</legend><ChoiceGroup name={name} value={values[name]} options={["No", "Yes", "I’m not sure"]} onChange={(value) => updateValue(name, value)} error={errors[name]} /></fieldset>)}
      <label className="ns-checkline"><input type="checkbox" name="medicalConditionsAcknowledged" value="Yes" checked={values.medicalConditionsAcknowledged} onChange={(event) => updateValue("medicalConditionsAcknowledged", event.target.checked)} aria-invalid={Boolean(errors.medicalConditionsAcknowledged)} /><span><strong>I have disclosed any medical condition, medication, skin condition, infection, or healing concern</strong> that could affect this procedure. If a doctor has prescribed preventive antibiotics for an invasive procedure, I have followed that advice and told my piercer.</span></label><ErrorText message={errors.medicalConditionsAcknowledged} />
    </div></div>
    <div className="ns-notice"><AlertCircle size={17} /><span>For your safety, studio staff may pause or refuse a service if you appear unfit to proceed, including if you are intoxicated, unwell, or unable to give informed consent.</span></div>
  </section>;
}

function ConsentStep({
  values, errors, updateValue, signature, setSignature, idFiles, fileError, readFile, removeFile, idInputRef, cameraInputRef,
}: {
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
  const policies = [
    ["risks", "Risks & duress", "I understand that known and unknown risks can lead to injury, including infection, scarring, keloids, and allergic reactions. Having been informed of the potential risks associated with getting a piercing, I still wish to proceed and freely accept all risks that may arise. I confirm that I am voluntarily getting a piercing without duress."],
    ["release", "Release", "I give full consent to the Artist and Studio to perform the piercing named above. I waive and release, to the fullest extent permitted by law, the Artist and Studio from all liability whatsoever for any claim or cause I may have for personal injury, including direct or consequential damage caused by not following aftercare instructions or by trauma from outside sources after the initial procedure."],
    ["questions", "Questions", "The Artist and the Studio have given me ample opportunity to ask any and all questions about the piercing procedure, and they have been answered to my total satisfaction."],
    ["aftercare", "Aftercare", "I confirm that I have been given instructions on the care of my piercing while it is healing. I understand and will follow them without deviation. I acknowledge that a piercing may become infected, particularly if I do not follow the instructions."],
    ["changes", "Permanent change", "I acknowledge that piercing will result in a permanent change to my appearance and that my skin may not be restored to its pre-piercing condition, even after jewellery is removed."],
    ["document", "This document", "I acknowledge that I have had adequate opportunity to read and understand this document, that it was not presented to me at the last minute, and that I understand I am signing a legal contract."],
    ["downsizing", "Downsizing", "I understand that my piercing(s) will initially be fitted with a larger or longer piece of jewellery to allow for natural swelling. Smaller or shorter jewellery will likely, but not always, need to be fitted during healing. This downsize is ultimately optional but important for safe healing. Labrets are £15 each, and I am entitled to a free fitting fee on piercings carried out at Golden Vine. I understand that leaving this too long or deciding against it may have detrimental effects on my piercings’ health."],
  ] as const;
  return <section className="ns-section" aria-labelledby="consent-heading">
    <SectionHeading index="03 / 04" title="Read, then make it yours." />
    <p className="ns-section-intro" id="consent-heading">Consent should feel informed, never rushed. Please read each point carefully. Photography is optional; every other acknowledgment is required.</p>
    <div className="ns-card ns-card-pad"><div className="ns-policy-list">
      {policies.map(([key, title, copy]) => <div className="ns-policy-item" key={key}><h3 className="ns-policy-title">{title}</h3><p className="ns-policy-copy">{copy}</p><label className="ns-checkline"><input type="checkbox" name={key} value="Yes" checked={values[key]} onChange={(event) => updateValue(key, event.target.checked)} aria-invalid={Boolean(errors[key])} /><span><strong>I acknowledge this.</strong></span></label><ErrorText message={errors[key]} /></div>)}
      <div className="ns-policy-item"><h3 className="ns-policy-title">Photography</h3><p className="ns-policy-copy">I consent to having pictures of my piercing taken, release all rights to photographs taken of me, and give consent in advance to their reproduction in print or electronic form.</p><ChoiceGroup name="photography" value={values.photography} options={["Yes, I consent", "No, thank you"]} onChange={(value) => updateValue("photography", value)} /></div>
    </div></div>
    <div className="ns-notice"><FileCheck2 size={17} /><span>If any provision, section, subsection, clause, or phrase of this release is found to be unenforceable or invalid, that portion will be severed. The remainder of this contract will be construed as though the unenforceable portion had never been included.</span></div>
    <div className="ns-card ns-card-pad"><div className="ns-grid">
      <div><h3 className="ns-policy-title">Your handwritten signature</h3><p className="ns-policy-copy">By signing, you confirm that your answers are truthful and that you have had the opportunity to ask your piercer questions.</p><SignaturePad value={signature} onChange={setSignature} error={errors.signature} /></div>
      <div className="ns-upload"><div><h3 className="ns-policy-title">Government-issued photo ID</h3><p className="ns-policy-copy">You may upload a clear photo of your ID if you would like to provide it in advance. This step is optional; you can continue without adding a photo.</p></div>
        <div className="ns-upload-actions"><input ref={idInputRef} className="ns-file-input" id="id-upload" name="id-photo" type="file" accept="image/*" multiple onChange={readFile} /><input ref={cameraInputRef} className="ns-file-input" id="id-camera" name="id-photo-camera" type="file" accept="image/*" capture="environment" onChange={readFile} /><label className="ns-file-button" htmlFor="id-upload"><Upload size={15} /> Choose photo</label><label className="ns-file-button is-secondary" htmlFor="id-camera"><Camera size={15} /> Use camera</label></div>
        {idFiles.length ? <div className="ns-upload-files">{idFiles.map((file, index) => <div className="ns-upload-preview" key={`${file.name}-${index}`}><div><strong>{file.name}</strong><span>{(file.size / 1024 / 1024).toFixed(1)} MB · photo ready</span></div><button type="button" className="ns-clear" onClick={() => removeFile(index)} aria-label={`Remove uploaded ID ${index + 1}`}><X size={15} /></button></div>)}</div> : <div className="ns-upload-preview"><Paperclip size={15} /><span>No ID photo added yet</span></div>}<ErrorText message={fileError} />
      </div>
    </div></div>
  </section>;
}

function ReviewStep({ values, signature, idFiles }: { values: FormValues; signature: string; idFiles: IdFile[] }) {
  const rows = [
    ["Name", values.fullName], ["Address", `${values.address} · ${values.postcode}`], ["Contact", `${values.email}${values.phone ? ` · ${values.phone}` : ""}`],
    ["Practitioner", values.practitioner === "Guest Piercer" ? `${values.guestPractitionerName} (Guest Piercer)` : values.practitioner], ["Body piercing", values.piercingArea],
    ["Guardian", values.guardianName ? `${values.guardianName} · ${values.guardianRelationship}` : "Not required"], ["Health screening", "Complete — answers shared with your piercer"],
    ["Photography", values.photography || "Not chosen"], ["Signature", signature ? "Captured" : "Missing"], ["Photo ID", idFiles.length ? `${idFiles.length} photo${idFiles.length === 1 ? "" : "s"} attached` : "Not provided (optional)"],
  ];
  return <section className="ns-section" aria-labelledby="review-heading"><SectionHeading index="04 / 04" title="A final look together." /><p className="ns-section-intro" id="review-heading">Please check the details below. You can use Previous to make any changes before submitting.</p><div className="ns-review">{rows.map(([label, value]) => <div className="ns-review-row" key={label}><span className="ns-review-label">{label}</span><span className="ns-review-value">{value || "Not provided"}</span></div>)}</div><div className="ns-notice"><FileCheck2 size={17} /><span>When you submit, your answers, handwritten signature, and ID photos will be sent securely to Golden Vine through Netlify Forms.</span></div></section>;
}

type EmailJsClient = { send: (serviceId: string, templateId: string, params: Record<string, string>, publicKey: string) => Promise<unknown> };

function loadEmailJs(): Promise<EmailJsClient> {
  const existing = (window as Window & { emailjs?: EmailJsClient }).emailjs;
  if (existing) return Promise.resolve(existing);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      const emailjs = (window as Window & { emailjs?: EmailJsClient }).emailjs;
      emailjs ? resolve(emailjs) : reject(new Error("Email confirmation is unavailable."));
    };
    script.onerror = () => reject(new Error("Email confirmation is unavailable."));
    document.head.appendChild(script);
  });
}

async function sendClientConfirmation(values: FormValues) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return "unconfigured" as const;
  const emailjs = await loadEmailJs();
  await emailjs.send(serviceId, templateId, {
    to_email: values.email,
    to_name: values.fullName,
    reply_to: values.email,
    form_name: "Golden Vine Piercing consent form",
    submitted_at: new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }),
  }, publicKey);
  return "sent" as const;
}

export function Consent() {
  const [step, setStep] = useState<Step>(0);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [signature, setSignature] = useState("");
  const [idFiles, setIdFiles] = useState<IdFile[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"sent" | "unconfigured" | "failed" | null>(null);
  const [fileError, setFileError] = useState("");
  const [isPractitionerLocked, setIsPractitionerLocked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const updateValue = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };
  const toggleReferral = (referral: string) => updateValue("referrals", values.referrals.includes(referral) ? values.referrals.filter((item) => item !== referral) : [...values.referrals, referral]);

  const validateStep = (targetStep: Step) => {
    const next: FieldErrors = {};
    if (targetStep === 0) {
      if (!values.fullName.trim()) next.fullName = "Please enter your full name.";
      if (!values.dateOfBirth) next.dateOfBirth = "Please add your date of birth.";
      if (!values.address.trim()) next.address = "Please add your street address.";
      if (!values.postcode.trim()) next.postcode = "Please add your postcode.";
      if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email address.";
      if (!values.practitioner) next.practitioner = "Please choose a practitioner.";
      if (values.practitioner === "Guest Piercer" && !values.guestPractitionerName.trim()) next.guestPractitionerName = "Please add the guest piercer’s name.";
      if (!values.piercingArea.trim()) next.piercingArea = "Please tell us where you are being pierced.";
      if (!values.legalAgeDeclaration) next.legalAgeDeclaration = "Please confirm your age and signing authority.";
      if ((getAge(values.dateOfBirth) ?? 16) < 16) {
        if (!values.guardianName.trim()) next.guardianName = "Please add the parent or legal guardian’s name.";
        if (!values.guardianRelationship.trim()) next.guardianRelationship = "Please add their relationship to you.";
      }
    }
    if (targetStep === 1) {
      for (const key of ["bloodborne", "eating", "intoxication", "pregnancy", "latex", "chlorhexidine", "iodine", "aluminium"] as const) if (!values[key]) next[key] = "Please choose an answer.";
      if (!values.medicalConditionsAcknowledged) next.medicalConditionsAcknowledged = "Please confirm you have disclosed anything that may affect healing.";
    }
    if (targetStep === 2) {
      for (const key of ["risks", "release", "questions", "aftercare", "changes", "document", "downsizing"] as const) if (!values[key]) next[key] = "Please acknowledge this before continuing.";
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
    for (const key of Object.keys(values) as Array<keyof FormValues>) {
      data.delete(key);
      const value = values[key];
      data.set(key, Array.isArray(value) ? value.join(", ") : typeof value === "boolean" ? (value ? "Yes" : "No") : value);
    }
    data.set("form-name", "consent");
    data.set("signature-captured", signature ? "Yes" : "No");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) {
      setStep(0);
      window.setTimeout(() => formRef.current?.querySelector('[aria-invalid="true"]')?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return;
    }
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const data = new FormData(formRef.current || undefined);
      appendValues(data);
      if (signature) {
        const signatureBlob = await (await fetch(signature)).blob();
        data.set("signature", new File([signatureBlob], "handwritten-signature.png", { type: "image/png" }));
      }
      data.delete("id-photo");
      data.delete("id-photo-camera");
      idFiles.forEach((item) => data.append("id-photo", item.file, item.name));
      const response = await fetch(formEndpoint, { method: "POST", body: data });
      if (!response.ok) throw new Error("Netlify could not receive your form. Please try again.");
      try {
        setEmailStatus(await sendClientConfirmation(values));
      } catch {
        setEmailStatus("failed");
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div className="ns-shell">
    <Seo title="Consent form" description="Complete your Golden Vine Piercing consent form before your appointment." path="/consent" />
    <Header />
    {submitted ? <main className="ns-main"><section className="ns-success" aria-live="polite">
      <div className="ns-success-mark"><Check size={31} strokeWidth={2.3} /></div><p className="ns-kicker">Received by Golden Vine</p><h1 className="ns-success-title">You’re all set.</h1>
      <p className="ns-success-copy">Thank you for taking the time to share this with us. Your consent form has been securely received by the studio team, and we’ll talk through everything again when you arrive.</p>
      {emailStatus === "sent" ? <p className="ns-confirmation-note">A confirmation copy has also been sent to {values.email}.</p> : null}
      {emailStatus === "unconfigured" ? <p className="ns-confirmation-note">Your form is safely with the studio. A confirmation email is not configured on this site yet.</p> : null}
      {emailStatus === "failed" ? <p className="ns-confirmation-note">Your form is safely with the studio. We could not send the optional confirmation email, but your submission was not affected.</p> : null}
      <p className="ns-privacy">Your information is handled securely by Netlify Forms. Storage, retention, and deletion are configured by Golden Vine.</p>
    </section></main> : <main className="ns-main">
      <section className="ns-intro"><div className="ns-intro-art" aria-hidden="true"><img src={asset("images/logo.jpg")} alt="" /><span className="ns-intro-art-line" /></div><p className="ns-kicker">Before your appointment</p><h1 className="ns-title">A little care before we begin.</h1><p className="ns-intro-copy">This consent form helps your piercer understand you and prepare a safe, considered appointment. Take your time — most people finish in about five minutes.</p></section>
      <div className="ns-flow"><Progress step={step} /><form ref={formRef} className="ns-form" name="consent" method="POST" action={formEndpoint} data-netlify="true" encType="multipart/form-data" onSubmit={submit} noValidate><input type="hidden" name="form-name" value="consent" /><input type="hidden" name="bot-field" value="" aria-hidden="true" />
        {step === 0 ? <DetailsStep values={values} errors={errors} toggleReferral={toggleReferral} updateValue={updateValue} isPractitionerLocked={isPractitionerLocked} setIsPractitionerLocked={setIsPractitionerLocked} /> : null}
        {step === 1 ? <HealthStep values={values} errors={errors} updateValue={updateValue} /> : null}
        {step === 2 ? <ConsentStep values={values} errors={errors} updateValue={updateValue} signature={signature} setSignature={setSignature} idFiles={idFiles} fileError={fileError} readFile={readFile} removeFile={removeFile} idInputRef={idInputRef} cameraInputRef={cameraInputRef} /> : null}
        {step === 3 ? <ReviewStep values={values} signature={signature} idFiles={idFiles} /> : null}
        {submitError ? <div className="ns-submit-error" role="alert"><AlertCircle size={17} />{submitError}</div> : null}
        <div className="ns-actions"><div className="ns-actions-note"><LockKeyhole size={14} /> Saved only when you submit</div><div className="ns-button-row">{step > 0 ? <button className="ns-button ns-button-quiet" type="button" onClick={() => goToStep((step - 1) as Step)}><ArrowLeft size={15} /> Previous</button> : <span />}{step < 3 ? <button className="ns-button ns-button-primary" type="button" onClick={() => goToStep((step + 1) as Step)}>Continue <ArrowRight size={15} /></button> : <button className="ns-button ns-button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending securely…" : "Submit consent"}{!isSubmitting ? <Check size={15} /> : null}</button>}</div></div>
        <p className="ns-privacy">Privacy note: your details, signature, and optional ID images are sent securely to Golden Vine through Netlify Forms. This form is not medical advice; please speak to a qualified healthcare professional about health concerns.</p>
      </form></div>
    </main>}
    <footer className="ns-footer">Golden Vine Piercing · Consent & client details</footer>
  </div>;
}
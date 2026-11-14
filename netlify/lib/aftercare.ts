// Aftercare email sent to clients after they complete a consent form.
// Edit the wording here. Each consent form type has its own entry, so a
// tattoo version can be added alongside the piercing one.

export const REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJ25j32ueBcUgRGxnGvuBqpSw";

export interface AftercareEmail {
  subject: string;
  html: string;
  text: string;
}

const piercingHtml = `<div style="font-family: Georgia, 'Times New Roman', serif; color: #2f3b26; max-width: 600px; margin: 0 auto; line-height: 1.5;">

  <!-- Review request: sits at the top of the email -->
  <div style="background: #fffae7; border: 1px solid #c9a84c; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 24px;">
    <p style="margin: 0 0 6px; font-size: 18px; font-weight: bold;">Loved your visit?</p>
    <p style="margin: 0 0 16px;">We'd be so grateful if you could take a minute to leave us a review. It really helps a small studio like ours.</p>
    <a href="https://search.google.com/local/writereview?placeid=ChIJ25j32ueBcUgRGxnGvuBqpSw"
       style="display: inline-block; background: #526545; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-weight: bold;">
      Leave us a Google review
    </a>
  </div>

  <!-- Aftercare: unchanged -->
  <p>Thank you for completing your consent form.</p>

  <p>Here are some aftercare instructions. Please contact us if you have questions.</p>

  <h3>HEALING</h3>
  <p><strong>Week 1</strong><br>Swelling, redness, and bleeding is normal.</p>
  <p><strong>Week 2-4</strong><br>Yellow 'crusties' form, don't pick at them or touch your piercing.</p>
  <p><strong>Week 4</strong><br>Check-up time. Come say hi, we may need to downsize your jewellery.</p>
  <p><strong>Week 4 Onwards.</strong><br>At your check-up, you will be informed of the likely next stages expected from your healing piercing and what follow-up is recommended.</p>

  <h3>ORAL PIERCINGS</h3>
  <ul>
    <li>Use bottled/filtered water 2-3 times daily as well as after eating or drinking to rinse mouth out.</li>
    <li>Cold drinks are great during healing.</li>
    <li>Swelling is normal.</li>
    <li>Downsize jewellery in 3-6 weeks.</li>
    <li>Avoid food and drink that is too hot in spice levels or temperature.</li>
    <li>Do NOT play with jewellery at all.</li>
    <li>Stay hydrated. Drink lots of water.</li>
    <li>Piercing can take up to 3-4 months to settle.</li>
  </ul>

  <h3>FACIAL, EAR, BODY PIERCINGS</h3>
  <ul>
    <li>Spray 2x daily with STERILE saline. There is no need to rinse off spray.</li>
    <li>Do not touch/twist jewellery.</li>
    <li>Do not submerge your piercing in any body of water for minimum of 8 weeks, the longer the better.</li>
    <li>Be sure NOT to sleep on your piercing.</li>
    <li>Body piercing can take 6-9 months to settle.</li>
    <li>Ear cartilage piercings can take up to a year or more to settle.</li>
  </ul>

  <h3>GENITAL PIERCINGS</h3>
  <ul>
    <li>Follow oral aftercare.</li>
    <li>Bleeding is normal.</li>
    <li>Sex can resume when comfortable but try to abstain for the first 3-6 weeks.</li>
    <li>No unprotected sex during healing.</li>
    <li>Shower before/after sex throughout healing.</li>
    <li>Jewellery downsize after 6 weeks.</li>
    <li>Piercing can take up to 6 months to settle.</li>
  </ul>

  <h3>TROUBLES</h3>
  <ul>
    <li>Sleeping on, or knocking your piercing will slow healing and can cause bumps to form.</li>
    <li>Oral piercings that are constantly played with can rip and cause white, bumpy scar tissue.</li>
    <li>Using anything other than the recommended solutions can cause irritation, generally speaking- if you wouldn’t put it in your eye, don’t let it get near your piercing.</li>
    <li>Make sure to keep the piercing dry (other than when cleaning it), wounds tend not to heal well in wet environments.</li>
  </ul>

  <p>If you are in any way concerned about your piercing please don't hesitate to visit us for a consultation.</p>

  <h3>GUARANTEE DETAILS</h3>
  <p>We strive to accommodate all repair and modification requests for your convenience. There are sometimes complications behind the scenes, therefore we wish to highlight some important information regarding our processes and reasonable expectations. Please know that we charge the absolute minimum fee possible to repair items that are not covered by our lifetime guarantee as a token of our appreciation for wearing BVLA. Modifications are accepted on a case-by-case basis and we urge you to discuss the feasibility with our team.</p>

  <p><strong>What is a repair covered by the BVLA lifetime guarantee?</strong></p>
  <ul>
    <li>Thread or Pin breakage at the solder point. *</li>
    <li>Component breakage at the solder point.</li>
    <li>Gemstone pops out when item does not appear to be damaged by user. **</li>
    <li>Gemstone discoloration when item does not appear to be damaged by user. **</li>
    <li>Loose hinges that do not appear to be damaged by user.</li>
  </ul>
  <p>*If a thread or pin breaks and the end is lost, please provide the post containing the broken segment of thread or pin as proof of breakage. We will replace the lost portion so long as proof of purchase is provided.</p>
  <p>**Pearls and Paua Shell are not covered by the BVLA lifetime guarantee as the organic nature of these items may result in problems from daily wear and exposure to chemicals or body fluids. If there is an issue with Pearl or Paua Shell within the first two weeks of purchase, please contact us for assistance.</p>

  <p><strong>What is not a repair covered by the BVLA lifetime guarantee?</strong></p>
  <ul>
    <li>Items that are cut, scratched or marred from tools used by user.</li>
    <li>Gemstone pops out when item is visually crushed, cut or marred by user.</li>
    <li>Changing a chain attachment length due to incorrect size request.</li>
    <li>Pearl and Paua Shell problems after 2 weeks of wear.</li>
    <li>Seam or hinge rings distorted or scratched by user.</li>
    <li>Seam or hinge ring size adjustments.</li>
    <li>Dirty gems – If you think a gem is discolored, first try our ultrasonic cleaning service or at least soaking in hot water and then cleaning with an electric toothbrush. Dirty gems are often mistaken for discolored gems.</li>
  </ul>

  <p><strong>Realistic expectations for BVLA repairs</strong></p>
  <ul>
    <li>Some gemstones cannot withstand heat. In this scenario, a gemstone could discolor or break during the repair process. We may need to replace the gemstone to successfully repair the item.</li>
    <li>Although rare, it is sometimes impossible to perfectly match gemstones in a repair or replacement. This is especially true for natural gemstones. We will do our best, but may reach out to offer an alternative. This could occur if the gemstone is no longer available due to production problems, or if we no longer work with the vendor that sold us the original batch of gemstones.</li>
    <li>If an item is damaged by user error, such as a marred or distorted ring, it is unlikely that we will be able to make it look brand new again. We will do our best to restore the item to a safe and beautiful state, but cannot make it new without making a new piece, which would incur a fee.</li>
    <li>Some items cannot be repaired for an equal or lower cost of labor and materials than starting anew.</li>
    <li>For repairs that are covered by the BVLA lifetime guarantee, we reserve the right to decide if we will completely remake a repair from new materials. We reserve the right to require an alternate gemstone choice from the customer if the original gem is no longer available.</li>
    <li>For repairs that are not covered by the BVLA lifetime guarantee, we may refuse to repair items that would be better suited for remaking from new materials, which would incur a fee.</li>
    <li>We do not repair any competitor jewellery.</li>
  </ul>

  <p><strong>Realistic expectations for BVLA modifications</strong></p>
  <p>There are limitations on what is possible to modify on a piece of jewellery and still yield worthy results. Sometimes it makes more sense to start anew to (a) meet our aesthetic standards and (b) avoid weakening the piece to the point of potential failure. We always aim to serve your needs, and have some of the most skilled jewelers in the world, but modifications are done on an AT YOUR OWN RISK basis. We cannot be responsible for items that fail modification processes. Please remember we offer this service as a courtesy only.</p>
  <ul>
    <li>Changing out gemstones is not ideal. The piece has been polished, so there is far less metal than what we would normally work with. We either have to destroy the existing gem (often for bezel settings) or pry open the setting (typical of prongs). Regardless of the method, we are left with weakened metal that is smaller than ideal for precision work. Sometimes the metal is so weak that it does not survive another round of polishing. In items with multiple gems, the settings may not appear uniform in height due to overworked prongs. Items with beaded or intricate metal details may sustain damage to the design when working on the gemstones.</li>
    <li>In some scenarios, we are happy to change out a center gem on a cluster, but will likely refuse to change out multiple gems in a single item.</li>
    <li>Changing the length of a chain attachment may be the same amount of labor as starting with a new piece.</li>
    <li>We can shorten chain attachments. We cannot lengthen chain attachments without starting with a fresh new piece of chain. This is to ensure durability. If you want a longer chain attachment, it is best to order a new piece.</li>
    <li>Changing the diameter on decorative rings, especially with gems, is not ideal. When we try to resize a ring that contains gemstones, the gem settings are distorted which may result in the gemstones falling out. This distortion prevents us from replacing the gemstones as well. Heating up the jewellery during the modification process can also damage gemstones.</li>
    <li>Changing the diameter of a non-gemstone item can also be problematic, as it may not scale down properly, resulting in an awkward design.</li>
    <li>Making seam rings into hinge rings and vice versa doesn’t usually work and is often more labor intensive than starting anew. For many of our designs, we use a separately designed casting for a hinge versus a seam ring. They may look the same to the untrained eye, but there are subtle differences in the castings which allow us to attach a seam or a hinge.</li>
    <li>We do not modify any competitor jewellery.</li>
    <li>We will consider modifying heirloom jewellery that’s not made by piercing industry competitors on a case-by-case basis. Contact us before sending in items.</li>
  </ul>

  <p>Best regards,</p>
  <p>The Golden Fern Team</p>
</div>
`;

const piercingText = `Loved your visit? We'd be so grateful if you could take a minute to leave us a review. It really helps a small studio like ours.
Leave us a Google review: https://search.google.com/local/writereview?placeid=ChIJ25j32ueBcUgRGxnGvuBqpSw

Thank you for completing your consent form.

Here are some aftercare instructions. Please contact us if you have questions.

HEALING
Week 1
Swelling, redness, and bleeding is normal.

Week 2-4
Yellow 'crusties' form, don't pick at them or touch your piercing.

Week 4
Check-up time. Come say hi, we may need to downsize your jewellery.

Week 4 Onwards.
At your check-up, you will be informed of the likely next stages expected from your healing piercing and what follow-up is recommended. 


  ORAL PIERCINGS
- Use bottled/filtered water 2-3 times daily as well as after eating or drinking to rinse mouth out.
- Cold drinks are great during healing.
- Swelling is normal.
- Downsize jewellery in 3-6 weeks.
- Avoid food and drink that is too hot in spice levels or temperature.
- Do NOT play with jewellery at all.
- Stay hydrated. Drink lots of water.
- Piercing can take up to 3-4 months to settle.


  FACIAL, EAR, BODY PIERCINGS
- Spray 2x daily with STERILE saline. There is no need to rinse off spray.
- Do not touch/twist jewellery.
- Do not submerge your piercing in any body of water for minimum of 8 weeks, the longer the better.
- Be sure NOT to sleep on your piercing.
- Body piercing can take 6-9 months to settle.
- Ear cartilage piercings can take up to a year or more to settle.

  GENITAL PIERCINGS
- Follow oral aftercare.
- Bleeding is normal.
- Sex can resume when comfortable but try to abstain for the first 3-6 weeks.
- No unprotected sex during healing.
- Shower before/after sex throughout healing.
- Jewellery downsize after 6 weeks.
- Piercing can take up to 6 months to settle.

   TROUBLES
- Sleeping on, or knocking your piercing will slow healing and can cause bumps to form.
- Oral piercings that are constantly played with can rip and cause white, bumpy scar tissue. 
- Using anything other than the recommended solutions can cause irritation, generally speaking- if you wouldn’t put it in your eye, don’t let it get near your piercing.
- Make sure to keep the piercing dry (other than when cleaning it), wounds tend not to heal well in wet environments. 

If you are in any way concerned about your piercing please don't hesitate to visit us for a consultation. 


GUARANTEE DETAILS

We strive to accommodate all repair and modification requests for your convenience. There are sometimes complications behind the scenes, therefore we wish to highlight some important information regarding our processes and reasonable expectations. Please know that we charge the absolute minimum fee possible to repair items that are not covered by our lifetime guarantee as a token of our appreciation for wearing BVLA. Modifications are accepted on a case-by-case basis and we urge you to discuss the feasibility with our team.

What is a repair covered by the BVLA lifetime guarantee?

Thread or Pin breakage at the solder point. *
Component breakage at the solder point.
Gemstone pops out when item does not appear to be damaged by user. **
Gemstone discoloration when item does not appear to be damaged by user. **
Loose hinges that do not appear to be damaged by user.
*If a thread or pin breaks and the end is lost, please provide the post containing the broken segment of thread or pin as proof of breakage. We will replace the lost portion so long as proof of purchase is provided.

**Pearls and Paua Shell are not covered by the BVLA lifetime guarantee as the organic nature of these items may result in problems from daily wear and exposure to chemicals or body fluids. If there is an issue with Pearl or Paua Shell within the first two weeks of purchase, please contact us for assistance.

What is not a repair covered by the BVLA lifetime guarantee?

Items that are cut, scratched or marred from tools used by user.
Gemstone pops out when item is visually crushed, cut or marred by user.
Changing a chain attachment length due to incorrect size request.
Pearl and Paua Shell problems after 2 weeks of wear.
Seam or hinge rings distorted or scratched by user.
Seam or hinge ring size adjustments.
Dirty gems – If you think a gem is discolored, first try our ultrasonic cleaning service or at least soaking in hot water and then cleaning with an electric toothbrush. Dirty gems are often mistaken for discolored gems.
Realistic expectations for BVLA repairs

Some gemstones cannot withstand heat. In this scenario, a gemstone could discolor or break during the repair process. We may need to replace the gemstone to successfully repair the item.
Although rare, it is sometimes impossible to perfectly match gemstones in a repair or replacement. This is especially true for natural gemstones. We will do our best, but may reach out to offer an alternative. This could occur if the gemstone is no longer available due to production problems, or if we no longer work with the vendor that sold us the original batch of gemstones.
If an item is damaged by user error, such as a marred or distorted ring, it is unlikely that we will be able to make it look brand new again. We will do our best to restore the item to a safe and beautiful state, but cannot make it new without making a new piece, which would incur a fee.
Some items cannot be repaired for an equal or lower cost of labor and materials than starting anew.
For repairs that are covered by the BVLA lifetime guarantee, we reserve the right to decide if we will completely remake a repair from new materials. We reserve the right to require an alternate gemstone choice from the customer if the original gem is no longer available.
For repairs that are not covered by the BVLA lifetime guarantee, we may refuse to repair items that would be better suited for remaking from new materials, which would incur a fee.
We do not repair any competitor jewellery.
Realistic expectations for BVLA modifications

There are limitations on what is possible to modify on a piece of jewellery and still yield worthy results. Sometimes it makes more sense to start anew to (a) meet our aesthetic standards and (b) avoid weakening the piece to the point of potential failure. We always aim to serve your needs, and have some of the most skilled jewelers in the world, but modifications are done on an AT YOUR OWN RISK basis. We cannot be responsible for items that fail modification processes. Please remember we offer this service as a courtesy only.

Changing out gemstones is not ideal. The piece has been polished, so there is far less metal than what we would normally work with. We either have to destroy the existing gem (often for bezel settings) or pry open the setting (typical of prongs). Regardless of the method, we are left with weakened metal that is smaller than ideal for precision work. Sometimes the metal is so weak that it does not survive another round of polishing. In items with multiple gems, the settings may not appear uniform in height due to overworked prongs. Items with beaded or intricate metal details may sustain damage to the design when working on the gemstones.
In some scenarios, we are happy to change out a center gem on a cluster, but will likely refuse to change out multiple gems in a single item.
Changing the length of a chain attachment may be the same amount of labor as starting with a new piece.
We can shorten chain attachments. We cannot lengthen chain attachments without starting with a fresh new piece of chain. This is to ensure durability. If you want a longer chain attachment, it is best to order a new piece.
Changing the diameter on decorative rings, especially with gems, is not ideal. When we try to resize a ring that contains gemstones, the gem settings are distorted which may result in the gemstones falling out. This distortion prevents us from replacing the gemstones as well. Heating up the jewellery during the modification process can also damage gemstones.
Changing the diameter of a non-gemstone item can also be problematic, as it may not scale down properly, resulting in an awkward design.
Making seam rings into hinge rings and vice versa doesn’t usually work and is often more labor intensive than starting anew. For many of our designs, we use a separately designed casting for a hinge versus a seam ring. They may look the same to the untrained eye, but there are subtle differences in the castings which allow us to attach a seam or a hinge.
We do not modify any competitor jewellery.
We will consider modifying heirloom jewellery that’s not made by piercing industry competitors on a case-by-case basis. Contact us before sending in items.

Best regards,

The Golden Fern Team
`;

// Tattoo aftercare email. The steps match the Tattoo Aftercare page on the
// website (src/pages/TattooAftercare.tsx); update both together.
const tattooHtml = `<div style="font-family: Georgia, 'Times New Roman', serif; color: #2f3b26; max-width: 600px; margin: 0 auto; line-height: 1.5;">

  <div style="background: #fffae7; border: 1px solid #c9a84c; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 24px;">
    <p style="margin: 0 0 6px; font-size: 18px; font-weight: bold;">Loved your visit?</p>
    <p style="margin: 0 0 16px;">We'd be so grateful if you could take a minute to leave us a review. It really helps a small studio like ours.</p>
    <a href="${REVIEW_URL}"
       style="display: inline-block; background: #526545; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-weight: bold;">
      Leave us a Google review
    </a>
  </div>

  <p>Thank you for completing your consent form, and for getting tattooed with us.</p>

  <p>Here's how to look after your new tattoo while it heals. If anything doesn't look or feel right, or you have any questions, just reply to this email or pop into the studio.</p>

  <h3>TATTOO AFTERCARE</h3>
  <p><strong>1. First wash</strong><br>Three hours after your tattoo is finished, wash it gently with plenty of water at normal room temperature.</p>
  <p><strong>2. Pat dry</strong><br>Dry it with a clean, disposable paper towel using small, gentle dabs. Don't rub.</p>
  <p><strong>3. From the next day</strong><br>After 24 hours, wash your tattoo with a pH-neutral soap.</p>
  <p><strong>4. Moisturise</strong><br>Apply the aftercare cream recommended by your tattoo artist two to three times a day throughout the healing process.</p>
  <p><strong>5. Watch what you eat</strong><br>Avoid irritating foods for 15 days.</p>
  <p><strong>6. No alcohol</strong><br>Don't drink alcohol while your tattoo is healing.</p>
  <p><strong>7. Keep it out of the sun and water</strong><br>Don't expose your tattoo to sunlight, and avoid the beach, swimming pools, saunas and steam rooms until it has healed.</p>
  <p><strong>8. Hands off</strong><br>Never touch your tattoo with dirty hands. Once it starts to heal, don't pick, peel or scratch any scabs. Let them come away on their own.</p>

  <p>Healing usually takes two to four weeks on the surface, and a little longer underneath. Some redness, swelling, flaking and itching is normal. If you notice spreading redness, heat, pus, or you feel unwell, please contact your GP.</p>

  <p>Best regards,</p>
  <p>The Golden Vine Team</p>
</div>`;

const tattooText = `Loved your visit? We'd be so grateful if you could take a minute to leave us a review. It really helps a small studio like ours.
Leave us a Google review: ${REVIEW_URL}

Thank you for completing your consent form, and for getting tattooed with us.

Here's how to look after your new tattoo while it heals. If anything doesn't look or feel right, or you have any questions, just reply to this email or pop into the studio.

TATTOO AFTERCARE

1. FIRST WASH
Three hours after your tattoo is finished, wash it gently with plenty of water at normal room temperature.

2. PAT DRY
Dry it with a clean, disposable paper towel using small, gentle dabs. Don't rub.

3. FROM THE NEXT DAY
After 24 hours, wash your tattoo with a pH-neutral soap.

4. MOISTURISE
Apply the aftercare cream recommended by your tattoo artist two to three times a day throughout the healing process.

5. WATCH WHAT YOU EAT
Avoid irritating foods for 15 days.

6. NO ALCOHOL
Don't drink alcohol while your tattoo is healing.

7. KEEP IT OUT OF THE SUN AND WATER
Don't expose your tattoo to sunlight, and avoid the beach, swimming pools, saunas and steam rooms until it has healed.

8. HANDS OFF
Never touch your tattoo with dirty hands. Once it starts to heal, don't pick, peel or scratch any scabs. Let them come away on their own.

Healing usually takes two to four weeks on the surface, and a little longer underneath. Some redness, swelling, flaking and itching is normal. If you notice spreading redness, heat, pus, or you feel unwell, please contact your GP.

Best regards,
The Golden Vine Team
`;

export const AFTERCARE_EMAILS: Record<string, AftercareEmail> = {
  piercing: {
    subject: "Your Golden Vine piercing aftercare",
    html: piercingHtml,
    text: piercingText,
  },
  tattoo: {
    subject: "Your Golden Vine tattoo aftercare",
    html: tattooHtml,
    text: tattooText,
  },
};

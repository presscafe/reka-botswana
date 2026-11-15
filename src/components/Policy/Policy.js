import React from 'react';
import * as styles from './Policy.module.css';
import Config from '../../config.json';

/**
 * Botswana-specific policy copy for Reka Botswana.
 * variant: shipping | returns | payments | terms | privacy
 * Plain language, no legalese inflation; replace with counsel-reviewed
 * terms before regulated activities (cards, custody, credit) begin.
 */
const Policy = ({ variant = 'terms' }) => {
  const { contact, ordering, paymentMethods } = Config;

  const sections = {
    shipping: (
      <>
        <div className={styles.section}>
          <h3>Shipping &amp; Fulfilment</h3>
          <p>
            All orders are confirmed by the maker on WhatsApp or email before
            payment. Once confirmed, ready-to-ship items leave within 1–3
            working days. Made-to-order items follow the lead time shown on
            the product page (typically 2–10 working days).
          </p>
          <p>
            {ordering.collectionLabel}. {ordering.gaboroneDeliveryLabel} — P
            {ordering.gaboroneDeliveryFee}. {ordering.nationalCourierLabel} — P
            {ordering.nationalCourierFee}. Courier fees are indicative and
            confirmed per order; large or fragile items (baskets, gift hampers)
            may carry a surcharge agreed with you in advance.
          </p>
          <p>
            Rural delivery routes and out-of-country delivery are quoted per
            order. We do not ship perishables outside Botswana at this stage.
          </p>
        </div>
      </>
    ),
    returns: (
      <>
        <div className={styles.section}>
          <h3>Returns &amp; Exchanges</h3>
          <p>
            You have 7 days from delivery or collection to raise a return.
            Goods must be unused, in original packaging, with proof of purchase
            (your order reference). Refunds are made to the same mobile-money
            or bank account used for payment, within 7 working days of us
            receiving the item.
          </p>
          <p>
            Made-to-order and personalised items (e.g. belts punched to
            size, embroidered corporate wear, gift hampers) cannot be returned
            unless faulty. Handmade and dyed items vary naturally — that is
            not a fault.
          </p>
          <p>
            Faulty or misdescribed items: contact us within 7 days with photos.
            We repair, replace or refund at the maker’s cost under Botswana
            consumer-protection principles. Start here: WhatsApp{' '}
            {contact.whatsappDisplay} or {contact.email}.
          </p>
        </div>
      </>
    ),
    payments: (
      <>
        <div className={styles.section}>
          <h3>Payments &amp; Security</h3>
          <p>We accept: {paymentMethods.join(' · ')}.</p>
          <p>
            No payment is taken on this website. Payment happens only after
            the maker confirms availability and the final total in writing
            (WhatsApp or email). We will never ask for your mobile-money PIN,
            USSD session, or OTP. Anyone who does is not us — report and
            block.
          </p>
          <p>
            Cash on collection: payment is due at handover; please count
            change and ask for your receipt. Bank transfers reference your
            order number. We issue a VAT invoice on request.
          </p>
          <p>
            Card payments are not yet offered. When we add them, they will run
            through a licensed Botswana payment provider on this page, and this
            policy will be updated first.
          </p>
        </div>
      </>
    ),
    terms: (
      <>
        <div className={styles.section}>
          <h3>Terms of Use</h3>
          <p>
            Reka Botswana is a curation and ordering service based in
            Gaborone, Botswana. Products remain the property of the makers
            listed on each product page until dispatched. Orders are subject to
            stock and maker capacity; if we cannot fulfil yours, we will tell
            you before taking payment.
          </p>
          <p>
            Prices are in Botswana Pula (BWP) and include applicable VAT where
            charged. Delivery fees are indicative until confirmed per order.
            Lead times are estimates made in good faith — if a maker is
            delayed, we notify you and you may cancel for a full refund.
          </p>
          <p>
            Our liability is limited to the value of the order concerned.
            Governing law is the law of Botswana. Nothing in these terms
            excludes rights you have under the Consumer
            Protection Act (Botswana) or other mandatory law.
          </p>
          <p>
            Handmade, food and cosmetic products: food items may carry
            allergen notes; moringa and honey are foods, not medicines;
            cosmetics are for external use. Patch-test where indicated.
          </p>
        </div>
      </>
    ),
    privacy: (
      <>
        <div className={styles.section}>
          <h3>Privacy Notice</h3>
          <p>
            We keep this simple and we mean it. Your cart lives in your own
            browser (localStorage) — it never reaches our servers until you
            choose to send an order enquiry. Order enquiries are sent by you,
            from your device, to us via WhatsApp or email; we share them only
            with the maker fulfilling your order.
          </p>
          <p>
            We do not sell, rent or trade your personal information. We use
            your contact details to fulfil and support your order, and to send
            you messages you asked for (e.g. order updates). We keep order
            records for up to 24 months for warranty and tax purposes.
          </p>
          <p>
            Analytics: this build ships no advertising trackers. Server logs,
            if retained by the host, are used for security and debugging only.
            Fonts are self-hosted with the site, so no
            third party sees your request when you load a page.
          </p>
          <p>
            Your rights: you may ask what we hold about you, ask us to correct
            it, or ask us to delete it (subject to the retention above).
            Email {contact.email} — {contact.responseTime}.
          </p>
        </div>
      </>
    ),
  };

  return <div className={styles.root}>{sections[variant] || sections.terms}</div>;
};

export default Policy;

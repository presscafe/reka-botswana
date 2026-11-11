import React from 'react';
import * as styles from './faq.module.css';

import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner';
import Container from '../components/Container';
import Config from '../config.json';

const FaqPage = (props) => {
  const { contact, ordering, paymentMethods } = Config;

  return (
    <Layout>
      <div className={styles.root}>
        <Banner
          maxWidth={'650px'}
          name={`Frequently Asked Questions`}
          bgImage={'/banner3.jpg'}
          color={'var(--standard-white)'}
          height={'350px'}
        />
        <Container>
          <div className={styles.section}>
            <span>Ordering</span>
            <div className={styles.subSection}>
              <h3>How do I place an order?</h3>
              <p>
                Browse the shop, add what you want to your bag and check out.
                Checkout does not take payment — it sends your order enquiry
                to us on WhatsApp or email. The maker confirms availability
                and the final total within one working day, and only then do
                you pay.
              </p>
            </div>
            <div className={styles.subSection}>
              <h3>Why don’t you take payment on the website yet?</h3>
              <p>
                We are a young, Botswana-first business. Confirming every
                order by a human keeps you from paying for stock that is not
                ready or made-to-order items whose lead time has moved. Card
                and mobile-money checkout arrive once volumes justify a
                licensed provider — this page will change before that does.
              </p>
            </div>
            <div className={styles.subSection}>
              <h3>Can I change or cancel my order?</h3>
              <p>
                Yes — message us on WhatsApp ({contact.whatsappDisplay}) before
                you pay. After payment, changes depend on the maker: pantry
                items can usually be adjusted; made-to-order and corporate
                items are locked once production starts.
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <span>Delivery &amp; Collection</span>
            <div className={styles.subSection}>
              <h3>How will I receive my order?</h3>
              <p>
                {ordering.collectionLabel}.{' '}
                {ordering.gaboroneDeliveryLabel} — P{ordering.gaboroneDeliveryFee}.{' '}
                {ordering.nationalCourierLabel} — P{ordering.nationalCourierFee}.
                Courier and rural-route costs are indicative and confirmed per
                order before payment.
              </p>
              <p>
                Ready items ship within 1–3 working days. Made-to-order items
                follow the lead time printed on the product page and confirmed
                in your order discussion.
              </p>
            </div>
            <div className={styles.subSection}>
              <h3>Where do I collect in Gaborone?</h3>
              <p>
                Collection point is confirmed per order (central Gaborone). If
                you need a specific landmark or time, say so in your order
                notes — we will do our best.
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <span>Payment</span>
            <div className={styles.subSection}>
              <h3>Which payment methods do you accept?</h3>
              <p>{paymentMethods.join(' · ')}.</p>
            </div>
            <div className={styles.subSection}>
              <h3>Is Orange Money / MyZaka safe here?</h3>
              <p>
                You pay directly from your own mobile-money account to the
                number or merchant code we give you after written confirmation,
                quoting your order reference. We will never ask for your PIN,
                OTP or full USSD session. If someone claiming to be us asks
                for any of those — stop, block, report.
              </p>
            </div>
            <div className={styles.subSection}>
              <h3>Do prices include VAT?</h3>
              <p>
                Prices are in Botswana Pula. VAT-registered sellers include VAT
                in the displayed price; a VAT invoice is available on request
                for corporate accounts.
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <span>Returns</span>
            <div className={styles.subSection}>
              <h3>What if something is wrong with my order?</h3>
              <p>
                Contact us within 7 days of delivery or collection with photos
                and your order reference. Faulty, damaged or misdescribed
                goods are repaired, replaced or refunded — the maker bears the
                cost.
              </p>
            </div>
            <div className={styles.subSection}>
              <h3>What can’t be returned?</h3>
              <p>
                Made-to-order and personalised items unless faulty; food and
                cosmetics once opened; handmade items where the variation is
                the point (we photograph representative examples, not the
                exact unit). Changed your mind? 7 days, unused, original
                packaging — we refund once the item is back with us.
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <span>The Products</span>
            <div className={styles.subSection}>
              <h3>What does “Made in Botswana” mean on Reka?</h3>
              <p>
                Designed, grown, blended, milled or sewn in Botswana — with the
                maker named on the product page. Where an input is imported
                (fabric, glass, packaging), we will tell you on request rather
                than pretend otherwise.
              </p>
            </div>
            <div className={styles.subSection}>
              <h3>Why are some products one of a kind?</h3>
              <p>
                Handwoven baskets, dyed textiles and small-batch food are made
                by hands, not lines. Colour and tone vary; pattern placement
                varies. That is the guarantee of handwork, and it is why each
                piece ships with its maker’s name.
              </p>
            </div>
            <div className={styles.subSection}>
              <h3>How do I become a listed maker?</h3>
              <p>
                See “List your workshop” on our
                <a href={'/about#makers'}>about page</a> — we respond within
                two working days and visit before listing. We prefer makers
                registered with BITC’s Pride Mark or LEA.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default FaqPage;

import React from 'react';
import * as styles from './order-confirmation.module.css';

import Button from '../components/Button';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';
import Config from '../config.json';

const OrderConfirmationPage = (props) => {
  const { contact } = Config;
  const waLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'Hello Reka Botswana — following up on my order enquiry.'
  )}`;

  return (
    <Layout disablePaddingBottom>
      <Container size={'medium'}>
        <div className={styles.root}>
          <div className={styles.check} aria-hidden={'true'}>✓</div>
          <h1>Order enquiry received</h1>
          <p className={styles.lead}>
            Thank you — your enquiry is on its way. No payment has been taken
            yet; nothing is due until the maker confirms availability and the
            final total with you.
          </p>
          <ol className={styles.steps}>
            <li>
              <strong>1. Confirmation (same day).</strong> The maker confirms
              stock, lead time and the final total on WhatsApp or email.
            </li>
            <li>
              <strong>2. Payment.</strong> Only then do we share payment
              details — Orange Money, MyZaka, Smega, bank transfer or cash on
              collection. You receive an order reference.
            </li>
            <li>
              <strong>3. Delivery or collection.</strong> Gaborone collection
              is free; Gaborone courier P35 (1–3 working days); Botswana-wide
              courier P80 (2–5 working days).
            </li>
          </ol>
          <p className={styles.small}>
            Didn’t hear back within one working day? Message us on WhatsApp —{' '}
            {contact.whatsappDisplay} — or email {contact.email}. Keep your
            order reference handy.
          </p>
          <div className={styles.actions}>
            <Button target={true} href={waLink} level={'primary'}>
              message us on WhatsApp
            </Button>
            <Button href={'/shop'} level={'secondary'}>
              continue shopping
            </Button>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default OrderConfirmationPage;

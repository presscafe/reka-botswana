import React from 'react';
import Button from '../Button';
import Config from '../../config.json';

import * as styles from './Contact.module.css';

const Contact = (props) => {
  const { contact } = Config;
  const waLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'Hello Reka Botswana — I have a question.'
  )}`;

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h4>Talk to a human</h4>
        <p>
          Our team is reachable {contact.responseTime}. Fastest answer:
          WhatsApp. For detailed briefs (corporate, wholesale, maker
          applications), email is better.
        </p>
      </div>

      <div className={styles.section}>
        <h4>WhatsApp</h4>
        <p>{contact.whatsappDisplay}</p>
        <Button target={true} href={waLink} level={'primary'}>
          open WhatsApp chat
        </Button>
      </div>

      <div className={styles.section}>
        <h4>Email</h4>
        <p>
          <a href={`mailto:${contact.email}`} className={styles.emailLink}>
            {contact.email}
          </a>
        </p>
      </div>

      <div className={styles.section}>
        <h4>Collection &amp; visits</h4>
        <p>
          {contact.collectionPoint}. Workshop visits are by appointment —
          message us first.
        </p>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import { Link } from 'gatsby';

import Config from '../../config.json';
import Icon from '../Icons/Icon';

import * as styles from './MobileNavigation.module.css';

const MobileNavigation = (props) => {
  const { close } = props;
  const { contact } = Config;
  const waLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'Hello Reka Botswana — I have a question.'
  )}`;

  return (
    <div className={styles.root}>
      <nav aria-label={'Mobile navigation'}>
        <div className={styles.mobileNavContainer}>
          {Config.headerLinks.map((navObject) => (
            <Link
              key={navObject.menuLink}
              className={`${styles.mobileLink}`}
              to={navObject.menuLink}
              onClick={() => close && close()}
            >
              {navObject.menuLabel}
            </Link>
          ))}
          <Link className={styles.mobileLink} to={'/cart'} onClick={() => close && close()}>
            My Bag
          </Link>
        </div>
        <div className={styles.navFooter}>
          <a className={styles.mobileLink} href={waLink} target={'_blank'} rel={'noreferrer'}>
            <Icon symbol={'phone'} /> WhatsApp us — {contact.whatsappDisplay}
          </a>
          <p className={styles.finePrint}>
            Prices in Pula (BWP) · Made-in-Botswana curation · Gaborone,
            Botswana
          </p>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;

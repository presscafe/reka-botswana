import { Link } from 'gatsby';
import React from 'react';

import Accordion from '../Accordion';
import Container from '../Container';
import Button from '../Button';
import Config from '../../config.json';
import * as styles from './Footer.module.css';

const Footer = (prop) => {
  const { contact, paymentMethods } = Config;
  const waLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'Hello Reka Botswana — I would like help with my order.'
  )}`;

  const renderLinks = (linkCollection) => {
    return (
      <ul className={styles.linkList}>
        {linkCollection.links.map((link, index) => {
          return (
            <li key={index}>
              <Link className={`${styles.link} fancy`} to={link.link}>
                {link.text}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={styles.root}>
      <Container size={'large'} spacing={'min'}>
        <div className={styles.content}>
          <div className={styles.contentTop}>
            {Config.footerLinks.map((linkCollection, indexLink) => {
              return (
                <div className={styles.footerLinkContainer} key={indexLink}>
                  {/* for web version */}
                  <div className={styles.footerLinks}>
                    <span className={styles.linkTitle}>
                      {linkCollection.subTitle}
                    </span>
                    {renderLinks(linkCollection)}
                  </div>
                  {/* for mobile version */}
                  <div className={styles.mobileFooterLinks}>
                    <Accordion
                      customStyle={styles}
                      type={'add'}
                      title={linkCollection.subTitle}
                    >
                      {renderLinks(linkCollection)}
                    </Accordion>
                  </div>
                </div>
              );
            })}
            <div className={styles.newsLetter}>
              <div className={styles.newsLetterContent}>
                <span className={styles.linkTitle}>Order & Support</span>
                <p className={styles.promoMessage}>
                  Questions about an order, a maker or a corporate quote?
                  Message us on WhatsApp — {contact.responseTime}.
                </p>
                <Button target={true} href={waLink} level={'primary'}>
                  WhatsApp {contact.whatsappDisplay}
                </Button>
                <div className={styles.emailContainer}>
                  <a href={`mailto:${contact.email}`} className={styles.emailLink}>
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.contentBottomContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.contentBottom}>
            <div className={styles.settings}>
              <span className={styles.finePrint}>
                Gaborone, Botswana · Prices in Pula (BWP) · English
              </span>
            </div>
            <div className={styles.copyrightContainer}>
              <div className={styles.creditCardContainer}>
                {paymentMethods.map((method) => (
                  <span key={method} className={styles.paymentBadge}>
                    {method}
                  </span>
                ))}
              </div>
              <span>
                © {new Date().getFullYear()} Reka Botswana. Made-in-Botswana
                curation — makers are credited on each product page. Built on
                the open-source Gatsby e-commerce theme by{' '}
                <Button target={true} href="https://matterdesign.com.au/">
                  Matter Design
                </Button>
              </span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;

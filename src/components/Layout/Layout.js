import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import { SITE_URL, SITE_NAME, absoluteUrl } from '../../helpers/seo';
import Config from '../../config.json';

import Header from '../Header';
import Footer from '../Footer';
import * as styles from './Layout.module.css';

// CSS not modular here to provide global styles
import './Globals.css';

// slick carousel styles bundled locally (no CDN dependency)
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const description =
  'Reka Botswana — the home of verified Made-in-Botswana quality. Shop clothing, pantry, beauty and craft made by real Botswana workshops, order via WhatsApp and pay by Orange Money, MyZaka, bank transfer or cash on collection.';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/icons/icon-512.png'),
  description,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: Config.contact.whatsappDisplay,
    areaServed: 'BW',
    availableLanguage: ['en', 'tn'],
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en-BW',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const Layout = ({ props, children, disablePaddingBottom = false }) => {
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    }
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Reka Botswana — Proudly Made in Botswana</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#A85B1E" />
        <meta name="application-name" content="Reka Botswana" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
        <meta name="apple-mobile-web-app-title" content="Reka Botswana" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Reka Botswana" />
        <meta property="og:title" content="Reka Botswana — Proudly Made in Botswana" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={absoluteUrl('/banner1.jpg')} />
        <meta property="og:url" content={SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reka Botswana — Proudly Made in Botswana" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteUrl('/banner1.jpg')} />
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
        <meta property="og:locale" content="en_BW" />

        {/* Icons & PWA manifest */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Helmet>

      <a className={styles.skipLink} href={'#main'}>
        skip to content
      </a>
      <Header />
      <main
        id={'main'}
        className={`${styles.main} ${
          disablePaddingBottom === true ? styles.disablePaddingBottom : ''
        }`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

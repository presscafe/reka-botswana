import React, { useRef } from 'react';

import Container from '../components/Container';
import Hero from '../components/Hero';
import ThemeLink from '../components/ThemeLink';
import Layout from '../components/Layout/Layout';
import Button from '../components/Button';
import Config from '../config.json';

import * as styles from './about.module.css';

const AboutPage = (props) => {
  const storyRef = useRef();
  const makersRef = useRef();
  const corporateRef = useRef();

  const handleScroll = (elementReference) => {
    if (elementReference && elementReference.current) {
      window.scrollTo({
        behavior: 'smooth',
        top: elementReference.current.offsetTop - 200,
      });
    }
  };

  const makersWhatsApp = `https://wa.me/${Config.contact.whatsapp}?text=${encodeURIComponent(
    'Hello Reka Botswana — I run a Botswana workshop and would like to list my products.'
  )}`;
  const corporateWhatsApp = `https://wa.me/${Config.contact.whatsapp}?text=${encodeURIComponent(
    'Hello Reka Botswana — I need a quote for corporate wear (quantities, sizes, logo, deadline).'
  )}`;

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        {/* Hero Container */}
        <Hero
          maxWidth={'900px'}
          image={'/banner1.jpg'}
          title={'Botswana makes.\nWe make buying it easy.'}
        />

        <div className={styles.navContainer}>
          <ThemeLink onClick={() => handleScroll(storyRef)} to={'#story'}>
            Our Story
          </ThemeLink>
          <ThemeLink onClick={() => handleScroll(makersRef)} to={'#makers'}>
            List Your Workshop
          </ThemeLink>
          <ThemeLink
            onClick={() => handleScroll(corporateRef)}
            to={'#corporate'}
          >
            Corporate &amp; Institutions
          </ThemeLink>
        </div>

        <Container size={'large'} spacing={'min'}>
          <div className={styles.detailContainer} ref={storyRef} id={'story'}>
            <p>
              Reka Botswana is a curation and ordering service for products
              genuinely designed, grown or made in Botswana. We started with
              clothing — where our experience runs deepest — and we are
              widening carefully into pantry, beauty and craft, one verified
              maker at a time.
            </p>
          </div>

          <div className={styles.content}>
            <h3>Why we exist</h3>
            <div>
              <p>
                Botswana imports most of what it consumes, even things it can
                make well: garments, staples, craft, natural-cosmetic
                ingredients. Local makers are good — and invisible. They sell
                from pavements, Facebook pages and WhatsApp statuses, with no
                shopfront, no catalogue and no ordering system a buyer can
                trust.
              </p>
              <p>
                The result cuts both ways. Makers struggle to reach buyers;
                buyers assume “made in Botswana” is a slogan rather than a
                standard. We fix the link between the two: one honest catalogue,
                every product traced to its maker, every order confirmed by a
                human before money moves.
              </p>
              <p>
                We are not a factory, a bank or a government scheme. We are
                operators: we check workshops, we photograph products, we route
                orders, and we keep both sides honest. If a maker misses a
                deadline, you hear it from us straight away — with options.
              </p>
            </div>
          </div>

          <div className={styles.content} ref={makersRef} id={'makers'}>
            <h3>List your workshop</h3>
            <div>
              <p>
                We onboard apparel studios, food processors, natural-cosmetic
                producers, leather workers and craft cooperatives. We prefer
                makers registered with BITC’s Pride Mark or LEA — the
                Industrial Development Act definition of “local manufacture”
                governs what we accept. Founding
                phase terms: no listing fee, you set your own prices and lead
                times, we route orders to you on WhatsApp or phone, you invoice
                through your own business.
              </p>
              <p>To apply, send us:</p>
              <ul>
                <li>Photos of your workshop and products</li>
                <li>Your price list and typical lead times</li>
                <li>Weekly capacity and what you can consistently supply</li>
                <li>Business registration or cooperative details, if any</li>
              </ul>
              <p>
                We visit before listing. We will tell you honestly if we think
                the timing, quality or economics are not right yet — and what
                would change that.
              </p>
              <div className={styles.ctaButtons}>
                <Button target={true} href={makersWhatsApp} level={'primary'}>
                  apply via WhatsApp
                </Button>
                <Button
                  href={`mailto:${Config.contact.email}?subject=Maker%20application`}
                  level={'secondary'}
                >
                  apply via email
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.content} ref={corporateRef} id={'corporate'}>
            <h3>Corporate &amp; institutions</h3>
            <div>
              <p>
                Team polos, event tees, site jackets, caps and gifting — cut,
                sewn and decorated in Gaborone. Embroidery from 50 units,
                screen printing from 20, corporate gifting boxes on request.
                Order of work: brief → written quote (2 working days) →
                pre-production sample → production → Botswana-wide delivery.
              </p>
              <p>
                Typical lead time is 10 working days after sample approval.
                We supply company details, invoice and VAT documentation on
                request. For repeat programmes, we hold your brand spec on file
                so reorders take days, not weeks.
              </p>
              <div className={styles.ctaButtons}>
                <Button target={true} href={corporateWhatsApp} level={'primary'}>
                  request a corporate quote
                </Button>
                <Button
                  href={`mailto:${Config.contact.email}?subject=Corporate%20quote%20enquiry`}
                  level={'secondary'}
                >
                  email your brief
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <h3>What we will not do</h3>
            <div>
              <p>
                We do not list imported stock as “Made in Botswana”. We do not
                take your payment before a maker confirms availability. We do
                not invent reviews, inflate prices or hide lead times. And we
                do not claim carbon-neutral anything — we claim shorter supply
                chains, steadier local wages and garments that last.
              </p>
            </div>
          </div>
        </Container>
        <div className={styles.bottomSpacer} />
      </div>
    </Layout>
  );
};

export default AboutPage;

import * as React from 'react';

import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Hero from '../components/Hero';
import BlogPreviewGrid from '../components/BlogPreviewGrid';
import Highlight from '../components/Highlight';
import Layout from '../components/Layout/Layout';
import ProductCollectionGrid from '../components/ProductCollectionGrid';
import ProductCardGrid from '../components/ProductCardGrid';
import Quote from '../components/Quote';
import Title from '../components/Title';

import { getJournal, getProducts } from '../helpers/catalog';

import * as styles from './index.module.css';
import { navigate } from 'gatsby';

const IndexPage = () => {
  const newArrivals = getProducts({ limit: 3 });
  const journalTeasers = getJournal(3);

  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'560px'}
        image={'/banner1.jpg'}
        title={'Proudly Made in Botswana'}
        subtitle={
          'Clothing, pantry, beauty and craft — made by real workshops across Botswana. Free collection, pay by Orange Money, MyZaka, bank transfer or cash.'
        }
        ctaText={'shop the collection'}
        ctaAction={goToShop}
      />

      {/* Message Container */}
      <div className={styles.messageContainer}>
        <p>
          Every pula spent on Botswana-made goods keeps{' '}
          <span className={styles.gold}>wages, skills and suppliers</span> inside
          the country.
        </p>
        <p>
          designed, grown &amp; sewn at home —{' '}
          <span className={styles.gold}>buy it here first</span>
        </p>
      </div>

      {/* Collection Container */}
      <div className={styles.collectionContainer}>
        <Container size={'large'}>
          <Title name={'Shop by Category'} />
          <ProductCollectionGrid />
        </Container>
      </div>

      {/* New Arrivals */}
      <div className={styles.newArrivalsContainer}>
        <Container>
          <Title name={'Fresh off the floor'} link={'/shop'} textLink={'view all'} />
          <ProductCardGrid
            spacing={true}
            showSlider
            height={480}
            columns={3}
            data={newArrivals}
          />
        </Container>
      </div>

      {/* Highlight  */}
      <div className={styles.highlightContainer}>
        <Container size={'large'} fullMobile>
          <Highlight
            image={'/highlight.jpg'}
            altImage={'Hands weaving a phane palm basket'}
            miniImage={'/highlightmin.jpg'}
            miniImageAlt={'Finished phane harvest basket'}
            title={'The basket still has a job to do'}
            description={`For generations, coil baskets winnowed phane harvests across northern Botswana. We work directly with weaver cooperatives so the maker sets the price — and you get the real thing.`}
            textLink={'list your own workshop'}
            link={'/about#makers'}
          />
        </Container>
      </div>

      {/* Corporate wear band */}
      <div className={styles.promotionContainer}>
        <Hero
          image={'/banner2.jpg'}
          title={'Corporate wear, sewn in Gaborone'}
        />
        <div className={styles.corporateContainer}>
          <p>
            Short-run embroidered or printed programmes — polos, tees, caps —
            from 20 units. Written quote within two working days.
          </p>
          <button
            type={'button'}
            className={styles.corporateButton}
            onClick={() => navigate('/about#corporate')}
          >
            Request a corporate quote
          </button>
        </div>
      </div>

      {/* Quote */}
      <Quote
        bgColor={'var(--standard-light-grey)'}
        title={'our promise'}
        quote={
          '“We only list what is genuinely designed, grown or made in Botswana — and we tell you exactly who made it.”'
        }
      />

      {/* Journal Grid */}
      <div className={styles.blogsContainer}>
        <Container size={'large'}>
          <Title
            name={'The Journal'}
            subtitle={'Notes on Botswana-made quality'}
          />
          <BlogPreviewGrid data={journalTeasers} />
        </Container>
      </div>

      {/* Sustainable band */}
      <div className={styles.sustainableContainer}>
        <Hero
          image={'/banner3.jpg'}
          title={'Demand-led, made locally'}
          subtitle={
            'Short production runs cut waste, keep workshops busy and keep skills in the community — from Otse to Etsha.'
          }
          ctaLink={'read the journal'}
          ctaTo={'/journal'}
          maxWidth={'660px'}
          ctaStyle={styles.ctaCustomButton}
        />
      </div>

      {/* Community grid */}
      <div className={styles.socialContainer}>
        <Title
          name={'Made by Botswana hands'}
          subtitle={'From garment workshops in Gaborone to weaver cooperatives in the north.'}
        />
        <div className={styles.socialContentGrid}>
          <img src={`/products/reka-heritage-polo.jpg`} alt={'Corporate polo made in Gaborone'} />
          <img src={`/products/reka-braai-blend.jpg`} alt={'Kgalagadi Braai Blend blended in Tlokweng'} />
          <img src={`/highlight.jpg`} alt={'Weaver hands finishing a phane basket'} />
          <img src={`/banner3.jpg`} alt={'Dryland moringa fields near Otse'} />
        </div>
      </div>
      <AttributeGrid />
    </Layout>
  );
};

export default IndexPage;

import React, { useState, useContext } from 'react';
import * as styles from './product.module.css';

import Helmet from 'react-helmet';
import Accordion from '../components/Accordion';
import AdjustItem from '../components/AdjustItem';
import Button from '../components/Button';
import Breadcrumbs from '../components/Breadcrumbs';
import Container from '../components/Container';
import CurrencyFormatter from '../components/CurrencyFormatter';
import Gallery from '../components/Gallery';
import SizeList from '../components/SizeList';
import SwatchList from '../components/SwatchList';
import Layout from '../components/Layout/Layout';

import { getProductBySlug, getRelatedProducts } from '../helpers/catalog';
import Icon from '../components/Icons/Icon';
import ProductCardGrid from '../components/ProductCardGrid';

import AddItemNotificationContext from '../context/AddItemNotificationProvider';
import { useCart } from '../context/CartContext';
import Config from '../config.json';

const ProductTemplate = ({ pageContext }) => {
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;
  const { addItem } = useCart();

  const product = getProductBySlug(pageContext.slug);

  const hasColors =
    Array.isArray(product?.colorOptions) && product.colorOptions.length > 0;
  const hasSizes =
    Array.isArray(product?.sizeOptions) && product.sizeOptions.length > 0;

  const [qty, setQty] = useState(1);
  const [activeSwatch, setActiveSwatch] = useState(
    hasColors ? product.colorOptions[0] : null
  );
  const [activeSize, setActiveSize] = useState(
    hasSizes ? product.sizeOptions[0] : null
  );

  if (!product) {
    return (
      <Layout>
        <Container size={'large'} spacing={'min'}>
          <h1>Product not found</h1>
          <p>
            The item you are looking for is no longer listed.{' '}
            <a href="/shop">Browse the catalogue</a>.
          </p>
        </Container>
      </Layout>
    );
  }

  const suggestions = getRelatedProducts(product.slug, 4);
  const lineTotal = Number(product.price) * qty;

  const orderLines = [
    'Hello Reka Botswana — I would like to order:',
    '',
    `${product.name} × ${qty}`,
    activeSize ? `Size: ${String(activeSize).toUpperCase()}` : null,
    activeSwatch ? `Colour: ${activeSwatch.title}` : null,
    `Estimated total: P${lineTotal.toLocaleString('en-BW')}`,
    `Product code: ${product.productCode}`,
    '',
    'Please confirm availability, total and delivery before payment.',
  ]
    .filter(Boolean)
    .join('\n');

  const waOrderLink = `https://wa.me/${Config.contact.whatsapp}?text=${encodeURIComponent(
    orderLines
  )}`;

  const handleAddToBag = () => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        image: product.image,
        alt: product.alt || product.name,
        price: product.price,
        size: hasSizes ? activeSize : undefined,
        color: activeSwatch ? activeSwatch.title : undefined,
      },
      qty
    );
    showNotification();
  };

  return (
    <Layout>
      <Helmet>
        <title>{product.name} — Reka Botswana</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} — Reka Botswana`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Helmet>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { label: 'Shop', link: '/shop' },
              { label: product.name },
            ]}
          />
          <div className={styles.content}>
            <div className={styles.gallery}>
              <Gallery images={product.gallery || [{ image: product.image, alt: product.alt }]} />
            </div>
            <div className={styles.details}>
              <span className={styles.madeIn}>
                <Icon symbol={'check'} /> Made in {product.madeIn || 'Botswana'} — {product.origin}
              </span>
              <h1>{product.name}</h1>
              <span className={styles.vendor}>by {product.vendor}</span>

              <div className={styles.priceContainer}>
                <CurrencyFormatter appendZero amount={product.price} />
                {product.originalPrice && (
                  <span className={styles.originalPrice}>
                    <CurrencyFormatter appendZero amount={product.originalPrice} />
                  </span>
                )}
              </div>

              {hasColors && (
                <div>
                  <SwatchList
                    swatchList={product.colorOptions}
                    activeSwatch={activeSwatch}
                    setActiveSwatch={setActiveSwatch}
                  />
                </div>
              )}

              {hasSizes && (
                <div className={styles.sizeContainer}>
                  <SizeList
                    sizeList={product.sizeOptions}
                    activeSize={activeSize}
                    setActiveSize={setActiveSize}
                  />
                </div>
              )}

              <div className={styles.quantityContainer}>
                <span>Quantity</span>
                <AdjustItem value={qty} onChange={setQty} ariaLabel={'Quantity'} />
              </div>

              <div className={styles.actionContainer}>
                <div className={styles.addToButtonContainer}>
                  <Button
                    onClick={() => handleAddToBag()}
                    fullWidth
                    level={'primary'}
                  >
                    Add to Bag
                  </Button>
                </div>
              </div>
              <div className={styles.directOrderContainer}>
                <Button
                  href={waOrderLink}
                  target={true}
                  fullWidth
                  level={'secondary'}
                >
                  Order now via WhatsApp
                </Button>
                <span className={styles.leadTime}>
                  {product.leadTime
                    ? `Lead time: ${product.leadTime}. Availability confirmed before payment.`
                    : 'Availability confirmed before payment.'}
                </span>
              </div>

              <div className={styles.description}>
                <p>{product.description}</p>
                <span>Product code: {product.productCode}</span>
              </div>

              <div className={styles.informationContainer}>
                <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'maker & origin'}
                >
                  <p className={styles.information}>
                    {product.vendor} — {product.origin}. Produced in
                    Botswana; where any input is imported we say so on
                    request. Every product on Reka Botswana is curated and
                    checked by our team before listing.
                  </p>
                </Accordion>
                <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'delivery & returns'}
                >
                  <p className={styles.information}>
                    {Config.ordering.collectionLabel}.{' '}
                    {Config.ordering.gaboroneDeliveryLabel} — P
                    {Config.ordering.gaboroneDeliveryFee}.{' '}
                    {Config.ordering.nationalCourierLabel} — P
                    {Config.ordering.nationalCourierFee}. 7 days from delivery
                    or collection to raise a return, subject to the product
                    being unused and in original packaging. Made-to-order
                    items cannot be returned unless faulty.
                  </p>
                </Accordion>
                <Accordion type={'plus'} customStyle={styles} title={'help'}>
                  <p className={styles.information}>
                    Questions on sizing, corporate volumes or payment? Message
                  us on WhatsApp {Config.contact.whatsappDisplay} or email{' '}
                    {Config.contact.email} — {Config.contact.responseTime}.
                  </p>
                </Accordion>
              </div>
            </div>
          </div>
          {suggestions.length > 0 && (
            <div className={styles.suggestionContainer}>
              <h2>You may also like</h2>
              <ProductCardGrid
                spacing
                showSlider
                height={400}
                columns={4}
                data={suggestions}
              />
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default ProductTemplate;

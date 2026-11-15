import React from 'react';
import { navigate } from 'gatsby';
import * as styles from './ProductCard.module.css';

import Icon from '../Icons/Icon';
import CurrencyFormatter from '../CurrencyFormatter';

const ProductCard = (props) => {
  const {
    slug,
    image,
    imageAlt,
    name,
    price,
    originalPrice,
    meta,
    onQuickView,
    height = 580,
  } = props;

  const handleRouteToProduct = () => {
    if (slug) navigate(`/product/${slug}`);
    else navigate('/shop');
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (typeof onQuickView === 'function') onQuickView();
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        onClick={() => handleRouteToProduct()}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleRouteToProduct();
        }}
        role={'button'}
        tabIndex={0}
        aria-label={`View ${name}`}
      >
        <img style={{ height: `${height}px` }} src={image} alt={imageAlt}></img>
        <button
          type="button"
          aria-label={`Quick add ${name} to bag`}
          className={styles.bagContainer}
          onClick={(e) => handleQuickView(e)}
        >
          <Icon symbol={'bagPlus'} />
        </button>
      </div>
      <button
        type="button"
        className={styles.detailsContainer}
        onClick={() => handleRouteToProduct()}
      >
        <span className={styles.productName}>{name}</span>
        <div className={styles.prices}>
          <span
            className={`${originalPrice !== undefined ? styles.salePrice : ''}`}
          >
            <CurrencyFormatter amount={price}></CurrencyFormatter>
          </span>
          {originalPrice && (
            <span className={styles.originalPrice}>
              <CurrencyFormatter amount={originalPrice}></CurrencyFormatter>
            </span>
          )}
        </div>
        <span className={styles.meta}>{meta}</span>
      </button>
    </div>
  );
};

export default ProductCard;

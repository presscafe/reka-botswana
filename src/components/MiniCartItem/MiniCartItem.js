import React from 'react';

import { navigate } from 'gatsby';
import AdjustItem from '../AdjustItem';
import CurrencyFormatter from '../CurrencyFormatter';
import RemoveItem from '../RemoveItem';
import { useCart } from '../../context/CartContext';

import * as styles from './MiniCartItem.module.css';

const MiniCartItem = (props) => {
  const { item } = props;
  const { setQty, removeItem } = useCart();
  const { id, image, alt, name, price, color, size, qty, slug } = item;

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role={'presentation'}
        onClick={() => navigate(slug ? `/product/${slug}` : '/shop')}
      >
        <img src={image} alt={alt || name} />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.metaContainer}>
          <span className={styles.name}>{name}</span>
          <div className={styles.priceContainer}>
            <CurrencyFormatter amount={price * qty} />
          </div>
          {color && <span className={styles.meta}>Colour: {color}</span>}
          {size && (
            <span className={styles.meta}>
              Size: <span className={styles.size}>{String(size).toUpperCase()}</span>
            </span>
          )}
        </div>
        <div className={styles.adjustItemContainer}>
          <AdjustItem
            value={qty}
            onChange={(next) => setQty(id, next)}
            ariaLabel={`Quantity for ${name}`}
          />
        </div>
      </div>
      <div className={styles.closeContainer}>
        <RemoveItem onRemove={() => removeItem(id)} label={`Remove ${name}`} />
      </div>
    </div>
  );
};

export default MiniCartItem;

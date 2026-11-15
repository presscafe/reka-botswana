import React from 'react';

import AdjustItem from '../AdjustItem';
import CurrencyFormatter from '../CurrencyFormatter';
import RemoveItem from '../RemoveItem';
import { useCart } from '../../context/CartContext';

import * as styles from './CartItem.module.css';
import { navigate } from 'gatsby';

const CartItem = (props) => {
  const { item } = props;
  const { setQty, removeItem } = useCart();
  const { id, image, alt, name, size, color, price, qty, slug } = item;

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role={'presentation'}
        onClick={() => navigate(slug ? `/product/${slug}` : '/shop')}
      >
        <img src={image} alt={alt || name}></img>
      </div>
      <div className={styles.itemContainer}>
        <span className={styles.name}>{name}</span>
        <div className={styles.metaContainer}>
          {color && <span>Colour: {color}</span>}
          {size && <span>Size: {String(size).toUpperCase()}</span>}
        </div>
      </div>
      <div className={styles.adjustItemContainer}>
        <AdjustItem
          value={qty}
          onChange={(next) => setQty(id, next)}
          ariaLabel={`Quantity for ${name}`}
        />
      </div>
      <div className={styles.priceContainer}>
        <CurrencyFormatter amount={price * qty} appendZero />
      </div>
      <div className={styles.removeContainer}>
        <RemoveItem onRemove={() => removeItem(id)} label={`Remove ${name}`} />
      </div>
    </div>
  );
};

export default CartItem;

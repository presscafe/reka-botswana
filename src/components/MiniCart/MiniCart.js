import { Link, navigate } from 'gatsby';
import React from 'react';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import MiniCartItem from '../MiniCartItem';
import { useCart } from '../../context/CartContext';

import * as styles from './MiniCart.module.css';

const MiniCart = (props) => {
  const { items, subtotal, count } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.root}>
        <div className={styles.titleContainer}>
          <h4>My Bag</h4>
        </div>
        <div className={styles.emptyContainer}>
          <p>Your bag is empty.</p>
          <p className={styles.emptyHint}>
            Browse the catalogue — every product is made in Botswana.
          </p>
          <Button onClick={() => navigate('/shop')} level={'primary'} fullWidth>
            shop the collection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>My Bag ({count})</h4>
      </div>
      <div className={styles.cartItemsContainer}>
        {items.map((item) => (
          <MiniCartItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryContent}>
          <div className={styles.totalContainer}>
            <span>Subtotal (BWP)</span>
            <span>
              <CurrencyFormatter amount={subtotal} appendZero />
            </span>
          </div>
          <span className={styles.taxNotes}>
            Collection is free. Delivery and totals are confirmed on your order
            enquiry before payment.
          </span>
          <Button onClick={() => navigate('/cart')} level={'primary'} fullWidth>
            checkout
          </Button>
          <div className={styles.linkContainer}>
            <Link to={'/shop'}>continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;

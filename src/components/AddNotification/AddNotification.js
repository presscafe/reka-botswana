import { Link, navigate } from 'gatsby';
import React, { useContext } from 'react';

import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
import { useCart } from '../../context/CartContext';

import Button from '../Button';
import Icon from '../Icons/Icon';

import * as styles from './AddNotification.module.css';

const AddNotification = (props) => {
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotif = ctxAddItemNotification.state?.open;
  const { count, hydrated } = useCart();

  return (
    <div
      className={`${styles.root} ${
        showNotif === true ? styles.show : styles.hide
      }`}
      role={'status'}
      aria-live={'polite'}
    >
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Icon symbol={'check'}></Icon>
        </div>
        <span>Item added to bag</span>
      </div>

      <div className={styles.actionContainer}>
        <Button onClick={props.openCart} level={'secondary'}>
          view my bag{hydrated ? ` (${count})` : ''}
        </Button>
        <Button level="primary" href="/cart">
          checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/shop'}>continue shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default AddNotification;

import React, { useContext, useState } from 'react';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import AdjustItem from '../AdjustItem';
import SizeList from '../SizeList';
import SwatchList from '../SwatchList';

import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
import { useCart } from '../../context/CartContext';

import * as styles from './QuickView.module.css';

const QuickView = (props) => {
  const { product, close, buttonTitle = 'Add to Bag' } = props;
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;
  const { addItem } = useCart();

  const hasColors = Array.isArray(product?.colorOptions) && product.colorOptions.length > 0;
  const hasSizes = Array.isArray(product?.sizeOptions) && product.sizeOptions.length > 0;

  const [activeSwatch, setActiveSwatch] = useState(hasColors ? product.colorOptions[0] : null);
  const [activeSize, setActiveSize] = useState(hasSizes ? product.sizeOptions[0] : null);
  const [qty, setQty] = useState(1);

  if (!product) return null;

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
    close();
    showNotification();
  };

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>Quick Add</h4>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.productContainer}>
          <span className={styles.productName}>{product.name}</span>
          <div className={styles.price}>
            <CurrencyFormatter amount={product.price}></CurrencyFormatter>
          </div>
          <div className={styles.productImageContainer}>
            <img alt={product.alt || product.name} src={product.image}></img>
          </div>
        </div>

        {hasColors && (
          <div className={styles.sectionContainer}>
            <SwatchList
              swatchList={product.colorOptions}
              activeSwatch={activeSwatch}
              setActiveSwatch={setActiveSwatch}
            />
          </div>
        )}

        {hasSizes && (
          <div className={styles.sectionContainer}>
            <SizeList
              sizeList={product.sizeOptions}
              activeSize={activeSize}
              setActiveSize={setActiveSize}
            />
          </div>
        )}

        <div className={styles.sectionContainer}>
          <AdjustItem value={qty} onChange={setQty} ariaLabel={'Quantity'} />
        </div>

        <Button onClick={() => handleAddToBag()} fullWidth level={'primary'}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default QuickView;

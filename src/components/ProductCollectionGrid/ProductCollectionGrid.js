import React from 'react';
import * as styles from './ProductCollectionGrid.module.css';

import ProductCollection from '../ProductCollection';

const categories = [
  {
    image: '/products/reka-heritage-polo.jpg',
    title: 'Apparel & Corporate Wear',
    text: 'SHOP NOW',
    link: '/shop?category=apparel',
  },
  {
    image: '/products/reka-braai-blend.jpg',
    title: 'Pantry & Natural Food',
    text: 'SHOP NOW',
    link: '/shop?category=pantry',
  },
  {
    image: '/products/reka-moringa.jpg',
    title: 'Beauty & Wellness',
    text: 'SHOP NOW',
    link: '/shop?category=beauty',
  },
  {
    image: '/products/reka-phane-basket.jpg',
    title: 'Home & Craft',
    text: 'SHOP NOW',
    link: '/shop?category=home',
  },
];

const ProductCollectionGrid = (props) => {
  return (
    <div className={styles.root}>
      {categories.map((category) => (
        <ProductCollection key={category.link} {...category} />
      ))}
    </div>
  );
};

export default ProductCollectionGrid;

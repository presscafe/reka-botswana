import { navigate } from 'gatsby';
import React from 'react';
import * as styles from './ProductCollection.module.css';

const ProductCollection = (props) => {
  const { image, title, text, link } = props;

  return (
    <div
      role={'link'}
      tabIndex={0}
      aria-label={`${title} — ${text || 'shop now'}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(link);
        }
      }}
      onClick={() => navigate(link)}
      onKeyPress={() => navigate(link)}
      className={styles.root}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.text}>{text}</span>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
};

export default ProductCollection;

import React from 'react';
import { navigate } from 'gatsby';

import * as styles from './Brand.module.css';

/**
 * Reka Botswana wordmark. Wordmark only — icons are generated
 * separately for PWA/install use (see /static/icons).
 */
const Brand = (props) => {
  return (
    <button
      type="button"
      aria-label="Reka Botswana — home"
      className={styles.root}
      onClick={() => navigate('/')}
    >
      <svg
        width="132"
        height="26"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 132 26"
        role="img"
        aria-label="Reka Botswana"
      >
        <circle cx="8" cy="13" r="6.2" fill="#A85B1E" />
        <text
          x="20"
          y="17.6"
          fontFamily="'Yeseva One', Georgia, serif"
          fontSize="16.5"
          letterSpacing="2.5"
          fill="currentColor"
        >
          REKA
        </text>
        <text
          x="70"
          y="15"
          fontFamily="Inter, Helvetica, sans-serif"
          fontSize="7.4"
          letterSpacing="2.9"
          fill="currentColor"
          opacity="0.85"
        >
          BOTSWANA
        </text>
      </svg>
    </button>
  );
};

export default Brand;

import React from 'react';

import Icon from '../Icons/Icon';

import * as styles from './RemoveItem.module.css';

/**
 * Small cross button used to remove a cart line.
 * Props: onRemove {() => void}, label {string}
 */
const RemoveItem = (props) => {
  const { onRemove, label = 'Remove item' } = props;
  return (
    <button
      type="button"
      aria-label={label}
      className={styles.root}
      onClick={() => {
        if (typeof onRemove === 'function') onRemove();
      }}
    >
      <Icon symbol={'cross'} />
    </button>
  );
};

export default RemoveItem;

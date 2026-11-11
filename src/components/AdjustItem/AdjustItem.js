import React from 'react';

import Icon from '../Icons/Icon';
import * as styles from './AdjustItem.module.css';

/**
 * Controlled quantity stepper.
 * Props:
 *   value      {number}  current quantity (clamped at 1)
 *   onChange   {(qty:number) => void}
 *   isTransparent {boolean}
 * If `value`/`onChange` are omitted the component keeps internal state.
 */
const AdjustItem = (props) => {
  const {
    isTransparent = false,
    value,
    onChange,
    ariaLabel = 'Quantity',
  } = props;
  const [internal, setInternal] = React.useState(1);
  const isControlled = value !== undefined && typeof onChange === 'function';
  const qty = isControlled ? Math.max(1, Number(value) || 1) : internal;

  const commit = (next) => {
    const clamped = Math.max(1, parseInt(next, 10) || 1);
    if (isControlled) onChange(clamped);
    else setInternal(clamped);
  };

  return (
    <div
      className={`${styles.root} ${
        isTransparent === true ? styles.transparent : ''
      }`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className={styles.iconContainer}
        onClick={() => commit(qty - 1)}
      >
        <Icon symbol={'minus'}></Icon>
      </button>
      <div className={styles.inputContainer}>
        <input
          aria-label={ariaLabel}
          className={`${isTransparent === true ? styles.transparentInput : ''}`}
          onChange={(e) => commit(e.target.value)}
          type={'number'}
          min={1}
          value={qty}
        ></input>
      </div>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => commit(qty + 1)}
        className={styles.iconContainer}
      >
        <Icon symbol={'plus'}></Icon>
      </button>
    </div>
  );
};

export default AdjustItem;

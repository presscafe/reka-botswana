import React from 'react';
import { isNumeric } from '../../helpers/general';

/**
 * Formats an amount in Botswana Pula (BWP) by default.
 * locale fixed to en-BW so the "P" symbol renders identically
 * on every device and during static build.
 */
const CurrencyFormatter = ({
  amount,
  currency = 'BWP',
  appendZero = false,
}) => {
  const parsed =
    typeof amount === 'number'
      ? amount
      : parseFloat(String(amount).replace(/[^0-9.-]/g, ''));

  if (!isNumeric(parsed)) {
    return <span>No price available</span>;
  }

  const formatObject = new Intl.NumberFormat('en-BW', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: appendZero ? 2 : 0,
    maximumFractionDigits: appendZero ? 2 : currency === 'BWP' ? 0 : 2,
  });

  let formatted = formatObject.format(parsed);
  if (!appendZero) {
    formatted = formatted.replace(/\.00(?=\D*$)/, '');
  }

  return (
    <span aria-label={`Price ${formatted}`}>
      <span>{formatted}</span>
    </span>
  );
};

export default CurrencyFormatter;

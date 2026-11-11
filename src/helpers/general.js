/**
 * Shared formatting / validation helpers for Reka Botswana.
 */

/**
 * Checks if a value is numeric.
 * isNumeric(value)
 */
function isNumeric(str) {
  if (['string', 'number'].indexOf(typeof str) === -1) return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

/**
 * Validates an email address with a pragmatic pattern.
 */
function validateEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
}

/**
 * Checks whether a value is empty (null/undefined/blank string/empty array/object).
 */
function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

export { isNumeric, validateEmail, isEmpty };

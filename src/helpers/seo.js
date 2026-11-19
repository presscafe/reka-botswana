/**
 * Canonical site URL + shared SEO helpers.
 * Keep in one place so Helmet/JSON-LD tags stay consistent.
 */

export const SITE_URL = 'https://rekabotswana.co.bw';
export const SITE_NAME = 'Reka Botswana';

export const absoluteUrl = (path = '/') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const waDigits = (number) => String(number || '').replace(/\D/g, '');

/**
 * Build a wa.me deep link with a pre-filled message.
 * wa.me requires digits only — a pasted "+267 …" config would silently break.
 */
export const whatsAppLink = (number, message) => {
  const digits = waDigits(number);
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${text}`;
};

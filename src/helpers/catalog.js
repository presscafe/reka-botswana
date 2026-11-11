/**
 * Reka Botswana — catalogue access layer.
 * All data is bundled at build time from /src/helpers/*.json.
 * Imagery is illustrative (see docs). Replace with verified maker
 * data via the founding-makers onboarding process before public launch.
 */
import productJson from './product.json';
import journalJson from './blog.json';

export const allProducts = productJson;
export const allJournal = journalJson;

function getProducts({ tag, limit } = {}) {
  let items = allProducts;
  if (tag) items = items.filter((item) => item.tags.includes(tag));
  return limit ? items.slice(0, limit) : items;
}

function getProductBySlug(slug) {
  return allProducts.find((item) => item.slug === slug);
}

function getRelatedProducts(slug, limit = 4) {
  const current = getProductBySlug(slug);
  if (!current) return getProducts({ limit });
  const sameTag = allProducts.filter(
    (item) =>
      item.slug !== slug &&
      item.tags.some((tag) => current.tags.includes(tag))
  );
  const rest = allProducts.filter(
    (item) => item.slug !== slug && !sameTag.includes(item)
  );
  return [...sameTag, ...rest].slice(0, limit);
}

function getJournal(limit) {
  return limit ? journalJson.slice(0, limit) : journalJson;
}

function getJournalBySlug(slug) {
  return journalJson.find((item) => item.slug === slug);
}

function searchProducts(query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return [];
  return allProducts.filter((item) => {
    const haystack = [
      item.name,
      item.vendor,
      item.origin,
      item.description,
      item.madeIn,
      ...(item.tags || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return q.split(/\s+/).every((word) => haystack.includes(word));
  });
}

export {
  getProducts,
  getProductBySlug,
  getRelatedProducts,
  getJournal,
  getJournalBySlug,
  searchProducts,
};

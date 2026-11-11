import React, { useState, useEffect, useMemo } from 'react';
import * as styles from './shop.module.css';

import Banner from '../components/Banner';
import Breadcrumbs from '../components/Breadcrumbs';
import Container from '../components/Container';
import Layout from '../components/Layout';
import ProductCardGrid from '../components/ProductCardGrid';
import { allProducts } from '../helpers/catalog';
import Config from '../config.json';

const CATEGORIES = [
  { label: 'All', value: 'all' },
  ...Config.filters[0].items.map((item) => ({
    label: item.name,
    value: item.value,
  })),
];

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name A–Z', value: 'name' },
];

const ShopPage = (props) => {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');

  // Apply ?category= on mount (client-only; SSG renders 'all').
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('category');
    if (fromUrl && CATEGORIES.some((c) => c.value === fromUrl)) {
      setCategory(fromUrl);
    }
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (value === 'all') params.delete('category');
      else params.set('category', value);
      const query = params.toString();
      window.history.replaceState(
        {},
        '',
        query ? `?${query}` : window.location.pathname
      );
    }
  };

  const filtered = useMemo(() => {
    let items =
      category === 'all'
        ? [...allProducts]
        : allProducts.filter((item) => item.tags.includes(category));
    switch (sort) {
      case 'price-asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return items;
  }, [category, sort]);

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.breadcrumbContainer}>
            <Breadcrumbs
              crumbs={[
                { link: '/', label: 'Home' },
                { label: 'Shop' },
              ]}
            />
          </div>
        </Container>
        <Banner
          maxWidth={'650px'}
          name={`Made in Botswana`}
          subtitle={
            'Every product here is designed, grown or sewn in Botswana by workshops we know by name — ask us anything about provenance before you buy.'
          }
        />
        <Container size={'large'} spacing={'min'}>
          <div className={styles.metaContainer}>
            <span className={styles.itemCount}>
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            </span>
            <div className={styles.sortContainer}>
              <label className={styles.sortLabel} htmlFor={'sortSelect'}>
                Sort by
              </label>
              <select
                id={'sortSelect'}
                className={styles.sortSelect}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.chipsContainer} role={'group'} aria-label={'Filter by category'}>
            {CATEGORIES.map((item) => (
              <button
                key={item.value}
                type={'button'}
                aria-pressed={category === item.value}
                className={`${styles.filterChip} ${
                  category === item.value ? styles.filterChipActive : ''
                }`}
                onClick={() => handleCategoryChange(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className={styles.productContainer}>
            {filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>Nothing in this category yet</h3>
                <p>
                  New makers are added as they are verified. Tell us what you
                  want to see — WhatsApp +267 72 000 000.
                </p>
              </div>
            ) : (
              <ProductCardGrid data={filtered} columns={3} height={520} />
            )}
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default ShopPage;

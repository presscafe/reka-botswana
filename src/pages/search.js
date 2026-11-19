import React, { useEffect, useState } from 'react';

import Breadcrumbs from '../components/Breadcrumbs';
import Layout from '../components/Layout/Layout';
import Container from '../components/Container/Container';
import ProductCardGrid from '../components/ProductCardGrid';
import Button from '../components/Button';

import { searchProducts } from '../helpers/catalog';

import * as styles from './search.module.css';
import Helmet from 'react-helmet';
import { absoluteUrl } from '../helpers/seo';

const SearchPage = (props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  // Read ?q= on the client; SSG has no query string.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setQuery(q);
    setResults(q ? searchProducts(q) : []);
  }, []);

  const showEmpty = results !== null && results.length === 0;

  return (
    <Layout>
      <Helmet>
        <title>Search — Reka Botswana</title>
        <meta name="description" content="Search the Reka Botswana catalogue." />
        <meta property="og:title" content="Search — Reka Botswana" />
        <meta property="og:description" content="Search the Reka Botswana catalogue." />
        <meta property="og:url" content={absoluteUrl('/search')} />
        <link rel="canonical" href={absoluteUrl('/search')} />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { label: `Search results for “${query}”` },
            ]}
          />
          <div className={styles.searchLabels}>
            <h4>Search results for “{query}”</h4>
            <span>
              {results === null
                ? 'Searching…'
                : `${results.length} ${
                    results.length === 1 ? 'result' : 'results'
                  }`}
            </span>
          </div>
          {showEmpty ? (
            <div className={styles.emptyState}>
              <p>
                Nothing matched “{query}”. Try “polo”, “moringa”, “honey”,
                “basket” or “braai”.
              </p>
              <Button href={'/shop'} level={'primary'}>
                browse the full catalogue
              </Button>
            </div>
          ) : (
            <ProductCardGrid
              showSlider={false}
              height={580}
              columns={3}
              data={results || []}
            />
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default SearchPage;

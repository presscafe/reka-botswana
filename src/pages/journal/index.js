import React from 'react';

import BlogPreviewGrid from '../../components/BlogPreviewGrid';
import Container from '../../components/Container';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout/Layout';

import { getJournal } from '../../helpers/catalog';
import * as styles from './index.module.css';
import Helmet from 'react-helmet';
import { absoluteUrl } from '../../helpers/seo';

const JournalPage = (props) => {
  const articles = getJournal();

  return (
    <Layout disablePaddingBottom>
      <Helmet>
        <title>Journal — Made-in-Botswana stories & guides | Reka Botswana</title>
        <meta name="description" content="Stories, buying guides and maker spotlights from the Botswana-made community." />
        <meta property="og:title" content="Journal — Made-in-Botswana stories & guides | Reka Botswana" />
        <meta property="og:description" content="Stories, buying guides and maker spotlights from the Botswana-made community." />
        <meta property="og:url" content={absoluteUrl('/journal')} />
        <link rel="canonical" href={absoluteUrl('/journal')} />
      </Helmet>
      <div className={styles.root}>
        <Hero
          maxWidth={'520px'}
          image={'/banner1.jpg'}
          title={'The Reka Botswana Journal'}
          subtitle={'Field notes on Botswana-made quality'}
          header={'journal'}
        />

        {/* Article Grid */}
        <div className={styles.blogsContainer}>
          <Container size={'large'}>
            <BlogPreviewGrid
              data={articles}
              hideReadMoreOnWeb
              showExcerpt
            />
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default JournalPage;

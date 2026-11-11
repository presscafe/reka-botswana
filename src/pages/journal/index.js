import React from 'react';

import BlogPreviewGrid from '../../components/BlogPreviewGrid';
import Container from '../../components/Container';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout/Layout';

import { getJournal } from '../../helpers/catalog';
import * as styles from './index.module.css';

const JournalPage = (props) => {
  const articles = getJournal();

  return (
    <Layout disablePaddingBottom>
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

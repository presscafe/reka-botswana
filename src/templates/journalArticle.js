import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import * as styles from './journalArticle.module.css';

import Breadcrumbs from '../components/Breadcrumbs';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';
import { getJournalBySlug } from '../helpers/catalog';

const JournalArticleTemplate = ({ pageContext }) => {
  const article = getJournalBySlug(pageContext.slug);

  if (!article) {
    return (
      <Layout>
        <Container size={'large'} spacing={'min'}>
          <h1>Article not found</h1>
          <p>
            <Link to="/journal">Back to the journal</Link>.
          </p>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{article.title} — Reka Botswana Journal</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { label: 'Journal', link: '/journal' },
              { label: article.title },
            ]}
          />
          <div className={styles.blogContainer}>
            <span className={styles.articleMeta}>
              {article.category} ·{' '}
              {new Date(`${article.published}T00:00:00Z`).toLocaleDateString(
                'en-GB',
                { day: 'numeric', month: 'long', year: 'numeric' }
              )}{' '}
              · {article.readingTime}
            </span>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.imageContainer}>
              <img src={article.image} alt={article.alt || article.title} />
            </div>
            <p className={styles.excerpt}>{article.excerpt}</p>
            {article.body.map((paragraph, index) => (
              <p className={styles.blogParagraph} key={index}>
                {paragraph}
              </p>
            ))}
            <div className={styles.backContainer}>
              <Link to="/journal" className={styles.backLink}>
                ← Back to the journal
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default JournalArticleTemplate;

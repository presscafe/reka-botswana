import React, { useState } from 'react';
import { navigate } from 'gatsby';
import * as styles from './404.module.css';

import Button from '../components/Button';
import Container from '../components/Container';
import FormInputField from '../components/FormInputField/FormInputField';
import Layout from '../components/Layout';
import Helmet from 'react-helmet';
import { absoluteUrl } from '../helpers/seo';

const NotFoundPage = () => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <Layout disablePaddingBottom>
      <Helmet>
        <title>Page not found — Reka Botswana</title>
        <meta name="description" content="The page you were looking for does not exist." />
        <meta property="og:title" content="Page not found — Reka Botswana" />
        <meta property="og:description" content="The page you were looking for does not exist." />
        <meta property="og:url" content={absoluteUrl('/404')} />
        <link rel="canonical" href={absoluteUrl('/404')} />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Container size={'medium'}>
        <div className={styles.root}>
          <h1>404</h1>
          <h2>Page not found</h2>
          <p>
            Uh oh, looks like the page you are looking for has moved or no
            longer exists.
          </p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.searchContainer}>
              <FormInputField
                id={'name'}
                value={search}
                handleChange={(_, e) => setSearch(e)}
                type={'text'}
              />
              <Button type={'submit'} level={'primary'}>
                search
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;

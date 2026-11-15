import React, { useState, useEffect, createRef } from 'react';
import { Link, navigate } from 'gatsby';

import AddNotification from '../AddNotification';
import Brand from '../Brand';
import Container from '../Container';
import Config from '../../config.json';
import Drawer from '../Drawer';
import FormInputField from '../FormInputField/FormInputField';
import Icon from '../Icons/Icon';
import MiniCart from '../MiniCart';
import MobileNavigation from '../MobileNavigation';
import { useCart } from '../../context/CartContext';
import * as styles from './Header.module.css';

const Header = (prop) => {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const searchRef = createRef();
  const bannerMessage =
    'Proudly Made in Botswana — free collection on all orders';
  const searchSuggestions = [
    'Corporate polo',
    'Moringa powder',
    'Phane basket',
    'Braai spice',
  ];
  const { count, hydrated } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(search)}`);
    setShowSearch(false);
  };

  // hide the search panel on scroll
  useEffect(() => {
    const onScroll = () => setShowSearch(false);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // focus the search field once the panel is visible
  useEffect(() => {
    if (showSearch === true) {
      const timer = setTimeout(() => {
        searchRef.current && searchRef.current.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSearch]);

  return (
    <div className={styles.root}>
      <div className={styles.headerMessageContainer}>
        <span>{bannerMessage}</span>
      </div>
      <Container size={'large'} spacing={'min'}>
        {/* header container */}
        <div className={styles.header}>
          <div className={styles.linkContainer}>
            <nav aria-label={'Primary'}>
              {Config.headerLinks.map((navObject) => (
                <Link
                  key={navObject.menuLink}
                  className={styles.navLink}
                  to={navObject.menuLink}
                >
                  {navObject.menuLabel}
                </Link>
              ))}
            </nav>
          </div>
          <div
            role={'button'}
            tabIndex={0}
            aria-label={mobileMenu ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenu(!mobileMenu)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setMobileMenu(!mobileMenu);
            }}
            className={styles.burgerIcon}
          >
            <Icon symbol={`${mobileMenu === true ? 'cross' : 'burger'}`}></Icon>
          </div>
          <Brand />
          <div className={styles.actionContainers}>
            <button
              aria-label="Search"
              className={`${styles.iconButton} ${styles.iconContainer}`}
              onClick={() => setShowSearch(!showSearch)}
            >
              <Icon symbol={'search'}></Icon>
            </button>
            <button
              aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
              className={`${styles.iconButton} ${styles.iconContainer} ${styles.bagIconContainer}`}
              onClick={() => {
                setShowMiniCart(true);
                setMobileMenu(false);
              }}
            >
              <Icon symbol={'bag'}></Icon>
              {hydrated && count > 0 && (
                <div className={styles.bagNotification}>
                  <span>{count}</span>
                </div>
              )}
            </button>
            <div className={styles.notificationContainer}>
              <AddNotification openCart={() => setShowMiniCart(true)} />
            </div>
          </div>
        </div>

        {/* search container */}
        <div
          className={`${styles.searchContainer} ${
            showSearch === true ? styles.show : styles.hide
          }`}
        >
          <h4>What are you looking for?</h4>
          <form className={styles.searchForm} onSubmit={(e) => handleSearch(e)}>
            <FormInputField
              ref={searchRef}
              icon={'arrow'}
              id={'searchInput'}
              value={search}
              placeholder={'Search products, makers, categories…'}
              type={'text'}
              handleChange={(_, e) => setSearch(e)}
            />
          </form>
          <div className={styles.suggestionContianer}>
            {searchSuggestions.map((suggestion, index) => (
              <p
                role={'presentation'}
                onClick={() => {
                  setShowSearch(false);
                  navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                }}
                key={index}
                className={styles.suggestion}
              >
                {suggestion}
              </p>
            ))}
          </div>
          <div
            role={'presentation'}
            onClick={(e) => {
              e.stopPropagation();
              setShowSearch(false);
            }}
            className={styles.backdrop}
          ></div>
        </div>
      </Container>

      {/* minicart container */}
      <Drawer visible={showMiniCart} close={() => setShowMiniCart(false)}>
        <MiniCart />
      </Drawer>

      {/* mobile menu */}
      <div className={styles.mobileMenuContainer}>
        <Drawer
          hideCross
          top={'98px'}
          isReverse
          visible={mobileMenu}
          close={() => setMobileMenu(false)}
        >
          <MobileNavigation close={() => setMobileMenu(false)} />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;

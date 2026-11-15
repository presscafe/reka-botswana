import { Link, navigate } from 'gatsby';
import React, { useState } from 'react';

import Brand from '../components/Brand';
import CartItem from '../components/CartItem';
import Container from '../components/Container';
import Footer from '../components/Footer';
import CurrencyFormatter from '../components/CurrencyFormatter';
import Icon from '../components/Icons/Icon';
import Button from '../components/Button';
import Config from '../config.json';
import { useCart } from '../context/CartContext';

import * as styles from './cart.module.css';

const CartPage = (props) => {
  const { items, subtotal, count, clearCart } = useCart();
  const [fulfilment, setFulfilment] = useState('collection');
  const [payment, setPayment] = useState(Config.paymentMethods[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const deliveryFee =
    fulfilment === 'gaborone'
      ? Config.ordering.gaboroneDeliveryFee
      : fulfilment === 'national'
      ? Config.ordering.nationalCourierFee
      : 0;
  const total = subtotal + deliveryFee;

  const fulfilmentLabel =
    fulfilment === 'gaborone'
      ? Config.ordering.gaboroneDeliveryLabel
      : fulfilment === 'national'
      ? Config.ordering.nationalCourierLabel
      : Config.ordering.collectionLabel;

  const buildOrderMessage = () => {
    const lines = [
      'Reka Botswana — new order enquiry',
      '',
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Fulfilment: ${fulfilmentLabel}`,
      `Payment preference: ${payment}`,
      '',
      'Items:',
      ...items.map((item) => {
        const variant = [
          item.size ? `size ${String(item.size).toUpperCase()}` : null,
          item.color || null,
        ]
          .filter(Boolean)
          .join(', ');
        return `- ${item.qty} × ${item.name}${variant ? ` (${variant})` : ''} — P${item.price * item.qty}`;
      }),
      '',
      `Subtotal: P${subtotal}`,
      `Delivery: ${deliveryFee === 0 ? 'Free' : `P${deliveryFee}`}`,
      `Estimated total: P${total}`,
      notes.trim() ? `Notes: ${notes.trim()}` : null,
      '',
      'Please confirm availability and total before payment.',
    ];
    return lines.filter((line) => line !== null).join('\n');
  };

  const submitOrder = (channel) => {
    if (!name.trim() || !phone.trim()) {
      setError('Please enter your name and phone number so the maker can reach you.');
      return;
    }
    if (items.length === 0) return;
    setError('');
    const message = buildOrderMessage();

    if (channel === 'whatsapp') {
      window.open(
        `https://wa.me/${Config.contact.whatsapp}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener'
      );
    } else {
      window.location.href = `mailto:${Config.contact.email}?subject=${encodeURIComponent(
        `Order enquiry — ${name.trim()}`
      )}&body=${encodeURIComponent(message)}`;
    }
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div>
      <div className={styles.contentContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.headerContainer}>
            <div className={styles.shoppingContainer}>
              <Link className={styles.shopLink} to={'/shop'}>
                <Icon symbol={'arrow'}></Icon>
                <span className={styles.continueShopping}>
                  Continue Shopping
                </span>
              </Link>
            </div>
            <Brand />
            <div className={styles.loginContainer}>
              <a
                className={styles.helpLink}
                href={`https://wa.me/${Config.contact.whatsapp}`}
                target={'_blank'}
                rel={'noreferrer noopener'}
              >
                Need help? WhatsApp us
              </a>
            </div>
          </div>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>Your bag is empty</h2>
              <p>
                Everything in the catalogue is made in Botswana — start with
                the pantry staples or corporate wear.
              </p>
              <Button href={'/shop'} level={'primary'}>
                shop the collection
              </Button>
            </div>
          ) : (
            <div className={styles.summaryContainer}>
              <h3>My Bag ({count})</h3>
              <div className={styles.cartContainer}>
                <div className={styles.cartItemsContainer}>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                <div className={styles.orderPanel}>
                  <span className={styles.panelTitle}>your order</span>

                  <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>Delivery</legend>
                    {[
                      { value: 'collection', label: Config.ordering.collectionLabel },
                      { value: 'gaborone', label: `${Config.ordering.gaboroneDeliveryLabel} — P${Config.ordering.gaboroneDeliveryFee}` },
                      { value: 'national', label: `${Config.ordering.nationalCourierLabel} — P${Config.ordering.nationalCourierFee}` },
                    ].map((option) => (
                      <label key={option.value} className={styles.radioRow}>
                        <input
                          type={'radio'}
                          name={'fulfilment'}
                          value={option.value}
                          checked={fulfilment === option.value}
                          onChange={() => setFulfilment(option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                    <span className={styles.fieldHint}>
                      {Config.ordering.handmadeNotice}
                    </span>
                  </fieldset>

                  <label className={styles.fieldLabel} htmlFor={'paymentMethod'}>
                    Payment method
                  </label>
                  <select
                    id={'paymentMethod'}
                    className={styles.select}
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                  >
                    {Config.paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>

                  <label className={styles.fieldLabel} htmlFor={'orderName'}>
                    Full name *
                  </label>
                  <input
                    id={'orderName'}
                    className={styles.input}
                    type={'text'}
                    autoComplete={'name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={'e.g. Lebogang Moeng'}
                  />

                  <label className={styles.fieldLabel} htmlFor={'orderPhone'}>
                    Phone / WhatsApp *
                  </label>
                  <input
                    id={'orderPhone'}
                    className={styles.input}
                    type={'tel'}
                    autoComplete={'tel'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={'e.g. +267 71 000 000'}
                  />

                  <label className={styles.fieldLabel} htmlFor={'orderNotes'}>
                    Notes for the maker (optional)
                  </label>
                  <textarea
                    id={'orderNotes'}
                    className={styles.textarea}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={'Belt width, gift note, event date…'}
                    rows={3}
                  />

                  {error && (
                    <p className={styles.errorText} role={'alert'}>
                      {error}
                    </p>
                  )}

                  <div className={styles.calculationContainer}>
                    <div className={styles.labelContainer}>
                      <span>Subtotal</span>
                      <span>
                        <CurrencyFormatter amount={subtotal} appendZero />
                      </span>
                    </div>
                    <div className={styles.labelContainer}>
                      <span>Delivery</span>
                      <span>
                        {deliveryFee === 0
                          ? 'Free'
                          : `P${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className={styles.totalContainer}>
                      <span>Estimated total</span>
                      <span>
                        <CurrencyFormatter amount={total} appendZero />
                      </span>
                    </div>
                  </div>

                  <p className={styles.honestyNote}>
                    No payment is taken on this page. The maker confirms
                    availability and the final total on WhatsApp or email
                    first — you pay only after written confirmation.
                  </p>

                  <Button
                    fullWidth
                    level={'primary'}
                    onClick={() => submitOrder('whatsapp')}
                  >
                    send order enquiry via WhatsApp
                  </Button>
                  <Button
                    fullWidth
                    level={'secondary'}
                    onClick={() => submitOrder('email')}
                  >
                    send via email instead
                  </Button>
                  <div className={styles.linkContainer}>
                    <Link to={'/shop'}>CONTINUE SHOPPING</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;

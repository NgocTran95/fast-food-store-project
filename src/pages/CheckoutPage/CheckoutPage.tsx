import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle as faSolidCircle,
  faPercent,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import styles from './CheckoutPage.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAppSelector } from '../../app/hooks';

const cx = classNames.bind(styles);
function CheckoutPage() {
  const [showCouponInput, setShowCouponInput] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>('bank-tranfer');
  const { cart, total_amount, discount } = useAppSelector(
    (state) => state.cart,
  );
  return (
    <div>
      <Header />
      <section className={cx('container')}>
        <header className={cx('heading')}>Checkout</header>
        <div className={cx('checkout-top')}>
          <div className={cx('coupon')}>
            <FontAwesomeIcon icon={faPercent} className={cx('coupon-icon')} />
            <p className={cx('coupon-question')}>have a coupon?</p>
            <button
              className={cx('toggle-coupon-input')}
              onClick={() => setShowCouponInput((prev) => !prev)}
            >
              click here to enter you code
            </button>
          </div>
          <div className={cx('coupon-apply', showCouponInput && 'show')}>
            <p className={cx('coupon-desc')}>
              If you have a coupon code, please apply it below.
            </p>
            <div className={cx('coupon-actions')}>
              <input
                type="text"
                placeholder="Coupon Code"
                className={cx('coupon-input')}
              />
              <button className={cx('coupon-btn')}>Apply Coupon</button>
            </div>
          </div>
        </div>
        <Row className={cx('checkout-body')}>
          <Col xl={8} lg={7} md={12} className="px-4">
            <div className={cx('billing-details')}>
              <h3 className={cx('title')}>Billing details</h3>
              <form className={cx('billing-details-form')}>
                <div className={cx('form-control')}>
                  <label htmlFor="billing-name">Your Name *</label>
                  <input type="text" id="billing-name" />
                </div>
                <div className={cx('form-control')}>
                  <label htmlFor="billing-street-address">
                    Street address *
                  </label>
                  <input
                    type="text"
                    id="billing-street-address"
                    placeholder="House number & street name"
                  />
                </div>
                <div className={cx('form-control')}>
                  <label htmlFor="billing-city">Town / City *</label>
                  <input type="text" id="billing-city" />
                </div>
                <div className={cx('form-control')}>
                  <label htmlFor="billing-phone">Phone *</label>
                  <input type="tel" id="billing-phone" />
                </div>
                <div className={cx('form-control')}>
                  <label htmlFor="billing-email">Email *</label>
                  <input type="tel" id="billing-email" />
                </div>
                <div className={cx('form-control')}>
                  <label htmlFor="billing-note">Order notes (optional)</label>
                  <div>
                    <textarea
                      id="billing-note"
                      placeholder="Notes about your oder, e.g.special notes for delivery."
                    />
                  </div>
                </div>
              </form>
            </div>
          </Col>
          <Col xl={4} lg={5} md={12} className="px-4">
            <div className={cx('oder-reviews')}>
              <h1 className={cx('title')}>Products</h1>
              {cart.map((item) => (
                <div className={cx('oder-item')} key={item.product_info.id}>
                  <div className={cx('item-details')}>
                    <div className={cx('item-image')}>
                      <img
                        src={item.product_info.img}
                        alt={item.product_info.name}
                      />
                    </div>
                    <div className={cx('item-name')}>
                      <p className={cx('name')}>{item.product_info.name}</p>
                      <strong>qty: {item.quantity}</strong>
                    </div>
                  </div>
                  <div className={cx('item-total')}>
                    ${(item.product_info.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className={cx('cart-option', 'shipping')}>
                <span>Subtotal</span>
                <span>${total_amount.toFixed(2)}</span>
              </div>
              <div className={cx('cart-option')}>
                <span>Shipping</span>
                <span>Free shipping</span>
              </div>
              <div className={cx('cart-option')}>
                <span>Discount</span>
                <span>${(total_amount * discount).toFixed(2)}</span>
              </div>
              <div className={cx('cart-option')}>
                <span>Total</span>
                <span className={cx('total-value')}>
                  ${(total_amount * (1 - discount)).toFixed(2)}
                </span>
              </div>
              <div className={cx('payment')}>
                <div className={cx('payment-item')}>
                  <label htmlFor="payment-bank-tranfer">
                    <FontAwesomeIcon
                      icon={
                        payment === 'bank-tranfer' ? faSolidCircle : faCircle
                      }
                      className={cx('icon')}
                    />
                    <p>Direct bank tranfer</p>
                  </label>
                  <input
                    type="radio"
                    name="payment"
                    id="payment-bank-tranfer"
                    value="bank-tranfer"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <p className={cx('description')}>
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                </div>
                <div className={cx('payment-item')}>
                  <label htmlFor="payment-cash-delivery">
                    <FontAwesomeIcon
                      icon={
                        payment === 'cash-delivery' ? faSolidCircle : faCircle
                      }
                      className={cx('icon')}
                    />
                    <p>Cash on delivery</p>
                  </label>
                  <input
                    type="radio"
                    name="payment"
                    id="payment-cash-delivery"
                    value="cash-delivery"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <p className={cx('description')}>
                    Pay with cash upon delivery.
                  </p>
                </div>
              </div>
              <button type='submit' className={cx('payment-btn')}>Place order</button>
            </div>
          </Col>
        </Row>
      </section>
      <Footer />
    </div>
  );
}

export default CheckoutPage;

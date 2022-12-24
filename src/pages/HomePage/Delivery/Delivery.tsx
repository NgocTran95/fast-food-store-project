import classNames from 'classnames/bind';
import { Reveal } from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

import Button from '../../../components/Button';
import styles from './Delivery.module.scss';
const cx = classNames.bind(styles);

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

function Delivery() {
  return (
    <section className={cx('container')}>
      <div className={cx('inner')}>
        <Reveal
          keyframes={fadeInLeft}
          duration={2000}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <h1 className={cx('header')}>You oder we delivery</h1>
        </Reveal>
        <Reveal
          keyframes={fadeInRight}
          duration={2000}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <span className={cx('promotion')}>
            Oders $50 get a 1L Pepsi Free
          </span>
        </Reveal>
        <Button to="/products" variants="primary" className={cx('oder-btn')}>
          ORDER NOW
        </Button>
      </div>
    </section>
  );
}

export default Delivery;

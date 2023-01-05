import classNames from 'classnames/bind';
import {
  faBasketShopping,
  faChevronUp,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import styles from './CornerTools.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { setShowCart } from '../../features/cart/cartSlice';

const cx = classNames.bind(styles);
function CornerTools() {
  const toolRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch()

  useEffect(() => {
    window.addEventListener('scroll', handleShowOnScroll);
    return () => {
      window.removeEventListener('scroll', handleShowOnScroll);
    };
  }, []);

  const handleShowOnScroll = (e: Event) => {
    if (window.scrollY >= 300) {
      toolRef.current?.classList.add(cx('show'));
    } else {
      toolRef.current?.classList.remove(cx('show'));
    }
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <div className={cx('container')} ref={toolRef}>
      <div className={cx('tools')}>
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="tooltip-cart-btn" className={cx('tooltip')}>
              Shopping Cart
            </Tooltip>
          }
        >
          <button className={cx('tool-btn')} onClick={() => dispatch(setShowCart(true))}>
            <FontAwesomeIcon icon={faBasketShopping} />
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="tooltip-wishlist-btn" className={cx('tooltip')}>
              Wish List
            </Tooltip>
          }
        >
          <button className={cx('tool-btn')}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="tooltip-scroll-top" className={cx('tooltip')}>
              Scroll To Top
            </Tooltip>
          }
        >
          <button className={cx('tool-btn', 'scroll-top-btn')} onClick={scrollToTop}>
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        </OverlayTrigger>
      </div>
    </div>
  );
}

export default CornerTools;

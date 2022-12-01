import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrashCan, faCreditCard, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

import styles from './Cart.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cart({ show, setShow }: Props) {
  const [showOderDetails, setShowOderDetails] = useState<boolean>(false)
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className={cx('container')}>
      <Offcanvas.Header>
        <p className={cx('heading')}>Your Cart</p>
        <button className={cx('close-btn')} onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body className={cx('body')}>
        <div className={cx('cart-list')}>
          <div className={cx('cart-item')}>
            <div className={cx('item-info')}>
              <div className={cx('item-image')}>
                <img
                  src="https://congluan-cdn.congluan.vn/files/content/2022/05/17/hanh-trinh-chiec-banh-hamburger-%E2%80%98chinh-phuc%E2%80%99-nuoc-my-071525855.jpg"
                  alt="hamburger"
                />
              </div>
              <div className={cx('item-details')}>
                <p className={cx('item-name')}>Hamburger American</p>
                <span className={cx('item-price')}>$50</span>
                <div className={cx('item-quantity')}>
                  <button className={cx('change-qtt-btn')}>-</button>
                  <span>3</span>
                  <button className={cx('change-qtt-btn')}>+</button>
                </div>
              </div>
            </div>
            <button className={cx('delete-btn')}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
          <div className={cx('cart-item')}>
            <div className={cx('item-info')}>
              <div className={cx('item-image')}>
                <img
                  src="https://congluan-cdn.congluan.vn/files/content/2022/05/17/hanh-trinh-chiec-banh-hamburger-%E2%80%98chinh-phuc%E2%80%99-nuoc-my-071525855.jpg"
                  alt="hamburger"
                />
              </div>
              <div className={cx('item-details')}>
                <p className={cx('item-name')}>Hamburger American</p>
                <span className={cx('item-price')}>$50</span>
                <div className={cx('item-quantity')}>
                  <button className={cx('change-qtt-btn')}>-</button>
                  <span>3</span>
                  <button className={cx('change-qtt-btn')}>+</button>
                </div>
              </div>
            </div>
            <button className={cx('delete-btn')}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <div className={cx('oder-info')}>
          <button className={cx('toggle-btn')} onClick={() => setShowOderDetails(prev => !prev)}></button>
          <div className={cx('oder-details', showOderDetails ? 'show' : 'hide')}>
            <div className={cx('detail-item')}>
              <p className={cx('label')}>Discount</p>
              <span className={cx('value')}>$6</span>
            </div>
            <div className={cx('detail-item')}>
              <p className={cx('label')}>Shipping fee</p>
              <span className={cx('value')}>Free</span>
            </div>
            <div className={cx('detail-item')}>
              <p className={cx('label')}>Voucher</p>
              <span className={cx('value')}>None</span>
            </div>
          </div>
          <div className={cx('oder-total')}>
            <p className={cx('total-label')}>Total:</p>
            <span className={cx('total-num')}>$300</span>
          </div>
        </div>
        <div className={cx('action-btns')}>
          <button className={cx('action-btn', 'checkout-btn')}>
            <FontAwesomeIcon icon={faCreditCard} className={cx('btn-icon')}/>
            Check out
          </button>
          <Link to='/products' className={cx('action-btn', 'getmore-btn')}>
            <FontAwesomeIcon icon={faCartPlus} className={cx('btn-icon')}/>
            Get more
          </Link>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Cart;

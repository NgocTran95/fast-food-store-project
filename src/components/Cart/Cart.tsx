import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faTrashCan,
  faCreditCard,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

import styles from './Cart.module.scss';
import { useState } from 'react';
import {
  Query,
  DocumentData,
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  calculateTotals,
  CartData,
  removeFromCart,
  setCart,
  setShowCart,
  toggleAmountCartItem,
} from '../../features/cart/cartSlice';
import { CartBg } from '../../assets/images';

const cx = classNames.bind(styles);



function Cart() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const {
    cart: currentCart,
    id,
    total_amount,
    discount,
    isShowCart
  } = useAppSelector((state) => state.cart);
  const [showOderDetails, setShowOderDetails] = useState<boolean>(false);

  // Update cart to firebase
  useEffect(() => {
    if (!!id) {
      updateDoc(doc(db, 'carts', id), { cart: [...currentCart] });
    }
  }, [currentCart, id]);
  
  // Reset cart state when user logout
  useEffect(() => {
    if (!userInfo.uid) {
      dispatch(
        setCart({
          id: '',
          uid: '',
          cart: [],
          total_items: 0,
          total_amount: 0,
          wishlist: [],
        }),
      );
    }
  }, [dispatch, userInfo.uid]);
  // Update cart state
  useEffect(() => {
    if (!userInfo.uid) return;
    const collectionRef: Query<DocumentData> = query(
      collection(db, 'carts'),
      where('uid', '==', userInfo.uid),
      orderBy('createAt', 'asc'),
    );
    const unscribed = onSnapshot(collectionRef, (snapshot) => {
      const document: CartData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        uid: doc.data().uid,
        cart: doc.data().cart,
        total_amount: doc.data().total_amount,
        total_items: doc.data().total_items,
        wishlist: doc.data().wishlist,
      }));
      dispatch(setCart(document[0]));
    });
    return () => {
      unscribed();
    };
  }, [dispatch, userInfo.uid]);

  // Re-calculate totals when cart change
  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, currentCart]);

  const toggleCartItemAmount = (id: string, amount: number) => {
    if (amount === 0) return;
    dispatch(toggleAmountCartItem({ id, amount }));
  };

  const handleClose = () => {
    dispatch(setShowCart(false));
  };
  return (
    <Offcanvas
      show={isShowCart}
      onHide={handleClose}
      placement="end"
      className={cx('container')}
    >
      <Offcanvas.Header>
        <p className={cx('heading')}>Your Cart</p>
        <button className={cx('close-btn')} onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body className={cx('body')}>
        {!userInfo.uid ? (
          <div className={cx('not-login')}>
            <div className={cx('not-login-image')}>
              <img src={CartBg} alt='cart-background'/>
            </div>
            <p className={cx('notification')}>You are not logged in. Please log in to use this feature!</p>
            <Link to='/login' className={cx('navigate-login-btn')}>Go to Login</Link>
          </div>
        ) : (
          <div className={cx('cart-list')}>
            {currentCart.map((item) => (
              <div className={cx('cart-item')} key={item.product_info.id}>
                <div className={cx('item-info')}>
                  <div className={cx('item-image')}>
                    <img
                      src={item.product_info.img}
                      alt={item.product_info.name}
                    />
                  </div>
                  <div className={cx('item-details')}>
                    <p className={cx('item-name')}>{item.product_info.name}</p>
                    <span className={cx('item-price')}>
                      ${item.product_info.price}
                    </span>
                    <div className={cx('item-quantity')}>
                      <button
                        className={cx('change-qtt-btn')}
                        onClick={() =>
                          toggleCartItemAmount(
                            item.product_info.id,
                            item.quantity - 1,
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className={cx('change-qtt-btn')}
                        onClick={() =>
                          toggleCartItemAmount(
                            item.product_info.id,
                            item.quantity + 1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className={cx('delete-btn')}
                  onClick={() => dispatch(removeFromCart(item.product_info.id))}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className={cx('oder-info')}>
          <button
            className={cx('toggle-btn')}
            onClick={() => setShowOderDetails((prev) => !prev)}
          ></button>
          <div
            className={cx('oder-details', showOderDetails ? 'show' : 'hide')}
          >
            <div className={cx('detail-item')}>
              <p className={cx('label')}>Discount</p>
              <span className={cx('value')}>
                ${Math.round(discount * total_amount)}
              </span>
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
            <span className={cx('total-num')}>${total_amount}</span>
          </div>
        </div>
        <div className={cx('action-btns')}>
          <button className={cx('action-btn', 'checkout-btn')}>
            <FontAwesomeIcon icon={faCreditCard} className={cx('btn-icon')} />
            Check out
          </button>
          <Link to="/products" className={cx('action-btn', 'getmore-btn')}>
            <FontAwesomeIcon icon={faCartPlus} className={cx('btn-icon')} />
            Get more
          </Link>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Cart;

import classNames from 'classnames/bind';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './GridProductCard.module.scss';
import { Product } from '../../features/products/productSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setAddToCartProduct,
  setShowCartModal,
} from '../../features/cart/cartSlice';
import { addToWishList } from '../../features/wishlist/wishlistSlice';
const cx = classNames.bind(styles);

interface Props {
  product: Product;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number
  category: string;
}

function GridProductCard({ product, lg, sm, md, category }: Props) {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.cart);
  const { wishlist } = useAppSelector((state) => state.wishlist);

  const isAddedToCart = cart.some(
    (item) => item.product_info.id === product.id,
  );
  const isAddedToWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(setShowCartModal(true));
    dispatch(setAddToCartProduct(product));
  };
  const handleAddToWishList = () => {
    dispatch(addToWishList(product));
    toast.success(
      ({ closeToast }) => (
        <p>
          Add <span className={cx('toast-product-name')}>{product.name}</span>{' '}
          to <span className={cx('toast-list-name')}>Wish List</span>{' '}
          successfully!
        </p>
      ),
      {
        toastId: `wishlist-add-${product.id}`,
        icon: false,
      },
    );
  };
  return (
    <Col sm={sm} lg={lg} md={md} xs className='px-4 py-3'>
      <div className={cx('product-inner')}>
        <div className={cx('product-widget')}>
          <div className={cx('widget-notification')}>
            <div className={cx('widget-item', 'hot')}>Hot</div>
            <div className={cx('widget-item', 'discount')}>10%</div>
          </div>
          {userInfo.uid && (
            <button
              className={cx('wishlist-btn', isAddedToWishlist && 'active')}
              onClick={handleAddToWishList}
              disabled={isAddedToWishlist}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          )}
        </div>
        <Link
          className={cx('product-thumbnail')}
          to={`/products/${category}/${product.id}`}
        >
          <img
            src={product.img}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                'https://keviniscooking.com/wp-content/uploads/2021/05/Bavette-Steak-Sirloin-Flap-square.jpg';
            }}
            alt={product.name}
          />
          <div className={cx('detail-icon')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </Link>
        <div className={cx('product-info')}>
          <p className={cx('product-name')}>{product.name}</p>
          <p className={cx('product-price')}>${product.price}</p>
          {!userInfo.uid ? (
            <Link className={cx('product-btn', 'to-login')} to="/login">
              Go to log in
            </Link>
          ) : (
            <button
              className={cx('product-btn', 'cart', isAddedToCart && 'disabled')}
              onClick={handleAddToCart}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? 'Aready added' : 'Add to cart'}
            </button>
          )}
        </div>
      </div>
    </Col>
  );
}

export default GridProductCard;

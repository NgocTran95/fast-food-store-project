import classNames from 'classnames/bind';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './ListProductCard.module.scss';
import { Product } from '../../features/products/productSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setAddToCartProduct,
  setShowCartModal,
} from '../../features/cart/cartSlice';
import { addToWishList } from '../../features/wishlist/wishlistSlice';
import { toast } from 'react-toastify';

interface Props {
  product: Product;
  category: string;
}
const cx = classNames.bind(styles);
function ListProductCard({ product, category }: Props) {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const { userInfo } = useAppSelector((state) => state.user);
  const isAddedToCart = cart.some(
    (item) => item.product_info.id === product.id,
  );
  const isAddedToWishList = wishlist.some((item) => item.id === product.id);

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
    <Row className={cx('container')}>
      <Col lg={3} md={4}>
        <div className={cx('thumnail-wrapper')}>
          <Link
            to={`/products/${category}/${product.id}`}
            className={cx('thumbnail')}
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
            <div className={cx('widget-notification')}>
              <div className={cx('widget-item', 'hot')}>Hot</div>
              <div className={cx('widget-item', 'discount')}>10%</div>
            </div>
            <div className={cx('detail-icon')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </Link>
        </div>
      </Col>
      <Col lg={9} md={8}>
        <Link
          to={`/products/${category}/${product.id}`}
          className={cx('product-name')}
        >
          {product.name}
        </Link>
        <p className={cx('product-price')}>{`$${product.price}`}</p>
        <div className={cx('rating')}>
          {Array.from(Array(product.rate).keys()).map((item) => (
            <FontAwesomeIcon icon={faStar} key={item} />
          ))}
        </div>
        <div className={cx('actions')}>
          {!userInfo.uid ? (
            <Link className={cx('add-btn', 'to-login')} to="/login">
              Go to Log in
            </Link>
          ) : (
            <button
              className={cx('add-btn', 'cart', isAddedToCart && 'disabled')}
              onClick={handleAddToCart}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? 'Aready added' : 'Add to cart'}
            </button>
          )}
          {userInfo.uid && (
            <button
              className={cx('add-wishlist', isAddedToWishList && 'active')}
              onClick={handleAddToWishList}
              disabled={isAddedToWishList}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          )}
        </div>
        <hr />
        <p className={cx('product-desc')}>{product.dsc}</p>
      </Col>
    </Row>
  );
}

export default ListProductCard;

import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faStar,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getRelatedProducts,
  getSingleProduct,
} from '../../../features/single_product/services';
import { formatFoodName } from '../../../utils';
import styles from './ProductInfo.module.scss';
import { addToCart } from '../../../features/cart/cartSlice';
import { addToWishList } from '../../../features/wishlist/wishlistSlice';

const cx = classNames.bind(styles);
function ProductInfo() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { single_product } = useAppSelector((state) => state.single_product);
  const { cart } = useAppSelector((state) => state.cart);
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const { userInfo } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  const category = pathname.split('/')[2];
  const [quantity, setQuantity] = useState<number>(1);

  const isAddedToCart = cart.some((item) => item.product_info.id === id);
  const isAddedToWishList = wishlist.some((item) => item.id === id);

  useEffect(() => {
    dispatch(getSingleProduct({ category, id }));
  }, [dispatch, category, id]);

  useEffect(() => {
    dispatch(getRelatedProducts(category));
  }, [dispatch, category]);

  const handleChangeQuantity = (action: 'increase' | 'decrease') => {
    if (action === 'decrease') {
      if (quantity === 1) {
        setQuantity(1);
      } else {
        setQuantity((prev) => prev - 1);
      }
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product_info: single_product, quantity }));
    setQuantity(1);
  };

  return (
    <section className={cx('container')}>
      <div className={cx('breadscrumb')}>
        <Link to="/">Home</Link>
        <span className={cx('devider')}>/</span>
        <Link to="/products">Shop</Link>
        <span className={cx('devider')}>/</span>
        <Link to={`/products/${category === 'best-foods' ? '' : category}`}>
          {formatFoodName(category)}
        </Link>
        <span className={cx('devider')}>/</span>
        <span className={cx('name')}>{single_product.name}</span>
      </div>
      <div className={cx('product-details')}>
        <div className={cx('product-image-container')}>
          <div className={cx('product-image')}>
            <img src={single_product.img} alt={single_product.name} />
          </div>
        </div>
        <div className={cx('product-infor')}>
          <h1 className={cx('product-name')}>{single_product.name}</h1>
          <p className={cx('product-price')}>${single_product.price}</p>
          <div className={cx('product-rating')}>
            {Array.from(Array(5).keys()).map((item) => (
              <FontAwesomeIcon
                icon={faStar}
                key={item}
                className={cx(
                  'product-rating-star',
                  item >= single_product.rate && 'active',
                )}
              />
            ))}
          </div>
          <hr />
          <p className={cx('product-desc')}>{single_product.dsc}</p>
          {userInfo.uid && (
            <div className={cx('actions')}>
              <div className={cx('quantity-btns')}>
                <div className={cx('quantity')}>
                  <button
                    className={cx('quantity-btn', 'decrease')}
                    onClick={() => handleChangeQuantity('decrease')}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    className={cx('quantity-input')}
                    onChange={(e) => setQuantity(+e.target.value)}
                  />
                  <button
                    className={cx('quantity-btn', 'increase')}
                    onClick={() => handleChangeQuantity('increase')}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <button
                  className={cx('add-cart-btn', isAddedToCart && 'disabled')}
                  onClick={handleAddToCart}
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? 'Already added' : 'Add to cart'}
                </button>
              </div>
              <button className={cx('buy-now-btn')}>Buy it now</button>
              <button
                className={cx(
                  'add-wishlist-btn',
                  isAddedToWishList && 'active',
                )}
                onClick={() => dispatch(addToWishList(single_product))}
                disabled={isAddedToWishList}
              >
                <span className={cx('add-wishlist-icon')}>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                {isAddedToWishList
                  ? 'Already add to wishlist'
                  : 'Add to wishlist'}
              </button>
            </div>
          )}
          <hr />
          <div className={cx('more-info')}>
            <p className={cx('item')}>
              category:{' '}
              <Link
                className={cx('content')}
                to={`/products/${category === 'best-foods' ? '' : category}`}
              >
                {category}
              </Link>
            </p>
            <p className={cx('item')}>
              country:{' '}
              <span className={cx('content')}>{single_product.country}</span>
            </p>
            <p className={cx('item')}>
              tags: <span className={cx('content')}>hot</span>,{' '}
              <span className={cx('content')}>trend</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductInfo;

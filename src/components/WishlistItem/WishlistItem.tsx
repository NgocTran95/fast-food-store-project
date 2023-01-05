import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import styles from './WishlistItem.module.scss';
import { Product } from '../../features/products/productSlice';
import { useAppDispatch } from '../../app/hooks';
import { removeFromWishList } from '../../features/wishlist/wishlistSlice';
import { addToCart } from '../../features/cart/cartSlice';
const cx = classNames.bind(styles);

interface Props {
  product: Product;
}
function WishlistItem({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch()

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
    dispatch(addToCart({ product_info: product, quantity}))
    setQuantity(1)
  }
  return (
    <div className={cx('product')} key={product.id}>
      <div className={cx('product-info')}>
        <div className={cx('product-image')}>
          <img src={product.img} alt={product.name} />
        </div>
        <div className={cx('product-detail')}>
          <h4 className={cx('product-name')}>{product.name}</h4>
          <p className={cx('product-price')}>${product.price}</p>
        </div>
      </div>
      <div className={cx('actions')}>
        <div className={cx('add-cart')}>
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
          <button className={cx('add-cart-btn')} onClick={handleAddToCart}>Add to cart</button>
        </div>
        <button className={cx('remove-btn')} onClick={() => dispatch(removeFromWishList(product.id))}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
}

export default WishlistItem;

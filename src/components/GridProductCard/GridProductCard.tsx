import classNames from 'classnames/bind';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './GridProductCard.module.scss';
import { Product } from '../../features/products/productSlice';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

interface Props {
    product: Product,
    lg?: number,
    sm?: number,
    isActive: boolean
}

function GridProductCard( { product, lg, sm, isActive } : Props) {

  return (
    <Col sm={sm} lg={lg} className={cx('product-wrapper')}>
      <div className={cx('product-inner')}>
        <div className={cx('product-widget')}>
          <div className={cx('widget-notification')}>
            <div className={cx('widget-item', 'hot')}>Hot</div>
            <div className={cx('widget-item', 'discount')}>10%</div>
          </div>
          <button className={cx('wishlist-btn', isActive && 'active')}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <Link className={cx('product-thumbnail')} to={`/products/${product.id}`}>
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
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </div>
        </Link>
        <div className={cx('product-info')}>
          <p className={cx('product-name')}>{product.name}</p>
          <p className={cx('product-price')}>${product.price}</p>
          <button className={cx('product-btn')}>Add to cart</button>
        </div>
      </div>
    </Col>
  );
}

export default GridProductCard;

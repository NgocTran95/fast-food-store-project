import classNames from 'classnames/bind';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './ListProductCard.module.scss';
import { Product } from '../../features/products/productSlice';

interface Props {
  product: Product;
  category: string;
}
const cx = classNames.bind(styles);
function ListProductCard({ product, category }: Props) {
  return (
    <Row className={cx('container')}>
      <Col lg={3}>
        <div className={cx('thumnail-wrapper')}>
          <Link to={`/products/${category}/${product.id}`} className={cx('thumbnail')}>
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
      <Col lg={9}>
        <Link to={`/products/${category}/${product.id}`} className={cx('product-name')}>
          {product.name}
        </Link>
        <p className={cx('product-price')}>{`$${product.price}`}</p>
        <div className={cx('rating')}>
          {Array.from(Array(product.rate).keys()).map((item) => (
            <FontAwesomeIcon icon={faStar} key={item} />
          ))}
        </div>
        <div className={cx('actions')}>
          <button className={cx('add-btn')}>Add to cart</button>
          <button className={cx('add-wishlist')}>
            <FontAwesomeIcon icon={faHeart}/>
          </button>
        </div>
        <hr/>
        <p className={cx('product-desc')}>{product.dsc}</p>
      </Col>
    </Row>
  );
}

export default ListProductCard;

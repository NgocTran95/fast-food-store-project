import classNames from 'classnames/bind';
import { Row, Col } from 'react-bootstrap';
import styles from './ListProductCardSkeleton.module.scss';

const cx = classNames.bind(styles);

function ListProductCardSkeleton() {
  return (
    <Row className={cx('container')}>
      <Col lg={3}>
        <div className={cx('thumnail-wrapper')}>
          <div  className={cx('thumbnail', 'skeleton')}>
          </div>
        </div>
      </Col>
      <Col lg={9}>
        <div className={cx('product-name', 'skeleton')}>
        </div>
        <p className={cx('product-price', 'skeleton')}></p>
        <div className={cx('rating', 'skeleton')}>
        </div>
        <div className={cx('actions')}>
          <button className={cx('add-btn', 'skeleton')}></button>
          <button className={cx('add-wishlist', 'skeleton')}>
          </button>
        </div>
        <hr/>
        <p className={cx('product-desc', 'skeleton')}></p>
      </Col>
    </Row>
  );
}

export default ListProductCardSkeleton;

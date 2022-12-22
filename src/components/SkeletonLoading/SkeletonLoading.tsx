import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './SkeletonLoading.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface SkeletonProps {
    quantity: number
}
const cx = classNames.bind(styles);
function SkeletonLoading({ quantity } : SkeletonProps) {
  const quantityArr = Array.from(Array(quantity).keys());
  return (
    <div>
      <Container className={cx('menu')}>
        <Row>
          {quantityArr.map((item) => (
            <Col lg={3} className={cx('product-wrapper')} key={item}>
              <div className={cx('product-inner')}>
                <div className={cx('product-widget')}>
                  <div className={cx('widget-notification')}>
                    <div className={cx('widget-item', 'skeleton')}></div>
                    <div className={cx('widget-item', 'skeleton')}></div>
                  </div>
                  <button className={cx('wishlist-btn')}>
                    <FontAwesomeIcon icon={faHeart}/>
                  </button>
                </div>
                <div className={cx('product-thumbnail', 'skeleton')}>   
                </div>
                <div className={cx('product-info')}>
                  <p className={cx('product-name','skeleton')}></p>
                  <p className={cx('product-price','skeleton')}></p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default SkeletonLoading;

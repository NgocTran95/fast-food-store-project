import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './BurgerMenuSkeletonLoading.module.scss';

interface SkeletonProps {
  quantity: number;
}
const cx = classNames.bind(styles);
function SkeletonLoading({ quantity }: SkeletonProps) {
  const quantityArr = Array.from(Array(quantity).keys());
  return (
    <Container>
      <Row>
        {quantityArr.map((item) => (
          <Col lg={6} key={item}>
            <div className={cx('product-inner')}>
              <div className={cx('product-widget')}>
                <div className={cx('widget-item', 'skeleton')}></div>
                <div className={cx('widget-item', 'skeleton')}></div>
              </div>
              <div className={cx('product-info', 'skeleton')}>
              </div>
              <p className={cx('product-desc', 'skeleton')}></p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SkeletonLoading;

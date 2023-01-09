import classNames from 'classnames/bind';
import { Col } from 'react-bootstrap';
import styles from './GridProductCardSkeleton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
interface Props {
  lg?: number,
  md?: number,
  xs?: number,
}
function GridProductCardSkeleton({ lg, md, xs }: Props) {
  return (
    <Col lg={lg} md={md} xs={xs} className={cx('product-wrapper')} >
      <div className={cx('product-inner')}>
        <div className={cx('product-widget')}>
          <div className={cx('widget-notification')}>
            <div className={cx('widget-item', 'skeleton')}></div>
            <div className={cx('widget-item', 'skeleton')}></div>
          </div>
          <button className={cx('wishlist-btn')}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <div className={cx('product-thumbnail', 'skeleton')}></div>
        <div className={cx('product-info')}>
          <p className={cx('product-name', 'skeleton')}></p>
          <p className={cx('product-price', 'skeleton')}></p>
        </div>
      </div>
    </Col>
  );
}

export default GridProductCardSkeleton;

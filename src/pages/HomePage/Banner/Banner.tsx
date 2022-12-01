import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import deliveryImage from '../../../assets/images/fast-delivery.png';
import Button from '../../../components/Button';
import { Fade } from 'react-awesome-reveal';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel } from 'react-bootstrap';

const cx = classNames.bind(styles);
function Banner() {
  return (
    <div className={cx('container')}>
      <Carousel indicators={false} controls={false} fade={true} pause={false} interval={5000}>
        <Carousel.Item className={cx('carousel-item', 'first-slide')} />
        <Carousel.Item className={cx('carousel-item', 'second-slide')} />
        <Carousel.Item className={cx('carousel-item', 'third-slide')} />
      </Carousel>
      <div className={cx('inner')}>
        <div className={cx('content')}>
          <Fade delay={500} direction="up" duration={2000}>
            <h1 className={cx('first-content')}>
              Enjoy your meal with <span>Flash Food</span>!
            </h1>
          </Fade>
          <Fade delay={1500} direction="left" duration={1000}>
            <p className={cx('second-content')}>
              <span>Flash</span> Oder - <span>Flash</span> Delivery
              <img src={deliveryImage} alt="fast-delivery" className={cx('delivery-img')} />
            </p>
          </Fade>
        </div>
        <Fade delay={2500} direction="bottom-right" duration={1000}>
          <Button to="/products">
            <div className={cx('button-content')}>
              <FontAwesomeIcon icon={faCartPlus} className={cx('button-icon')} />
              Discover now
            </div>
          </Button>
        </Fade>
      </div>
    </div>
  );
}

export default Banner;

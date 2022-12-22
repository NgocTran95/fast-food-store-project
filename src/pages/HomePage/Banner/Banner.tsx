import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import Slider from 'react-slick';

import BannerSliderArrow from './BannerSliderArrow';
import Button from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { BannerBurger, BannerPizza, BannerSteak } from '../../../assets/images/banner';

const cx = classNames.bind(styles);

const setting = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <BannerSliderArrow to="prev" />,
  nextArrow: <BannerSliderArrow to="next" />,
};

function Banner() {
  return (
    <div className={cx('container')}>
      <Slider {...setting}>
        <div className={cx('slider-item')}>
          <div className={cx('content')}>
            <div className={cx('food-type')}>
              <div className={cx('widget')}>Hot</div>
              <h1 className={cx('type')}>Hamburger</h1>
            </div>
            <h1 className={cx('food-name')}>Burger King</h1>
            <p className={cx('description')}>
              Buy any 5 burger and get 1.5L Coca free
            </p>
          </div>
          <div className={cx('hero')}>
            <img src={BannerBurger} alt="hero-bg" />
            <div className={cx('offer-price')}>
              <span>Offer</span>
              <span className={cx('price')}>$6.5</span>
            </div>
          </div>
        </div>
        <div className={cx('slider-item')}>
          <div className={cx('content')}>
            <div className={cx('food-type')}>
              <div className={cx('widget')}>Hot</div>
              <h1 className={cx('type')}>Pizza</h1>
            </div>
            <h1 className={cx('food-name')}>Hawaiian Pizza</h1>
            <p className={cx('description')}>
              Buy any 2 pizzas and get 1.5L Pepsi free
            </p>
          </div>
          <div className={cx('hero')}>
            <img src={BannerPizza} alt="hero-bg" />
            <div className={cx('offer-price')}>
              <span>Offer</span>
              <span className={cx('price')}>$15.5</span>
            </div>
          </div>
        </div>
        <div className={cx('slider-item')}>
          <div className={cx('content')}>
            <div className={cx('food-type')}>
              <div className={cx('widget')}>New</div>
              <h1 className={cx('type')}>Steak</h1>
            </div>
            <h1 className={cx('food-name')}>Saltbrick Prime</h1>
            <p className={cx('description')}>
              Discount up to 10% per oder above $100
            </p>
          </div>
          <div className={cx('hero')}>
            <img src={BannerSteak} alt="hero-bg" />
            <div className={cx('offer-price')}>
              <span>Offer</span>
              <span className={cx('price')}>$25.5</span>
            </div>
          </div>
        </div>
      </Slider>
      <Button to="/products" variants="outline" className={cx('oder-button')}>
        <>
          <FontAwesomeIcon icon={faCartShopping} />
          <span>ODER NOW</span>
        </>
      </Button>
    </div>
  );
}

export default Banner;

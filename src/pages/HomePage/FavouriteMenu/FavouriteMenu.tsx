import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import styles from './FavouriteMenu.module.scss';
import { OffferMenuBurger, OffferMenuPizza } from '../../../assets/images/offer-menu-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';

const settings = {
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const cx = classNames.bind(styles);
function FavouriteMenu() {
  return (
    <div className={cx('container')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <div className={cx('widget')}>Tasty and Crunchy</div>
          <h1 className={cx('name')}>Favourite Menu</h1>
          <p className={cx('desc')}>
            Inspired by recipes and creations of world’s best chefs
          </p>
        </div>
        <Slider {...settings}>
          <Container className={cx('menu')}>
            <Row>
              <Col lg={3} className={cx('product-wrapper')}>
                <div className={cx('product-inner')}>
                  <div className={cx('product-widget')}>
                    <div className={cx('widget-notification')}>
                      <div className={cx('widget-item', 'hot')}>Hot</div>
                      <div className={cx('widget-item', 'discount')}>50%</div>
                    </div>
                    <button className={cx('wishlist-btn', 'active')}>
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                  <div className={cx('product-thumbnail')}>
                    <img src={OffferMenuBurger} alt="hamburger" />
                  </div>
                  <div className={cx('product-info')}>
                    <p className={cx('product-name')}>Burger king</p>
                    <p className={cx('product-price')}>$10.00</p>
                    <button className={cx('product-btn')}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </Col>
              <Col lg={3} className={cx('product-wrapper')}>
                <div className={cx('product-inner')}>
                  <div className={cx('product-widget')}>
                    <div className={cx('widget-notification')}>
                      <div className={cx('widget-item', 'hot')}>Hot</div>
                      <div className={cx('widget-item', 'discount')}>50%</div>
                    </div>
                    <button className={cx('wishlist-btn')}>
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                  <div className={cx('product-thumbnail')}>
                    <img src={OffferMenuPizza} alt="hamburger" />
                  </div>
                  <div className={cx('product-info')}>
                    <p className={cx('product-name')}>Burger king</p>
                    <p className={cx('product-price')}>$10.00</p>
                    <button className={cx('product-btn')}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Slider>
      </div>
    </div>
  );
}

export default FavouriteMenu;
